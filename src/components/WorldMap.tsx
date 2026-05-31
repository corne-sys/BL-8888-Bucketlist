'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MapPin, CheckCircle, Calendar, Eye } from 'lucide-react';

interface ActiveCountry {
  id: string;
  name: string;
  slug: string;
  status: 'bezocht' | 'gepland' | 'nog_te_bezoeken';
  continent: string;
  x: number; // Percentages on map canvas
  y: number;
  description: string;
}

const featuredCountries: ActiveCountry[] = [
  {
    id: '1',
    name: 'Canada',
    slug: 'canada',
    status: 'nog_te_bezoeken',
    continent: 'Noord-Amerika',
    x: 20,
    y: 28,
    description: 'Eindeloze wildernis, kristalheldere gletsjermeren.',
  },
  {
    id: '2',
    name: 'Peru',
    slug: 'peru',
    status: 'nog_te_bezoeken',
    continent: 'Zuid-Amerika',
    x: 32,
    y: 65,
    description: 'Het mystieke land van de Inca’s en het Andesgebergte.',
  },
  {
    id: '3',
    name: 'IJsland',
    slug: 'ijsland',
    status: 'nog_te_bezoeken',
    continent: 'Europa',
    x: 42,
    y: 20,
    description: 'Het ruwe land van vuur en ijs.',
  },
  {
    id: '4',
    name: 'Noorwegen',
    slug: 'noorwegen',
    status: 'nog_te_bezoeken',
    continent: 'Europa',
    x: 48,
    y: 22,
    description: 'Majestueuze fjorden en het magische Noorderlicht.',
  },
  {
    id: '5',
    name: 'Portugal',
    slug: 'portugal',
    status: 'gepland',
    continent: 'Europa',
    x: 44,
    y: 42,
    description: 'Historische steden en een warme oceaansfeer.',
  },
  {
    id: '6',
    name: 'Spanje',
    slug: 'spanje',
    status: 'bezocht',
    continent: 'Europa',
    x: 47,
    y: 43,
    description: 'Levendige cultuur, Gaudí-architectuur en zon.',
  },
  {
    id: '7',
    name: 'Italië',
    slug: 'italie',
    status: 'bezocht',
    continent: 'Europa',
    x: 51,
    y: 42,
    description: 'De bakermat van de Renaissance en culinaire perfectie.',
  },
  {
    id: '8',
    name: 'Griekenland',
    slug: 'griekenland',
    status: 'nog_te_bezoeken',
    continent: 'Europa',
    x: 54,
    y: 45,
    description: 'Witte huisjes en diepblauwe koepels aan de Egeïsche zee.',
  },
  {
    id: '9',
    name: 'Japan',
    slug: 'japan',
    status: 'nog_te_bezoeken',
    continent: 'Azië',
    x: 82,
    y: 38,
    description: 'Eeuwenoude boeddhistische tempels en hypermoderne steden.',
  },
  {
    id: '10',
    name: 'Nieuw-Zeeland',
    slug: 'nieuw-zeeland',
    status: 'nog_te_bezoeken',
    continent: 'Oceanië',
    x: 90,
    y: 82,
    description: 'Adembenemende fjorden, regenwouden en Great Walks.',
  },
];

