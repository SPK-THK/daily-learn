import { defineConfig } from 'vite';

// base: './' —— GitHub Pages 部署在 /daily-learn/ 子路径下，必须用相对路径。
// 入口文件名固定为 assets/index.js，便于 sw.js 精确缓存。
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
});
