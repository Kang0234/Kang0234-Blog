import { getAvatar } from '@/lib/loli-image';

export default function AboutPage() {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-gray-300 bg-white">
          <img src={getAvatar('kang0234')} alt="kang0234" className="w-full h-full" />
        </div>
        <h1 className="font-cute text-3xl font-bold">kang0234</h1>
        <p className="text-gray-500 mt-1">记录生活 · 分享热爱 · 二次元角落</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <section>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><span>👋</span> 关于我</h2>
          <p className="text-gray-600 leading-relaxed">
            一个热爱技术和二次元的普通开发者。平时喜欢折腾博客、玩 Cloudflare 全家桶、追番。
            这个博客是我的小天地，记录生活、分享技术、存放二次元审美。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><span>🛠️</span> 技术栈</h2>
          <div className="flex flex-wrap gap-2">
            {['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'Cloudflare', 'Node.js', 'Hexo'].map((tech) => (
              <span key={tech} className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><span>📖</span> 兴趣爱好</h2>
          <ul className="text-gray-600 space-y-1">
            <li>• 追番、二次元文化</li>
            <li>• 折腾博客和各种技术玩意</li>
            <li>• 爬山、摄影</li>
            <li>• 收集好看的二次元壁纸</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><span>📧</span> 联系方式</h2>
          <p className="text-gray-600">欢迎在评论区留言交流，或者通过博客后台联系我。</p>
        </section>
      </div>
    </div>
  );
}
