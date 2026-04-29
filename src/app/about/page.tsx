import Header from '@/components/Header';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-6 text-center">关于 STYK Ai</h1>

        <div className="space-y-6 text-gray-400 leading-relaxed">
          <section className="card-base p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3">🎯 我们的使命</h2>
            <p>
              STYK Ai 是一个精心整理的 AI 工具导航站。我们致力于帮助用户发现、对比和选择最适合自己的 AI 工具。
              在这个 AI 工具爆发式增长的时代，我们帮你节省筛选时间，找到真正好用的工具。
            </p>
          </section>

          <section className="card-base p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3">✨ 我们做什么</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-0.5">🔍</span>
                <span>精选收录全球最优质的 AI 工具</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-0.5">📊</span>
                <span>提供客观的评分和真实的优缺点分析</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-0.5">🔄</span>
                <span>每日更新，追踪最新的 AI 产品趋势</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-0.5">📝</span>
                <span>详细的工具对比和使用指南</span>
              </li>
            </ul>
          </section>

          <section className="card-base p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3">📬 联系我们</h2>
            <p className="mb-4">
              如果你有好用的 AI 工具想推荐给我们，或者有任何建议，欢迎通过以下方式联系：
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-500">📧 邮箱：</span>
                <a href="mailto:hello@stykai.com" className="text-cyan-400 hover:underline">
                  hello@stykai.com
                </a>
              </li>
              <li>
                <span className="text-gray-500">🔗 提交工具：</span>
                <Link href="/submit" className="text-cyan-400 hover:underline">
                  前往提交页面
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
        <p>© 2026 STYK Ai. All rights reserved.</p>
      </footer>
    </div>
  );
}
