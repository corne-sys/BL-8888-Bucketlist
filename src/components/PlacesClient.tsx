'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/Breadcrumbs';
import { 
  MapPin, Search, Globe, Compass, ArrowRight, 
  Map, Landmark, Eye, Info, LayoutGrid, List
} from 'lucide-react';

interface Place {
  id: string;
  name: string;
  slug: string;
  type: string;
  shortDescription: string;
  image: string;
  status: string;
  country: {
    name: string;
  };
  items: Array<{ id: string }>;
}

interface Country {
  id: string;
  name: string;
}

interface PlacesClientProps {
  initialPlaces: Place[];
  countries: Country[];
}

export default function PlacesClient({ initialPlaces, countries }: PlacesClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountryName, setSelectedCountryName] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Extract unique place types
  const placeTypes = useMemo(() => {
    const list = initialPlaces.map(p => p.type);
    return Array.from(new Set(list)).sort();
  }, [initialPlaces]);

  // Filter places
  const filteredPlaces = useMemo(() => {
    return initialPlaces.filter(place => {
      const matchSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          place.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchCountry = selectedCountryName === '' || place.country.name === selectedCountryName;
      const matchType = selectedType === '' || place.type === selectedType;

      return matchSearch && matchCountry && matchType;
    });
  }, [initialPlaces, searchTerm, selectedCountryName, selectedType]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'bezocht':
        return 'bg-emerald-green/10 text-emerald-green border-emerald-green/30';
      case 'gepland':
        return 'bg-orange/10 text-orange border-orange/30';
      default:
        return 'bg-primary/5 text-primary/80 border-primary/10';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'bezocht': return 'Bezocht';
      case 'gepland': return 'Gepland';
      default: return 'Wil ik bezoeken';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col">
      <Breadcrumbs items={[{ label: 'Plaatsen', url: '/plaatsen' }]} />

      {/* Header */}
      <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-primary/5 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Steden &amp; Bijzondere Plekken
          </h1>
          <p className="text-sm text-primary/65 font-medium mt-2 max-w-xl">
            Verken de specifieke steden, archeologische monumenten, tempels en beschermde natuurgebieden die ik wil ervaren.
          </p>
        </div>

        {/* Switch mode button */}
        <div className="flex items-center gap-1 bg-white border border-primary/10 p-1 rounded-xl shadow-sm self-end sm:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-[#0B192C] text-white shadow-sm' : 'text-primary/60 hover:text-primary'}`}
            title="Tegelweergave"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-[#0B192C] text-white shadow-sm' : 'text-primary/60 hover:text-primary'}`}
            title="Lijstweergave"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      {filteredPlaces.length > 0 ? (
        viewMode === 'grid' ? (
          /* Grid View */
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPlaces.map((place) => (
              <motion.div
                layout
                key={place.id}
                className="group flex flex-col bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Photo Area */}
                <div className="h-56 relative overflow-hidden bg-primary/10">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
                  
                  {/* Type Badge */}
                  <span className="absolute top-4 left-4 text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded bg-white/10 backdrop-blur-sm text-white border border-white/20">
                    {place.type}
                  </span>

                  {/* Status Badge */}
                  <span className={`absolute top-4 right-4 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 border rounded-full text-white ${getStatusColor(place.status)}`}>
                    {getStatusLabel(place.status)}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <span className="text-[10px] text-gold font-bold uppercase tracking-widest flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" />
                      <span>{place.country.name}</span>
                    </span>
                    <h3 className="text-2xl font-black">{place.name}</h3>
                  </div>
                </div>

                {/* Description & Specs */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <p className="text-sm text-primary/75 line-clamp-3 leading-relaxed font-medium">
                      {place.shortDescription}
                    </p>

                    {/* Related items count */}
                    <div className="text-xs font-semibold text-primary/55 flex items-center gap-1 bg-sand/30 border border-primary/5 rounded-lg px-2.5 py-1.5 w-max">
                      <Compass className="w-4 h-4 text-gold" />
                      <span>{place.items.length} gekoppelde {place.items.length === 1 ? 'droom' : 'dromen'}</span>
                    </div>
                  </div>

                  <div className="border-t border-primary/5 pt-3 flex justify-between items-center text-xs font-bold">
                    <span className="text-primary/40 flex items-center gap-1">
                      <Map className="w-3.5 h-3.5" />
                      <span>Reisgids</span>
                    </span>
                    <Link
                      href={`/plaatsen/${place.slug}`}
                      className="text-gold group-hover:text-orange flex items-center gap-0.5"
                    >
                      Ontdek details <ArrowRight className="w-3.5 h-3.5 ml-0.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* List View */
          <motion.div 
            layout
            className="space-y-6"
          >
            {filteredPlaces.map((place) => (
              <Link
                key={place.id}
                href={`/plaatsen/${place.slug}`}
                className="block"
              >
                <motion.div
                  layout
                  className="group bg-white border border-primary/5 hover:border-gold/30 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col space-y-3 cursor-pointer"
                >
                  {/* Top Meta Row */}
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-[10px] text-gold font-bold uppercase tracking-widest flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" />
                      <span>{place.country.name}</span>
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 border rounded-full text-white ${getStatusColor(place.status)}`}>
                      {getStatusLabel(place.status)}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-2xl font-black text-primary group-hover:text-gold transition-colors duration-300">
                      {place.name}
                    </h3>
                    <p className="text-sm text-primary/75 mt-2 leading-relaxed font-medium">
                      {place.shortDescription}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )
      ) : (
        <div className="text-center py-16 bg-white border border-primary/5 rounded-2xl p-8 max-w-sm mx-auto space-y-4">
          <Info className="w-12 h-12 text-gold mx-auto" />
          <h3 className="text-lg font-bold text-primary">Geen plekken gevonden</h3>
          <p className="text-sm text-primary/60 font-medium">
            Er zijn geen steden of plekken die voldoen aan je huidige filters.
          </p>
        </div>
      )}
    </div>
  );
}
