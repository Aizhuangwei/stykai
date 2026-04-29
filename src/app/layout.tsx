import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STYK Ai 导航站 - 探索最好的 AI 工具",
  description: "发现、对比和评测最优质的 AI 工具。覆盖 AI 写作、AI 绘画、AI 编程、AI 视频等全领域。帮你找到最适合你的 AI 工具。",
  keywords: "AI工具, AI导航, AI导航站, AI评测, AI对比, AI推荐",
  openGraph: {
    title: "STYK Ai 导航站",
    description: "探索并快速找到最好的 AI 工具",
    type: "website",
    siteName: "STYK Ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen bg-[#0a0e1a] text-[#f1f5f9]">
        {children}
      </body>
    </html>
  );
}
