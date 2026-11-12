/* 离线缓存：首次打开后，断网/电脑关机也能打开应用；行情请求走网络，不做缓存。
   v3：内容数据已从 HTML 内联改为 ./data/*.json，必须一并缓存，否则断网后学习页空白。 */
const CACHE = 'daily-learn-3.5.1-r1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './shim.js',
  './assets/index.js',
  './manifest.webmanifest',
  './data/wordbank.json',
  './data/articles.json',
  './data/quotes.json',
  './data/lessons.json',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './english/audio/quotes/q0.mp3',
  './english/audio/quotes/q1.mp3',
  './english/audio/quotes/q2.mp3',
  './english/audio/quotes/q3.mp3',
  './english/audio/quotes/q4.mp3',
  './english/audio/quotes/q5.mp3',
  './english/audio/quotes/q6.mp3',
  './english/audio/quotes/q7.mp3',
  './english/audio/quotes/q8.mp3',
  './english/audio/quotes/q9.mp3'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // 行情接口不缓存
  // 新闻快照走网络优先：每次打开尽量取最新，断网再回退缓存
  if (url.pathname.endsWith('/news.json')) {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    }).catch(() => req.mode === 'navigate' ? caches.match('./index.html') : Response.error()))
  );
});
