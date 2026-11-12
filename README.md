# 每日进化 · 英语 × 股票（离线 PWA）

手机打开：<https://spk-thk.github.io/daily-learn/>

## 功能

- **今日**：单词 / 阅读 / 复盘三项打卡，连续天数与 7 日节奏
- **股票**：三大指数概览、自选行情、Canvas K 线（蜡烛/折线、MA5/10/20、成交量、十字光标、全屏、30/60/120 日）、12 节入门课程与小测验
- **英语**：遗忘曲线背单词、双语阅读、每日金句、词库、错词本、听写测试（看中文 / 听发音）
- **资讯**：财经快讯（Actions 每小时更新）
- **统计**：8 周打卡热力图、词汇盒位分布、成就墙
- **账号**：本机多账号（昵称 / 头像 / 可选 PIN），单词、阅读、自选股、统计按账号隔离，旧数据自动迁移
- **主题**：黑白配色（柔和浅色 / 炭黑深色 / 跟随系统三档），本地记忆；底部图标与 PWA 图标均为黑白

## 项目结构（v3：已工程化）

```
daily-learn/
├── index.html              # 页面骨架（无内联数据，含首屏主题脚本）
├── src/
│   ├── app.js              # 业务逻辑（legacy 还原版，逐步迁移到 src/modules）
│   ├── storage.ts          # 本机多账号存储隔离 + 旧数据迁移
│   ├── account.ts          # 账号弹窗、切换、PIN
│   └── main.ts             # 入口：主题切换 + Service Worker 注册
├── public/                 # 原样拷贝到 dist 的静态资源
│   ├── shim.js             # 适配层：把「后端接口」映射到静态数据 + 腾讯行情
│   ├── styles.css          # 样式（约 1400 行，含黑白双主题变量）
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

学习记录只保存在本机浏览器 localStorage（`dl.habit.log`、`dl.english.progress`、
`dl.english.spell` 等），不上传服务器；换设备用「使用教程 → 导出/导入」迁移。
主题偏好存在 `dl.theme`（`auto` / `light` / `dark`）。账号列表与当前账号存在 `dl.accounts` / `dl.account.active`，每个账号的数据在 `dl.a.<账号id>.*` 下。

## 更新日志

- **v3.5.1**：教程补充 K 线工具栏与账号说明；新增忘记 PIN 的重置入口（保留学习数据）；优化 320px 窄屏排版
- **v3.5.0**：K 线重做为 Canvas 渲染（精确蜡烛/影线/成交量、价格与日期刻度、十字光标浮层），新增周期/均线/形态/成交量/全屏工具栏；新增本机多账号（头像、可选 PIN、数据隔离、旧数据自动迁移）；修复股票页启动时自动完成「复盘自选股」打卡
- **v3.4.0**：黑白主题——全站改为黑/白/灰配色，蓝紫渐变改为纯黑，热力图/盒位/均线改用灰阶区分；底部 Tab 与主题按钮换成黑白线性 SVG 图标；PWA 图标重绘为黑白；红绿仅保留股票涨跌与答题对错等语义场景
- **v3.3.0**：深色模式（跟随系统 / 浅色 / 深色，首屏无闪白）；股票页新增三大指数条、蜡烛图 + MA5/10/20 + 成交量、30/60/120 日周期切换；英语新增错词本与听写测试（看中文 / 听发音），答错自动累计、可一键专项复习
- **v3.2.0**：压缩产物还原为可编辑源码 `src/app.js` 并纳入 Vite 构建；修正页脚版本号；缓存升 3.2.0
- **v3.1.0**：内容扩充——150 词 / 10 篇短文 / 20 条金句 / 12 节课程；新增金句音频走有道 TTS 兜底
- **v3.0.0**：工程化重构——抽出内联数据、引入 Vite 构建、Actions 自动部署、SW 缓存外部数据
- **v2.x**：离线 PWA 版（数据内联在 index.html）
