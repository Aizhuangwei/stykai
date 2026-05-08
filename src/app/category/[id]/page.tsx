import { notFound } from 'next/navigation';
import Link from 'next/link';
import { tools, categories } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import type { Metadata } from 'next';

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const cat = categories.find(c => c.id === id);
  if (!cat) return {};
  return {
    title: `${cat.icon} Best ${cat.name} Tools 2026 - Reviews & Comparison | STYK Ai`,
    description: `Best ${cat.name} AI tools with ratings, pros & cons. Discover the best ${cat.name} tools.`,
    alternates: {
      canonical: `/category/${id}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  const cat = categories.find(c => c.id === id);
  if (!cat) notFound();

  const categoryTools = tools.filter(t => t.category === id);
  const sortedTools = [...categoryTools].sort((a, b) => (b.score || 0) - (a.score || 0));

  const otherCategories = categories.filter(c => c.id !== id);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold gradient-text">STYK Ai</Link>
          <Link href="/" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'STYK Ai', item: 'https://www.stykai.com' },
                { '@type': 'ListItem', position: 2, name: cat.name, item: `https://www.stykai.com/category/${id}` },
              ],
            }),
          }}
        />

        {/* ItemList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: `Best ${cat.name} AI Tools 2026`,
              description: `Best ${cat.name} AI tools with ratings, pros & cons.`,
              url: `https://www.stykai.com/category/${id}`,
              numberOfItems: sortedTools.length,
              itemListElement: sortedTools.map((tool, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'SoftwareApplication',
                  name: tool.name,
                  url: `https://www.stykai.com/tools/${tool.id}`,
                  description: tool.shortDesc,
                  applicationCategory: 'BusinessApplication',
                },
              })),
            }),
          }}
        />

        {/* Category header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{cat.icon}</span>
            <h1 className="text-3xl sm:text-4xl font-bold gradient-text">{cat.name}</h1>
          </div>
          <p className="text-gray-400 mt-2">
            {categoryTools.length} {cat.name} Tools
          </p>
        </div>

        {/* Tools grid */}
        {sortedTools.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📭</div>
            <h2 className="text-xl font-bold mb-2">No tools in this category yet</h2>
            <p className="text-gray-500 mb-6">We are working on adding more tools</p>
            <Link
              href="/"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl transition"
            >
              ← Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}

        {/* Other categories */}
        <section className="mt-16">
          <h2 className="text-xl font-bold mb-6">Other Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {otherCategories.map(c => (
              <Link
                key={c.id}
                href={`/category/${c.id}`}
                className="card-base p-4 text-center group"
              >
                <div className="text-2xl mb-1">{c.icon}</div>
                <div className="text-sm font-medium group-hover:text-cyan-400 transition-colors">
                  {c.name}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{c.count} tools</div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
        <p>© 2026 STYK Ai. AI Tools Navigation.</p>
      </footer>
    </div>
  );
}
