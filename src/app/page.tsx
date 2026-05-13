
"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";

export default function Home() {
  const [tools, setTools] = useState<any[]>([]);
  const [cats, setCats] = useState<any[]>([]);
  const [picks, setPicks] = useState<any[]>([]);
  const [trending, setTrending] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/tools").then(r=>r.json()), fetch("/api/categories").then(r=>r.json()),
      fetch("/api/topPicks").then(r=>r.json()), fetch("/api/trending").then(r=>r.json()),
      fetch("/api/news").then(r=>r.json()),
    ]).then(([t,c,tp,tr,n]) => { setTools(t); setCats(c); setPicks(tp); setTrending(tr); setNews(n); });
  }, []);

  const bs = (p: string) => p === "free" ? "bg-emerald-50 text-emerald-700" : p === "freemium" ? "bg-indigo-50 text-indigo-700" : "bg-violet-50 text-violet-700";
  const bt = (p: string) => p==="free"?"Free":p==="freemium"?"Free+Paid":"Paid";

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                <span className="text-indigo-600">{tools.length}+</span> AI Tools<br/>
                <span className="text-gray-600 font-normal text-xl">Curated, reviewed & ready to use</span>
              </h1>
              <p className="text-lg text-gray-500 mb-8">Discover and find the best AI tools quickly. Curated reviews, honest comparisons.</p>
              <form action="/search" method="GET" className="flex gap-3 mb-4">
                <input name="q" placeholder="Search AI tools..." className="flex-1 px-5 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm"/>
                <button type="submit" className="px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">Search</button>
              </form>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="text-gray-400 text-xs font-medium">Hot:</span>
                {["ChatGPT","Claude","Midjourney","Copilot","Cursor","DeepSeek"].map(t => (
                  <a key={t} href={`/search?q=${t}`} className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 text-xs">{t}</a>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-indigo-100 to-white rounded-2xl p-6">
                <div className="grid grid-cols-2 gap-3">
                  {tools.slice(0,6).map((t:any) => (
                    <div key={t.id} className="bg-white/80 rounded-xl p-4 border border-gray-100">
                      <div className="text-2xl mb-1">{t.icon}</div>
                      <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                      <div className="text-xs text-gray-400">★ {t.rating}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <div><h2 className="text-2xl font-bold text-gray-900">🏆 Best AI Tools</h2><p className="text-gray-500 text-sm mt-1">Top-rated picks with real pros & cons</p></div>
            <a href="/search" className="text-sm text-indigo-600 font-medium">View All →</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {picks.map((t:any) => (
              <a key={t.id} href={`/tool/${t.slug}`} className="tool-card p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
                <div className="flex justify-between mb-3">
                  <div className="text-3xl">{t.icon}</div>
                  {t.badge && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">{t.badge}</span>}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-indigo-600">{t.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{t.tagline}</p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 text-sm">★ {t.rating}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${bs(t.pricing)}`}>{bt(t.pricing)}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between mb-8">
            <div><h2 className="text-2xl font-bold text-gray-900">📂 Categories</h2><p className="text-gray-500 text-sm mt-1">Browse by category</p></div>
            <a href="/categories" className="text-sm text-indigo-600 font-medium">View All →</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cats.map((c:any) => (
              <a key={c.id} href={`/category/${c.slug}`} className="tool-card p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className="text-3xl mb-2">{c.icon}</div>
                <div className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600">{c.name}</div>
                <div className="text-xs text-gray-400 mt-1">{c.count} tools</div>
              </a>
            ))}
          </div>
        </section>

        <section className="bg-white py-12 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between mb-6">
              <div><h2 className="text-2xl font-bold text-gray-900">🔥 Trending Now</h2><p className="text-gray-500 text-sm mt-1">Fastest-growing this month</p></div>
              <a href="/search" className="text-sm text-indigo-600 font-medium">View All →</a>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
              {trending.map((t:any) => (
                <a key={t.id} href={`/tool/${t.slug}`} className="tool-card p-4 flex items-center gap-3 flex-shrink-0 w-56 hover:shadow-md group">
                  <div className="text-2xl">{t.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600">{t.name}</div>
                    <div className="flex items-center gap-2"><span className="text-amber-400 text-xs">★ {t.rating}</span><span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${bs(t.pricing)}`}>{bt(t.pricing)}</span></div>
                  </div>
                  <span className={`text-xs font-medium ${t.up ? "text-emerald-600" : "text-red-500"}`}>{t.trend}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between mb-8">
            <div><h2 className="text-2xl font-bold text-gray-900">📰 Latest Insights</h2><p className="text-gray-500 text-sm mt-1">AI news & analysis</p></div>
            <a href="/search" className="text-sm text-indigo-600 font-medium">View All →</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {news.map((n:any) => (
              <a key={n.id} href="#" className="tool-card p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <div className="text-xs font-medium text-indigo-600 mb-2">{n.category}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{n.title}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{n.description}</p>
                <div className="flex justify-between text-xs text-gray-400"><span>{n.date}</span><span>{n.readTime}</span></div>
              </a>
            ))}
          </div>
        </section>

        <section className="bg-indigo-600 py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Find Your Next AI Tool</h2>
            <p className="text-indigo-200 mb-8 text-lg">Join thousands discovering the best AI tools. Updated daily.</p>
            <form action="/search" method="GET" className="flex justify-center gap-3 max-w-md mx-auto">
              <input name="q" placeholder="Search tools..." className="flex-1 px-5 py-3 rounded-xl border border-indigo-400/30 bg-white/10 text-white placeholder-indigo-200 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"/>
              <button type="submit" className="px-6 py-3 rounded-xl bg-white text-indigo-600 text-sm font-semibold hover:bg-indigo-50">Search</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">S</div>
                <span className="text-lg font-bold text-white">STYK<span className="text-indigo-400">Ai</span></span>
              </div>
              <p className="text-sm">Curated AI tools directory. Helping you discover the best.</p>
              <div className="flex gap-3 mt-4">
                <a href="#" className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-indigo-600 text-xs">𝕏</a>
                <a href="#" className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-indigo-600 text-xs">GH</a>
                <a href="#" className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-indigo-600 text-xs">in</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-white">Home</a></li>
                <li><a href="/categories" className="hover:text-white">Categories</a></li>
                <li><a href="/search" className="hover:text-white">All Tools</a></li>
                <li><a href="/submit" className="hover:text-white">Submit Tool</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Top Categories</h4>
              <ul className="space-y-2 text-sm">
                {cats.slice(0,5).map((c:any) => <li key={c.id}><a href={`/category/${c.slug}`} className="hover:text-white">{c.icon} {c.name}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Stay Updated</h4>
              <p className="text-sm mb-3">Get the latest AI tools delivered.</p>
              <form className="flex"><input type="email" placeholder="your@email.com" className="flex-1 px-3 py-2 rounded-l-lg bg-gray-800 border border-gray-700 text-sm text-white focus:outline-none focus:border-indigo-500"/><button className="px-4 py-2 rounded-r-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">Subscribe</button></form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs">© 2026 STYK Ai. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
