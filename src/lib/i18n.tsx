"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "en" | "zh";

const translations: Record<Lang, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.categories": "Categories",
    "nav.allTools": "All Tools",
    "nav.submitTool": "Submit Tool",
    "nav.search": "Search...",
    "hero.title": "AI · Tools Hub",
    "hero.subtitle": "{count} tools curated, reviewed & ready to use",
    "hero.desc": "Discover and find the best AI tools quickly. Curated reviews, honest comparisons.",
    "hero.cta": "Search",
    "hero.hot": "Hot:",
    "section.today": "Today's Updates",
    "section.todayDesc": "New tools added today",
    "section.best": "Best AI Tools",
    "section.bestDesc": "Top-rated picks with real pros & cons",
    "section.categories": "Categories",
    "section.categoriesDesc": "Browse AI tools by category",
    "section.trending": "Trending Now",
    "section.trendingDesc": "Fastest-growing this month",
    "section.insights": "Latest Insights",
    "section.insightsDesc": "AI news & analysis",
    "section.cta": "Find Your Next AI Tool",
    "section.ctaDesc": "Join thousands discovering the best AI tools. Updated daily.",
    "section.ctaBtn": "Search",
    "pricing.free": "Free",
    "pricing.freemium": "Free+Paid",
    "pricing.paid": "Paid",
    "badge.new": "NEW",
    "today.empty": "No new tools today. Check back tomorrow!",
    "viewAll": "View All →",
    "breadcrumb.home": "Home",
    "breadcrumb.categories": "Categories",
    "tool.detail.loading": "Loading...",
    "tool.detail.visit": "Visit Website",
    "search.placeholder": "Search AI tools...",
    "search.pageTitle": "All Tools",
    "search.searching": "Searching...",
    "404.title": "Page Not Found",
    "404.desc": "The page you are looking for does not exist or has been removed.",
    "404.btn": "Back to Home",
    "categories.pageTitle": "Categories",
    "categories.desc": "Browse AI tools by category",
    "categories.tools": "{count} tools",
    "footer.desc": "Curated AI tools directory. Helping you discover the best.",
    "footer.quickLinks": "Quick Links",
    "footer.topCats": "Top Categories",
    "footer.stayUpdated": "Stay Updated",
    "footer.placeholder": "your@email.com",
    "footer.subscribe": "Subscribe",
    "footer.copyright": "© 2026 STYK Ai. All rights reserved.",
    "lang.en": "EN",
    "lang.zh": "中文",
  },
  zh: {
    "nav.home": "首页",
    "nav.categories": "分类",
    "nav.allTools": "全部工具",
    "nav.submitTool": "提交工具",
    "nav.search": "搜索...",
    "hero.title": "AI · 工具资源站",
    "hero.subtitle": "收录 {count} 个精选 AI 工具，持续更新",
    "hero.desc": "发现最好的 AI 工具。精选评测、诚实对比，帮你做出正确选择。",
    "hero.cta": "搜索",
    "hero.hot": "热门：",
    "section.today": "今日更新",
    "section.todayDesc": "今日新增工具",
    "section.best": "精选推荐",
    "section.bestDesc": "评分最高的 AI 工具推荐",
    "section.categories": "分类浏览",
    "section.categoriesDesc": "按分类浏览 AI 工具",
    "section.trending": "热门趋势",
    "section.trendingDesc": "本月增长最快的工具",
    "section.insights": "最新资讯",
    "section.insightsDesc": "AI 新闻与分析",
    "section.cta": "找到你的下一个 AI 工具",
    "section.ctaDesc": "加入数千用户，发现最好的 AI 工具。每日更新。",
    "section.ctaBtn": "搜索",
    "pricing.free": "免费",
    "pricing.freemium": "免费+付费",
    "pricing.paid": "付费",
    "badge.new": "新",
    "today.empty": "今日暂无新增工具，明天再来看看吧！",
    "viewAll": "查看全部 →",
    "breadcrumb.home": "首页",
    "breadcrumb.categories": "分类",
    "tool.detail.loading": "加载中...",
    "tool.detail.visit": "访问官网",
    "search.placeholder": "搜索 AI 工具...",
    "search.pageTitle": "全部工具",
    "search.searching": "搜索中...",
    "404.title": "404 - 页面未找到",
    "404.desc": "您查找的页面不存在或已被删除。",
    "404.btn": "返回首页",
    "categories.pageTitle": "分类",
    "categories.desc": "按分类浏览 AI 工具",
    "categories.tools": "{count} 个工具",
    "footer.desc": "精选 AI 工具目录，帮你发现最好的工具。",
    "footer.quickLinks": "快速链接",
    "footer.topCats": "热门分类",
    "footer.stayUpdated": "保持更新",
    "footer.placeholder": "your@email.com",
    "footer.subscribe": "订阅",
    "footer.copyright": "© 2026 STYK Ai 版权所有",
    "lang.en": "EN",
    "lang.zh": "中文",
  },
};

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}>({
  lang: "en",
  setLang: () => {},
  t: (k: string) => k,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("styk-lang") as Lang | null;
    if (saved === "en" || saved === "zh") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("styk-lang", l);
  };

  const t = (key: string, vars?: Record<string, string | number>): string => {
    let text = translations[lang][key] || translations["en"][key] || key;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
