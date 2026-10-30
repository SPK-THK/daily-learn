// 每小时由 GitHub Actions 运行：抓取东方财富 7×24 快讯及正文，更新 news.json。
// 只有内容变化时才写文件，避免每小时产生空提交。
import fs from 'node:fs';

const FEED = 'https://newsapi.eastmoney.com/kuaixun/v1/getlist_102_ajaxResult_50_1_.html';
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148';
const OUT = 'news.json';

function decodeEntities(s) {
  return String(s)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

function parseArticle(html, url) {
  const text = String(html || '');
  const title = decodeEntities((text.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '');
  const start = text.search(/id="articleContent"/i);
  let body = '';
  if (start >= 0) {
    const seg = text.slice(start);
    const end = seg.search(/<div class="end_source"/i);
    body = end >= 0 ? seg.slice(0, end) : seg.slice(0, 12000);
  }
  const paragraphs = [...body.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map(m => decodeEntities(m[1]))
    .filter(t => t && t.length > 1 && !/^（?文章来源/.test(t) && !/^原标题/.test(t) && !/^点击阅读全文$/.test(t))
    .slice(0, 20);
  return { title, paragraphs, url };
}

async function fetchArticle(url) {
  const u = new URL(url);
  if (!/(^|\.)eastmoney\.com$/i.test(u.hostname)) throw new Error('domain');
  const res = await fetch(u.href, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const out = parseArticle(await res.text(), u.href);
  if (!out.title) throw new Error('parse');
  return out;
}

const res = await fetch(FEED, { headers: { 'User-Agent': UA } });
if (!res.ok) throw new Error('feed HTTP ' + res.status);
const text = await res.text();
const start = text.indexOf('{');
const end = text.lastIndexOf('}');
if (start < 0 || end <= start) throw new Error('unexpected feed body');
const obj = JSON.parse(text.slice(start, end + 1));

let items = (obj.LivesList || []).map((n, i) => ({
  id: String(n.id || i),
  title: String(n.title || '').trim(),
  digest: String(n.digest || '').replace(/^【[^】]*】\s*/, '').trim(),
  time: String(n.showtime || '').trim(),
  url: /^https:/i.test(n.url_m || '')
    ? n.url_m
    : String(n.url_w || '').replace(/^http:/i, 'https:'),
})).filter(x => x.title && x.url).slice(0, 30);

if (!items.length) throw new Error('empty feed');

// 抓正文；单条失败只保留摘要
const enriched = [];
for (let i = 0; i < items.length; i += 5) {
  const part = await Promise.all(items.slice(i, i + 5).map(async n => {
    try {
      const a = await fetchArticle(n.url);
      return { ...n, content: a.paragraphs };
    } catch { return n; }
  }));
  enriched.push(...part);
}
items = enriched;

let old = null;
try { old = JSON.parse(fs.readFileSync(OUT, 'utf8')); } catch { /* 首次生成 */ }
if (old && JSON.stringify(old.items) === JSON.stringify(items)) {
  console.log('news unchanged:', items.length, 'items');
  process.exit(0);
}

fs.writeFileSync(OUT, JSON.stringify({ source: '东方财富', updatedAt: Date.now(), items }, null, 2) + '\n');
console.log('news updated:', items.length, 'items');
