import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteButton from '@/components/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">文章列表 ({posts.length})</h2>
        <Link href="/admin/new" className="px-4 py-2 bg-sakura-500 text-white rounded-lg text-sm hover:bg-sakura-600 transition-colors">
          + 写新文章
        </Link>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">标题</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">标签</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">日期</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">阅读</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link href={`/post/${post.id}`} className="font-medium text-gray-900 hover:text-sakura-500 line-clamp-1">
                    {post.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-gray-500">{post.tags || '-'}</td>
                <td className="px-4 py-3 text-gray-500">{new Date(post.createdAt).toLocaleDateString('zh-CN')}</td>
                <td className="px-4 py-3 text-gray-500">{post.views}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/edit/${post.id}`} className="text-sakura-500 hover:underline mr-3">编辑</Link>
                  <DeleteButton postId={post.id} />
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr><td colSpan={5} className="text-center py-12 text-gray-400">还没有文章，点击右上角写一篇</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
