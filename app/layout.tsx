import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'kang0234 的博客',
  description: '记录生活 · 分享热爱 · 二次元角落',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col relative overflow-x-hidden">
        {/* 樱花飘落装饰 */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="sakura"
              style={{
                left: `${(i * 13 + 5) % 100}%`,
                animationDuration: `${8 + (i % 4) * 2}s`,
                animationDelay: `${i * 1.5}s`,
                width: `${8 + (i % 3) * 4}px`,
                height: `${8 + (i % 3) * 4}px`,
              }}
            />
          ))}
        </div>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
