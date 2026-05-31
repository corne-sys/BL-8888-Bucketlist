import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // 1. Static base routes
  const staticRoutes = [
    '',
    '/landen',
    '/plaatsen',
    '/avonturen',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    // 2. Fetch dynamic routes from database
    const countries = await prisma.country.findMany({
      select: { slug: true, updatedAt: true },
    });

    const places = await prisma.place.findMany({
      select: { slug: true, updatedAt: true },
    });

    // 3. Map dynamic routes
    const countryRoutes = countries.map((c) => ({
      url: `${baseUrl}/landen/${c.slug}`,
      lastModified: new Date(c.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    const placeRoutes = places.map((p) => ({
      url: `${baseUrl}/plaatsen/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...countryRoutes, ...placeRoutes];
  } catch (error) {
    console.error('Error generating dynamic sitemap:', error);
    return staticRoutes;
  }
}
