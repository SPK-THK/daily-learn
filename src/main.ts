// 应用入口：先加载业务逻辑，再注册 Service Worker。
// 业务逻辑来自 legacy 构建产物的还原版本（src/app.js），行为与原版完全一致；
// 后续按页面逐步拆分到 src/modules/。
import './app.js';

// Service Worker 注册：从原 index.html 内联脚本迁移而来。
// 逻辑保持一致——已有 controller 时（更新后）自动刷新一次。
if ('serviceWorker' in navigator) {
  const hadController = !!navigator.serviceWorker.controller;
  let refreshing = false;

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || refreshing) return;
    refreshing = true;
    location.reload();
  });

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
