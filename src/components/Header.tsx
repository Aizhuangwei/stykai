
"use client";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-shadow ${scrolled ? "shadow-sm bg-white/95 backdrop-blur-md" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">S</div>
          <span className="text-lg font-bold text-gray-900">STYK<span className="text-indigo-600">Ai</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="/" className="text-indigo-600">Home</a>
          <a href="/categories" className="text-gray-500 hover:text-gray-900">Categories</a>
          <a href="/search" className="text-gray-500 hover:text-gray-900">All Tools</a>
          <a href="/submit" className="text-gray-500 hover:text-gray-900">Submit Tool</a>
        </nav>
        <div className="flex items-center gap-3">
          {searchOpen ? (
            <form onSubmit={e => { e.preventDefault(); if (searchQ.trim()) window.location.href = "/search?q=" + encodeURIComponent(searchQ.trim()); }}>
              <input ref={ref} value={searchQ} onChange={e => setSearchQ(e.target.value)}
                placeholder="Search..." className="w-48 px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                autoFocus onBlur={() => { if (!searchQ) setSearchOpen(false); }} />
            </form>
          ) : (
            <button onClick={() => { setSearchOpen(true); setTimeout(() => ref.current?.focus(), 50); }}
              className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
