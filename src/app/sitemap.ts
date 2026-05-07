import { MetadataRoute } from 'next';
import { tools, categories, getSeoPageData, getBestForData } from '@/lib/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.stykai.com';
  const today = '2026-05-07';

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
    entries.push({
      url: `${baseUrl}/tools/${tool.id}`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.9,
    });
  }

  // Tool sub-pages
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

  // SEO pages
  for (const seoId of Object.keys(getSeoPageData())) {
    entries.push({
      url: `${baseUrl}/seo/${seoId}`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  }

  // Best-for pages
  for (const bestForId of Object.keys(getBestForData())) {
    entries.push({
      url: `${baseUrl}/best-for/${bestForId}`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  // Static pages
  entries.push(
    { url: `${baseUrl}/about`, lastModified: today, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/submit`, lastModified: today, changeFrequency: 'monthly', priority: 0.3 },
  );

  return entries;
}
