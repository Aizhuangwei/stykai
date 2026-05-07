import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { tools, categories, getAlternatives, getRelatedTools, outboundLink, getPricingLabel } from '@/lib/tools';
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
    title: `${tool.name} Review | Features, Pricing, Pros & Cons | STYK Ai`,
    description: `${tool.name} In-depth review: features, pros & cons, pricing, use cases. Rating ${tool.score}/10.`,
    openGraph: {
      title: `${tool.name} Review - Features, Pricing, Pros & Cons`,
      description: `${tool.description.slice(0, 160)}`,
    },
  };
}

export default async function ReviewPage({ params }: Props) {
  const { id } = await params;
  const tool = tools.find(t => t.id === id);
  if (!tool) notFound();

  const cat = categories.find(c => c.id === tool.category);
  const alternatives = getAlternatives(tool);
  const related = getRelatedTools(tool, 4);
  const officialLink = outboundLink(tool.officialUrl || tool.url, `Visit ${tool.name} Official`);

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
          <span className="text-gray-300">Review</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">
          {tool.name} Review | Features, Pricing, Pros & Cons
        </h1>
        <p className="text-gray-400 mb-8 max-w-3xl">{tool.shortDesc}</p>

        {/* Quick Info Bar */}
        <div className="flex flex-wrap gap-4 mb-10 p-4 card-base">
          {tool.score && (
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★</span>
              <span className="font-bold text-lg">{tool.score.toFixed(1)}</span>
              <span className="text-gray-500 text-sm">/ 10</span>
            </div>
          )}
          <div className="text-sm text-gray-400">
            <span className="text-gray-500">Pricing：</span>
            <span className="text-gray-200">{getPricingLabel(tool.pricing)}</span>
          </div>
          {cat && (
            <div className="text-sm text-gray-400">
              <span className="text-gray-500">Categories：</span>
              <span className="text-gray-200">{cat.icon} {cat.name}</span>
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Features Overview */}
            <section className="card-base p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span>📖</span> Features Overview
              </h2>
              <p className="text-gray-400 leading-relaxed">{tool.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tool.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-800 text-gray-400 rounded-lg text-xs">{tag}</span>
                ))}
              </div>
            </section>

            {/* Pros */}
            <section className="card-base p-6 border-l-2 border-l-green-500/40">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-green-400">
                <span>✅</span> Pros
              </h2>
              {tool.prosCons.pros.length > 0 ? (
                <ul className="space-y-3">
                  {tool.prosCons.pros.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                      <span className="text-green-400 mt-0.5 shrink-0">•</span>
                      <div>
                        <strong className="text-gray-200">{item}</strong>
                        <p className="text-gray-500 text-xs mt-0.5">{tool.name} excels in this area, one of its core strengths.</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No reviews yet</p>
              )}
            </section>

            {/* Cons */}
            <section className="card-base p-6 border-l-2 border-l-red-500/40">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-red-400">
                <span>❌</span> Cons
              </h2>
              {tool.prosCons.cons.length > 0 ? (
                <ul className="space-y-3">
                  {tool.prosCons.cons.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                      <span className="text-red-400 mt-0.5 shrink-0">•</span>
                      <div>
                        <strong className="text-gray-200">{item}</strong>
                        <p className="text-gray-500 text-xs mt-0.5">Keep this limitation in mind when evaluating alternatives.</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No reviews yet</p>
              )}
            </section>

            {/* Pricing Info */}
            <section className="card-base p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span>💰</span> Pricing Info
              </h2>
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">Pricing Model: </span>
                  <span className={
                    tool.pricing === 'free' ? 'text-green-400 font-medium' :
                    tool.pricing === 'freemium' ? 'text-yellow-400 font-medium' :
                    'text-red-400 font-medium'
                  }>
                    {getPricingLabel(tool.pricing)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {tool.pricing === 'free'
                    ? `${tool.name} offers full functionality for free.`
                    : tool.pricing === 'freemium'
                    ? `${tool.name} offers a free version. Paid version unlocks more features and higher limits.`
                    : `${tool.name} requires a paid subscription, typically billed monthly or yearly.`
                  }
                </p>
              </div>
            </section>

            {/* Use Cases */}
            {tool.useCases.length > 0 && (
              <section className="card-base p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span>🎯</span> Use Cases
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tool.useCases.map((uc, i) => (
                    <div key={i} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/30">
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400">
                          {['🎨', '💻', '📝', '📊', '🎯', '📚', '🎬', '🎵', '🛠️', '🔬', '📈', '✍️', '🎮', '🏢', '🏫'][i % 15]}
                        </span>
                        <span className="text-gray-200 text-sm font-medium">{uc}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Using {tool.name} can efficiently handle {uc} tasks, improving quality and efficiency.
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Review Summary */}
            <section className="card-base p-6 gradient-border">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span>📝</span> Review Summary
              </h2>
              <p className="text-gray-400 leading-relaxed">
                {tool.name}  is an {tool.category === 'writing' ? 'AI Writing' :
                  tool.category === 'image' ? 'AI Image' :
                  tool.category === 'code' ? 'AI Coding' :
                  tool.category === 'video' ? 'AI Video' :
                  tool.category === 'audio' ? 'AI Audio' :
                  tool.category === 'marketing' ? 'AI Marketing' :
                  tool.category === 'productivity' ? 'AI Productivity' :
                  'AI'} tool rated {tool.score}/10/10.
                Key strengths include {tool.prosCons.pros.slice(0, 3).join(', ')}，
                Weaknesses: {tool.prosCons.cons.slice(0, 2).join(', ')}.
                Best for those needing {tool.useCases.slice(0, 3).join(', ')}.
              </p>
              <div className="mt-4">
                <a
                  {...officialLink}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-bold rounded-xl transition shadow-lg shadow-cyan-500/20"
                >
                  🚀 Visit {tool.name} Official
                </a>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA */}
            <div className="card-base p-6 gradient-border">
              <h3 className="text-sm font-bold text-gray-300 mb-4 uppercase tracking-wider">Try It Now</h3>
              <div className="space-y-3">
                <a
                  {...officialLink}
                  className="block w-full py-3 text-center bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition"
                >
                  🚀 Visit {tool.name}
                </a>
                <Link
                  href={`/tools/${tool.id}`}
                  className="block w-full py-3 text-center bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl transition border border-gray-700"
                >
                  📋 View Details
                </Link>
                <Link
                  href={`/tools/${tool.id}/alternatives`}
                  className="block w-full py-3 text-center text-sm text-gray-500 hover:text-gray-300 transition"
                >
                  🔄 View Alternatives →
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="card-base p-6">
              <h3 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Related Pages</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={`/tools/${tool.id}`} className="text-gray-400 hover:text-cyan-400 transition-colors">
                    📋 {tool.name} Details
                  </Link>
                </li>
                <li>
                  <Link href={`/tools/${tool.id}/alternatives`} className="text-gray-400 hover:text-cyan-400 transition-colors">
                    🔄 {tool.name} Alternatives
                  </Link>
                </li>
                <li>
                  <Link href={`/tools/${tool.id}/best-for`} className="text-gray-400 hover:text-cyan-400 transition-colors">
                    🎯 {tool.name} Best Use Cases
                  </Link>
                </li>
              </ul>
            </div>

            {/* Alternatives Preview */}
            {alternatives.length > 0 && (
              <div className="card-base p-6">
                <h3 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
                  🔄 Similar Tools
                </h3>
                <div className="space-y-3">
                  {alternatives.slice(0, 3).map(alt => (
                    <Link
                      key={alt.id}
                      href={`/tools/${alt.id}`}
                      className="block p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors group"
                    >
                      <div className="text-sm font-medium group-hover:text-cyan-400 transition-colors">{alt.name}</div>
                      {alt.score && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-yellow-400 text-xs">★</span>
                          <span className="text-xs text-gray-500">{alt.score.toFixed(1)}</span>
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/tools/${tool.id}/alternatives`}
                  className="block mt-3 text-xs text-cyan-500 hover:text-cyan-400 text-center"
                >
                  View All Alternatives →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Related Tools */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-6">📂 Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map(r => (
                <ToolCard key={r.id} tool={r} />
              ))}
            </div>
          </section>
        )}

        {/* Internal Links */}
        <section className="mt-12 border-t border-gray-800 pt-8">
          <h2 className="text-lg font-bold mb-4">🔗 Related Pages</h2>
          <div className="flex flex-wrap gap-3">
            <Link href={`/tools/${tool.id}`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              📋 {tool.name} Details
            </Link>
            <Link href={`/tools/${tool.id}/alternatives`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              🔄 {tool.name} Alternatives
            </Link>
            <Link href={`/tools/${tool.id}/best-for`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              🎯 {tool.name} Best Use Cases
            </Link>
            {cat && (
              <Link href={`/category/${cat.id}`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
                📂 More {cat.name} Tools
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
