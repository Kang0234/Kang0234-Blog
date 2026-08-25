# kang0234 的博客

> 记录生活 · 分享热爱 · 二次元角落

基于 Next.js 14 + Prisma + Tailwind CSS 构建的全栈博客，黑白极简风 x 二次元元素。

## 功能特性

- 📝 文章发布/编辑/删除（Markdown 编辑器，实时预览）
- 🏷️ 标签分类、文章搜索
- 💬 评论系统（游客匿名留言，XSS 过滤）
- 🔐 后台管理（账号密码 + GitHub OAuth 登录）
- 🎨 黑白极简 + 二次元风格，樱花飘落动画
- 🖼️ 二次元随机图床（dmoe.cc / 洛丽图床 等多源降级）
- 📱 响应式设计，适配手机电脑
- 🛡️ 安全加固（CSP / XSS 过滤 / bcrypt / 登录限流 / JWT 鉴权）

## 技术栈

- **框架**: Next.js 14 (App Router) + TypeScript
- **样式**: Tailwind CSS
- **数据库**: Prisma ORM（开发 SQLite / 生产 PostgreSQL）
- **认证**: NextAuth.js（Credentials + GitHub OAuth）
- **Markdown**: react-markdown + remark-gfm
- **安全**: xss 过滤、bcrypt 密码哈希、CSP 响应头

## 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 复制环境变量
cp .env.example .env
# 编辑 .env，修改 NEXTAUTH_SECRET 为随机字符串

# 3. 初始化数据库
npx prisma db push

# 4. 导入种子数据（10篇文章 + 管理员账号）
npm run db:seed

# 5. 启动开发服务器
npm run dev
```

访问 http://localhost:3000

## 管理员账号

- **用户名**: `Kang0234`
- **密码**: `Kangmou0234@`

登录地址: `/login`

## 部署到 Vercel

### 方式一：一键部署（推荐）

1. 将本项目 push 到 GitHub
2. 打开 [vercel.com](https://vercel.com)，点击 "Add New Project"
3. 导入你的 GitHub 仓库
4. 配置环境变量（见下方）
5. 数据库选择 Vercel Postgres（免费额度够用），创建后会自动设置 `DATABASE_URL`
6. 点击 Deploy，等待构建完成

### 环境变量

| 变量 | 说明 | 必填 |
|------|------|------|
| `DATABASE_URL` | 数据库连接串（Vercel Postgres 自动配置） | ✅ |
| `NEXTAUTH_SECRET` | NextAuth 密钥，`openssl rand -base64 32` 生成 | ✅ |
| `NEXTAUTH_URL` | 你的 Vercel 域名，如 `https://your-blog.vercel.app` | ✅ |
| `GITHUB_ID` | GitHub OAuth Client ID（可选，用于 GitHub 登录） | ❌ |
| `GITHUB_SECRET` | GitHub OAuth Client Secret（可选） | ❌ |

### 部署后初始化数据

部署完成后，在 Vercel 项目的控制台运行一次种子命令，或者在本地连接生产数据库运行：

```bash
# 设置生产数据库连接后运行
npx prisma db push
npm run db:seed
```

也可以在 Vercel 的 "Deployments" → 最新部署 → "Redeploy" 时勾选 "Run build command"，在 build 命令中加入种子数据导入。

## GitHub OAuth 配置（可选）

1. 打开 https://github.com/settings/developers
2. 点击 "New OAuth App"
3. Homepage URL: `https://your-blog.vercel.app`
4. Authorization callback URL: `https://your-blog.vercel.app/api/auth/callback/github`
5. 创建后获取 Client ID 和 Client Secret，填入环境变量

## 项目结构

```
app/
  page.tsx              # 首页
  post/[id]/page.tsx    # 文章详情
  tags/                  # 标签页
  search/page.tsx        # 搜索页
  about/page.tsx         # 关于页
  login/page.tsx         # 登录页
  admin/                  # 后台管理
  api/                    # API 路由
components/              # 组件
lib/                     # 工具库
prisma/                  # 数据库模型 + 种子数据
```

## License

MIT
