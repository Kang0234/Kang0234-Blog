import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><span>⚙️</span> 后台管理</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">👤 {session.user?.name}</span>
          <Link href="/" className="text-sm text-sakura-500 hover:underline">返回首页</Link>
        </div>
      </div>
      <div className="flex gap-4 mb-6 border-b border-gray-200 pb-3">
        <Link href="/admin" className="text-sm font-medium text-gray-700 hover:text-sakura-500">文章管理</Link>
        <Link href="/admin/new" className="text-sm font-medium text-gray-700 hover:text-sakura-500">写文章</Link>
      </div>
      {children}
    </div>
  );
}