export default function WorldMap() {
  const router = useRouter();
  const [hoveredCountry, setHoveredCountry] = useState<ActiveCountry | null>(null);

  const getStatusColor = (status: ActiveCountry['status']) => {
    switch (status) {
      case 'bezocht':
        return '#27AE60'; // Emerald Green
      case 'gepland':
        return '#FF9F43'; // Warm Orange
      case 'nog_te_bezoeken':
        return '#D4AF37'; // Gold
    }
  };

  const getStatusLabel = (status: ActiveCountry['status']) => {
    switch (status) {
      case 'bezocht':
        return 'Bezocht';
      case 'gepland':
        return 'Gepland';
      case 'nog_te_bezoeken':
        return 'Wil ik bezoeken';
    }
  };

  const handleCountryClick = (slug: string) => {
    router.push(`/landen/${slug}`);
  };

  return (
    <div className="w-full relative bg-white border border-[#D4AF37]/15 rounded-2xl p-6 overflow-hidden select-none shadow-lg">
      {/* Background Graphic representing simplified world grid lines */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Equator & Meridian */}
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="6,6" strokeOpacity="0.4" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="6,6" strokeOpacity="0.4" />
        </svg>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-primary/5 pb-4 relative z-10">
        <div>
          <h3 className="text-xl font-black text-primary flex items-center gap-2">
            <Globe className="text-gold w-5 h-5 animate-pulse" />
            Interactieve Levenskaart
          </h3>
          <p className="text-xs text-primary/70 font-semibold mt-0.5">
            Navigeer door de landen om mijn reisdoelen en plannen te ontdekken.
          </p>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-primary/80">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#27AE60] shadow-sm" />
            <span>Bezocht</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF9F43] shadow-sm" />
            <span>Gepland</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#D4AF37] shadow-sm" />
            <span>Wil ik bezoeken</span>
          </div>
        </div>
      </div>

      {/* Styled Map Container */}
      <div className="w-full h-[280px] sm:h-[400px] md:h-[450px] relative bg-[#E4ECEF] rounded-xl overflow-hidden border border-primary/5 shadow-inner">
        {/* Stylized background map shapes (SVG path representation of major continents) */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-100">
          {/* Greenland */}
          <path d="M 38,10 L 46,8 L 47,15 L 42,20 L 37,14 Z" fill="#E6DEC9" stroke="white" strokeWidth="0.3" />
          
          {/* North America (Alaska, Canada, USA, Mexico, Central America) */}
          <path d="M 3,18 L 8,16 L 14,14 L 20,12 L 28,14 L 32,18 L 34,22 L 30,26 L 33,32 L 29,36 L 24,35 L 26,38 L 22,40 L 25,44 L 27,45 L 23,50 L 19,43 L 18,39 L 14,35 L 12,32 L 10,29 L 6,29 L 5,26 Z" fill="#E6DEC9" stroke="white" strokeWidth="0.3" />
          
          {/* South America */}
          <path d="M 23,50 L 27,49 L 32,53 L 36,58 L 33,68 L 29,82 L 26,86 L 25,83 L 26,76 L 23,65 L 21,58 Z" fill="#E6DEC9" stroke="white" strokeWidth="0.3" />
          
          {/* Europe & Asia (Combined Eurasia landmass) */}
          <path d="M 38,28 L 41,26 L 42,20 L 44,21 L 46,24 L 47,28 L 50,28 L 52,24 L 54,23 L 56,26 L 60,25 L 68,22 L 76,23 L 84,24 L 92,26 L 94,30 L 91,33 L 92,38 L 88,42 L 89,47 L 85,51 L 82,53 L 80,51 L 80,47 L 78,45 L 75,48 L 71,49 L 68,44 L 69,38 L 65,36 L 60,37 L 57,41 L 53,46 L 51,46 L 50,43 L 47,43 L 46,39 L 43,39 L 41,34 L 37,33 Z" fill="#E6DEC9" stroke="white" strokeWidth="0.3" />
          
          {/* British Isles */}
          <path d="M 37,26 L 39,24 L 40,27 L 38,29 Z" fill="#E6DEC9" stroke="white" strokeWidth="0.3" />

          {/* Japan */}
          <path d="M 83,34 L 85,36 L 84,40 L 82,42 Z" fill="#E6DEC9" stroke="white" strokeWidth="0.3" />

          {/* Africa */}
          <path d="M 42,48 L 47,46 L 53,48 L 57,51 L 58,56 L 54,58 L 53,62 L 51,68 L 49,76 L 47,78 L 47,74 L 45,64 L 43,59 L 39,56 L 40,51 Z" fill="#E6DEC9" stroke="white" strokeWidth="0.3" />
          
          {/* Madagascar */}
          <path d="M 54,70 L 56,72 L 55,77 L 53,74 Z" fill="#E6DEC9" stroke="white" strokeWidth="0.3" />

          {/* Australia */}
          <path d="M 76,68 L 81,65 L 86,67 L 88,71 L 86,77 L 81,78 L 76,76 L 74,72 Z" fill="#E6DEC9" stroke="white" strokeWidth="0.3" />
          
          {/* Tasmania */}
          <path d="M 83,81 L 85,81 L 84,83 Z" fill="#E6DEC9" stroke="white" strokeWidth="0.3" />

          {/* New Zealand */}
          <path d="M 89,80 L 91,82 L 90,85 Z" fill="#E6DEC9" stroke="white" strokeWidth="0.3" />
        </svg>

        {/* Interactive Country Pins */}
        {featuredCountries.map((country) => {
          const isHovered = hoveredCountry?.id === country.id;
          const pinColor = getStatusColor(country.status);

          return (
            <div
              key={country.id}
              style={{ left: `${country.x}%`, top: `${country.y}%` }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              onMouseEnter={() => setHoveredCountry(country)}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => handleCountryClick(country.slug)}
            >
              {/* Pulsing ring for selected/hovered state */}
              <div 
                style={{ borderColor: pinColor }}
                className="absolute inset-0 w-8 h-8 -left-2.5 -top-2.5 rounded-full border border-dashed animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
              />
              
              {/* Outer Glow */}
              <div 
                style={{ backgroundColor: pinColor }}
                className="absolute inset-0 w-3 h-3 rounded-full opacity-35 group-hover:scale-250 transition-all duration-300 animate-ping"
              />

              {/* Pin Center */}
              <div
                style={{ backgroundColor: pinColor }}
                className="w-3.5 h-3.5 rounded-full border border-white relative shadow-md transition-transform duration-300 group-hover:scale-130"
              >
                {/* Visual arrow pointing down */}
                <div 
                  style={{ borderTopColor: pinColor }}
                  className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[5px] absolute top-full left-1/2 transform -translate-x-1/2"
                />
              </div>

              {/* Country Name Label under marker */}
              <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-white border border-[#D4AF37]/20 rounded px-1.5 py-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-md">
                <span className="text-[10px] text-[#0B192C] font-bold">{country.name}</span>
              </div>
            </div>
          );
        })}

        {/* Tooltip Overlay */}
        <AnimatePresence>
          {hoveredCountry && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-[280px] bg-white border border-[#D4AF37]/20 rounded-xl p-4 shadow-xl z-30 pointer-events-none"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-[#0B192C] text-sm flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gold" />
                  {hoveredCountry.name}
                </h4>
                <span 
                  style={{ 
                    backgroundColor: `${getStatusColor(hoveredCountry.status)}15`, 
                    color: getStatusColor(hoveredCountry.status),
                    borderColor: getStatusColor(hoveredCountry.status)
                  }}
                  className="text-[10px] font-bold px-2 py-0.5 border rounded-full"
                >
                  {getStatusLabel(hoveredCountry.status)}
                </span>
              </div>
              <span className="text-[10px] text-primary/60 font-semibold block mt-0.5">
                {hoveredCountry.continent}
              </span>
              <p className="text-xs text-[#0B192C]/80 mt-2 line-clamp-2 italic">
                &quot;{hoveredCountry.description}&quot;
              </p>
              <div className="flex items-center gap-1 mt-3 pt-2 border-t border-primary/5 text-[10px] text-gold font-bold">
                <Eye className="w-3.5 h-3.5" />
                <span>Klik om details te bekijken</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
