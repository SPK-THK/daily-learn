import { defineConfig } from 'vite';

// base: './' —— GitHub Pages 部署在 /daily-learn/ 子路径下，必须用相对路径。
// 入口文件名固定为 assets/index.js，便于 sw.js 精确缓存。
export default defineConfig({
  base: './',
  server: {
    // 某些编辑器/工具用临时目录做原子写入，chokidar 监听会报 EBUSY，直接忽略
    watch: { ignored: ['**/.*.tmpdir/**', '**/*.tmp'] },
  },
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
