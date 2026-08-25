import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import CommentSection from '@/components/CommentSection';
import LoliImage from '@/components/LoliImage';
import Link from 'next/link';

export const revalidate = 30;

interface Props { params: { id: string } }

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({ select: { id: true } });
  return posts.map((p) => ({ id: p.id }));
}

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
      <Link href="/" className="text-sm text-gray-400 hover:text-sakura-500 mb-4 inline-block">← 返回首页</Link>

      <header className="mb-8">
        <div className="rounded-xl overflow-hidden mb-6 h-64">
          <LoliImage seed={post.id} alt={post.title} className="h-full" />
        </div>
        <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>📅 {date}</span>
          <span>👁️ {post.views} 阅读</span>
          {tags.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`} className="px-2 py-0.5 rounded-full bg-sakura-50 text-sakura-600 border border-sakura-200 hover:bg-sakura-100">
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
