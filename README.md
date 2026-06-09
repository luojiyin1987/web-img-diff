# Web Image Diff

基于 [pixelmatch](https://github.com/mapbox/pixelmatch) 的像素级图片差异对比工具。

## 技术栈

- React 18 + TypeScript
- Vite 6
- pixelmatch
- Cloudflare Pages

## 目录结构

```
src/
├── utils/imageDiff.ts          # pixelmatch 封装 + 颜色转换
├── hooks/useImageDiff.ts       # 核心对比逻辑 hook
├── components/
│   ├── ImageUploader.tsx       # 拖拽/点击上传
│   ├── ControlPanel.tsx        # 阈值、颜色、蒙版控制
│   ├── ImagePreview.tsx        # diff 结果展示
│   └── DiffStats.tsx           # 差异统计
├── App.tsx / App.css           # 主组件 + 布局
├── index.css                   # 全局样式
└── main.tsx                    # 入口
```

## 开发

```bash
npm install
npm run dev        # Vite 热更新开发服务器
npm run build      # TypeScript 检查 + 生产构建
npm run preview    # 预览构建产物
```

## 部署 (Cloudflare Pages)

```bash
npm run pages:deploy    # 构建 + 部署到 Cloudflare Pages
npm run pages:dev       # 本地模拟 Pages 环境
```

部署前确保已登录 Wrangler：

```bash
npx wrangler login
```
