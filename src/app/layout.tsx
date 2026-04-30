import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Best AI Tools 2026 | Discover Top AI Tools for Writing, Design & Business",
  description: "Explore the best AI tools in 2026. Compare ChatGPT alternatives, AI writing tools, AI image generators, coding assistants, and more. Find the perfect AI tool for your needs.",
  keywords: "AI tools, best AI tools, AI tools 2026, ChatGPT alternatives, AI writing, AI design, AI coding",
  openGraph: {
    title: "Best AI Tools 2026 | STYK Ai",
    description: "Explore the best AI tools in 2026. Compare ChatGPT alternatives, AI writing tools, and more.",
    type: "website",
    siteName: "STYK Ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#0a0e1a] text-[#f1f5f9]">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-49H18XJW7G"
          strategy="afterInteractive"
        />
        <Script id="ga4">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-49H18XJW7G');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
