// 应用入口：先加载账号隔离层，再加载业务逻辑，最后挂账号界面。
// 业务逻辑来自 legacy 构建产物的还原版本（src/app.js），行为与原版一致；
// 后续按页面逐步拆分到 src/modules/。
import './storage';
import './app.js';
import { initAccountUI } from './account';

// ===== 主题：auto / light / dark =====
const THEME_KEY = 'dl.theme';
type ThemeMode = 'auto' | 'light' | 'dark';
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

const THEME_ICONS: Record<ThemeMode, string> = {
  auto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17Z" fill="currentColor" stroke="none"/></svg>',
  light:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.2 5.2l2.1 2.1M16.7 16.7l2.1 2.1M18.8 5.2l-2.1 2.1M7.3 16.7l-2.1 2.1"/></svg>',
  dark: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/></svg>',
};

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
    ?.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#111111');
  const icon = THEME_ICONS[mode];
  const label =
    mode === 'auto' ? '主题：跟随系统（点击切换）' : theme === 'dark' ? '主题：深色（点击切换）' : '主题：浅色（点击切换）';
  document.querySelectorAll<HTMLButtonElement>('.js-theme').forEach((b) => {
    b.innerHTML = icon;
    b.title = label;
    b.setAttribute('aria-label', label);
  });
  document.dispatchEvent(new CustomEvent('dl:theme'));
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
initAccountUI();

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
