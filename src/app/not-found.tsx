export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold mb-2">工具未找到</h1>
        <p className="text-gray-500 mb-6">这个 AI 工具不存在或已被移除</p>
        <a href="/" className="px-6 py-3 bg-cyan-500 text-black rounded-xl font-semibold">← 返回首页</a>
      </div>
    </div>
  );
}
