import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 创建管理员账号
  const hashedPassword = await bcrypt.hash('Kangmou0234@', 10);
  await prisma.user.upsert({
    where: { username: 'Kang0234' },
    update: { password: hashedPassword },
    create: { username: 'Kang0234', password: hashedPassword, role: 'admin' },
  });
  console.log('✅ 管理员账号已创建: Kang0234 / Kangmou0234@');

  // 10篇初始文章
  const posts = [
    {
      title: '我的博客配色灵感来源',
      tags: '设计,配色',
      summary: '博客的粉色主色调 #ff7ab6 是怎么来的？灵感来自樱花。',
      content: `博客的粉色主色调 **#ff7ab6** 是怎么来的？

灵感来自樱花——春天路边的樱花树，粉白相间的花瓣在阳光下微微透光。我把那份温柔搬进了代码：渐变标题、粉色光斑、奶油色卡片。

配色不一定来自设计规范，也可以来自生活里打动你的瞬间。你的博客是什么颜色？评论区聊聊。`,
    },
    {
      title: '周末爬山记',
      tags: '生活,爬山',
      summary: '周末去爬了家附近的小山，遇到橘猫，吃了烤红薯。',
      content: `周末去爬了家附近的小山。

清晨的山风很凉，路上遇到一只橘猫，它蹲在台阶上晒太阳，完全不理会路过的我。山顶的风景比想象中开阔，整个城市尽收眼底。

下山时买了路边老奶奶的烤红薯，甜到心里。有时候快乐就是这么简单——一座小山，一只猫，一个红薯。

下次想约朋友一起，把没看完的日落补上。`,
    },
    {
      title: 'boring……',
      tags: '',
      summary: '好无聊，水一篇。',
      content: `好无聊……不知道写点什么，但博客总要更新一下。

那就这样吧，水一篇，下次认真写。🐟`,
    },
    {
      title: 'Deepseek怎么这个能吃啊',
      tags: '',
      summary: '吐槽 Deepseek token 消耗太大，还涨价。',
      content: `我真服了，1天，处理几个网页的安全bug，能给我花100mtoken，而且最近还要涨价，难道我只能用中转站了吗。`,
    },
    {
      title: '你好，2026 的下半年',
      tags: '',
      summary: '2026 年过半，记录最近状态和下半年目标。',
      content: `转眼 2026 年过了一半，记录一下最近的状态。

**最近在做什么**

- 重做博客，从域名到主题全部翻新
- 折腾 Cloudflare 全家桶（Pages / Workers / D1 / R2 / AI）
- 攒了一堆想写的东西，慢慢补

**下半年目标**

- 保持更新频率，每周至少一篇
- 把评论区、后台这些基础设施打磨好
- 多记录生活，少一点拖延

新的一年，新的开始。加油！`,
    },
    {
      title: '关于二次元审美，我有话说',
      tags: '',
      summary: '二次元的魅力在于纯粹的表达。',
      content: `很多人不理解为什么喜欢二次元风格，我来聊聊。

二次元的魅力在于**纯粹的表达**：

- 明亮的配色让人心情好
- 樱花、星空这些元素自带浪漫
- 可爱的字体和贴纸风格，让网站有温度

**为什么博客要做得好看？**

因为博客是自己的小天地，每天都会打开。好看一点，心情就好一点，写东西的动力也足一点。

审美是主观的，但热爱是真实的。`,
    },
    {
      title: '分享 5 个让我效率翻倍的免费工具',
      tags: '',
      summary: '5个实测好用的免费工具。',
      content: `分享几个我一直在用的免费工具，都是实测好用的。

1. **Cloudflare Pages** — 免费静态托管，配合 GitHub 自动构建，部署网站零成本
2. **聚合图床** — 图片外链托管，写文章配图神器
3. **D1（Cloudflare 数据库）** — 免费 SQLite 数据库，评论、后台数据都能存
4. **Hexo** — 极简静态博客框架，写 markdown 就能发文章
5. **一言 API** — 404 页面、加载页都能用，增加点文艺感

工具不在多，顺手最重要。`,
    },
    {
      title: '折腾一晚上，把博客从 WordPress 搬到了 Hexo',
      tags: '',
      summary: '从 WordPress 搬到 Hexo 的踩坑记录。',
      content: `昨天还在用 WordPress，今天就切到 Hexo 了，说说过程。

**遇到的大坑**

1. WordPress 的文章导出，用自带的导出工具，格式要转成 markdown
2. 评论系统，原来用 Valine，换成自建评论（Cloudflare Worker + D1）
3. 图片，本地图片加载太慢，打算换图床 CDN

**现在的架构**

- 静态站：Cloudflare Pages（GitHub 仓库自动构建）
- 评论 + 后台：Cloudflare Worker + D1 + R2
- 音乐播放器：网易云歌单

折腾的过程虽然累，但很有成就感！`,
    },
    {
      title: '碎碎念：博客装修日记',
      tags: '',
      summary: '从 WordPress 换成 Hexo，博客装修记录。',
      content: `折腾了一整个晚上，终于把博客从 WordPress 换成了 Hexo。

**为什么要换？**

- 之前用 WordPress + Argon 主题，虽然好看，但服务器要钱、维护麻烦
- Hexo 是纯静态，部署到 Cloudflare Pages 免费、还快
- 二次元风主题自己定制起来很自由

**这次改了什么**

- 站名改成了 Kang0234の小破站，换上了萌字体
- 加了自定义 404 页面（一言 + 随机二次元背景）
- 底部加了运行计时和萌ICP备案

后续还想折腾评论区 AI 审核、文章自动发布，慢慢来。`,
    },
    {
      title: '2026 年度追番总结',
      tags: '动画,年度总结',
      summary: '2026 年追番总结，二次元永不毕业。',
      content: `2026 年追番总结：

这一年最惊喜的是几部原创动画，剧情完全不按套路出牌。日常番依然是我的舒适区，每周的快乐源泉。剧场版也看了不少，大银幕上的作画质量确实震撼。

顺便把今年写进博客的动画相关文章都翻了一遍，从推荐清单到观后感，都是满满的回忆。

明年继续，二次元永不毕业！`,
    },
  ];

  for (const post of posts) {
    const existing = await prisma.post.findFirst({ where: { title: post.title } });
    if (!existing) {
      await prisma.post.create({ data: post });
      console.log(`✅ 已创建文章: ${post.title}`);
    } else {
      console.log(`⏭️  文章已存在，跳过: ${post.title}`);
    }
  }

  console.log('\n🎉 种子数据导入完成！');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
