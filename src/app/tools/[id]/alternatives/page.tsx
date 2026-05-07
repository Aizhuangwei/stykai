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
    title: `${tool.name} Alternatives | Best Alternatives in 2026 | STYK Ai`,
    description: `Looking for ${tool.name}  alternatives? We curated the best tools in the same category with feature and pros & cons comparison.`,
    openGraph: {
      title: `${tool.name} AlternativesRecommended`,
      description: `Looking for ${tool.name}  best alternatives with comprehensive comparison.`,
    },
    alternates: {
      canonical: `/tools/${id}/alternatives`,
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
            <Link href={`/tools/${tool.id}`} className="hover:text-cyan-400 transition-colors">← Back to Details</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/tools/${tool.id}`} className="hover:text-cyan-400 transition-colors">{tool.name}</Link>
          <span>/</span>
          <span className="text-gray-300">AlternativesRecommended</span>
        </div>

        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
            {tool.name}  Best Alternatives
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            {tool.name}  is a great{cat ? cat.name : 'AI'} tool, but there may be better options for your needs and budget.
            {count > 0 ? `Here are ${count}  ${tool.name}  alternatives.` : 'No similar alternatives available yet.'}
          </p>
        </div>

        {/* Why look for alternatives */}
        <section className="card-base p-6 mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span>🤔</span> Why Look for Alternatives?
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
              <p className="text-sm text-gray-500">No detailed drawbacks available. Evaluate based on your needs.</p>
            )}
          </div>
        </section>

        {/* Alternatives List */}
        {alternatives.length > 0 ? (
          <section className="space-y-6 mb-12">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span>🔄</span> Recommended Alternatives
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
                        {alt.pricing === 'free' ? 'Free' : alt.pricing === 'freemium' ? 'Free+Paid' : 'Paid'}
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
                        View Details
                      </Link>
                      <Link
                        href={`/tools/${alt.id}/review`}
                        className="text-xs px-3 py-1.5 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Review
                      </Link>
                    </div>
                    {/* Comparison note */}
                    <div className="mt-3 pt-3 border-t border-gray-800">
                      <p className="text-xs text-gray-500">
                        <span className="text-cyan-400"> Recommendation: </span>
                        {alt.name} vs {tool.name}  both in the {getCategoryName(tool.category)} category, {alt.score && tool.score
                          ? (alt.score >= tool.score ? `higher rating (${alt.score.toFixed(1)} vs ${tool.score.toFixed(1)}）` : `similar rating (${alt.score.toFixed(1)} vs ${tool.score.toFixed(1)}）`)
                          : ' similar positioning'}.
                        {alt.pricing === 'free' ? ' Completely free.' : alt.pricing === 'freemium' ? ' Free version available.' : ''}
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
            <p className="text-gray-500">No similar alternatives found</p>
            <Link href="/" className="inline-block mt-4 text-sm text-cyan-400 hover:underline">
              Browse All AI Tools →
            </Link>
          </section>
        )}

        {/* Alternative SEO Pages */}
        <section className="mt-10 border-t border-gray-800 pt-8">
          <h2 className="text-xl font-bold mb-6">📖 More Alternative Recommendations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link href="/seo/chatgpt-alternatives" className="card-base p-4 group">
              <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">ChatGPT Alternatives</h3>
              <p className="text-xs text-gray-500 mt-1">Looking for ChatGPT alternatives? Compare Claude, DeepSeek and more</p>
            </Link>
            <Link href="/seo/claude-alternatives" className="card-base p-4 group">
              <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">Claude Alternatives</h3>
              <p className="text-xs text-gray-500 mt-1">Looking for Claude alternatives? Compare ChatGPT, Gemini and more</p>
            </Link>
            <Link href="/seo/cursor-alternatives" className="card-base p-4 group">
              <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">Cursor Alternatives</h3>
              <p className="text-xs text-gray-500 mt-1">Looking for Cursor alternatives? Compare Copilot, Windsurf and more</p>
            </Link>
            <Link href="/seo/midjourney-alternatives" className="card-base p-4 group">
              <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">Midjourney Alternatives</h3>
              <p className="text-xs text-gray-500 mt-1">Looking for Midjourney alternatives? Compare DALL-E 3, SD and more</p>
            </Link>
            <Link href="/seo/perplexity-alternatives" className="card-base p-4 group">
              <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">Perplexity Alternatives</h3>
              <p className="text-xs text-gray-500 mt-1">Looking for Perplexity alternatives? Compare You.com, Elicit and more</p>
            </Link>
            <Link href="/seo/notion-ai-alternatives" className="card-base p-4 group">
              <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">Notion AI Alternatives</h3>
              <p className="text-xs text-gray-500 mt-1">Looking for Notion AI alternatives? Compare Mem.ai, Taskade and more</p>
            </Link>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mt-10">
          <h2 className="text-lg font-bold mb-4">🔗 Related Pages</h2>
          <div className="flex flex-wrap gap-3">
            <Link href={`/tools/${tool.id}`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              📋 {tool.name} Details
            </Link>
            <Link href={`/tools/${tool.id}/review`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              📝 {tool.name} Review
            </Link>
            <Link href={`/tools/${tool.id}/best-for`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              🎯 {tool.name} Best Use Cases
            </Link>
            <Link href="/" className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              🏠 All Tools
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
