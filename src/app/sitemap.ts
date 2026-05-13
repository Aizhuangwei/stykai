import { MetadataRoute } from 'next';
import { tools, categories, getSeoPageData } from '@/lib/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.stykai.com';
  const today = '2026-05-08';

  const entries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: today, changeFrequency: 'daily', priority: 1.0 },
  ];

  // Category pages
  for (const cat of categories) {
    entries.push({
      url: `${baseUrl}/category/${cat.id}`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // Tool pages
  for (const tool of tools) {
    // Hot tools (score >= 9.0) get crawled more frequently
    const isHotTool = (tool.score || 0) >= 9.0;
    entries.push({
      url: `${baseUrl}/tools/${tool.id}`,
      lastModified: today,
      changeFrequency: isHotTool ? 'weekly' : 'monthly',
      priority: isHotTool ? 1.0 : 0.9,
    });
  }

  // Tool sub-pages (alternatives, review, best-for)
  for (const tool of tools) {
    entries.push(
      {
        url: `${baseUrl}/tools/${tool.id}/alternatives`,
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/tools/${tool.id}/review`,
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/tools/${tool.id}/best-for`,
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.5,
      }
    );
  }

  // Top SEO landing pages (alternatives, comparison, curated lists)
  for (const seoId of Object.keys(getSeoPageData())) {
    entries.push({
      url: `${baseUrl}/seo/${seoId}`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  }

  // Static pages
  entries.push(
    { url: `${baseUrl}/about`, lastModified: today, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/submit`, lastModified: today, changeFrequency: 'monthly', priority: 0.3 },
  );

  return entries;
}
