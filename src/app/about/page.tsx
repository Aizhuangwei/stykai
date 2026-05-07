import Header from '@/components/Header';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About STYK Ai | AI Tools Navigation & Reviews',
  description: 'STYK Ai curates the best AI tools with honest reviews and comparisons. Discover, compare, and choose the right AI tools.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-6 text-center">About STYK Ai</h1>

        <div className="space-y-6 text-gray-400 leading-relaxed">
          <section className="card-base p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3">🎯 Our Mission</h2>
            <p>
              STYK Ai is a curated AI tools navigation site. We help you discover, compare, and choose the best AI tools for your needs.
              In this era of AI tool explosion, we save you time filtering through options to find tools that truly work.
            </p>
          </section>

          <section className="card-base p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3">✨ What We Do</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-0.5">🔍</span>
                <span>Curated collection of the world best AI tools</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-0.5">📊</span>
                <span>Honest ratings with real pros and cons analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-0.5">🔄</span>
                <span>Daily updates tracking latest AI product trends</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-0.5">📝</span>
                <span>Detailed tool comparisons and usage guides</span>
              </li>
            </ul>
          </section>

          <section className="card-base p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3">📬 Contact Us</h2>
            <p className="mb-4">
              Know a great AI tool? Have suggestions? Reach out to us:
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-500">📧 Email: </span>
                <a href="mailto:hello@stykai.com" className="text-cyan-400 hover:underline">
                  hello@stykai.com
                </a>
              </li>
              <li>
                <span className="text-gray-500">🔗 Submit Tool: </span>
                <Link href="/submit" className="text-cyan-400 hover:underline">
                  Go to submit page
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
        <p>© 2026 STYK Ai. All rights reserved.</p>
      </footer>
    </div>
  );
}
