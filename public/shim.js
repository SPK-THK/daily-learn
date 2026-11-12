/* 数据与行情适配层：必须在 app.js 之前同步执行。
   1) 内置内容（/english/...、/stock/lessons.json）→ 读取 ./data/*.json
   2) /api/news → ./news.json（GitHub Actions 每小时更新）
   3) /api/quotes、/api/kline → 手机直连腾讯行情，失败兜底东方财富
   4) 其余请求走原生 fetch
   说明：app.js 是未改动的原始逻辑，靠本文件把「后端接口」映射到静态数据。 */
(() => {
  const nativeFetch = window.fetch.bind(window);
  const json = (obj) =>
    new Response(JSON.stringify(obj), {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });

  const DATA_MAP = {
    '/english/data/wordbank.json': './data/wordbank.json',
    '/english/content/articles.json': './data/articles.json',
    '/english/content/quotes.json': './data/quotes.json',
    '/stock/lessons.json': './data/lessons.json',
  };

  const parseTencent = (buf) => {
    const text = new TextDecoder('gbk').decode(buf);
    const out = [];
    for (const m of text.matchAll(/v_(\w+)="([^"]*)"/g)) {
      const f = m[2].split('~');
      if (f.length < 34) continue;
      const ts = f[30];
      const serverTime = /^\d{14}$/.test(ts)
        ? Date.parse(
            `${ts.slice(0, 4)}-${ts.slice(4, 6)}-${ts.slice(6, 8)}T${ts.slice(8, 10)}:${ts.slice(10, 12)}:${ts.slice(12, 14)}`
          )
        : Date.now();
      const num = (s) => (Number.isFinite(parseFloat(s)) ? parseFloat(s) : null);
      out.push({
        code: f[2],
        name: f[1].replace(/\s+/g, ''),
        price: num(f[3]),
        prev: num(f[4]),
        change: num(f[31]),
        changePct: num(f[32]),
        serverTime,
      });
    }
    return out;
  };

  const normCodes = (codes) => [
    ...new Set(
      (codes || [])
        .map((c) => String(c).trim().toLowerCase())
        .filter((c) => /^(sh|sz)\d{6}$/.test(c))
    ),
  ];

  async function quotes(codes) {
    const list = normCodes(codes);
    if (!list.length) return json([]);
    try {
      const r = await nativeFetch('https://qt.gtimg.cn/q=' + list.join(','), { cache: 'no-store' });
      const out = parseTencent(await r.arrayBuffer());
      if (!out.length) throw new Error('腾讯行情为空');
      return json(out);
    } catch (e) {
      const secids = list.map((c) => (c.slice(0, 2) === 'sh' ? '1.' : '0.') + c.slice(2)).join(',');
      const r = await nativeFetch(
        `https://push2.eastmoney.com/api/qt/ulist.np/get?secids=${secids}&fields=f2,f3,f4,f12,f14,f18&fltt=2`,
        { cache: 'no-store' }
      );
      const j = await r.json();
      const diff = (j.data && j.data.diff) || [];
      return json(
        diff.map((d) => ({
          code: d.f12,
          name: d.f14,
          price: typeof d.f2 === 'number' ? d.f2 : null,
          prev: typeof d.f18 === 'number' ? d.f18 : null,
          change: typeof d.f4 === 'number' ? d.f4 : null,
          changePct: typeof d.f3 === 'number' ? d.f3 : null,
          serverTime: Date.now(),
        }))
      );
    }
  }

  async function kline(code, days) {
    const c = normCodes([code])[0];
    if (!c) return json([]);
    const n = Math.min(Math.max(Number(days) || 30, 1), 300);
    const r = await nativeFetch(
      `https://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param=${c},day,,,${n},qfq`,
      { cache: 'no-store' }
    );
    const j = await r.json();
    const byCode = (j.data && Object.values(j.data)[0]) || {};
    const rows = byCode.qfqday || byCode.day || [];
    const num = (s) => (Number.isFinite(parseFloat(s)) ? parseFloat(s) : null);
    const out = rows
      .map((x) => ({
        date: String(x[0]),
        open: num(x[1]),
        close: num(x[2]),
        high: num(x[3]),
        low: num(x[4]),
        volume: num(x[5]),
      }))
      .filter((x) => x.close != null);
    return json(out.slice(-n));
  }

  window.fetch = (input, init) => {
    const url = typeof input === 'string' ? input : (input && input.url) || '';
    if (Object.prototype.hasOwnProperty.call(DATA_MAP, url)) {
      return nativeFetch(DATA_MAP[url], { cache: 'no-store' });
    }
    if (url.startsWith('/api/news/article')) return Promise.reject(new Error('离线快照不含全文'));
    if (url.startsWith('/api/news')) {
      return nativeFetch('./news.json', { cache: 'no-store' }).then((r) => {
        if (!r.ok) throw new Error('新闻快照不可用');
        return r;
      });
    }
    if (url.startsWith('/api/quotes')) {
      const u = new URL(url, location.href);
      return quotes((u.searchParams.get('codes') || '').split(','));
    }
    if (url.startsWith('/api/kline')) {
      const u = new URL(url, location.href);
      return kline(u.searchParams.get('code') || '', u.searchParams.get('days'));
    }
    return nativeFetch(input, init);
  };
})();
