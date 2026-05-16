"use client";
import { useState, useEffect } from "react";
import { use } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { useLang } from "@/lib/i18n";

export default function ToolDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { t } = useLang();
  const { slug } = use(params);
  const [tool, setTool] = useState<any>(null);
  useEffect(() => {
    fetch("/api/tools").then(r=>r.json()).then((all) => setTool(all.find((t:any) => t.slug === slug) || null));
  }, [slug]);
  if (tool === null) return <><Header /><div className="text-center py-20 text-gray-400">{t("tool.detail.loading")}</div></>;
  if (tool === undefined) return notFound();
  const bs = tool.pricing==="free"?"bg-emerald-50 text-emerald-700":tool.pricing==="freemium"?"bg-indigo-50 text-indigo-700":"bg-violet-50 text-violet-700";
  const bt = (p: string) => p==="free"?t("pricing.free"):p==="freemium"?t("pricing.freemium"):t("pricing.paid");
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-sm text-gray-400 mb-6"><a href="/" className="hover:text-indigo-600">{t("breadcrumb.home")}</a> / <span className="text-gray-700">{tool.name}</span></div>
        <div className="tool-card p-8">
          <div className="flex items-start gap-5 mb-6">
            <div className="text-5xl">{tool.icon}</div>
            <div><h1 className="text-2xl font-bold text-gray-900 mb-2">{tool.name}</h1><p className="text-gray-500">{tool.tagline}</p></div>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${bs}`}>{bt(tool.pricing)}</span>
            <span className="text-amber-500 text-sm">★ {tool.rating}</span>
            <span className="text-xs text-gray-400">{tool.category}</span>
          </div>
          {tool.tags && <div className="flex flex-wrap gap-2 mb-6">{tool.tags.map((tag:string) => <span key={tag} className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">#{tag}</span>)}</div>}
          {tool.description && <p className="text-gray-600 text-sm leading-7 mb-8">{tool.description}</p>}
          <a href={tool.url} target="_blank" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">🚀 {t("tool.detail.visit")}</a>
        </div>
      </main>
    </>
  );
}
