'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Menu, X, Settings, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll for glass transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Landen', href: '/landen' },
    { name: 'Plaatsen', href: '/plaatsen' },
    { name: 'Avonturen', href: '/avonturen' },
    { name: 'Overzicht', href: '/overzicht' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md border-b border-primary/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-gold transition-transform duration-300 group-hover:rotate-45">
              <Compass className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-wider text-primary group-hover:text-gold transition-colors">
              Mijn Bucket List
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm tracking-wide transition-colors ${
                  isActive(link.href)
                    ? 'text-gold'
                    : 'text-primary hover:text-gold'
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gold rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>



          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full text-primary hover:bg-primary/5 hover:text-gold transition-colors"
            aria-label="Menu openen"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-primary/5 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-3 font-semibold">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive(link.href)
                      ? 'bg-gold/10 text-gold'
                      : 'text-primary hover:bg-primary/5 hover:text-gold'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
