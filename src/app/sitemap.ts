
import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://washee-online.vercel.app'; // Replace with your actual domain

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/plans`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
        url: `${baseUrl}/my-bookings`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
    },
    {
        url: `${baseUrl}/login`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
    },
    {
        url: `${baseUrl}/terms-and-conditions`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
    },
    {
        url: `${baseUrl}/privacy-policy`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
    },
    {
        url: `${baseUrl}/refund-and-cancellation`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
    },
    {
        url: `${baseUrl}/service-delivery-policy`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
    },
    {
        url: `${baseUrl}/disclaimer`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
    },
  ]
}
