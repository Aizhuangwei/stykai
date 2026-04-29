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

  // Random featured (4 random tools, refreshed on mount)
  const [recommendedTools] = useState(() => {
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
            {tools.length}+ AI 工具已收录
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 gradient-text-hero leading-tight">
            STYK Ai 导航站
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            探索并快速找到最好的 AI 工具。精选评测，真实对比，帮你做出最佳选择。
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
                placeholder="搜索 AI 工具名称、功能或标签..."
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
              <div className="text-xs text-gray-500 mt-1">AI 工具</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">{categories.length}</div>
              <div className="text-xs text-gray-500 mt-1">分类</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-green-400">每日</div>
              <div className="text-xs text-gray-500 mt-1">更新</div>
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
                精选 82+ 款最好用的 AI 工具，真实评分和优缺点分析
              </p>
              <span className="inline-block text-xs font-medium text-cyan-400 group-hover:translate-x-1 transition-transform">
                查看全部 →
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
                Claude、DeepSeek、Gemini 等 10+ 款替代方案全面对比
              </p>
              <span className="inline-block text-xs font-medium text-cyan-400 group-hover:translate-x-1 transition-transform">
                查看全部 →
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
                精选 10+ 款 AI 写作工具，ChatGPT、Claude、Grammarly 对比
              </p>
              <span className="inline-block text-xs font-medium text-cyan-400 group-hover:translate-x-1 transition-transform">
                查看全部 →
              </span>
            </div>
          </Link>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 pb-20">
        {/* Recommended Tools */}
        <section id="recommended" className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">🔥 推荐工具</h2>
            <span className="text-xs text-gray-500">为你精选</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="mb-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">📂 工具分类</h2>
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
                  <p>该分类暂无工具</p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Hot Tools */}
        <section id="hot" className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">⭐ 热门工具</h2>
            <span className="text-xs text-gray-500">按评分排序</span>
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
            📋 全部工具
            <span className="text-sm font-normal text-gray-500 ml-3">
              {activeCategory === 'all'
                ? `${filteredTools.length} 个工具`
                : `${filteredTools.length} 个 · ${categories.find(c => c.id === activeCategory)?.name || ''}`
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
              <p className="text-gray-500">没有找到匹配的工具</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-4 text-sm text-cyan-400 hover:underline"
              >
                清除筛选条件
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

      {/* Hot SEO Pages */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">🔥 热门 SEO 页面</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Link href="/seo/best-ai-tools" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">🏆 2025年最好用的 AI 工具推荐</h3>
            <p className="text-xs text-gray-500 mt-1">精选 82+ 款 AI 工具，真实评测排行</p>
          </Link>
          <Link href="/seo/ai-writing-tools" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">✍️ AI 写作工具推荐 Top 10</h3>
            <p className="text-xs text-gray-500 mt-1">ChatGPT、Claude、Grammarly 全面对比</p>
          </Link>
          <Link href="/seo/ai-tools-for-students" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">🎓 适合学生的 AI 工具推荐</h3>
            <p className="text-xs text-gray-500 mt-1">提升学习效率的必备 AI 工具</p>
          </Link>
          <Link href="/seo/ai-tools-for-business" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">🏢 企业级 AI 工具推荐</h3>
            <p className="text-xs text-gray-500 mt-1">提升业务效率的 AI 解决方案</p>
          </Link>
          <Link href="/seo/chatgpt-alternatives" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">🔄 ChatGPT 替代方案</h3>
            <p className="text-xs text-gray-500 mt-1">Claude、DeepSeek、Gemini 等替代工具</p>
          </Link>
          <Link href="/seo/midjourney-alternatives" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">🔄 Midjourney 替代方案</h3>
            <p className="text-xs text-gray-500 mt-1">DALL-E 3、Stable Diffusion 等图像工具</p>
          </Link>
          <Link href="/seo/notion-ai-alternatives" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">🔄 Notion AI 替代方案</h3>
            <p className="text-xs text-gray-500 mt-1">Mem.ai、Taskade 等 AI 知识管理工具</p>
          </Link>
          <Link href="/seo/chatgpt-vs-claude" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">⚔️ ChatGPT vs Claude 对比</h3>
            <p className="text-xs text-gray-500 mt-1">哪个 AI 助手更适合你？</p>
          </Link>
          <Link href="/seo/midjourney-vs-dalle" className="card-base p-4 group">
            <h3 className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">⚔️ Midjourney vs DALL-E 3 对比</h3>
            <p className="text-xs text-gray-500 mt-1">AI 图像生成工具怎么选？</p>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-lg font-bold gradient-text">STYK Ai</span>
            <nav className="flex gap-6 text-sm text-gray-500">
              <a href="/" className="hover:text-cyan-400 transition-colors">首页</a>
              <a href="/#categories" className="hover:text-cyan-400 transition-colors">分类</a>
              <a href="/submit" className="hover:text-cyan-400 transition-colors">提交工具</a>
              <a href="/about" className="hover:text-cyan-400 transition-colors">关于</a>
            </nav>
          </div>
          <div className="mt-6 text-center text-xs text-gray-600">
            © 2026 STYK Ai. 探索最好的 AI 工具。
          </div>
        </div>
      </footer>
    </div>
  );
}
