import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const revalidate = 60;

export default async function TagsPage() {
  const posts = await prisma.post.findMany({ select: { tags: true } });
  const tagCount = new Map<string, number>();
  posts.forEach((p) => p.tags.split(',').filter(Boolean).forEach((t) => tagCount.set(t, (tagCount.get(t) || 0) + 1)));
  const tags = Array.from(tagCount.entries()).sort((a, b) => b[1] - a[1]);

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2"><span>🏷️</span> 全部标签</h1>
      {tags.length === 0 ? (
        <div className="text-center py-16 text-gray-400"><p>暂无标签</p></div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map(([tag, count]) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm hover:border-sakura-400 hover:text-sakura-500 hover:bg-sakura-50 transition-all"
            >
              <span className="font-medium">#{tag}</span>
              <span className="text-gray-400 ml-1">{count}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
