"use client";
import { useState, useEffect } from "react";
import { use } from "react";
import Header from "@/components/Header";
import { useLang } from "@/lib/i18n";

export default function CategoryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { t } = useLang();
  const { slug } = use(params);
  const [tools, setTools] = useState<any[]>([]);
  const [cats, setCats] = useState<any[]>([]);
  useEffect(() => {
    Promise.all([
      fetch("/api/tools").then(r=>r.json()),
      fetch("/api/categories").then(r=>r.json()),
    ]).then(([t,c]) => {
      setTools(t.filter((x:any) => x.category?.toLowerCase().replace(/ /g,"-") === slug));
      setCats(c);
    });
  }, [slug]);
  const cat = cats.find((c:any) => c.slug === slug);
  const bs = (p: string) => p==="free"?"bg-emerald-50 text-emerald-700":p==="freemium"?"bg-indigo-50 text-indigo-700":"bg-violet-50 text-violet-700";
  const bt = (p: string) => p==="free"?t("pricing.free"):p==="freemium"?t("pricing.freemium"):t("pricing.paid");
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-sm text-gray-400 mb-6"><a href="/" className="hover:text-indigo-600">{t("breadcrumb.home")}</a> / <a href="/categories" className="hover:text-indigo-600">{t("breadcrumb.categories")}</a> / <span className="text-gray-700">{cat?.name||slug}</span></div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{cat?.icon} {cat?.name}</h1>
        <p className="text-gray-500 mb-8">{t("categories.tools", { count: tools.length })}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {tools.map((t:any) => (
            <a key={t.id} href={`/tool/${t.slug}`} className="tool-card p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
              <div className="text-3xl mb-3">{t.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-indigo-600">{t.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-3">{t.tagline}</p>
              <div className="flex justify-between">
                <span className="text-amber-400 text-sm">★ {t.rating}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${bs(t.pricing)}`}>{bt(t.pricing)}</span>
              </div>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}
