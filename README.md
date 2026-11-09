# 每日进化 · 英语 × 股票（离线 PWA）

手机打开：<https://spk-thk.github.io/daily-learn/>

## 项目结构（v3：已工程化）

```
daily-learn/
├── index.html              # 页面骨架（无内联数据，约 4.5KB）
├── src/
│   └── main.ts             # 入口：Service Worker 注册
├── public/                 # 原样拷贝到 dist 的静态资源
│   ├── app.js              # 旧版业务逻辑（压缩产物，P2 逐步迁移到 src/modules）
│   ├── shim.js             # 适配层：把「后端接口」映射到静态数据 + 腾讯行情
│   ├── styles.css          # 样式（891 行，未压缩）
│   ├── sw.js               # Service Worker 离线缓存
│   ├── manifest.webmanifest
│   ├── data/               # ✨ 内容数据（从 index.html 内联抽出）
│   │   ├── wordbank.json   # 词库
│   │   ├── articles.json   # 双语短文
│   │   ├── quotes.json     # 每日一句
│   │   └── lessons.json    # 股票课程
│   ├── news.json           # 财经快讯快照（Actions 每小时更新）
│   ├── english/audio/      # 每日一句音频
│   └── icons/
└── .github/workflows/
    ├── deploy.yml          # 构建并发布到 GitHub Pages
    └── news.yml            # 每小时抓财经快讯
```

## 本地开发

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # 产物在 dist/
npm run preview    # 预览构建产物
```

## 数据从哪来

`app.js` 里请求的是 `/english/data/wordbank.json`、`/api/news`、`/api/quotes` 这类路径，
真实环境中并不存在这些接口。`public/shim.js` 在 `app.js` 之前接管 `window.fetch`：

| 原请求 | 实际行为 |
| --- | --- |
| `/english/data/wordbank.json` 等 4 个内容文件 | 读 `./data/*.json` |
| `/api/news` | 读 `./news.json`（网络优先，断网回退缓存） |
| `/api/news/article` | 拒绝（离线快照不含全文） |
| `/api/quotes` | 腾讯 `qt.gtimg.cn`，失败兜底东方财富 |
| `/api/kline` | 腾讯 `web.ifzq.gtimg.cn` 复权日 K |

所以纯静态托管也能看行情、读资讯，不依赖任何后端。

## 改内容（不需要碰代码）

| 想改什么 | 改哪个文件 |
| --- | --- |
| 单词 | `public/data/wordbank.json` |
| 双语短文 | `public/data/articles.json` |
| 每日一句 | `public/data/quotes.json` |
| 股票课程 | `public/data/lessons.json` |

### 数据格式

**wordbank.json**（数组）

```json
{
  "w": "bull market",
  "pos": "n.",
  "zh": "牛市",
  "ex": "A bull market lifts almost all stocks.",
  "exZh": "牛市几乎会推高所有股票。",
  "tag": "财经",
  "phrases": ["enter a bull market 进入牛市"],
  "tip": "bull=公牛，牛角自下而上顶 → 涨"
}
```

**articles.json** / **quotes.json** / **lessons.json** 均为 `{ "articles"|"quotes"|"lessons": [...] }` 结构，
字段见现有文件，逐条照抄即可。

## 部署

推送到 `main` 后，GitHub Actions 自动构建并发布到 Pages。
首次启用需在仓库 **Settings → Pages → Source** 选择 **GitHub Actions**。

## 数据存储

学习记录只保存在本机浏览器 localStorage（`dl.habit.log`、`dl.english.progress` 等），
不上传服务器；换设备用「使用教程 → 导出/导入」迁移。

## 更新日志

- **v3.2.0**：压缩产物还原为可编辑源码 `src/app.js` 并纳入 Vite 构建；修正页脚版本号；缓存升 3.2.0
- **v3.1.0**：内容扩充——150 词 / 10 篇短文 / 20 条金句 / 12 节课程；新增金句音频走有道 TTS 兜底
- **v3.0.0**：工程化重构——抽出内联数据、引入 Vite 构建、Actions 自动部署、SW 缓存外部数据
- **v2.x**：离线 PWA 版（数据内联在 index.html）
