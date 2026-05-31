import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaOrg from '@/components/SchemaOrg';
import { 
  MapPin, Globe, Compass, Calendar, CheckCircle, Heart, 
  Info, Sparkles, BookOpen, MessageCircle, HelpCircle, ArrowRight, ClipboardList
} from 'lucide-react';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const place = await prisma.place.findUnique({
    where: { slug },
    include: { country: true },
  });

  if (!place) return {};

  return {
    title: `Bucketlist: ${place.name} in ${place.country.name} - Tips & Motivatie`,
    description: `Ontdek waarom ik ${place.name} wil bezoeken. Wat ik daar wil doen, praktische reistips en gekoppelde bucketlist-items voor deze unieke bestemming.`,
    alternates: {
      canonical: `/plaatsen/${place.slug}`,
    },
  };
}

export default async function PlaceDetailPage({ params }: Props) {
  const { slug } = await params;
  const place = await prisma.place.findUnique({
    where: { slug },
    include: {
      country: true,
      items: {
        include: {
          categories: true,
        },
        orderBy: { dateAdded: 'desc' },
      },
    },
  });

  if (!place) {
    notFound();
  }

  // Schema: Place + FAQPage
  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: place.name,
    description: place.shortDescription,
    image: place.image,
    address: {
      '@type': 'PostalAddress',
      addressCountry: place.country.name,
    },
    additionalType: place.type,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Waarom wil ik ${place.name} bezoeken?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: place.whyVisit,
        },
      },
      {
        '@type': 'Question',
        name: `Wat wil ik doen in ${place.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: place.whatToDo,
        },
      },
      {
        '@type': 'Question',
        name: `Wat zijn praktische tips voor ${place.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: place.practicalTips,
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
      <SchemaOrg schema={[placeSchema, faqSchema]} />

      {/* Hero Banner Area */}
      <section className="relative h-[250px] sm:h-[400px] md:h-[480px] bg-[#0B192C] overflow-hidden select-none border-b border-[#D4AF37]/15">
        <img
          src={place.image}
          alt={`Prachtig uitzicht op ${place.name}`}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/10 to-transparent" />
        
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#F4F2EE] bg-white/10 px-3 py-1 border border-white/20 rounded backdrop-blur-sm">
                {place.type}
              </span>
              <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 ${getStatusColor(place.status)}`}>
                {getStatusLabel(place.status)}
              </span>
              <Link 
                href={`/landen/${place.country.slug}`}
                className="text-[10px] font-black uppercase tracking-widest text-gold bg-white/10 hover:bg-gold hover:text-primary px-3 py-1 border border-white/20 rounded backdrop-blur-sm transition-colors"
              >
                {place.country.name}
              </Link>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white">{place.name}</h1>
          </div>
        </div>
      </section>

      {/* Breadcrumbs & Layout Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <Breadcrumbs items={[
          { label: 'Plaatsen', url: '/plaatsen' },
          { label: place.name, url: `/plaatsen/${place.slug}` }
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
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
                <div className="p-3 bg-sand/30 border border-primary/5 rounded-xl">
                  <span className="text-primary/50 uppercase text-[9px] tracking-wider block mb-0.5">Beste Periode</span>
                  <span className="text-primary font-bold">{place.bestTravelTime}</span>
                </div>
                <div className="p-3 bg-sand/30 border border-primary/5 rounded-xl">
                  <span className="text-primary/50 uppercase text-[9px] tracking-wider block mb-0.5">Type plek</span>
                  <span className="text-primary font-bold">{place.type}</span>
                </div>
                <div className="p-3 bg-sand/30 border border-primary/5 rounded-xl">
                  <span className="text-primary/50 uppercase text-[9px] tracking-wider block mb-0.5">Land</span>
                  <span className="text-primary font-bold">{place.country.name}</span>
                </div>
              </div>

              <p className="text-sm text-primary/80 leading-relaxed font-semibold">
                {place.longDescription}
              </p>
            </div>

            {/* What to do & Practical tips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md space-y-3">
                <h3 className="font-extrabold text-sm uppercase text-gold tracking-widest flex items-center gap-2">
                  <Compass className="w-4 h-4 text-gold" />
                  Wat wil ik daar doen?
                </h3>
                <p className="text-xs text-primary/80 font-medium leading-relaxed">
                  {place.whatToDo}
                </p>
              </div>

              <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md space-y-3">
                <h3 className="font-extrabold text-sm uppercase text-gold tracking-widest flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-gold" />
                  Praktische reistips
                </h3>
                <p className="text-xs text-primary/80 font-medium leading-relaxed">
                  {place.practicalTips}
                </p>
              </div>
            </div>

            {/* Why Visit */}
            <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md space-y-3">
              <h3 className="font-extrabold text-sm uppercase text-gold tracking-widest flex items-center gap-2">
                <Heart className="w-4 h-4 text-gold fill-gold" />
                Waarom wil ik deze plek bezoeken?
              </h3>
              <p className="text-sm text-primary/80 leading-relaxed font-semibold">
                {place.whyVisit}
              </p>
            </div>

            {/* Gekoppelde Bucketlist Items */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <Sparkles className="w-5.5 h-5.5 text-gold" />
                Gekoppelde Bucketlist-ervaringen
              </h2>

              {place.items.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {place.items.map((item) => (
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 bg-white border border-primary/5 rounded-2xl text-xs font-semibold text-primary/65">
                  Nog geen specifieke bucketlist-items toegevoegd voor {place.name}.
                </div>
              )}
            </div>

            {/* Local FAQ Blocks (GEO AI Search Optimization) */}
            <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md space-y-4">
              <h2 className="text-xl font-bold text-primary flex items-center gap-2 border-b border-primary/5 pb-2">
                <HelpCircle className="w-5 h-5 text-gold" />
                Veelgestelde Vragen over {place.name}
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-primary flex items-start gap-1.5">
                    <span className="text-gold font-black">Q:</span>
                    Wat maakt {place.name} tot een bijzondere bucketlistbestemming?
                  </h4>
                  <p className="text-xs text-primary/75 pl-5 font-semibold leading-relaxed">
                    {place.whyVisit}
                  </p>
                </div>
                <div className="space-y-1 border-t border-primary/5 pt-3">
                  <h4 className="text-sm font-bold text-primary flex items-start gap-1.5">
                    <span className="text-gold font-black">Q:</span>
                    Wat zijn de belangrijkste plannen en ervaringen voor {place.name}?
                  </h4>
                  <p className="text-xs text-primary/75 pl-5 font-semibold leading-relaxed">
                    {place.whatToDo}
                  </p>
                </div>
                {place.geoKeywords && (
                  <div className="space-y-1 border-t border-primary/5 pt-3">
                    <h4 className="text-sm font-bold text-primary flex items-start gap-1.5">
                      <span className="text-gold font-black">Q:</span>
                      Wat zijn de geolocatie trefwoorden voor {place.name}?
                    </h4>
                    <p className="text-xs text-primary/75 pl-5 font-semibold leading-relaxed italic">
                      Reistrefwoorden: {place.geoKeywords}
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Country Info card */}
            <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md space-y-4">
              <h3 className="font-bold text-primary text-base border-b border-primary/5 pb-2 flex items-center gap-2">
                <Globe className="text-gold w-4 h-4" />
                Overkoepelend Land
              </h3>
              
              <div className="group border border-primary/5 rounded-xl overflow-hidden bg-sand/30 hover:border-gold/30 hover:shadow-md transition-all duration-300">
                <img 
                  src={place.country.image} 
                  alt={place.country.name} 
                  className="w-full h-32 object-cover" 
                />
                <div className="p-4 space-y-3 font-semibold text-xs text-[#0B192C]">
                  <div className="space-y-0.5">
                    <span className="block font-bold text-primary text-sm group-hover:text-gold transition-colors">
                      {place.country.name}
                    </span>
                    <span className="block text-[10px] text-primary/50">{place.country.continent}</span>
                  </div>
                  <p className="text-[11px] text-primary/70 line-clamp-2 leading-relaxed">
                    {place.country.shortDescription}
                  </p>
                  <Link 
                    href={`/landen/${place.country.slug}`}
                    className="text-gold flex items-center gap-0.5 pt-1 hover:underline"
                  >
                    Ontdek {place.country.name} <ArrowRight className="w-3.5 h-3.5 ml-0.5 transform group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Travel Call to Action */}
            <div className="bg-[#0B192C] text-white border border-[#D4AF37]/15 rounded-2xl p-6 shadow-xl space-y-4 select-none relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <Globe className="w-40 h-40 text-gold -right-10 -bottom-10 absolute animate-spin-slow" />
              </div>
              <h3 className="font-bold text-white text-base flex items-center gap-2 relative z-10">
                <Compass className="text-gold w-4 h-4 animate-bounce" />
                Mijn Levenskaart
              </h3>
              <p className="text-xs text-[#F4F2EE]/75 leading-relaxed relative z-10">
                Verken de rest van de steden, landen, en spirituele levensdoelen die mij inspireren om te leven.
              </p>
              <Link
                href="/plaatsen"
                className="w-full text-center block text-xs font-bold text-primary bg-gold hover:bg-white border border-gold hover:border-white py-2.5 rounded-full shadow-md transition-all duration-300 relative z-10"
              >
                Terug naar alle plaatsen
              </Link>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
