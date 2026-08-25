'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.slice(0, 255),
          content,
          summary: summary.slice(0, 500),
          tags: tags.slice(0, 100),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        router.push(`/post/${data.id}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">写新文章</h2>
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
            placeholder="标签（逗号分隔，如：生活,技术）"
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
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {showPreview ? '编辑模式' : '预览模式'}
          </button>
        </div>
        {showPreview ? (
          <div className="min-h-[400px] p-6 bg-white rounded-lg border border-gray-200">
            <MarkdownRenderer content={content || '*预览为空，在编辑模式下输入内容*'} />
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
          <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            取消
          </button>
          <button type="submit" disabled={submitting} className="px-6 py-2 bg-gray-1000 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50">
            {submitting ? '发布中...' : '发布文章'}
          </button>
        </div>
      </form>
    </div>
  );
}
