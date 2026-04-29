import { Tool } from '@/lib/tools';
import Link from 'next/link';

export default function ToolCard({ tool, featured }: { tool: Tool; featured?: boolean }) {
  const pricingColors: Record<string, string> = {
    free: 'text-green-400 bg-green-500/10',
    freemium: 'text-yellow-400 bg-yellow-500/10',
    paid: 'text-red-400 bg-red-500/10',
  };
  const pricingLabels: Record<string, string> = {
    free: 'Free',
    freemium: 'Free+Premium',
    paid: 'Paid',
  };

  return (
    <Link href={`/tools/${tool.id}`}>
      <div className="card-hover bg-gray-900/50 border border-gray-800 rounded-xl p-5 h-full cursor-pointer group">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold group-hover:text-cyan-400 transition">{tool.name}</h3>
          <span className={`text-xs px-2 py-0.5 rounded ${pricingColors[tool.pricing]}`}>
            {pricingLabels[tool.pricing]}
          </span>
        </div>
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">{tool.shortDesc}</p>
        {featured && tool.score && (
          <div className="flex items-center gap-1 mb-2">
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-xs text-gray-500">{tool.score}</span>
          </div>
        )}
        <div className="flex flex-wrap gap-1.5">
          {tool.tags.slice(0, 4).map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
