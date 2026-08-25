import { prisma } from '@/lib/prisma';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

export const revalidate = 60;

interface Props { params: { tag: string } }

export default async function TagPage({ params }: Props) {
  const tag = decodeURIComponent(params.tag);
  const posts = await prisma.post.findMany({
    where: { tags: { contains: tag } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="animate-fade-in">
      <Link href="/tags" className="text-sm text-gray-400 hover:text-sakura-500 mb-4 inline-block">← 全部标签</Link>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span>🏷️</span> 标签：<span className="text-sakura-500">#{tag}</span>
        <span className="text-sm text-gray-400 font-normal">({posts.length} 篇)</span>
      </h1>
      {posts.length === 0 ? (
        <div className="text-center py-16 text-gray-400"><p>该标签下暂无文章</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      )}
    </div>
  );
}
