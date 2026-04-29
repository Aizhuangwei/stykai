import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { tools, categories, getAlternatives, getCategoryName, getCategoryIcon } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';

interface Props { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return tools.map(t => ({ id: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tool = tools.find(t => t.id === id);
  if (!tool) return {};
  return {
    title: `${tool.name} 替代品推荐 | 2025年最佳替代工具 | STYK Ai`,
    description: `寻找 ${tool.name} 替代品？我们精选了同分类中的最佳替代工具，功能对比、优缺点分析，帮你找到更适合的选择。`,
    openGraph: {
      title: `${tool.name} 替代品推荐`,
      description: `寻找 ${tool.name} 的最佳替代工具，全面对比分析。`,
    },
  };
}

export default async function AlternativesPage({ params }: Props) {
  const { id } = await params;
  const tool = tools.find(t => t.id === id);
  if (!tool) notFound();

  const cat = categories.find(c => c.id === tool.category);
  const alternatives = getAlternatives(tool, 6);
  const count = alternatives.length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold gradient-text">STYK Ai</Link>
          <nav className="flex items-center gap-6 text-sm text-gray-400">
            <Link href={`/tools/${tool.id}`} className="hover:text-cyan-400 transition-colors">← 返回详情</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-cyan-400 transition-colors">首页</Link>
          <span>/</span>
          <Link href={`/tools/${tool.id}`} className="hover:text-cyan-400 transition-colors">{tool.name}</Link>
          <span>/</span>
          <span className="text-gray-300">替代品推荐</span>
        </div>

        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
            {tool.name} 的最佳替代品
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            {tool.name} 虽然是一款优秀的{cat ? cat.name : 'AI'}工具，但根据你的具体需求和预算，可能还有其他更合适的选择。
            {count > 0 ? `以下是我们为你精选的 ${count} 款 ${tool.name} 替代品。` : '目前暂无同类替代品推荐。'}
          </p>
        </div>

        {/* Why look for alternatives */}
        <section className="card-base p-6 mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span>🤔</span> 为什么要寻找替代品？
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tool.prosCons.cons.slice(0, 3).length > 0 ? (
              tool.prosCons.cons.slice(0, 3).map((item, i) => (
                <div key={i} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/30">
                  <div className="text-sm text-gray-200 font-medium mb-1">
                    {['❌', '⚠️', '💡'][i] || '•'}
                  </div>
                  <p className="text-sm text-gray-400">{item}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">暂无详细的不足说明，建议根据自身需求评估。</p>
            )}
          </div>
        </section>

        {/* Alternatives List */}
        {alternatives.length > 0 ? (
          <section className="space-y-6 mb-12">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span>🔄</span> 推荐替代工具
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {alternatives.map((alt, index) => {
                const altCat = categories.find(c => c.id === alt.category);
                return (
                  <div key={alt.id} className="card-base p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <Link href={`/tools/${alt.id}`} className="text-base font-semibold hover:text-cyan-400 transition-colors">
                          {alt.name}
                        </Link>
                        {alt.score && (
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-yellow-400 text-xs">★</span>
                            <span className="text-xs text-gray-500">{alt.score.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 shrink-0">{altCat?.icon} {altCat?.name}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{alt.shortDesc}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        alt.pricing === 'free' ? 'text-green-400 bg-green-500/10 border border-green-500/20' :
                        alt.pricing === 'freemium' ? 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20' :
                        'text-red-400 bg-red-500/10 border border-red-500/20'
                      }`}>
                        {alt.pricing === 'free' ? '免费' : alt.pricing === 'freemium' ? '免费+付费' : '付费'}
                      </span>
                      {alt.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs text-gray-600">{tag}</span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/tools/${alt.id}`}
                        className="text-xs px-3 py-1.5 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-colors"
                      >
                        查看详情
                      </Link>
                      <Link
                        href={`/tools/${alt.id}/review`}
                        className="text-xs px-3 py-1.5 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        评测
                      </Link>
                    </div>
                    {/* Comparison note */}
                    <div className="mt-3 pt-3 border-t border-gray-800">
                      <p className="text-xs text-gray-500">
                        <span className="text-cyan-400">替代建议：</span>
                        {alt.name} 与 {tool.name} 同属{getCategoryName(tool.category)}领域，{alt.score && tool.score
                          ? (alt.score >= tool.score ? `评分更高（${alt.score.toFixed(1)} vs ${tool.score.toFixed(1)}）` : `评分相近（${alt.score.toFixed(1)} vs ${tool.score.toFixed(1)}）`)
                          : '功能定位相似'}。
                        {alt.pricing === 'free' ? ' 完全免费使用。' : alt.pricing === 'freemium' ? ' 提供免费版本。' : ''}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <section className="text-center py-12 card-base mb-12">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-500">暂无同类替代工具</p>
            <Link href="/" className="inline-block mt-4 text-sm text-cyan-400 hover:underline">
              浏览全部 AI 工具 →
            </Link>
          </section>
        )}

        {/* Alternative SEO Pages */}
        <section className="mt-10 border-t border-gray-800 pt-8">
          <h2 className="text-xl font-bold mb-6">📖 更多替代方案推荐</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link href="/seo/chatgpt-alternatives" className="card-base p-4 group">
              <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">ChatGPT 替代方案</h3>
              <p className="text-xs text-gray-500 mt-1">寻找 ChatGPT 替代品，对比 Claude、DeepSeek 等</p>
            </Link>
            <Link href="/seo/midjourney-alternatives" className="card-base p-4 group">
              <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">Midjourney 替代方案</h3>
              <p className="text-xs text-gray-500 mt-1">寻找 Midjourney 替代品，对比 DALL-E 3、SD 等</p>
            </Link>
            <Link href="/seo/notion-ai-alternatives" className="card-base p-4 group">
              <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">Notion AI 替代方案</h3>
              <p className="text-xs text-gray-500 mt-1">寻找 Notion AI 替代品，对比 Mem.ai、Taskade 等</p>
            </Link>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mt-10">
          <h2 className="text-lg font-bold mb-4">🔗 相关页面</h2>
          <div className="flex flex-wrap gap-3">
            <Link href={`/tools/${tool.id}`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              📋 {tool.name} 详情
            </Link>
            <Link href={`/tools/${tool.id}/review`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              📝 {tool.name} 评测
            </Link>
            <Link href={`/tools/${tool.id}/best-for`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              🎯 {tool.name} 最佳场景
            </Link>
            <Link href="/" className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              🏠 全部工具
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-8 mt-16 text-center text-sm text-gray-500">
        <p>© 2026 STYK Ai. AI Tools Navigation.</p>
      </footer>
    </div>
  );
}
