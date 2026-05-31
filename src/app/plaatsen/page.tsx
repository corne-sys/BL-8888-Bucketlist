import React from 'react';
import { prisma } from '@/lib/db';
import PlacesClient from '@/components/PlacesClient';
import SchemaOrg from '@/components/SchemaOrg';

export const revalidate = 0; // Fresh database query on every request

export async function generateMetadata() {
  return {
    title: 'Bijzondere Plekken & Steden - Mijn Bucketlist',
    description: 'Ontdek de steden, dorpen, historische plekken en adembenemende natuurgebieden op mijn persoonlijke reis- en ervaringslijst.',
  };
}

export default async function PlacesPage() {
  // Query all places alongside their country details
  const places = await prisma.place.findMany({
    include: {
      country: true,
      items: {
        select: { id: true },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });

  const countries = await prisma.country.findMany({
    orderBy: { name: 'asc' },
  });

  // Schema markup
  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bijzondere Steden & Natuurplekken',
    description: 'Steden, natuurgebieden en spirituele locaties op mijn persoonlijke levensreis.',
    url: 'http://localhost:3000/plaatsen',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: places.length,
      itemListElement: places.map((place, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: place.name,
        description: place.shortDescription,
        url: `http://localhost:3000/plaatsen/${place.slug}`,
      })),
    },
  };

  return (
    <>
      <SchemaOrg schema={listSchema} />
      <PlacesClient initialPlaces={places} countries={countries} />
    </>
  );
}
