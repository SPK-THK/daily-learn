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

  async function quotes(codes, signal) {
    const list = normCodes(codes);
    if (!list.length) return json([]);
    try {
      const r = await nativeFetch('https://qt.gtimg.cn/q=' + list.join(','), { cache: 'no-store', signal });
      const out = parseTencent(await r.arrayBuffer());
      if (!out.length) throw new Error('腾讯行情为空');
      return json(out);
    } catch (e) {
      const secids = list.map((c) => (c.slice(0, 2) === 'sh' ? '1.' : '0.') + c.slice(2)).join(',');
      const r = await nativeFetch(
        `https://push2.eastmoney.com/api/qt/ulist.np/get?secids=${secids}&fields=f2,f3,f4,f12,f14,f18&fltt=2`,
        { cache: 'no-store', signal }
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

  async function kline(code, days, signal) {
    const c = normCodes([code])[0];
    if (!c) return json([]);
    const n = Math.min(Math.max(Number(days) || 30, 1), 300);
    const r = await nativeFetch(
      `https://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param=${c},day,,,${n},qfq`,
      { cache: 'no-store', signal }
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
      .filter((x) => x.close != null && x.open != null && x.high != null && x.low != null);
    return json(out.slice(-n));
  }


  // ---- 每日推荐：东方财富全市场排行（热门 / 机会）----
  const EAST_FS = 'm:0+t:6,m:0+t:80,m:1+t:2,m:1+t:23';
  const EAST_FIELDS = 'f2,f3,f4,f5,f6,f8,f9,f10,f12,f13,f14,f18,f20,f21,f62';
  const eastNum = (v) => (Number.isFinite(parseFloat(v)) ? parseFloat(v) : null);
  const eastShort = (v) => {
    if (v == null || !Number.isFinite(v)) return '--';
    if (Math.abs(v) >= 1e8) return (v / 1e8).toFixed(2) + '亿';
    if (Math.abs(v) >= 1e4) return (v / 1e4).toFixed(2) + '万';
    return String(Math.round(v));
  };
  const eastTradable = (x) =>
    x && x.price > 0 && x.name && !/ST|退|^N|^C/.test(x.name) && /^(sh|sz)(0|3|6)/.test(x.code);

  async function eastRank(fid, pz, signal) {
    const url =
      'https://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=' +
      pz +
      '&po=1&np=1&fltt=2&invt=2&fid=' +
      fid +
      '&fs=' +
      encodeURIComponent(EAST_FS) +
      '&fields=' +
      EAST_FIELDS;
    const r = await nativeFetch(url, { cache: 'no-store', signal });
    if (!r.ok) throw new Error('东方财富排行 HTTP ' + r.status);
    const j = await r.json();
    const raw = (j.data && j.data.diff) || [];
    const rows = (Array.isArray(raw) ? raw : Object.values(raw)).map((d) => {
      const code = String(d.f12 || '');
      if (!/^\d{6}$/.test(code) || !/^[036]/.test(code)) return null;
      return {
        code: (Number(d.f13) === 1 ? 'sh' : 'sz') + code,
        name: String(d.f14 || '').replace(/\s+/g, ''),
        price: eastNum(d.f2),
        prev: eastNum(d.f18),
        change: eastNum(d.f4),
        changePct: eastNum(d.f3),
        amount: eastNum(d.f6),
        turnover: eastNum(d.f8),
        pe: eastNum(d.f9),
        volumeRatio: eastNum(d.f10),
        totalCap: eastNum(d.f20),
        floatCap: eastNum(d.f21),
        inflow: eastNum(d.f62),
        serverTime: Date.now(),
      };
    });
    return rows.filter(Boolean);
  }

  async function picks(signal) {
    const [hotRows, flowRaw] = await Promise.all([
      eastRank('f6', 80, signal),
      eastRank('f62', 120, signal).catch(() => []),
    ]);
    const flowRows = flowRaw.length ? flowRaw : hotRows;
    if (!hotRows.length) throw new Error('东方财富热门榜为空');

    const hot = [];
    const hotCodes = new Set();
    for (const x of hotRows.filter(eastTradable).sort((a, b) => (b.amount || 0) - (a.amount || 0))) {
      if (hotCodes.has(x.code)) continue;
      hotCodes.add(x.code);
      const pct = x.changePct == null ? '--' : (x.changePct > 0 ? '+' : '') + x.changePct.toFixed(2) + '%';
      hot.push({ ...x, tag: '热门', group: 'hot', reason: `成交额 ${eastShort(x.amount)} · 涨幅 ${pct}` });
      if (hot.length >= 5) break;
    }

    const strict = flowRows.filter(
      (x) =>
        eastTradable(x) &&
        x.changePct >= 1 &&
        x.changePct <= 6 &&
        x.turnover >= 3 &&
        x.turnover <= 15 &&
        x.amount >= 5e8 &&
        x.pe > 0 &&
        x.pe <= 80 &&
        x.floatCap >= 5e9 &&
        x.floatCap <= 3e11 &&
        x.inflow > 0
    );
    const relaxed = flowRows.filter(
      (x) =>
        eastTradable(x) &&
        x.changePct >= 0.5 &&
        x.changePct <= 8 &&
        x.turnover >= 2 &&
        x.turnover <= 20 &&
        x.amount >= 3e8 &&
        x.pe > 0 &&
        x.pe <= 120 &&
        x.floatCap >= 3e9 &&
        x.floatCap <= 5e11 &&
        x.inflow > 0
    );
    const score = (x) =>
      (x.inflow / x.amount) * 100 + (x.changePct || 0) * 0.6 + Math.min(x.turnover || 0, 10) * 0.2;
    const opps = [];
    const seen = new Set();
    for (const x of [...strict.sort((a, b) => score(b) - score(a)), ...relaxed.sort((a, b) => score(b) - score(a))]) {
      if (seen.has(x.code) || hotCodes.has(x.code)) continue;
      seen.add(x.code);
      const turnover = x.turnover == null ? '--' : x.turnover.toFixed(1) + '%';
      opps.push({
        ...x,
        tag: '机会',
        group: 'opp',
        reason: `主力净流入 ${eastShort(x.inflow)} · 换手 ${turnover}`,
      });
      if (opps.length >= 5) break;
    }
    // 过滤后不足 5 只时，用资金流入榜补足（仍排除 ST/新股/热门重复）
    for (const x of flowRows.filter(eastTradable).sort((a, b) => (b.inflow || 0) - (a.inflow || 0))) {
      if (opps.length >= 5) break;
      if (seen.has(x.code) || hotCodes.has(x.code)) continue;
      seen.add(x.code);
      const turnover = x.turnover == null ? '--' : x.turnover.toFixed(1) + '%';
      opps.push({
        ...x,
        tag: '机会',
        group: 'opp',
        reason: `主力净流入 ${eastShort(x.inflow)} · 换手 ${turnover}`,
      });
    }

    const now = new Date();
    const cn = new Date(now.getTime() + 8 * 3600e3);
    return json({
      date: cn.toISOString().slice(0, 10),
      updatedAt: now.toISOString(),
      hot,
      opportunities: opps,
    });
  }

  window.fetch = (input, init) => {
    const url = typeof input === 'string' ? input : (input && input.url) || '';
    // 透传 AbortSignal，保证业务侧的请求超时能真正生效
    const signal = init && init.signal;
    if (Object.prototype.hasOwnProperty.call(DATA_MAP, url)) {
      return nativeFetch(DATA_MAP[url], { cache: 'no-store', signal });
    }
    if (url.startsWith('/api/news/article')) return Promise.reject(new Error('离线快照不含全文'));
    if (url.startsWith('/api/news')) {
      return nativeFetch('./news.json', { cache: 'no-store', signal }).then((r) => {
        if (!r.ok) throw new Error('新闻快照不可用');
        return r;
      });
    }
    if (url.startsWith('/api/picks')) {
      return picks(signal);
    }
    if (url.startsWith('/api/quotes')) {
      const u = new URL(url, location.href);
      return quotes((u.searchParams.get('codes') || '').split(','), signal);
    }
    if (url.startsWith('/api/kline')) {
      const u = new URL(url, location.href);
      return kline(u.searchParams.get('code') || '', u.searchParams.get('days'), signal);
    }
    return nativeFetch(input, init);
  };
})();
