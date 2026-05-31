import React from 'react';
import { prisma } from '@/lib/db';
import AdventuresClient from '@/components/AdventuresClient';
import SchemaOrg from '@/components/SchemaOrg';

export const revalidate = 0; // Fresh database query on every request

export async function generateMetadata() {
  return {
    title: 'Avonturen & Ervaringen - Mijn Bucket List',
    description: 'Ontdek grensverleggende reizen, fietstochten en unieke outdoor ervaringen op mijn persoonlijke bucketlist.',
  };
}

interface Props {
  searchParams: Promise<{ slug?: string }>;
}

export default async function AdventuresPage({ searchParams }: Props) {
  const { slug } = await searchParams;

  // Query all bucket list items belonging to the 'Avontuur' category/lifeArea
  const adventures = await prisma.bucketlistItem.findMany({
    where: {
      lifeArea: 'Avontuur',
    },
    include: {
      country: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      title: 'asc',
    },
  });

  // Dynamic schema markup
  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Grensverleggende Avonturen',
    description: 'Bijzondere sportieve tochten en overnachtingen op mijn persoonlijke bucketlist.',
    url: 'http://localhost:3000/avonturen',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: adventures.length,
      itemListElement: adventures.map((adv, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: adv.title,
        description: adv.shortDescription,
        url: `http://localhost:3000/avonturen?slug=${adv.slug}`,
      })),
    },
  };

  return (
    <>
      <SchemaOrg schema={listSchema} />
      <AdventuresClient initialAdventures={adventures} activeSlug={slug} />
    </>
  );
}
