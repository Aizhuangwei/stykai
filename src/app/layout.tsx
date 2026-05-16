import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "AI · Tools Hub — 134+ Best AI Tools Ranked & Reviewed (2026)",
  description: "Discover and find the best AI tools. Curated reviews, honest comparisons, helping you make the right choice.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
