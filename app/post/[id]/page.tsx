import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import CommentSection from '@/components/CommentSection';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface Props { params: { id: string } }

export default async function PostPage({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { comments: { orderBy: { createdAt: 'asc' } } },
  });

  if (!post) notFound();

  await prisma.post.update({ where: { id: params.id }, data: { views: { increment: 1 } } });

  const date = new Date(post.createdAt).toLocaleDateString('zh-CN');
  const tags = post.tags ? post.tags.split(',').filter(Boolean) : [];

  return (
    <article className="max-w-3xl mx-auto animate-fade-in">
      <Link href="/" className="text-sm text-gray-500 hover:text-black hover:underline mb-4 inline-block">← 返回首页</Link>

      <header className="mb-8">
        {post.coverImage && (
          <div className="rounded-lg overflow-hidden mb-6 h-64 border-2 border-black">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}
        <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
          <span>📅 {date}</span>
          <span>👁️ {post.views} 阅读</span>
          {tags.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`} className="px-2 py-0.5 rounded-full bg-black text-white hover:bg-gray-700">
              #{tag}
            </Link>
          ))}
        </div>
      </header>

      <MarkdownRenderer content={post.content} />

      <CommentSection postId={post.id} />
    </article>
  );
}
