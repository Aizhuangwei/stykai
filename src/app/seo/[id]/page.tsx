import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { tools, categories, getSeoPageData, getToolsByCategory, getCategoryName, getCategoryIcon } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';

interface Props { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return Object.keys(getSeoPageData()).map(id => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const pages = getSeoPageData();
  const page = pages[id as keyof typeof pages];
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
    },
  };
}

export default async function SeoPage({ params }: Props) {
  const { id } = await params;
  const pages = getSeoPageData();
  const page = pages[id as keyof typeof pages];
  if (!page) notFound();

  // Determine which tools to show based on the page type
  let pageTools = [...tools].sort((a, b) => (b.score || 0) - (a.score || 0));

  if (id === 'best-ai-tools') {
    // All tools, already sorted by score
  } else if (id === 'ai-writing-tools') {
    pageTools = getToolsByCategory('writing');
  } else if (id === 'ai-tools-for-students') {
    pageTools = tools.filter(t =>
      ['writing', 'code', 'search', 'productivity'].includes(t.category)
    ).sort((a, b) => (b.score || 0) - (a.score || 0));
  } else if (id === 'ai-tools-for-business') {
    pageTools = tools.filter(t =>
      ['marketing', 'productivity', 'writing', 'code'].includes(t.category)
    ).sort((a, b) => (b.score || 0) - (a.score || 0));
  } else if (id === 'chatgpt-alternatives') {
    const chatgpt = tools.find(t => t.id === 'chatgpt');
    pageTools = chatgpt
      ? tools.filter(t => t.id !== 'chatgpt' && t.category === chatgpt.category).sort((a, b) => (b.score || 0) - (a.score || 0))
      : [];
  } else if (id === 'midjourney-alternatives') {
    const mj = tools.find(t => t.id === 'midjourney');
    pageTools = mj
      ? tools.filter(t => t.id !== 'midjourney' && t.category === mj.category).sort((a, b) => (b.score || 0) - (a.score || 0))
      : [];
  } else if (id === 'notion-ai-alternatives') {
    pageTools = tools.filter(t =>
      ['writing', 'productivity'].includes(t.category) && t.id !== 'notion-ai'
    ).sort((a, b) => (b.score || 0) - (a.score || 0));
  } else if (id === 'chatgpt-vs-claude') {
    pageTools = [tools.find(t => t.id === 'chatgpt'), tools.find(t => t.id === 'claude')].filter(Boolean) as typeof tools;
  } else if (id === 'midjourney-vs-dalle') {
    pageTools = [tools.find(t => t.id === 'midjourney'), tools.find(t => t.id === 'dalle-3')].filter(Boolean) as typeof tools;
  }

  // All known SEO page IDs for internal links
  const allSeoIds = Object.keys(getSeoPageData());

  return (
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
          <span className="text-gray-300">{page.h1}</span>
        </div>

        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">{page.h1}</h1>
          <p className="text-lg text-gray-400 max-w-3xl">{page.intro}</p>
        </div>

        {/* Tool Grid */}
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pageTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
          {pageTools.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <p>暂无工具数据</p>
            </div>
          )}
        </section>

        {/* Related SEO Pages */}
        <section className="mt-16 border-t border-gray-800 pt-10">
          <h2 className="text-xl font-bold mb-6">📖 更多推荐</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {allSeoIds.filter(id2 => id2 !== id).slice(0, 6).map(id2 => {
              const p = pages[id2 as keyof typeof pages];
              return (
                <Link key={id2} href={`/seo/${id2}`} className="card-base p-4 group">
                  <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">{p.h1}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Popular Tool Links */}
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-6">🔗 热门工具直达</h2>
          <div className="flex flex-wrap gap-2">
            {tools.filter(t => (t.score || 0) >= 9).slice(0, 12).map(tool => (
              <Link
                key={tool.id}
                href={`/tools/${tool.id}`}
                className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors"
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-16 text-center text-sm text-gray-500">
        <p>© 2026 STYK Ai. AI Tools Navigation.</p>
      </footer>
    </div>
  );
}
