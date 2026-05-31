import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/db';
import SchemaOrg from '@/components/SchemaOrg';
import { Globe, MapPin, CheckCircle, ArrowRight, Quote } from 'lucide-react';

export const revalidate = 0; // Disable caching to fetch live dashboard updates

export default async function HomePage() {
  // 1. Fetch dynamic data from SQLite
  const settings = await prisma.setting.findUnique({
    where: { id: 'global' },
  }) || {
    websiteName: 'Mijn Bucket List',
    introText: 'Welkom op mijn persoonlijke levenskaart...',
    heroTitle: 'Mijn Bucket List',
    heroSubtitle: 'Steden, landen, ervaringen en doelen die mij inspireren...',
    footerText: '© 2026 Mijn Bucket List. Dromen, ontdekken, groeien.',
  };

  const featuredCountries = await prisma.country.findMany({
    where: {
      status: {
        in: ['gepland', 'bezocht'],
      },
    },
    take: 3,
  });

  // Fallback to latest countries if none are marked planned/visited
  const displayCountries = featuredCountries.length > 0 
    ? featuredCountries 
    : await prisma.country.findMany({ take: 3 });

  const featuredPlaces = await prisma.place.findMany({
    where: {
      status: {
        in: ['gepland', 'bezocht'],
      },
    },
    include: {
      country: true,
    },
    take: 3,
  });

  const displayPlaces = featuredPlaces.length > 0
    ? featuredPlaces
    : await prisma.place.findMany({
        include: {
          country: true,
        },
        take: 3,
      });

  // 2. Structured Data for Home Page (WebSite)
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: settings.websiteName,
    url: 'http://localhost:3000',
    description: settings.heroSubtitle,
    potentialAction: {
      '@type': 'SearchAction',
      target: 'http://localhost:3000/landen?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <SchemaOrg schema={homeSchema} />

      <section className="relative text-white py-20 md:py-32 overflow-hidden select-none border-b border-[#D4AF37]/15">
        {/* Breathtaking Colosseum Sunset Background */}
        <div className="absolute inset-0">
          <img
            src="/colosseum_sunset.png"
            alt="Colosseum in de avondzon"
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* Soft elegant dark overlay to maintain AAA-level text readability */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {settings.heroTitle}
          </h1>

          <p className="text-lg sm:text-xl text-[#F4F2EE]/80 max-w-3xl mx-auto font-medium leading-relaxed">
            {settings.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 font-bold">
            <Link
              href="/landen"
              className="bg-gold text-primary hover:bg-orange hover:text-white border border-gold hover:border-orange px-8 py-4 rounded-full shadow-lg text-sm tracking-wider uppercase transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Ontdek bestemmingen
            </Link>
            <Link
              href="/plaatsen"
              className="bg-transparent text-white hover:text-gold border border-white/30 hover:border-gold px-8 py-4 rounded-full shadow-md text-sm tracking-wider uppercase transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Verken steden &amp; plekken
            </Link>
          </div>
        </div>
      </section>





      {/* Featured Countries */}
      <section className="py-16 bg-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <span className="text-xs font-bold text-gold uppercase tracking-widest block">Inspirerende bestemmingen</span>
              <h2 className="text-3xl font-extrabold text-primary">Landen op mijn Kaart</h2>
            </div>
            <Link
              href="/landen"
              className="text-sm font-bold text-primary hover:text-gold flex items-center gap-1 group"
            >
              Bekijk alle landen <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayCountries.map((country) => (
              <Link
                key={country.id}
                href={`/landen/${country.slug}`}
                className="group flex flex-col bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="h-56 relative overflow-hidden bg-primary/10">
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded-full text-white bg-primary/60 border border-white/20 backdrop-blur-sm">
                    {country.status === 'bezocht' ? 'Bezocht' : country.status === 'gepland' ? 'Gepland' : 'Wil ik bezoeken'}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs text-gold font-bold uppercase tracking-widest block">{country.continent}</span>
                    <h3 className="text-xl font-bold mt-0.5">{country.name}</h3>
                  </div>
                </div>
                
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <p className="text-sm text-primary/75 line-clamp-3 leading-relaxed font-medium">
                    {country.shortDescription}
                  </p>
                  <div className="text-xs text-primary/50 font-bold border-t border-primary/5 pt-3 flex justify-between items-center">
                    <span>Reistijd: {country.bestTravelTime.split('(')[0]}</span>
                    <span className="text-gold group-hover:text-orange font-bold flex items-center gap-0.5">
                      Details <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Places */}
      <section className="py-16 bg-white border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <span className="text-xs font-bold text-gold uppercase tracking-widest block">Prachtige oorden</span>
              <h2 className="text-3xl font-extrabold text-primary">Steden &amp; Bijzondere Plekken</h2>
            </div>
            <Link
              href="/plaatsen"
              className="text-sm font-bold text-primary hover:text-gold flex items-center gap-1 group"
            >
              Bekijk alle plaatsen <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayPlaces.map((place) => (
              <Link
                key={place.id}
                href={`/plaatsen/${place.slug}`}
                className="group flex flex-col bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="h-56 relative overflow-hidden bg-primary/10">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded-full text-white bg-primary/60 border border-white/20 backdrop-blur-sm">
                    {place.status === 'bezocht' ? 'Bezocht' : place.status === 'gepland' ? 'Gepland' : 'Wil ik bezoeken'}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs text-gold font-bold uppercase tracking-widest block">{place.country.name}</span>
                    <h3 className="text-xl font-bold mt-0.5">{place.name}</h3>
                  </div>
                </div>
                
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <p className="text-sm text-primary/75 line-clamp-3 leading-relaxed font-medium">
                    {place.shortDescription}
                  </p>
                  <div className="text-xs text-primary/50 font-bold border-t border-primary/5 pt-3 flex justify-between items-center">
                    <span className="capitalize">Type: {place.type}</span>
                    <span className="text-gold group-hover:text-orange font-bold flex items-center gap-0.5">
                      Details <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


    </>
  );
}
