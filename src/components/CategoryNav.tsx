'use client';

import { Category } from '@/lib/tools';

export default function CategoryNav({
  categories,
  active,
  onChange,
  totalCount,
}: {
  categories: Category[];
  active: string;
  onChange: (id: string) => void;
  totalCount: number;
}) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      <button
        onClick={() => onChange('all')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          active === 'all'
            ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
            : 'bg-gray-900/50 text-gray-400 border border-gray-800 hover:border-gray-600 hover:text-gray-200'
        }`}
      >
        全部
        <span className="text-xs opacity-60 ml-1.5">{totalCount}</span>
      </button>
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            active === cat.id
              ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
              : 'bg-gray-900/50 text-gray-400 border border-gray-800 hover:border-gray-600 hover:text-gray-200'
          }`}
        >
          {cat.icon}
          <span className="ml-1.5">{cat.name}</span>
          <span className="text-xs opacity-60 ml-1.5">{cat.count}</span>
        </button>
      ))}
    </div>
  );
}
