'use client';
import { useState, useEffect } from 'react';

interface Comment {
  id: string;
  guestName: string;
  content: string;
  createdAt: string;
}

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/comments?postId=${postId}`)
      .then((r) => r.json())
      .then((data) => setComments(data.comments || []))
      .finally(() => setLoading(false));
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, guestName: name.slice(0, 50), content: content.slice(0, 2000) }),
      });
      if (res.ok) {
        const newComment = await res.json();
        setComments([...comments, newComment]);
        setContent('');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span>💬</span> 评论区 <span className="text-sm text-gray-400 font-normal">({comments.length})</span>
      </h3>

      <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 rounded-xl p-5 border border-gray-200">
        <div className="flex gap-3 mb-3">
          <input
            type="text"
            placeholder="你的昵称"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-sakura-400 focus:ring-2 focus:ring-sakura-100 outline-none text-sm"
          />
        </div>
        <textarea
          placeholder="说点什么吧..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={2000}
          rows={3}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-sakura-400 focus:ring-2 focus:ring-sakura-100 outline-none text-sm resize-none"
        />
        <div className="flex justify-between items-center mt-3">
          <span className="text-xs text-gray-400">{content.length}/2000</span>
          <button
            type="submit"
            disabled={submitting || !name.trim() || !content.trim()}
            className="px-5 py-2 bg-sakura-500 text-white rounded-lg text-sm font-medium hover:bg-sakura-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? '发送中...' : '发表评论'}
          </button>
        </div>
      </form>

      {loading ? (
        <p className="text-gray-400 text-sm">加载评论中...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-8">还没有评论，来抢沙发吧～</p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-sakura-100 flex items-center justify-center text-sm">
                  {c.guestName.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-800">{c.guestName}</span>
                <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString('zh-CN')}</span>
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-wrap pl-10">{c.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
