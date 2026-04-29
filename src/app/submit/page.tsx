'use client';

import { useState } from 'react';
import { categories } from '@/lib/tools';
import Header from '@/components/Header';

export default function SubmitPage() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    shortDesc: '',
    url: '',
    category: 'productivity',
    tags: '',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setErrorMsg('');

    // Basic validation
    if (!form.name.trim() || !form.description.trim() || !form.url.trim()) {
      setStatus('error');
      setErrorMsg('请至少填写工具名称、描述和官网链接');
      return;
    }

    try {
      // Load existing submissions from localStorage
      const existing = JSON.parse(localStorage.getItem('stykai_submissions') || '[]');
      const newSubmission = {
        id: `submitted-${Date.now()}`,
        name: form.name.trim(),
        description: form.description.trim(),
        shortDesc: form.shortDesc.trim() || form.description.trim().slice(0, 100),
        url: form.url.trim(),
        officialUrl: form.url.trim(),
        category: form.category,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        pricing: 'free' as const,
        useCases: [],
        prosCons: { pros: [], cons: [] },
        score: 0,
        submittedAt: new Date().toISOString(),
      };
      existing.push(newSubmission);
      localStorage.setItem('stykai_submissions', JSON.stringify(existing));

      setStatus('success');
      setForm({ name: '', description: '', shortDesc: '', url: '', category: 'productivity', tags: '' });
    } catch {
      setStatus('error');
      setErrorMsg('保存失败，请重试');
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">提交 AI 工具</h1>
          <p className="text-gray-400">
            推荐你发现的好用 AI 工具，审核通过后会展示在导航站中。
          </p>
        </div>

        {status === 'success' ? (
          <div className="card-base p-8 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-bold mb-2">提交成功！</h2>
            <p className="text-gray-400 mb-6">感谢你的推荐，我们会尽快审核。</p>
            <button
              onClick={() => setStatus('idle')}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl transition"
            >
              再提交一个
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                工具名称 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="例如：ChatGPT"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                简短描述
              </label>
              <input
                type="text"
                value={form.shortDesc}
                onChange={e => setForm(f => ({ ...f, shortDesc: e.target.value }))}
                placeholder="一句话描述工具功能"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                详细描述 <span className="text-red-400">*</span>
              </label>
              <textarea
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                rows={4}
                placeholder="详细介绍这个工具的功能和特点"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition resize-none"
              />
            </div>

            {/* URL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                官网链接 <span className="text-red-400">*</span>
              </label>
              <input
                type="url"
                value={form.url}
                onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                placeholder="https://example.com"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">分类</label>
              <select
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                标签
              </label>
              <input
                type="text"
                value={form.tags}
                onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                placeholder="用逗号分隔，例如：AI写作, 内容生成, SEO"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
              />
              <p className="text-xs text-gray-600 mt-1">多个标签用逗号隔开</p>
            </div>

            {/* Error */}
            {status === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                {errorMsg}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-bold rounded-xl transition text-base"
            >
              提交工具 🚀
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
