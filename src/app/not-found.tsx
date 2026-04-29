import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <div className="text-7xl mb-6">🔍</div>
        <h1 className="text-3xl font-bold mb-3 gradient-text">页面未找到</h1>
        <p className="text-gray-400 mb-8">
          你找的页面不存在，或者这个 AI 工具已被移除。
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl transition"
        >
          ← 返回首页
        </Link>
      </div>
    </div>
  );
}
