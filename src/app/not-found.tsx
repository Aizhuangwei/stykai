import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | STYK Ai',
  description: 'The page you are looking for does not exist or has been removed.',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <div className="text-7xl mb-6">🔍</div>
        <h1 className="text-3xl font-bold mb-3 gradient-text">Page Not Found</h1>
        <p className="text-gray-400 mb-8">
          The page you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
