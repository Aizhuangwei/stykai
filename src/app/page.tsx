'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { tools, categories } from '@/lib/tools';
import Header from '@/components/Header';
import ToolCard from '@/components/ToolCard';
import CategoryNav from '@/components/CategoryNav';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered tools
  const filteredTools = useMemo(() => {
    let list = tools;
    if (activeCategory !== 'all') {
      list = list.filter(t => t.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.shortDesc.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  // Hot tools (top 8 by score)
  const hotTools = useMemo(() =>
    [...tools].sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 8),
  []);

  // Random featured (6 random tools, refreshed on mount)
  const [featuredTools] = useState(() => {
    const shuffled = [...tools].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  });

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 py-20 sm:py-28 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-xs text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            {tools.length}+ AI Tools Curated
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 gradient-text-hero leading-tight">
            STYK Ai Navigation
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Discover and find the best AI tools quickly. Curated reviews, honest comparisons, helping you make the right choice.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search AI tools by name, feature or tag..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-5 py-4 bg-gray-900/80 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition text-base"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-10 flex justify-center gap-6 sm:gap-10 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400">{tools.length}+</div>
              <div className="text-xs text-gray-500 mt-1">AI Tools</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">{categories.length}</div>
              <div className="text-xs text-gray-500 mt-1">Categories</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-green-400">Daily</div>
              <div className="text-xs text-gray-500 mt-1">Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Entry Cards - Above Fold */}
      <section className="max-w-7xl mx-auto px-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/seo/best-ai-tools"
            className="card-base p-5 group relative overflow-hidden gradient-border"
          >
            <div className="relative z-10">
              <div className="text-2xl mb-2">🏆</div>
              <h3 className="font-bold text-base mb-1 group-hover:text-cyan-400 transition-colors">
                Best AI Tools
              </h3>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                82+ best AI tools with real ratings and pros & cons analysis
              </p>
              <span className="inline-block text-xs font-medium text-cyan-400 group-hover:translate-x-1 transition-transform">
                View All →
              </span>
            </div>
          </Link>

          <Link
            href="/seo/chatgpt-alternatives"
            className="card-base p-5 group relative overflow-hidden gradient-border"
          >
            <div className="relative z-10">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="font-bold text-base mb-1 group-hover:text-cyan-400 transition-colors">
                ChatGPT Alternatives
              </h3>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                10+ alternatives including Claude, DeepSeek, Gemini fully compared
              </p>
              <span className="inline-block text-xs font-medium text-cyan-400 group-hover:translate-x-1 transition-transform">
                View All →
              </span>
            </div>
          </Link>

          <Link
            href="/seo/ai-writing-tools"
            className="card-base p-5 group relative overflow-hidden gradient-border"
          >
            <div className="relative z-10">
              <div className="text-2xl mb-2">✍️</div>
              <h3 className="font-bold text-base mb-1 group-hover:text-cyan-400 transition-colors">
                AI Writing Tools
              </h3>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                10+ AI writing tools compared: ChatGPT, Claude, Grammarly & more
              </p>
              <span className="inline-block text-xs font-medium text-cyan-400 group-hover:translate-x-1 transition-transform">
                View All →
              </span>
            </div>
          </Link>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 pb-20">
        {/* Featured Tools */}
        <section id="featured" className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">🔥 Featured Tools</h2>
            <span className="text-xs text-gray-500">Handpicked for you</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="mb-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">📂 Categories</h2>
          <CategoryNav
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
            totalCount={tools.length}
          />

          {/* Category tool grid */}
          {activeCategory !== 'all' && (
            <div className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTools.map(tool => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
              {filteredTools.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p>No tools in this category yet</p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Hot Tools */}
        <section id="hot" className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">⭐ Top Rated</h2>
            <span className="text-xs text-gray-500">Sorted by score</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {hotTools.map((tool, i) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.id}`}
                className="card-base p-4 flex items-center gap-3 group"
              >
                <span className="text-2xl font-bold text-gray-600 w-8 text-center shrink-0">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium group-hover:text-cyan-400 transition-colors truncate">
                    {tool.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="text-xs text-gray-500">{tool.score?.toFixed(1)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* All Tools */}
        <section id="all-tools">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">
            📋 All Tools
            <span className="text-sm font-normal text-gray-500 ml-3">
              {activeCategory === 'all'
                ? `${filteredTools.length} tools`
                : `${filteredTools.length} · ${categories.find(c => c.id === activeCategory)?.name || ''}`
              }
            </span>
          </h2>

          {searchQuery && (
            <div className="mb-6">
              <CategoryNav
                categories={categories}
                active={activeCategory}
                onChange={setActiveCategory}
                totalCount={tools.length}
              />
            </div>
          )}

          {filteredTools.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-500">No matching tools found</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-4 text-sm text-cyan-400 hover:underline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* SEO Pages */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">🔥 Popular SEO Pages</h2>
        
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Top Alternatives</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <Link href="/seo/chatgpt-alternatives" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">🔄 ChatGPT Alternatives</h3>
            <p className="text-xs text-gray-500 mt-1">Claude, DeepSeek, Gemini & more</p>
          </Link>
          <Link href="/seo/claude-alternatives" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">🔄 Claude Alternatives</h3>
            <p className="text-xs text-gray-500 mt-1">ChatGPT, DeepSeek, Gemini & more</p>
          </Link>
          <Link href="/seo/cursor-alternatives" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">🔄 Cursor Alternatives</h3>
            <p className="text-xs text-gray-500 mt-1">Copilot, Windsurf, Zed AI & more</p>
          </Link>
          <Link href="/seo/midjourney-alternatives" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">🔄 Midjourney Alternatives</h3>
            <p className="text-xs text-gray-500 mt-1">DALL-E 3, Stable Diffusion & more</p>
          </Link>
          <Link href="/seo/perplexity-alternatives" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">🔄 Perplexity Alternatives</h3>
            <p className="text-xs text-gray-500 mt-1">You.com, Consensus, Elicit & more</p>
          </Link>
          <Link href="/seo/deepseek-alternatives" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">🔄 DeepSeek Alternatives</h3>
            <p className="text-xs text-gray-500 mt-1">ChatGPT, Claude, Gemini & more</p>
          </Link>
          <Link href="/seo/notion-ai-alternatives" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">🔄 Notion AI Alternatives</h3>
            <p className="text-xs text-gray-500 mt-1">Mem.ai, Taskade & more tools</p>
          </Link>
        </div>

        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Head-to-Head Comparisons</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <Link href="/seo/chatgpt-vs-claude" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">⚔️ ChatGPT vs Claude</h3>
            <p className="text-xs text-gray-500 mt-1">Which AI assistant wins?</p>
          </Link>
          <Link href="/seo/claude-vs-gemini" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">⚔️ Claude vs Gemini</h3>
            <p className="text-xs text-gray-500 mt-1">Claude vs Google Gemini compared</p>
          </Link>
          <Link href="/seo/cursor-vs-windsurf" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">⚔️ Cursor vs Windsurf</h3>
            <p className="text-xs text-gray-500 mt-1">AI code editor showdown</p>
          </Link>
          <Link href="/seo/midjourney-vs-dalle" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">⚔️ Midjourney vs DALL-E 3</h3>
            <p className="text-xs text-gray-500 mt-1">Which image generator wins?</p>
          </Link>
        </div>

        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Curated Collections</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link href="/seo/best-ai-tools" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">🏆 Best AI Tools 2026</h3>
            <p className="text-xs text-gray-500 mt-1">All tools curated with real reviews</p>
          </Link>
          <Link href="/seo/ai-writing-tools" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">✍️ AI Writing Tools Top 10</h3>
            <p className="text-xs text-gray-500 mt-1">ChatGPT, Claude & Grammarly compared</p>
          </Link>
          <Link href="/seo/ai-tools-for-students" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">🎓 AI Tools for Students</h3>
            <p className="text-xs text-gray-500 mt-1">Boost learning efficiency with AI</p>
          </Link>
          <Link href="/seo/ai-tools-for-business" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">🏢 AI Tools for Business</h3>
            <p className="text-xs text-gray-500 mt-1">Boost productivity with AI</p>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-lg font-bold gradient-text">STYK Ai</span>
            <nav className="flex gap-6 text-sm text-gray-500">
              <a href="/" className="hover:text-cyan-400 transition-colors">Home</a>
              <a href="/#categories" className="hover:text-cyan-400 transition-colors">Categories</a>
              <a href="/submit" className="hover:text-cyan-400 transition-colors">Submit Tool</a>
              <a href="/about" className="hover:text-cyan-400 transition-colors">About</a>
            </nav>
          </div>
          <div className="mt-6 text-center text-xs text-gray-600">
            &copy; 2026 STYK Ai. Discover the best AI tools.
          </div>
        </div>
      </footer>
    </div>
  );
}
