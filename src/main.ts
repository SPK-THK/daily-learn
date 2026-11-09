// 应用入口：先加载业务逻辑，再处理主题与 Service Worker。
// 业务逻辑来自 legacy 构建产物的还原版本（src/app.js），行为与原版一致；
// 后续按页面逐步拆分到 src/modules/。
import './app.js';

// ===== 主题：auto / light / dark =====
const THEME_KEY = 'dl.theme';
type ThemeMode = 'auto' | 'light' | 'dark';
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

function themeMode(): ThemeMode {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === 'light' || v === 'dark' ? v : 'auto';
  } catch {
    return 'auto';
  }
}

function resolvedTheme(): 'light' | 'dark' {
  const m = themeMode();
  return m === 'dark' || (m === 'auto' && darkQuery.matches) ? 'dark' : 'light';
}

function applyTheme() {
  const mode = themeMode();
  const theme = resolvedTheme();
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#0e1420' : '#3b5bfd');
  const icon = mode === 'auto' ? '🖥️' : theme === 'dark' ? '🌙' : '☀️';
  const label =
    mode === 'auto' ? '主题：跟随系统（点击切换）' : theme === 'dark' ? '主题：深色（点击切换）' : '主题：浅色（点击切换）';
  document.querySelectorAll<HTMLButtonElement>('.js-theme').forEach((b) => {
    b.textContent = icon;
    b.title = label;
    b.setAttribute('aria-label', label);
  });
}

function cycleTheme() {
  const order: ThemeMode[] = ['auto', 'light', 'dark'];
  const next = order[(order.indexOf(themeMode()) + 1) % order.length];
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {}
  applyTheme();
}

document.querySelectorAll<HTMLButtonElement>('.js-theme').forEach((b) => {
  b.addEventListener('click', cycleTheme);
});
darkQuery.addEventListener('change', () => {
  if (themeMode() === 'auto') applyTheme();
});
applyTheme();

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
