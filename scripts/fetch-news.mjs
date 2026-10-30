// 每小时由 GitHub Actions 运行：抓取东方财富 7×24 快讯，更新 news.json。
// 只有内容变化时才写文件，避免每小时产生空提交。
import fs from 'node:fs';

const URL = 'https://newsapi.eastmoney.com/kuaixun/v1/getlist_102_ajaxResult_50_1_.html';
const OUT = 'news.json';

const res = await fetch(URL, { headers: { 'User-Agent': 'Mozilla/5.0' } });
if (!res.ok) throw new Error('HTTP ' + res.status);
const text = await res.text();
const start = text.indexOf('{');
const end = text.lastIndexOf('}');
if (start < 0 || end <= start) throw new Error('unexpected feed body');
const obj = JSON.parse(text.slice(start, end + 1));

const items = (obj.LivesList || []).map((n, i) => ({
  id: String(n.id || i),
  title: String(n.title || '').trim(),
  digest: String(n.digest || '').replace(/^【[^】]*】\s*/, '').trim(),
  time: String(n.showtime || '').trim(),
  url: /^https:/i.test(n.url_m || '')
    ? n.url_m
    : String(n.url_w || '').replace(/^http:/i, 'https:'),
})).filter(x => x.title && x.url).slice(0, 30);

if (!items.length) throw new Error('empty feed');

let old = null;
try { old = JSON.parse(fs.readFileSync(OUT, 'utf8')); } catch { /* 首次生成 */ }
if (old && JSON.stringify(old.items) === JSON.stringify(items)) {
  console.log('news unchanged:', items.length, 'items');
  process.exit(0);
}

fs.writeFileSync(OUT, JSON.stringify({ source: '东方财富', updatedAt: Date.now(), items }, null, 2) + '\n');
console.log('news updated:', items.length, 'items');
