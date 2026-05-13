
"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";

function SearchContent() {
  const q = useSearchParams().get("q") || "";
  const [tools, setTools] = useState<any[]>([]);
  useEffect(() => {
    fetch(`/api/tools`).then(r=>r.json()).then((all) => {
      if (q) setTools(all.filter((t:any) => t.name.toLowerCase().includes(q.toLowerCase()) || t.tagline.toLowerCase().includes(q.toLowerCase())));
      else setTools(all);
    });
  }, [q]);
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{q ? `"${q}"` : "All Tools"}<span className="text-lg font-normal text-gray-400 ml-2">({tools.length})</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {tools.map((t:any) => (
          <a key={t.id} href={`/tool/${t.slug}`} className="tool-card p-5 hover:shadow-lg hover:-translate-y-0.5 group">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl">{t.icon}</div>
              <div className="flex-1 min-w-0"><h3 className="font-semibold text-gray-900 truncate group-hover:text-indigo-600">{t.name}</h3><span className="text-amber-400 text-xs">★ {t.rating}</span></div>
            </div>
            <p className="text-sm text-gray-500 line-clamp-2 mb-3">{t.tagline}</p>
            <div className="flex justify-between">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${t.pricing==="free"?"bg-emerald-50 text-emerald-700":t.pricing==="freemium"?"bg-indigo-50 text-indigo-700":"bg-violet-50 text-violet-700"}`}>{t.pricing==="free"?"Free":t.pricing==="freemium"?"Free+Paid":"Paid"}</span>
              <span className="text-xs text-gray-400">{t.category}</span>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return <><Header /><Suspense fallback={<div className="text-center py-20 text-gray-400">Searching...</div>}><SearchContent /></Suspense></>;
}
