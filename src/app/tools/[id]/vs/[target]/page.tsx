import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { tools, categories, getPricingLabel, outboundLink, getCategoryName } from '@/lib/tools';

interface Props { params: Promise<{ id: string; target: string }> }

export function generateStaticParams() {
  const pairs: { id: string; target: string }[] = [];
  for (const t1 of tools) {
    for (const t2 of tools) {
      if (t1.id < t2.id) {
        pairs.push({ id: t1.id, target: t2.id });
      }
    }
  }
  return pairs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, target } = await params;
  const toolA = tools.find(t => t.id === id);
  const toolB = tools.find(t => t.id === target);
  if (!toolA || !toolB) return {};
  return {
    title: `${toolA.name} vs ${toolB.name} 对比 | 哪个 AI 工具更好？ | STYK Ai`,
    description: `${toolA.name} 和 ${toolB.name} 全面对比：功能、定价、优缺点、评分、使用场景。帮你选择最适合的 AI 工具。`,
    openGraph: {
      title: `${toolA.name} vs ${toolB.name} 详细对比`,
      description: `${toolA.name}（${toolA.score}/10）vs ${toolB.name}（${toolB.score}/10）全面对比分析。`,
    },
  };
}

export default async function VsPage({ params }: Props) {
  const { id, target } = await params;
  const toolA = tools.find(t => t.id === id);
  const toolB = tools.find(t => t.id === target);
  if (!toolA || !toolB) notFound();

  const catA = categories.find(c => c.id === toolA.category);
  const catB = categories.find(c => c.id === toolB.category);
  const officialLinkA = outboundLink(toolA.officialUrl || toolA.url, `访问 ${toolA.name}`);
  const officialLinkB = outboundLink(toolB.officialUrl || toolB.url, `访问 ${toolB.name}`);

  // Decide winner for each category
  const scoreWinner = toolA.score && toolB.score ? (toolA.score >= toolB.score ? toolA : toolB) : null;
  const pricingComparison = () => {
    if (toolA.pricing === 'free' && toolB.pricing !== 'free') return toolA;
    if (toolB.pricing === 'free' && toolA.pricing !== 'free') return toolB;
    if (toolA.pricing === 'freemium' && toolB.pricing === 'paid') return toolA;
    if (toolB.pricing === 'freemium' && toolA.pricing === 'paid') return toolB;
    return null;
  };
  const pricingBetter = pricingComparison();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold gradient-text">STYK Ai</Link>
          <nav className="flex items-center gap-6 text-sm text-gray-400">
            <Link href={`/tools/${toolA.id}`} className="hover:text-cyan-400 transition-colors">← 返回</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-cyan-400 transition-colors">首页</Link>
          <span>/</span>
          <Link href={`/tools/${toolA.id}`} className="hover:text-cyan-400 transition-colors">{toolA.name}</Link>
          <span>/</span>
          <span className="text-gray-300">vs {toolB.name}</span>
        </div>

        {/* Hero */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
            {toolA.name} vs {toolB.name} 详细对比
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            从功能、定价、评分到使用场景，全面对比 {toolA.name} 和 {toolB.name}，
            帮你选择最适合你的 AI 工具。
          </p>
        </div>

        {/* Score Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className={`card-base p-6 text-center ${scoreWinner === toolA ? 'gradient-border' : ''}`}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <h2 className="text-xl font-bold">{toolA.name}</h2>
              <span className="text-xs text-gray-500">{catA?.icon} {catA?.name}</span>
            </div>
            <div className="text-5xl font-bold gradient-text mb-2">{toolA.score?.toFixed(1)}</div>
            <div className="text-sm text-gray-500">/ 10</div>
            <div className="mt-3">
              <span className={`text-xs px-3 py-1 rounded-full ${
                toolA.pricing === 'free' ? 'text-green-400 bg-green-500/10 border border-green-500/20' :
                toolA.pricing === 'freemium' ? 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20' :
                'text-red-400 bg-red-500/10 border border-red-500/20'
              }`}>
                {getPricingLabel(toolA.pricing)}
              </span>
            </div>
            {scoreWinner === toolA && (
              <div className="mt-3 text-sm text-green-400">🏆 综合评分胜出</div>
            )}
          </div>
          <div className={`card-base p-6 text-center ${scoreWinner === toolB ? 'gradient-border' : ''}`}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <h2 className="text-xl font-bold">{toolB.name}</h2>
              <span className="text-xs text-gray-500">{catB?.icon} {catB?.name}</span>
            </div>
            <div className="text-5xl font-bold gradient-text mb-2">{toolB.score?.toFixed(1)}</div>
            <div className="text-sm text-gray-500">/ 10</div>
            <div className="mt-3">
              <span className={`text-xs px-3 py-1 rounded-full ${
                toolB.pricing === 'free' ? 'text-green-400 bg-green-500/10 border border-green-500/20' :
                toolB.pricing === 'freemium' ? 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20' :
                'text-red-400 bg-red-500/10 border border-red-500/20'
              }`}>
                {getPricingLabel(toolB.pricing)}
              </span>
            </div>
            {scoreWinner === toolB && (
              <div className="mt-3 text-sm text-green-400">🏆 综合评分胜出</div>
            )}
          </div>
        </div>

        {/* Quick Comparison Table */}
        <section className="card-base overflow-hidden mb-10">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-lg font-bold">📊 基本信息对比</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900/50">
                  <th className="p-4 text-left text-gray-500 font-medium w-36">对比项</th>
                  <th className="p-4 text-left text-gray-200 font-medium">{toolA.name}</th>
                  <th className="p-4 text-left text-gray-200 font-medium">{toolB.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="p-4 text-gray-500">评分</td>
                  <td className="p-4 text-gray-200">
                    {toolA.score?.toFixed(1)} / 10
                    {toolA.score && toolB.score && toolA.score >= toolB.score && <span className="ml-2 text-xs text-green-400">★ 胜出</span>}
                  </td>
                  <td className="p-4 text-gray-200">
                    {toolB.score?.toFixed(1)} / 10
                    {toolA.score && toolB.score && toolB.score > toolA.score && <span className="ml-2 text-xs text-green-400">★ 胜出</span>}
                  </td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-4 text-gray-500">定价</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      toolA.pricing === 'free' ? 'text-green-400 bg-green-500/10 border border-green-500/20' :
                      toolA.pricing === 'freemium' ? 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20' :
                      'text-red-400 bg-red-500/10 border border-red-500/20'
                    }`}>
                      {getPricingLabel(toolA.pricing)}
                    </span>
                    {pricingBetter === toolA && <span className="ml-2 text-xs text-green-400">💰 更优</span>}
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      toolB.pricing === 'free' ? 'text-green-400 bg-green-500/10 border border-green-500/20' :
                      toolB.pricing === 'freemium' ? 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20' :
                      'text-red-400 bg-red-500/10 border border-red-500/20'
                    }`}>
                      {getPricingLabel(toolB.pricing)}
                    </span>
                    {pricingBetter === toolB && <span className="ml-2 text-xs text-green-400">💰 更优</span>}
                  </td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-4 text-gray-500">分类</td>
                  <td className="p-4 text-gray-200">{catA?.icon} {catA?.name || toolA.category}</td>
                  <td className="p-4 text-gray-200">{catB?.icon} {catB?.name || toolB.category}</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-4 text-gray-500">核心功能</td>
                  <td className="p-4 text-gray-200">{toolA.tags.slice(0, 4).join('、')}</td>
                  <td className="p-4 text-gray-200">{toolB.tags.slice(0, 4).join('、')}</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-4 text-gray-500">简要描述</td>
                  <td className="p-4 text-gray-400 text-xs">{toolA.shortDesc}</td>
                  <td className="p-4 text-gray-400 text-xs">{toolB.shortDesc}</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-500">官网</td>
                  <td className="p-4">
                    <a
                      {...officialLinkA}
                      className="text-cyan-400 hover:text-cyan-300 text-xs"
                    >
                      {toolA.name} →
                    </a>
                  </td>
                  <td className="p-4">
                    <a
                      {...officialLinkB}
                      className="text-cyan-400 hover:text-cyan-300 text-xs"
                    >
                      {toolB.name} →
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Pros & Cons Side by Side */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div>
            <div className="card-base p-5 mb-4 border-l-2 border-l-green-500/40">
              <h3 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                <span>✅</span> {toolA.name} 优点
              </h3>
              <ul className="space-y-2">
                {toolA.prosCons.pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="text-green-400 mt-0.5 shrink-0">•</span> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-base p-5 border-l-2 border-l-red-500/40">
              <h3 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                <span>❌</span> {toolA.name} 缺点
              </h3>
              <ul className="space-y-2">
                {toolA.prosCons.cons.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="text-red-400 mt-0.5 shrink-0">•</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="card-base p-5 mb-4 border-l-2 border-l-green-500/40">
              <h3 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                <span>✅</span> {toolB.name} 优点
              </h3>
              <ul className="space-y-2">
                {toolB.prosCons.pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="text-green-400 mt-0.5 shrink-0">•</span> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-base p-5 border-l-2 border-l-red-500/40">
              <h3 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                <span>❌</span> {toolB.name} 缺点
              </h3>
              <ul className="space-y-2">
                {toolB.prosCons.cons.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="text-red-400 mt-0.5 shrink-0">•</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Use Cases Comparison */}
        <section className="card-base p-6 mb-10">
          <h2 className="text-lg font-bold mb-4">🎯 使用场景建议</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-300">选择 {toolA.name} 如果你需要：</h3>
              <ul className="space-y-1.5">
                {toolA.useCases.map((uc, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="text-cyan-400 mt-0.5 shrink-0">▸</span> {uc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-300">选择 {toolB.name} 如果你需要：</h3>
              <ul className="space-y-1.5">
                {toolB.useCases.map((uc, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="text-cyan-400 mt-0.5 shrink-0">▸</span> {uc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Verdict */}
        <section className="card-base p-8 gradient-border mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>⚖️</span> 对比结论
          </h2>
          <p className="text-gray-400 leading-relaxed">
            {toolA.name}（评分 {toolA.score}/10）和 {toolB.name}（评分 {toolB.score}/10）都是优秀的 AI 工具，
            但它们各有侧重，适合不同的使用场景。
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-gray-800/50 rounded-lg">
              <h3 className="text-sm font-bold text-cyan-400 mb-1">{toolA.name} 最适合</h3>
              <p className="text-xs text-gray-400">
                {toolA.useCases.slice(0, 3).join('、')} 等场景
              </p>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-lg">
              <h3 className="text-sm font-bold text-cyan-400 mb-1">{toolB.name} 最适合</h3>
              <p className="text-xs text-gray-400">
                {toolB.useCases.slice(0, 3).join('、')} 等场景
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a
            {...officialLinkA}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-bold rounded-xl transition shadow-lg shadow-cyan-500/20"
          >
            🚀 访问 {toolA.name}
          </a>
          <a
            {...officialLinkB}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-400 hover:to-purple-300 text-black font-bold rounded-xl transition shadow-lg shadow-purple-500/20"
          >
            🚀 访问 {toolB.name}
          </a>
          <Link
            href={`/tools/${toolA.id}/review`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl transition border border-gray-700"
          >
            📝 查看 {toolA.name} 评测
          </Link>
        </div>

        {/* Internal Links */}
        <section className="border-t border-gray-800 pt-8">
          <h2 className="text-lg font-bold mb-4">🔗 相关页面</h2>
          <div className="flex flex-wrap gap-3">
            <Link href={`/tools/${toolA.id}`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              📋 {toolA.name} 详情
            </Link>
            <Link href={`/tools/${toolB.id}`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              📋 {toolB.name} 详情
            </Link>
            <Link href={`/tools/${toolA.id}/alternatives`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              🔄 {toolA.name} 替代品
            </Link>
            <Link href={`/tools/${toolB.id}/alternatives`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              🔄 {toolB.name} 替代品
            </Link>
            {toolA.category === toolB.category && (
              <Link href={`/category/${toolA.category}`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
                📂 更多 {getCategoryName(toolA.category)} 工具
              </Link>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-8 mt-16 text-center text-sm text-gray-500">
        <p>© 2026 STYK Ai. AI Tools Navigation.</p>
      </footer>
    </div>
  );
}
