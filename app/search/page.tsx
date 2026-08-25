'use client';
import { useState } from 'react';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  summary: string | null;
  tags: string;
  createdAt: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/posts?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.posts || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2"><span>🔍</span> 搜索文章</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入关键词搜索..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-200 outline-none"
          />
          <button type="submit" disabled={loading || !query.trim()} className="px-6 py-3 bg-gray-1000 text-white rounded-xl hover:bg-gray-700 disabled:opacity-50 transition-colors">
            {loading ? '搜索中...' : '搜索'}
          </button>
        </div>
      </form>

      {searched && (
        <div>
          <p className="text-sm text-gray-400 mb-4">找到 {results.length} 篇相关文章</p>
          {results.length === 0 ? (
            <div className="text-center py-16 text-gray-400"><p>没有找到相关文章</p></div>
          ) : (
            <div className="space-y-3">
              {results.map((post) => (
                <Link key={post.id} href={`/post/${post.id}`} className="block p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all">
                  <h3 className="font-bold text-gray-900 hover:text-black">{post.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-1">{post.summary}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(post.createdAt).toLocaleDateString('zh-CN')}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
