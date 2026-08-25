'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ postId }: { postId: string }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('确定删除这篇文章吗？此操作不可恢复。')) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
      if (res.ok) router.refresh();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="text-red-500 hover:underline disabled:opacity-50"
    >
      {deleting ? '删除中...' : '删除'}
    </button>
  );
}
