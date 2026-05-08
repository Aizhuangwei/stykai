import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.stykai.com'),
  title: "125+ Best AI Tools Ranked & Reviewed (2026) | STYK Ai",
  description: "Find the perfect AI tool in 2026. 125+ AI tools ranked by real ratings across 8 categories — ChatGPT alternatives, AI coding, design, writing & more. Honest pros, cons, and pricing. Updated daily.",
  keywords: "AI tools, best AI tools, AI tools 2026, ChatGPT alternatives, AI writing, AI design, AI coding",
  openGraph: {
    title: "125+ Best AI Tools Ranked & Reviewed (2026) | STYK Ai",
    description: "Find the perfect AI tool. 125+ AI tools ranked by real ratings — ChatGPT, Claude, DeepSeek & more. Updated daily.",
    type: "website",
    siteName: "STYK Ai",
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '125+ Best AI Tools Ranked & Reviewed (2026) | STYK Ai',
    description: '125+ AI tools ranked by real ratings across 8 categories. Find your perfect AI tool.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#0a0e1a] text-[#f1f5f9]">
        {/* Google Analytics */}
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

        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'STYK Ai',
              url: 'https://www.stykai.com',
              description: 'Discover the best AI tools in 2026. Compare ChatGPT alternatives, AI writing tools, AI image generators, coding assistants, and more.',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://www.stykai.com/?s={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />

        {children}
      </body>
    </html>
  );
}
