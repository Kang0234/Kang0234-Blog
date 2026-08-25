'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/posts/${postId}`)
      .then((r) => r.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
        setSummary(data.summary || '');
        setTags(data.tags || '');
      })
      .finally(() => setLoading(false));
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.slice(0, 255),
          content,
          summary: summary.slice(0, 500),
          tags: tags.slice(0, 100),
        }),
      });
      if (res.ok) router.push(`/post/${postId}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-400">加载中...</div>;

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">编辑文章</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="文章标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={255}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-200 outline-none text-lg font-bold"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="标签（逗号分隔）"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            maxLength={100}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-200 outline-none text-sm"
          />
          <input
            type="text"
            placeholder="摘要（可选）"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            maxLength={500}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-200 outline-none text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setShowPreview(!showPreview)} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            {showPreview ? '编辑模式' : '预览模式'}
          </button>
        </div>
        {showPreview ? (
          <div className="min-h-[400px] p-6 bg-white rounded-lg border border-gray-200">
            <MarkdownRenderer content={content} />
          </div>
        ) : (
          <textarea
            placeholder="正文内容（支持 Markdown）"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={16}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-200 outline-none font-mono text-sm resize-y"
            required
          />
        )}
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">取消</button>
          <button type="submit" disabled={submitting} className="px-6 py-2 bg-gray-1000 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50">
            {submitting ? '保存中...' : '保存修改'}
          </button>
        </div>
      </form>
    </div>
  );
}
