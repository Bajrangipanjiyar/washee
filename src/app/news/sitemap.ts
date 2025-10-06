
import { MetadataRoute } from 'next'
import { newsArticles } from '@/lib/newsArticles';
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://washee.in/news';

  const newsPostUrls = newsArticles.map(post => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.8,
    },
    {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.8,
    },
    {
        url: `${baseUrl}/privacy-policy`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.5,
    },
    {
        url: `${baseUrl}/disclaimer`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.5,
    },
  ];

  return [...staticUrls, ...newsPostUrls];
}
