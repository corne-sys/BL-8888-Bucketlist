import React from 'react';
import { prisma } from '@/lib/db';
import CountriesClient from '@/components/CountriesClient';
import SchemaOrg from '@/components/SchemaOrg';

export const revalidate = 0; // Fresh database query on every request

export async function generateMetadata() {
  return {
    title: 'Inspirerende Bestemmingen - Mijn Landenkaart',
    description: 'Ontdek de landen die ik wil bezoeken, gepland heb, of al heb bezocht. Filter per continent of status en verken steden en bucketlist-items.',
  };
}

export default async function CountriesPage() {
  // Fetch countries and aggregate counts of related places and items
  const countries = await prisma.country.findMany({
    include: {
      _count: {
        select: {
          places: true,
          items: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });

  // Schema markup
  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Inspirerende Reisbestemmingen',
    description: 'Landen die ik wil bezoeken, die gepland zijn of al bezocht zijn.',
    url: 'http://localhost:3000/landen',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: countries.length,
      itemListElement: countries.map((country, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: country.name,
        description: country.shortDescription,
        url: `http://localhost:3000/landen/${country.slug}`,
      })),
    },
  };

  return (
    <>
      <SchemaOrg schema={listSchema} />
      <CountriesClient initialCountries={countries} />
    </>
  );
}
