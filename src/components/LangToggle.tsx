"use client";
import { useLang } from "@/lib/i18n";

export default function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <button
      onClick={() => setLang(lang === "en" ? "zh" : "en")}
      className="text-xs font-medium px-2.5 py-1 rounded-md border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition-colors text-gray-500 min-w-[42px] text-center"
      title={lang === "en" ? "Switch to Chinese" : "切换到英文"}
    >
      {lang === "en" ? "中文" : "EN"}
    </button>
  );
}
