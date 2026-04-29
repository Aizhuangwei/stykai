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
    title: `Best ${tool.name} AI Tool 2026 - Features, Pricing & Review | StykAI`,
    description: `${tool.name} AI tool: ${tool.shortDesc}. Read complete review with pricing, features, pros & cons. Updated 2026.`,
    openGraph: {
      title: `Best ${tool.name} AI Tool 2026`,
      description: tool.shortDesc,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { id } = await params;
  const tool = tools.find(t => t.id === id);
  if (!tool) notFound();

  const cat = categories.find(c => c.id === tool.category);
  const related = tools.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 4);

  const pricingMap: Record<string, { label: string; color: string }> = {
    free: { label: 'Free', color: 'text-green-400 bg-green-500/10' },
    freemium: { label: 'Free + Premium', color: 'text-yellow-400 bg-yellow-500/10' },
    paid: { label: 'Paid', color: 'text-red-400 bg-red-500/10' },
  };

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description.slice(0, 200),
    applicationCategory: tool.category === 'code' ? 'DeveloperApplication' : 'Multimedia',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: tool.pricing === 'free' ? '0' : 'Varies', priceCurrency: 'USD' },
    url: tool.officialUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen">
        <header className="border-b border-gray-800">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold gradient-text">Stykai AI Navigation</Link>
            <Link href="/" className="text-sm text-gray-400 hover:text-cyan-400">← Back to Home</Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm text-gray-500">{cat?.icon} {cat?.name}</span>
              <span className={`text-xs px-3 py-1 rounded-full ${pricingMap[tool.pricing].color}`}>
                {pricingMap[tool.pricing].label}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-3 gradient-text">{tool.name}</h1>
            <p className="text-lg text-gray-400">{tool.shortDesc}</p>
          </div>

          {/* Description */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-3">Overview</h2>
            <p className="text-gray-400 leading-relaxed">{tool.description}</p>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-900/50 border border-green-500/20 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4 text-green-400">✅ Pros</h2>
              <ul className="space-y-2">
                {tool.prosCons.pros.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-400">
                    <span className="text-green-400 mt-1">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-900/50 border border-red-500/20 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4 text-red-400">❌ Cons</h2>
              <ul className="space-y-2">
                {tool.prosCons.cons.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-400">
                    <span className="text-red-400 mt-1">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Use Cases & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Use Cases</h2>
              <ul className="space-y-2">
                {tool.useCases.map((uc, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-400">
                    <span className="text-cyan-400">▸</span> {uc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Details</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {tool.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm">{tag}</span>
                ))}
              </div>
              {tool.score && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-yellow-400">★</span>
                  <span className="text-lg font-bold text-white">{tool.score}</span>
                  <span className="text-gray-500">/ 10</span>
                </div>
              )}
              <a
                href={tool.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl transition"
              >
                🚀 Visit Official Site →
              </a>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-4">Related Tools</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map(r => (
                  <Link
                    key={r.id}
                    href={`/tools/${r.id}`}
                    className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 card-hover"
                  >
                    <h3 className="font-semibold mb-1 group-hover:text-cyan-400">{r.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{r.shortDesc}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>

        <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
          <p>© 2026 StykAI. AI Tools Navigation.</p>
        </footer>
      </div>
    </>
  );
}
