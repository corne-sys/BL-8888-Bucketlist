import React from 'react';
import Link from 'next/link';
import { Compass, Mail, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B192C] text-[#F4F2EE] border-t border-[#D4AF37]/15 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group w-max">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold transition-all duration-300 group-hover:scale-110">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-wider text-white">
                Mijn Bucket List
              </span>
            </Link>
            <p className="text-sm text-[#F4F2EE]/70 max-w-sm font-medium leading-relaxed">
              Een persoonlijke levenskaart vol dromen, landen en levensdoelen die mij inspireren om bewuster te leven, de wereld te ontdekken en betekenisvol bij te dragen.
            </p>
            <div className="flex items-center gap-2 text-xs text-gold/80 font-bold bg-white/5 border border-white/5 rounded-full px-3 py-1.5 w-max">
              <Mail className="w-3.5 h-3.5" />
              <span>contact@mijnlevensreis.nl</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#D4AF37]/20 pb-2 w-max">
              Ontdekken
            </h4>
            <ul className="space-y-2 text-sm text-[#F4F2EE]/75 font-medium">
              <li>
                <Link href="/landen" className="hover:text-gold transition-colors">
                  Landen Overzicht
                </Link>
              </li>
              <li>
                <Link href="/plaatsen" className="hover:text-gold transition-colors">
                  Steden & Plekken
                </Link>
              </li>
              <li>
                <Link href="/avonturen" className="hover:text-gold transition-colors">
                  Mijn Avonturen
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Metadata links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#D4AF37]/20 pb-2 w-max">
              Informatie
            </h4>
            <ul className="space-y-2 text-sm text-[#F4F2EE]/75 font-medium">
              <li>
                <Link href="/sitemap.xml" target="_blank" className="hover:text-gold transition-colors">
                  XML Sitemap
                </Link>
              </li>
              <li>
                <Link href="/robots.txt" target="_blank" className="hover:text-gold transition-colors">
                  Robots.txt
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="border-t border-[#D4AF37]/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#F4F2EE]/50 font-semibold">
          <p>© 2026 Mijn Bucket List. Dromen, ontdekken, groeien.</p>
          <p className="flex items-center gap-1">
            Gemaakt met <Heart className="w-3.5 h-3.5 text-gold animate-beat fill-gold" />.
          </p>
        </div>
      </div>
    </footer>
  );
}
