"use client";
import Link from 'next/link';
import { useLang } from "@/lib/i18n";

export default function NotFound() {
  const { lang, t } = useLang();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <div className="text-7xl mb-6">🔍</div>
        <h1 className="text-3xl font-bold mb-3 gradient-text">
          {lang === "zh" ? "页面未找到" : "Page Not Found"}
        </h1>
        <p className="text-gray-400 mb-8">{t("404.desc")}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl transition"
        >
          ← {t("404.btn")}
        </Link>
      </div>
    </div>
  );
}
