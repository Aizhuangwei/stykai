"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useLang } from "@/lib/i18n";

export default function CategoriesPage() {
  const { t } = useLang();
  const [cats, setCats] = useState<any[]>([]);
  useEffect(() => { fetch("/api/categories").then(r=>r.json()).then(setCats); }, []);
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("categories.pageTitle")}</h1>
        <p className="text-gray-500 mb-8">{t("categories.desc")}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {cats.map((c:any) => (
            <a key={c.id} href={`/category/${c.slug}`} className="tool-card p-6 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all group">
              <div className="text-4xl mb-3">{c.icon}</div>
              <h2 className="font-semibold text-gray-900 group-hover:text-indigo-600">{c.name}</h2>
              <p className="text-sm text-gray-400 mt-1">{t("categories.tools", { count: c.count })}</p>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}
