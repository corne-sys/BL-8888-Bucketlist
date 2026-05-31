import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaOrg from '@/components/SchemaOrg';
import { Globe, MapPin, Compass, ChevronRight, ListCollapse } from 'lucide-react';

export const revalidate = 0; // Disable caching to fetch live updates

export async function generateMetadata() {
  return {
    title: 'Volledig Overzicht - Mijn Bucket List',
    description: 'Een handig en direct overzicht van alle landen, steden, bijzondere plekken en grensverleggende avonturen op mijn persoonlijke bucketlist.',
  };
}

export default async function OverviewPage() {
  // Fetch all data from database
  const countries = await prisma.country.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  const places = await prisma.place.findMany({
    include: {
      country: true,
    },
    orderBy: {
      name: 'asc',
    },
  });

  const adventures = await prisma.bucketlistItem.findMany({
    where: {
      lifeArea: 'Avontuur',
    },
    orderBy: {
      title: 'asc',
    },
  });

  // Schema Markup
  const overviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    name: 'Volledig Overzicht - Mijn Bucket List',
    description: 'Directe index van alle landen, steden en avonturen op mijn bucketlist.',
    url: 'http://localhost:3000/overzicht',
  };

  return (
    <>
      <SchemaOrg schema={overviewSchema} />

      {/* Header section (Midnight blue with subtle gold lines) */}
      <section className="relative bg-[#0B192C] text-white py-16 sm:py-20 md:py-24 border-b border-[#D4AF37]/15 select-none">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-header" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-header)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-xs font-bold text-gold uppercase tracking-widest block">Inspirerende Index</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Volledig Overzicht
          </h1>
          <p className="text-sm sm:text-base text-[#F4F2EE]/75 max-w-2xl mx-auto font-medium leading-relaxed">
            Een overzichtelijke en directe index van alle bestemmingen, steden en ervaringen die op mijn levensreis staan.
          </p>
        </div>
      </section>

      {/* Breadcrumbs & Lists */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <Breadcrumbs items={[{ label: 'Overzicht', url: '/overzicht' }]} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mt-8">
          
          {/* Countries Section */}
          <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md flex flex-col">
            <div className="flex items-center justify-between border-b border-primary/5 pb-4 mb-4 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-primary">Landen</h2>
                  <p className="text-[10px] text-primary/50 font-bold uppercase tracking-wider">Bestemmingen</p>
                </div>
              </div>
              <span className="bg-primary/5 text-primary text-xs font-bold px-2.5 py-1 rounded-lg">
                {countries.length}
              </span>
            </div>

            {countries.length > 0 ? (
              <div className="space-y-1.5 overflow-y-auto max-h-[60vh] pr-1">
                {countries.map((country) => (
                  <Link
                    key={country.id}
                    href={`/landen/${country.slug}`}
                    className="group flex items-center justify-between py-2 px-3 rounded-xl border border-transparent hover:border-gold/20 hover:bg-sand/30 transition-all duration-300"
                  >
                    <span className="text-sm font-semibold text-primary truncate group-hover:text-gold transition-colors duration-300">
                      {country.name}
                    </span>
                    <ChevronRight className="w-4 h-4 text-primary/25 group-hover:text-gold transform group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-primary/50 italic py-4 text-center">Geen landen toegevoegd.</p>
            )}
          </div>

          {/* Places Section */}
          <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md flex flex-col">
            <div className="flex items-center justify-between border-b border-primary/5 pb-4 mb-4 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FF9F43]/10 flex items-center justify-center text-[#FF9F43]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-primary">Plaatsen</h2>
                  <p className="text-[10px] text-primary/50 font-bold uppercase tracking-wider">Steden &amp; Plekken</p>
                </div>
              </div>
              <span className="bg-primary/5 text-primary text-xs font-bold px-2.5 py-1 rounded-lg">
                {places.length}
              </span>
            </div>

            {places.length > 0 ? (
              <div className="space-y-1.5 overflow-y-auto max-h-[60vh] pr-1">
                {places.map((place) => (
                  <Link
                    key={place.id}
                    href={`/plaatsen/${place.slug}`}
                    className="group flex items-center justify-between py-2 px-3 rounded-xl border border-transparent hover:border-gold/20 hover:bg-sand/30 transition-all duration-300"
                  >
                    <span className="text-sm font-semibold text-primary truncate group-hover:text-gold transition-colors duration-300">
                      {place.name}
                    </span>
                    <ChevronRight className="w-4 h-4 text-primary/25 group-hover:text-gold transform group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-primary/50 italic py-4 text-center">Geen plaatsen toegevoegd.</p>
            )}
          </div>

          {/* Adventures Section */}
          <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md flex flex-col">
            <div className="flex items-center justify-between border-b border-primary/5 pb-4 mb-4 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#27AE60]/10 flex items-center justify-center text-[#27AE60]">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-primary">Avonturen</h2>
                  <p className="text-[10px] text-primary/50 font-bold uppercase tracking-wider">Grensverleggende Ervaringen</p>
                </div>
              </div>
              <span className="bg-primary/5 text-primary text-xs font-bold px-2.5 py-1 rounded-lg">
                {adventures.length}
              </span>
            </div>

            {adventures.length > 0 ? (
              <div className="space-y-1.5 overflow-y-auto max-h-[60vh] pr-1">
                {adventures.map((adventure) => (
                  <Link
                    key={adventure.id}
                    href={`/avonturen?slug=${adventure.slug}`}
                    className="group flex items-center justify-between py-2 px-3 rounded-xl border border-transparent hover:border-gold/20 hover:bg-sand/30 transition-all duration-300"
                  >
                    <span className="text-sm font-semibold text-primary truncate group-hover:text-gold transition-colors duration-300">
                      {adventure.title}
                    </span>
                    <ChevronRight className="w-4 h-4 text-primary/25 group-hover:text-gold transform group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-primary/50 italic py-4 text-center">Geen avonturen toegevoegd.</p>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
