// 内容数据校验：构建前运行，保证 public/data/*.json 结构完整、无重复。
// 用法：node scripts/validate-data.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = path.join(root, 'public', 'data');
const publicDir = path.join(root, 'public');
const errors = [];

const read = (name) => {
  const file = path.join(dataDir, name);
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    errors.push(`${name}: 无法读取或不是合法 JSON（${e.message}）`);
    return null;
  }
};
const isStr = (v) => typeof v === 'string' && v.trim().length > 0;
const isStrArr = (v) => Array.isArray(v) && v.length > 0 && v.every(isStr);
const err = (file, where, msg) => errors.push(`${file} [${where}]: ${msg}`);

// ---- wordbank.json ----
const words = read('wordbank.json');
if (words) {
  if (!Array.isArray(words) || !words.length) err('wordbank.json', 'root', '应为非空数组');
  else {
    const seen = new Set();
    words.forEach((w, i) => {
      const at = `#${i} ${w && w.w}`;
      for (const k of ['w', 'pos', 'zh', 'ex', 'exZh', 'tag', 'tip'])
        if (!isStr(w[k])) err('wordbank.json', at, `字段 ${k} 缺失或为空`);
      if (!isStrArr(w.phrases)) err('wordbank.json', at, 'phrases 应为非空字符串数组');
      const key = String(w.w || '').toLowerCase();
      if (seen.has(key)) err('wordbank.json', at, '单词重复');
      seen.add(key);
    });
  }
}

// ---- articles.json ----
const articlesDoc = read('articles.json');
if (articlesDoc) {
  const list = articlesDoc.articles;
  if (!Array.isArray(list) || !list.length) err('articles.json', 'root', 'articles 应为非空数组');
  else {
    const seen = new Set();
    list.forEach((a, i) => {
      const at = `#${i} ${a && a.id}`;
      if (!isStr(a.id) || !isStr(a.title)) err('articles.json', at, 'id/title 缺失');
      if (typeof a.minutes !== 'number' || a.minutes <= 0) err('articles.json', at, 'minutes 应为正数');
      if (!Array.isArray(a.paras) || !a.paras.length || a.paras.some((p) => !isStr(p.en) || !isStr(p.zh)))
        err('articles.json', at, 'paras 应为 {en,zh} 非空数组');
      if (!isStrArr(a.notes)) err('articles.json', at, 'notes 应为非空字符串数组');
      if (!Array.isArray(a.vocab) || !a.vocab.length || a.vocab.some((v) => !isStr(v.w) || !isStr(v.zh)))
        err('articles.json', at, 'vocab 应为 {w,zh} 非空数组');
      if (seen.has(a.id)) err('articles.json', at, 'id 重复');
      seen.add(a.id);
    });
  }
}

// ---- quotes.json ----
const quotesDoc = read('quotes.json');
if (quotesDoc) {
  const list = quotesDoc.quotes;
  if (!Array.isArray(list) || !list.length) err('quotes.json', 'root', 'quotes 应为非空数组');
  else {
    const seen = new Set();
    list.forEach((q, i) => {
      const at = `#${i}`;
      for (const k of ['en', 'zh', 'who']) if (!isStr(q[k])) err('quotes.json', at, `字段 ${k} 缺失或为空`);
      if (q.audio != null) {
        if (!isStr(q.audio)) err('quotes.json', at, 'audio 应为字符串路径');
        else if (!fs.existsSync(path.join(publicDir, q.audio)))
          err('quotes.json', at, `audio 文件不存在：${q.audio}`);
      }
      if (seen.has(q.en)) err('quotes.json', at, '金句重复');
      seen.add(q.en);
    });
  }
}

// ---- lessons.json ----
const lessonsDoc = read('lessons.json');
if (lessonsDoc) {
  const list = lessonsDoc.lessons;
  if (!Array.isArray(list) || !list.length) err('lessons.json', 'root', 'lessons 应为非空数组');
  else {
    const seen = new Set();
    list.forEach((l, i) => {
      const at = `#${i} ${l && l.id}`;
      if (!isStr(l.id) || !isStr(l.title) || !isStr(l.category))
        err('lessons.json', at, 'id/title/category 缺失');
      if (typeof l.minutes !== 'number' || l.minutes <= 0) err('lessons.json', at, 'minutes 应为正数');
      if (!Array.isArray(l.sections) || !l.sections.length || l.sections.some((s) => !isStr(s.h) || !isStr(s.p)))
        err('lessons.json', at, 'sections 应为 {h,p} 非空数组');
      if (!isStrArr(l.points)) err('lessons.json', at, 'points 应为非空字符串数组');
      if (!Array.isArray(l.quiz) || !l.quiz.length) err('lessons.json', at, 'quiz 应为非空数组');
      else
        l.quiz.forEach((qz, j) => {
          const qat = `${at} quiz#${j}`;
          if (!isStr(qz.q) || !isStr(qz.explain)) err('lessons.json', qat, 'q/explain 缺失');
          if (!isStrArr(qz.options) || qz.options.length < 2 || qz.options.length > 4)
            err('lessons.json', qat, 'options 应为 2-4 个选项');
          else if (!Number.isInteger(qz.a) || qz.a < 0 || qz.a >= qz.options.length)
            err('lessons.json', qat, `答案下标 a=${qz.a} 越界`);
        });
      if (seen.has(l.id)) err('lessons.json', at, 'id 重复');
      seen.add(l.id);
    });
  }
}

if (errors.length) {
  console.error('❌ 数据校验失败：');
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log(
  `✅ 数据校验通过：${words.length} 词 / ${articlesDoc.articles.length} 短文 / ${quotesDoc.quotes.length} 金句 / ${lessonsDoc.lessons.length} 课程`,
);