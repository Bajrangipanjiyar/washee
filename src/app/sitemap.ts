
import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blogPosts';
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://washee.in';

  const postUrls = blogPosts.map(post => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/plans`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
        url: `${baseUrl}/blogs`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    },
    {
        url: `${baseUrl}/my-bookings`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
    },
    {
        url: `${baseUrl}/login`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.5,
    },
    {
        url: `${baseUrl}/terms-and-conditions`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
    },
    {
        url: `${baseUrl}/privacy-policy`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
    },
    {
        url: `${baseUrl}/refund-and-cancellation`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
    },
    {
        url: `${baseUrl}/service-delivery-policy`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
    },
    {
        url: `${baseUrl}/disclaimer`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
    },
  ];

  return [...staticUrls, ...postUrls];
}
