import Link from 'next/link';
import LoliImage from './LoliImage';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    summary: string | null;
    tags: string;
    createdAt: Date | string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const date = new Date(post.createdAt).toLocaleDateString('zh-CN');
  const tags = post.tags ? post.tags.split(',').filter(Boolean) : [];
  const summary = post.summary || post.title;

  return (
    <Link
      href={`/post/${post.id}`}
      className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-sakura-300 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="h-48 overflow-hidden">
        <LoliImage seed={post.id} alt={post.title} className="h-full group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-gray-400">{date}</span>
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-sakura-50 text-sakura-600 border border-sakura-200"
            >
              #{tag}
            </span>
          ))}
        </div>
        <h2 className="text-lg font-bold text-gray-900 group-hover:text-sakura-500 transition-colors line-clamp-1">
          {post.title}
        </h2>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{summary}</p>
      </div>
    </Link>
  );
}
