import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaOrg from '@/components/SchemaOrg';
import { 
  Globe, Calendar, MapPin, Compass, CheckCircle, Heart, 
  Info, Sparkles, BookOpen, MessageCircle, HelpCircle, ArrowRight
} from 'lucide-react';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const country = await prisma.country.findUnique({
    where: { slug },
  });

  if (!country) return {};

  return {
    title: `Mijn Bucketlist voor ${country.name} - Reisdoelen & Motivatie`,
    description: `Ontdek waarom ik ${country.name} wil bezoeken. Mijn persoonlijke motivatie, bezienswaardigheden, beste reistijd en ${country.name} bucketlist-items.`,
    alternates: {
      canonical: `/landen/${country.slug}`,
    },
  };
}

export default async function CountryDetailPage({ params }: Props) {
  const { slug } = await params;
  const country = await prisma.country.findUnique({
    where: { slug },
    include: {
      places: {
        orderBy: { name: 'asc' },
      },
      items: {
        include: {
          categories: true,
          place: true,
        },
        orderBy: { dateAdded: 'desc' },
      },
    },
  });

  if (!country) {
    notFound();
  }

  // Schema: TouristDestination + FAQPage
  const destinationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: country.name,
    description: country.shortDescription,
    image: country.image,
    containedInPlace: {
      '@type': 'Place',
      name: country.continent,
    },
    touristType: 'Adventure, Culture, Nature',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Waarom staat ${country.name} op mijn bucketlist?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: country.visitReason,
        },
      },
      {
        '@type': 'Question',
        name: `Wat is de beste reistijd voor ${country.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: country.bestTravelTime,
        },
      },
      {
        '@type': 'Question',
        name: `Wat is mijn persoonlijke motivatie voor ${country.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: country.personalMotivation,
        },
      },
    ],
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'bezocht': return 'Bezocht';
      case 'gepland': return 'Gepland';
      default: return 'Wil ik bezoeken';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'bezocht': return 'bg-[#27AE60] text-white';
      case 'gepland': return 'bg-[#FF9F43] text-white';
      default: return 'bg-[#D4AF37] text-primary';
    }
  };

  return (
    <>
      <SchemaOrg schema={[destinationSchema, faqSchema]} />

      {/* Hero Banner Area */}
      <section className="relative h-[250px] sm:h-[400px] md:h-[480px] bg-[#0B192C] overflow-hidden select-none border-b border-[#D4AF37]/15">
        <img
          src={country.image}
          alt={`Prachtig uitzicht in ${country.name}`}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/10 to-transparent" />
        
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#F4F2EE] bg-white/10 px-3 py-1 border border-white/20 rounded backdrop-blur-sm">
                {country.continent}
              </span>
              <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 ${getStatusColor(country.status)}`}>
                {getStatusLabel(country.status)}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white">{country.name}</h1>
          </div>
        </div>
      </section>

      {/* Breadcrumbs & Layout Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <Breadcrumbs items={[
          { label: 'Landen', url: '/landen' },
          { label: country.name, url: `/landen/${country.slug}` }
        ]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Quick Answer Summary Block (GEO AI Optimization) */}
            <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md space-y-4">
              <h2 className="text-xl font-bold text-primary flex items-center gap-2 border-b border-primary/5 pb-2">
                <Info className="w-5 h-5 text-gold" />
                Snelle Feiten &amp; Overzicht
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                <div className="p-3 bg-sand/30 border border-primary/5 rounded-xl">
                  <span className="text-primary/50 uppercase text-[9px] tracking-wider block mb-0.5">Beste Reistijd</span>
                  <span className="text-primary font-bold">{country.bestTravelTime}</span>
                </div>
                <div className="p-3 bg-sand/30 border border-primary/5 rounded-xl">
                  <span className="text-primary/50 uppercase text-[9px] tracking-wider block mb-0.5">Focus bestemming</span>
                  <span className="text-primary font-bold">{country.name} ({country.continent})</span>
                </div>
              </div>

              <p className="text-sm text-primary/80 leading-relaxed font-semibold">
                {country.longDescription}
              </p>
            </div>

            {/* Why Visit and Motivation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md space-y-3">
                <h3 className="font-extrabold text-sm uppercase text-gold tracking-widest flex items-center gap-2">
                  <Heart className="w-4 h-4 text-gold fill-gold" />
                  Waarom dit land bezoeken?
                </h3>
                <p className="text-xs text-primary/80 font-medium leading-relaxed">
                  {country.visitReason}
                </p>
              </div>

              <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md space-y-3">
                <h3 className="font-extrabold text-sm uppercase text-gold tracking-widest flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  Persoonlijke Motivatie
                </h3>
                <p className="text-xs text-primary/80 font-medium leading-relaxed italic">
                  &quot;{country.personalMotivation}&quot;
                </p>
              </div>
            </div>

            {/* Gekoppelde Bucketlist Items */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <Compass className="w-5.5 h-5.5 text-gold" />
                Bucketlist-ervaringen in {country.name}
              </h2>

              {country.items.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {country.items.map((item) => (
                    <div
                      key={item.id}
                      className="group flex flex-col bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="h-40 relative overflow-hidden bg-primary/10">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/80 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 text-white">
                          <span className="text-[9px] text-gold font-bold uppercase tracking-widest block">{item.lifeArea}</span>
                          <h4 className="font-bold text-sm leading-tight">{item.title}</h4>
                        </div>
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                        <p className="text-xs text-primary/75 line-clamp-2 leading-relaxed font-semibold">
                          {item.shortDescription}
                        </p>
                        <div className="flex justify-between items-center text-[10px] font-bold border-t border-primary/5 pt-2 text-primary/50">
                          <span>Status: {item.status === 'gedaan' ? 'Gedaan' : item.status === 'gepland' ? 'Gepland' : 'Nog te doen'}</span>
                          {item.place && (
                            <Link
                              href={`/plaatsen/${item.place.slug}`}
                              className="text-gold flex items-center gap-0.5 hover:underline"
                            >
                              Bekijk plek <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 bg-white border border-primary/5 rounded-2xl text-xs font-semibold text-primary/65">
                  Nog geen specifieke bucketlist-items toegevoegd voor {country.name}.
                </div>
              )}
            </div>

            {/* Local FAQ Blocks (GEO AI Search Optimization) */}
            <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md space-y-4">
              <h2 className="text-xl font-bold text-primary flex items-center gap-2 border-b border-primary/5 pb-2">
                <HelpCircle className="w-5 h-5 text-gold" />
                Veelgestelde Vragen over {country.name}
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-primary flex items-start gap-1.5">
                    <span className="text-gold font-black">Q:</span>
                    Waarom staat {country.name} op deze bucketlist?
                  </h4>
                  <p className="text-xs text-primary/75 pl-5 font-semibold leading-relaxed">
                    {country.visitReason}
                  </p>
                </div>
                <div className="space-y-1 border-t border-primary/5 pt-3">
                  <h4 className="text-sm font-bold text-primary flex items-start gap-1.5">
                    <span className="text-gold font-black">Q:</span>
                    Wat is de ideale periode om {country.name} te bezoeken?
                  </h4>
                  <p className="text-xs text-primary/75 pl-5 font-semibold leading-relaxed">
                    {country.bestTravelTime}
                  </p>
                </div>
                {country.geoKeywords && (
                  <div className="space-y-1 border-t border-primary/5 pt-3">
                    <h4 className="text-sm font-bold text-primary flex items-start gap-1.5">
                      <span className="text-gold font-black">Q:</span>
                      Welke regio&apos;s of trefwoorden zijn gekoppeld aan deze droom?
                    </h4>
                    <p className="text-xs text-primary/75 pl-5 font-semibold leading-relaxed italic">
                      Gekoppelde reisdoelen: {country.geoKeywords}
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Gekoppelde steden / plaatsen */}
            <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md space-y-4">
              <h3 className="font-bold text-primary text-base border-b border-primary/5 pb-2 flex items-center gap-2">
                <MapPin className="text-gold w-4 h-4" />
                Steden &amp; Plekken in {country.name}
              </h3>
              
              {country.places.length > 0 ? (
                <ul className="space-y-3 font-semibold text-xs">
                  {country.places.map((place) => (
                    <li key={place.id} className="group border border-primary/5 rounded-xl p-3 bg-sand/30 hover:border-gold/30 hover:shadow-sm transition-all duration-300">
                      <Link href={`/plaatsen/${place.slug}`} className="flex justify-between items-center gap-2">
                        <div className="space-y-0.5">
                          <span className="block font-bold text-primary group-hover:text-gold transition-colors">
                            {place.name}
                          </span>
                          <span className="block text-[10px] text-primary/50">{place.type}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-primary/30 group-hover:text-gold transform group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-primary/50 font-semibold italic text-center py-4">
                  Nog geen specifieke steden/plaatsen gekoppeld.
                </p>
              )}
            </div>

            {/* Travel Call to Action */}
            <div className="bg-[#0B192C] text-white border border-[#D4AF37]/15 rounded-2xl p-6 shadow-xl space-y-4 select-none relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <Globe className="w-40 h-40 text-gold -right-10 -bottom-10 absolute animate-spin-slow" />
              </div>
              <h3 className="font-bold text-white text-base flex items-center gap-2 relative z-10">
                <Compass className="text-gold w-4 h-4 animate-bounce" />
                Plannen maken?
              </h3>
              <p className="text-xs text-[#F4F2EE]/75 leading-relaxed relative z-10">
                Ontdek de specifieke steden, bezienswaardigheden en bijzondere plekken die gepland staan of bezocht zijn in {country.name}.
              </p>
              <Link
                href="/plaatsen"
                className="w-full text-center block text-xs font-bold text-primary bg-gold hover:bg-white border border-gold hover:border-white py-2.5 rounded-full shadow-md transition-all duration-300 relative z-10"
              >
                Verken steden &amp; plekken
              </Link>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
