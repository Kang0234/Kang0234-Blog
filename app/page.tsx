import { prisma } from '@/lib/prisma';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  const allTags = new Set<string>();
  posts.forEach((p) => p.tags.split(',').filter(Boolean).forEach((t) => allTags.add(t)));

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="text-center py-12 mb-8">
        <h1 className="font-cute text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-gray-900 via-gray-500 to-gray-900 bg-clip-text text-transparent">
          kang0234 的博客
        </h1>
        <p className="text-gray-500 text-lg">记录生活 · 分享热爱 · 二次元角落</p>
        <div className="flex justify-center gap-4 mt-6">
          <Link href="/tags" className="px-5 py-2 bg-gray-900 text-white rounded-full text-sm hover:bg-gray-700 transition-colors">
            浏览标签
          </Link>
          <Link href="/about" className="px-5 py-2 border border-gray-300 text-gray-700 rounded-full text-sm hover:border-black hover:text-black transition-colors">
            关于我
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 文章列表 */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>📝</span> 最新文章
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          {posts.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-2">🌸</p>
              <p>还没有文章，去后台发一篇吧</p>
            </div>
          )}
        </div>

        {/* 侧边栏 */}
        <aside className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-bold mb-3 flex items-center gap-2"><span>🏷️</span> 标签云</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(allTags).map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
              {allTags.size === 0 && <span className="text-xs text-gray-400">暂无标签</span>}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-bold mb-3 flex items-center gap-2"><span>📊</span> 博客统计</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between"><span>文章数</span><span className="font-bold text-black">{posts.length}</span></div>
              <div className="flex justify-between"><span>标签数</span><span className="font-bold text-black">{allTags.size}</span></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
