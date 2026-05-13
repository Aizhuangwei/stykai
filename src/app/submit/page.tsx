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
      setErrorMsg('Please fill in at least tool name, description and official URL');
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
      setErrorMsg('Save failed, please try again');
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">Submit AI Tool</h1>
          <p className="text-gray-400">
            Recommend a great AI tool you found. It will be listed after review.
          </p>
        </div>

        {status === 'success' ? (
          <div className="card-base p-8 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-bold mb-2">Submitted Successfully!</h2>
            <p className="text-gray-400 mb-6">Thanks for your recommendation! We will review it soon.</p>
            <button
              onClick={() => setStatus('idle')}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl transition"
            >
              Submit Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Tool Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. ChatGPT"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Short Description
              </label>
              <input
                type="text"
                value={form.shortDesc}
                onChange={e => setForm(f => ({ ...f, shortDesc: e.target.value }))}
                placeholder="Describe the tool in one sentence"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Full Description <span className="text-red-400">*</span>
              </label>
              <textarea
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                rows={4}
                placeholder="Describe the tool features in detail"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition resize-none"
              />
            </div>

            {/* URL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Official Website URL <span className="text-red-400">*</span>
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
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Categories</label>
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
                Tags
              </label>
              <input
                type="text"
                value={form.tags}
                onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                placeholder="Comma separated, e.g. AI Writing, Content Generation, SEO"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
              />
              <p className="text-xs text-gray-600 mt-1">Separate multiple tags with commas</p>
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
              Submit Tool 🚀
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
