import { notFound } from 'next/navigation';
import { tools, categories } from '@/lib/tools';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tool = tools.find(t => t.id === id);
  if (!tool) return {};
  return {
    title: `${tool.name} AI 工具评测 - 功能、定价与优缺点 | STYK Ai`,
    description: `${tool.name} AI 工具完整评测：${tool.shortDesc}。包含功能介绍、使用案例、优缺点分析。`,
    openGraph: {
      title: `${tool.name} AI 工具评测`,
      description: tool.shortDesc,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { id } = await params;
  const tool = tools.find(t => t.id === id);
  if (!tool) notFound();

  const cat = categories.find(c => c.id === tool.category);
  const relatedByCategory = tools.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 4);
  const alternatives = [...tools]
    .filter(t => t.id !== tool.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const pricingMap: Record<string, { label: string; color: string }> = {
    free: { label: '免费', color: 'text-green-400 bg-green-500/10 border border-green-500/20' },
    freemium: { label: '免费+付费', color: 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20' },
    paid: { label: '付费', color: 'text-red-400 bg-red-500/10 border border-red-500/20' },
  };

  // Structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description.slice(0, 200),
    applicationCategory: tool.category === 'code' ? 'DeveloperApplication' : 'Multimedia',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: tool.pricing === 'free' ? '0' : 'Varies', priceCurrency: 'USD' },
    url: tool.officialUrl || tool.url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen">
        {/* Header */}
        <header className="border-b border-gray-800">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold gradient-text">STYK Ai</Link>
            <nav className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/" className="hover:text-cyan-400 transition-colors">← 返回首页</Link>
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-cyan-400 transition-colors">首页</Link>
            <span>/</span>
            {cat && (
              <>
                <Link href={`/category/${cat.id}`} className="hover:text-cyan-400 transition-colors">
                  {cat.icon} {cat.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-gray-300">{tool.name}</span>
          </div>

          {/* Hero */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {cat && <span className="text-sm text-gray-500">{cat.icon} {cat.name}</span>}
              <span className={`text-xs px-3 py-1 rounded-full ${pricingMap[tool.pricing].color}`}>
                {pricingMap[tool.pricing].label}
              </span>
              {tool.score && (
                <span className="flex items-center gap-1 text-sm">
                  <span className="text-yellow-400">★</span>
                  <span className="font-bold text-white">{tool.score.toFixed(1)}</span>
                  <span className="text-gray-500">/ 10</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">{tool.name}</h1>
            <p className="text-lg text-gray-400 max-w-3xl">{tool.shortDesc}</p>
          </div>

          {/* CTA Buttons (Conversion Points) */}
          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href={tool.officialUrl || tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-bold rounded-xl transition shadow-lg shadow-cyan-500/20"
            >
              🚀 访问官方网站
            </a>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium rounded-xl transition border border-gray-700"
            >
              🔗 开始免费试用
            </a>
            <a
              href={`/category/${tool.category}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900/50 hover:bg-gray-800 text-gray-400 font-medium rounded-xl transition border border-gray-800"
            >
              📂 同类工具
            </a>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left — Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <section className="card-base p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span>📖</span> 功能介绍
                </h2>
                <p className="text-gray-400 leading-relaxed">{tool.description}</p>
              </section>

              {/* Pros & Cons */}
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="card-base p-6 border-l-2 border-l-green-500/40">
                  <h2 className="text-base font-bold mb-3 text-green-400 flex items-center gap-2">
                    <span>✅</span> 优点
                  </h2>
                  <ul className="space-y-2">
                    {tool.prosCons.pros.length > 0 ? tool.prosCons.pros.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">•</span> {item}
                      </li>
                    )) : (
                      <li className="text-sm text-gray-500">暂无评价</li>
                    )}
                  </ul>
                </div>
                <div className="card-base p-6 border-l-2 border-l-red-500/40">
                  <h2 className="text-base font-bold mb-3 text-red-400 flex items-center gap-2">
                    <span>❌</span> 缺点
                  </h2>
                  <ul className="space-y-2">
                    {tool.prosCons.cons.length > 0 ? tool.prosCons.cons.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">•</span> {item}
                      </li>
                    )) : (
                      <li className="text-sm text-gray-500">暂无评价</li>
                    )}
                  </ul>
                </div>
              </section>

              {/* Use Cases */}
              {tool.useCases.length > 0 && (
                <section className="card-base p-6">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span>🎯</span> 使用场景
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {tool.useCases.map((uc, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-gray-800/80 text-gray-300 rounded-lg text-sm"
                      >
                        {uc}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right — Sidebar */}
            <div className="space-y-6">
              {/* Conversion Panel */}
              <div className="card-base p-6 gradient-border">
                <h3 className="text-sm font-bold text-gray-300 mb-4 uppercase tracking-wider">
                  立即开始
                </h3>
                <div className="space-y-3">
                  <a
                    href={tool.officialUrl || tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 text-center bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition"
                  >
                    🚀 开始使用 {tool.name}
                  </a>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 text-center bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl transition border border-gray-700"
                  >
                    🔗 免费试用
                  </a>
                  <a
                    href={`/submit`}
                    className="block w-full py-3 text-center text-sm text-gray-500 hover:text-gray-300 transition"
                  >
                    发现更好的工具？推荐给我们 →
                  </a>
                </div>
              </div>

              {/* Tags */}
              {tool.tags.length > 0 && (
                <div className="card-base p-6">
                  <h3 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
                    标签
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-800 text-gray-400 rounded-lg text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="card-base p-6">
                <h3 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
                  工具信息
                </h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">分类</dt>
                    <dd className="text-gray-300">{cat?.icon} {cat?.name}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">价格</dt>
                    <dd className="text-gray-300">{pricingMap[tool.pricing].label}</dd>
                  </div>
                  {tool.score && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">评分</dt>
                      <dd className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-gray-300">{tool.score.toFixed(1)}</span>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>

          {/* Alternatives Section */}
          {alternatives.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span>🔄</span> {tool.name} 替代工具推荐
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {alternatives.map(alt => (
                  <Link
                    key={alt.id}
                    href={`/tools/${alt.id}`}
                    className="card-base p-4 group"
                  >
                    <h3 className="font-semibold group-hover:text-cyan-400 transition-colors">
                      {alt.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{alt.shortDesc}</p>
                    {alt.score && (
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-yellow-400 text-xs">★</span>
                        <span className="text-xs text-gray-500">{alt.score.toFixed(1)}</span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related Tools */}
          {relatedByCategory.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span>📂</span> 同类工具推荐
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedByCategory.map(r => (
                  <Link
                    key={r.id}
                    href={`/tools/${r.id}`}
                    className="card-base p-4 group"
                  >
                    <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors truncate">
                      {r.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{r.shortDesc}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-8 mt-16 text-center text-sm text-gray-500">
          <p>© 2026 STYK Ai. AI Tools Navigation.</p>
        </footer>
      </div>
    </>
  );
}
