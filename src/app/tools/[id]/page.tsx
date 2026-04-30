import { notFound } from 'next/navigation';
import { tools, categories, generateFAQs, getRelatedTools, getAlternatives, getPricingLabel, outboundLink } from '@/lib/tools';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tool = tools.find(t => t.id === id);
  if (!tool) return {};
  return {
    title: `${tool.name} Review 2026: Features, Pricing, Pros & Cons (${tool.score}/10) | STYK Ai`,
    description: `Complete ${tool.name} review: ${tool.shortDesc}. Features, pricing, use cases, pros & cons. Rating ${tool.score}/10.`,
    openGraph: {
      title: `${tool.name} Review - ${tool.score}/10 | STYK Ai`,
      description: `${tool.shortDesc}. Pros: ${tool.prosCons.pros.slice(0, 2).join(', ')}.`,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { id } = await params;
  const tool = tools.find(t => t.id === id);
  if (!tool) notFound();

  const cat = categories.find(c => c.id === tool.category);
  const relatedByCategory = tools.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 4);
  const relatedTools = getRelatedTools(tool, 4);
  const alternatives = getAlternatives(tool, 3);
  const faqs = generateFAQs(tool);
  const officialLink = outboundLink(tool.officialUrl || tool.url, `${tool.name} 官网`);
  const freeTrialLink = outboundLink(tool.url, `${tool.name} 免费试用`);
  const pricingLink = outboundLink(tool.officialUrl || tool.url, `${tool.name} 定价`);

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
              {...officialLink}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-bold rounded-xl transition shadow-lg shadow-cyan-500/20"
            >
              🚀 访问 {tool.name} 官网
            </a>
            <a
              {...freeTrialLink}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium rounded-xl transition border border-gray-700"
            >
              🔗 免费试用
            </a>
            <a
              {...pricingLink}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900/50 hover:bg-gray-800 text-gray-400 font-medium rounded-xl transition border border-gray-800"
            >
              💰 查看定价
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
                  立即体验
                </h3>
                <div className="space-y-3">
                  <a
                    {...officialLink}
                    className="block w-full py-3 text-center bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition"
                  >
                    🚀 开始使用 {tool.name}
                  </a>
                  <a
                    {...freeTrialLink}
                    className="block w-full py-3 text-center bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl transition border border-gray-700"
                  >
                    🔗 免费试用
                  </a>
                  <Link
                    href={`/tools/${tool.id}/review`}
                    className="block w-full py-3 text-center bg-gray-900 hover:bg-gray-800 text-gray-400 rounded-xl transition border border-gray-800"
                  >
                    📝 查看详细评测
                  </Link>
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

          {/* Why Choose */}
          <section className="mt-12 card-base p-6 gradient-border">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>💡</span> 为什么选择 {tool.name}？
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="text-2xl mb-2">🎯</div>
                <h3 className="text-sm font-bold text-gray-200 mb-1">精准匹配需求</h3>
                <p className="text-xs text-gray-400">{tool.name} 擅长 {tool.useCases.slice(0, 2).join('、')}，能够精准满足你的核心需求。</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="text-2xl mb-2">⭐</div>
                <h3 className="text-sm font-bold text-gray-200 mb-1">优秀评分 {tool.score}/10</h3>
                <p className="text-xs text-gray-400">{tool.name} 获得高分评价。核心优势包括 {tool.prosCons.pros.slice(0, 2).join('、')}。</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="text-2xl mb-2">💪</div>
                <h3 className="text-sm font-bold text-gray-200 mb-1">广泛应用场景</h3>
                <p className="text-xs text-gray-400">适用于 {tool.useCases.slice(0, 4).join('、')} 等多个场景，满足不同使用需求。</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          {faqs.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span>❓</span> 关于 {tool.name} 的常见问题
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details key={i} className="card-base group open:border-cyan-500/30 transition-colors">
                    <summary className="p-4 cursor-pointer flex items-center justify-between text-sm font-medium text-gray-200 hover:text-cyan-400 transition-colors select-none">
                      <span>{faq.q}</span>
                      <svg className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-4 pb-4 text-sm text-gray-400 leading-relaxed border-t border-gray-800 pt-3">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

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
              <div className="mt-3 text-center">
                <Link href={`/tools/${tool.id}/alternatives`} className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors">
                  查看全部 {tool.name} 替代方案 →
                </Link>
              </div>
            </section>
          )}

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span>📂</span> 相关工具推荐
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedTools.map(r => (
                  <Link
                    key={r.id}
                    href={`/tools/${r.id}`}
                    className="card-base p-4 group"
                  >
                    <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors truncate">
                      {r.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{r.shortDesc}</p>
                    {r.score && (
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-yellow-400 text-xs">★</span>
                        <span className="text-xs text-gray-500">{r.score.toFixed(1)}</span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Internal Links */}
          <section className="mt-10 border-t border-gray-800 pt-8">
            <h2 className="text-lg font-bold mb-4">🔗 探索更多相关内容</h2>
            <div className="flex flex-wrap gap-3">
              <Link href={`/tools/${tool.id}/review`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
                📝 {tool.name} 详细评测
              </Link>
              <Link href={`/tools/${tool.id}/alternatives`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
                🔄 {tool.name} 替代品
              </Link>
              <Link href={`/tools/${tool.id}/best-for`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
                🎯 {tool.name} 最佳场景
              </Link>
              {cat && (
                <Link href={`/category/${cat.id}`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
                  📂 更多 {cat?.name} 工具
                </Link>
              )}
              <Link href="/seo/best-ai-tools" className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
                🏆 AI 工具推荐总榜
              </Link>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-8 mt-16 text-center text-sm text-gray-500">
          <p>© 2026 STYK Ai. AI Tools Navigation.</p>
        </footer>
      </div>
    </>
  );
}
