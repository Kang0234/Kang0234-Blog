export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/60 backdrop-blur-sm mt-12">
      <div className="max-w-5xl mx-auto px-4 py-8 text-center">
        <p className="font-cute text-lg text-gray-800 mb-2">记录生活，分享热爱</p>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} kang0234 的博客 · 记录生活 · 分享热爱 · 二次元角落
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Powered by Next.js · 黑白极简 x 二次元
        </p>
      </div>
    </footer>
  );
}
