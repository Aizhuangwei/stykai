import { Tool } from '@/lib/tools';
import Link from 'next/link';

const pricingStyles: Record<string, { label: string; className: string }> = {
  free: { label: '免费', className: 'text-green-400 bg-green-500/10 border border-green-500/20' },
  freemium: { label: '免费+付费', className: 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20' },
  paid: { label: '付费', className: 'text-red-400 bg-red-500/10 border border-red-500/20' },
};

export default function ToolCard({ tool, featured }: { tool: Tool; featured?: boolean }) {
  const ps = pricingStyles[tool.pricing];

  return (
    <Link href={`/tools/${tool.id}`}>
      <div className="card-base p-5 h-full cursor-pointer group">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-semibold group-hover:text-cyan-400 transition-colors leading-tight">
            {tool.name}
          </h3>
          <span className={`shrink-0 text-[11px] px-2 py-0.5 rounded-full ${ps.className}`}>
            {ps.label}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 mb-3 line-clamp-2 leading-relaxed">
          {tool.shortDesc}
        </p>

        {/* Score / Featured */}
        {tool.score && (
          <div className="flex items-center gap-1.5 mb-3">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-sm font-medium text-gray-300">{tool.score.toFixed(1)}</span>
            {featured && (
              <span className="text-[10px] px-1.5 py-0.5 bg-cyan-500/10 text-cyan-400 rounded ml-1">
                FEATURED
              </span>
            )}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tool.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 bg-gray-800/80 text-gray-500 rounded"
            >
              {tag}
            </span>
          ))}
          {tool.tags.length > 3 && (
            <span className="text-[11px] px-2 py-0.5 text-gray-600">
              +{tool.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
