import Link from 'next/link';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    summary: string | null;
    tags: string;
    coverImage: string | null;
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
      className="group block bg-white rounded-lg border-2 border-black overflow-hidden manga-border"
    >
      <div className="h-48 overflow-hidden bg-gray-100">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">无配图</div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-gray-500">{date}</span>
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-black text-white"
            >
              #{tag}
            </span>
          ))}
        </div>
        <h2 className="text-lg font-bold text-gray-900 group-hover:underline line-clamp-1">
          {post.title}
        </h2>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{summary}</p>
      </div>
    </Link>
  );
}
