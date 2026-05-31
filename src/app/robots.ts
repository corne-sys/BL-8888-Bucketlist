import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/landen', '/plaatsen', '/avonturen', '/sitemap.xml'],
        disallow: ['/_next/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
