'use client';

import { useState, useMemo } from 'react';
import { tools, categories } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import CategoryNav from '@/components/CategoryNav';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    let list = tools;
    if (activeCategory !== 'all') {
      list = list.filter(t => t.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  const featuredTools = useMemo(() =>
    tools.filter(t => t.featured).sort((a, b) => (b.score || 0) - (a.score || 0)),
  []);

  const totalCount = tools.length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold gradient-text">Stykai AI Navigation</a>
          <nav className="flex gap-6 text-sm text-gray-400">
            <a href="#categories" className="hover:text-cyan-400">Categories</a>
            <a href="#featured" className="hover:text-cyan-400">Featured</a>
            <a href="#all" className="hover:text-cyan-400">All Tools</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 gradient-text">Best AI Tools Directory</h1>
          <p className="text-lg text-gray-400 mb-8">
            Curated collection of the best AI tools. Find the perfect tool for your needs.
          </p>
          
          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search AI tools..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3.5 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto text-center">
          <div className="bg-gray-900/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-cyan-400">{totalCount}+</div>
            <div className="text-xs text-gray-500 mt-1">AI Tools</div>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-purple-400">{categories.length}</div>
            <div className="text-xs text-gray-500 mt-1">Categories</div>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-green-400">Daily</div>
            <div className="text-xs text-gray-500 mt-1">Updates</div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold mb-6">📂 Tool Categories</h2>
        <CategoryNav
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </section>

      {/* Featured */}
      <section id="featured" className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold mb-6">🔥 Featured Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} featured />
          ))}
        </div>
      </section>

      {/* All Tools */}
      <section id="all" className="max-w-7xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold mb-6">
          📋 All Tools
          <span className="text-sm font-normal text-gray-500 ml-3">
            {activeCategory === 'all'
              ? `${filteredTools.length} tools`
              : `${filteredTools.length} in ${categories.find(c => c.id === activeCategory)?.name || ''}`
            }
          </span>
        </h2>
        {filteredTools.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <div className="text-4xl mb-4">🔍</div>
            <p>No tools found matching your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
        <p>© 2026 StykAI. Curated AI Tools Directory.</p>
      </footer>
    </div>
  );
}
