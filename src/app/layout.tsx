import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stykai AI 导航 - 全球 AI 工具大全",
  description: "收录全球最优质的 AI 工具，涵盖 AI 写作、AI 绘画、AI 编程、AI 视频等领域。每日更新，帮你找到最适合的 AI 工具。",
  keywords: "AI工具, AI导航, AI网站, AI资源, ChatGPT, Midjourney, AI写作, AI绘画",
  openGraph: {
    title: "Stykai AI 导航 - 全球 AI 工具大全",
    description: "收录全球最优质的 AI 工具，每日更新",
    type: "website",
    siteName: "Stykai AI 导航",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
