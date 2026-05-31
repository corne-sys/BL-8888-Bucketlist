'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumbs from '@/components/Breadcrumbs';
import { 
  Compass, Globe, Eye, Info, LayoutGrid, List, 
  Calendar, CheckCircle, HelpCircle, ArrowRight, X, Award
} from 'lucide-react';

interface Country {
  name: string;
}

interface Adventure {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  personalMotivation: string;
  whyOnList: string;
  experienceGoal: string;
  image: string;
  status: string;
  lifeArea: string;
  country: Country | null;
}

interface AdventuresClientProps {
  initialAdventures: Adventure[];
}

export default function AdventuresClient({ initialAdventures }: AdventuresClientProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeModalAdventure, setActiveModalAdventure] = useState<Adventure | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'gedaan':
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
      case 'gedaan':
      case 'bezocht': return 'Voltooid';
      case 'gepland': return 'Gepland';
      default: return 'Nog te doen';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col select-none">
      <Breadcrumbs items={[{ label: 'Avonturen', url: '/avonturen' }]} />

      {/* Header */}
      <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-primary/5 pb-6">
        <div>
          <span className="text-xs font-bold text-gold uppercase tracking-widest block">Grensverleggende ervaringen</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight mt-1">
            Mijn Avonturen
          </h1>
          <p className="text-sm text-primary/65 font-medium mt-2 max-w-xl">
            Een overzicht van bijzondere tochten, overnachtingen en grensverleggende activiteiten die op mijn bucketlist staan of al zijn voltooid.
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
      {initialAdventures.length > 0 ? (
        viewMode === 'grid' ? (
          /* Grid View */
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {initialAdventures.map((adv) => (
              <motion.div
                layout
                key={adv.id}
                onClick={() => setActiveModalAdventure(adv)}
                className="group flex flex-col bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                {/* Photo Area */}
                <div className="h-56 relative overflow-hidden bg-primary/10">
                  <img
                    src={adv.image}
                    alt={adv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
                  
                  {/* Category Tag */}
                  <span className="absolute top-4 left-4 text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded bg-white/10 backdrop-blur-sm text-white border border-white/20">
                    {adv.lifeArea}
                  </span>

                  {/* Status Badge */}
                  <span className={`absolute top-4 right-4 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 border rounded-full text-white ${getStatusColor(adv.status)}`}>
                    {getStatusLabel(adv.status)}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    {adv.country && (
                      <span className="text-[10px] text-gold font-bold uppercase tracking-widest flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5" />
                        <span>{adv.country.name}</span>
                      </span>
                    )}
                    <h3 className="text-xl font-bold">{adv.title}</h3>
                  </div>
                </div>

                {/* Description & Specs */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-5">
                  <p className="text-sm text-primary/75 line-clamp-3 leading-relaxed font-medium">
                    {adv.shortDescription}
                  </p>

                  <div className="border-t border-primary/5 pt-3 flex justify-between items-center text-xs font-bold">
                    <span className="text-primary/40 flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5" />
                      <span>Avontuur</span>
                    </span>
                    <span className="text-gold group-hover:text-orange flex items-center gap-0.5">
                      Lees details <ArrowRight className="w-3.5 h-3.5 ml-0.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* List View (Minimalist Amalfi Coast Design) */
          <motion.div 
            layout
            className="space-y-6"
          >
            {initialAdventures.map((adv) => (
              <div
                key={adv.id}
                onClick={() => setActiveModalAdventure(adv)}
                className="group bg-white border border-primary/5 hover:border-gold/30 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col space-y-3 cursor-pointer"
              >
                {/* Top Meta Row */}
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gold font-bold uppercase tracking-widest bg-sand px-2.5 py-1.5 rounded-lg border border-primary/5">
                      {adv.lifeArea}
                    </span>
                    {adv.country && (
                      <span className="text-[10px] text-primary/55 font-bold uppercase tracking-widest flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5" />
                        <span>{adv.country.name}</span>
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 border rounded-full text-white ${getStatusColor(adv.status)}`}>
                    {getStatusLabel(adv.status)}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-2xl font-black text-primary group-hover:text-gold transition-colors duration-300">
                    {adv.title}
                  </h3>
                  <p className="text-sm text-primary/75 mt-2 leading-relaxed font-medium">
                    {adv.shortDescription}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )
      ) : (
        <div className="text-center py-16 bg-white border border-primary/5 rounded-2xl p-8 max-w-sm mx-auto space-y-4">
          <Info className="w-12 h-12 text-gold mx-auto" />
          <h3 className="text-lg font-bold text-primary">Geen avonturen gevonden</h3>
          <p className="text-sm text-primary/60 font-medium">
            Er zijn momenteel geen avonturen beschikbaar op de kaart.
          </p>
        </div>
      )}

      {/* Interactive Modal Detail View */}
      <AnimatePresence>
        {activeModalAdventure && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalAdventure(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#0B192C] text-white border border-[#D4AF37]/15 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 max-h-[85vh] flex flex-col font-sans"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalAdventure(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white hover:text-gold flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Sluiten"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Header */}
              <div className="h-64 relative shrink-0">
                <img
                  src={activeModalAdventure.image}
                  alt={activeModalAdventure.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-[#D4AF37] text-[#0B192C]">
                      {activeModalAdventure.lifeArea}
                    </span>
                    {activeModalAdventure.country && (
                      <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-white/10 border border-white/20 backdrop-blur-sm text-white flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5" />
                        <span>{activeModalAdventure.country.name}</span>
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{activeModalAdventure.title}</h2>
                </div>
              </div>

              {/* Modal Body Contents */}
              <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm leading-relaxed text-[#F4F2EE]/80">
                
                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" />
                    <span>Over dit avontuur</span>
                  </h4>
                  <p className="text-sm font-medium leading-relaxed">
                    {activeModalAdventure.longDescription}
                  </p>
                </div>

                {/* Motivation Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  {/* Motivation */}
                  <div className="space-y-2 bg-white/5 border border-white/5 rounded-2xl p-4">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      <span>Mijn Motivatie</span>
                    </h5>
                    <p className="text-xs font-semibold leading-relaxed">
                      {activeModalAdventure.personalMotivation}
                    </p>
                  </div>

                  {/* Why on List */}
                  <div className="space-y-2 bg-white/5 border border-white/5 rounded-2xl p-4">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Waarom op de lijst?</span>
                    </h5>
                    <p className="text-xs font-semibold leading-relaxed">
                      {activeModalAdventure.whyOnList}
                    </p>
                  </div>
                </div>

                {/* Experience Goal */}
                {activeModalAdventure.experienceGoal && (
                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Wat ik wil ervaren / leren</span>
                    </h4>
                    <p className="text-xs sm:text-sm font-medium leading-relaxed">
                      {activeModalAdventure.experienceGoal}
                    </p>
                  </div>
                )}

                {/* Status Column */}
                <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <span className="text-[#F4F2EE]/50 uppercase font-black tracking-widest text-[10px]">Status:</span>
                    <span className={`px-3 py-1 rounded-full border ${getStatusColor(activeModalAdventure.status)}`}>
                      {getStatusLabel(activeModalAdventure.status)}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveModalAdventure(null)}
                    className="w-full sm:w-auto text-center bg-transparent border border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37] px-6 py-2.5 rounded-xl font-bold transition-colors cursor-pointer text-xs uppercase tracking-wider"
                  >
                    Sluiten
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
