
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STYK Ai — 125+ Best AI Tools Ranked & Reviewed (2026)",
  description: "Discover and find the best AI tools. Curated reviews, honest comparisons, helping you make the right choice.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="min-h-screen flex flex-col">{children}</body></html>;
}
