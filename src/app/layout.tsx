import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mijn Bucket List - Mijn Persoonlijke Bucketlist voor een Rijker Leven',
  description:
    'Ontdek steden, landen, persoonlijke ervaringen en levensdoelen die mij inspireren om bewuster te leven, te reizen en bij te dragen.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  openGraph: {
    title: 'Mijn Bucket List - Mijn Persoonlijke Bucketlist',
    description:
      'Ontdek steden, landen, persoonlijke ervaringen en levensdoelen die mij inspireren om bewuster te leven, te reizen en bij te dragen.',
    type: 'website',
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mijn Bucket List - Mijn Persoonlijke Bucketlist',
    description:
      'Ontdek steden, landen, persoonlijke ervaringen en levensdoelen die mij inspireren om bewuster te leven, te reizen en bij te dragen.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${outfit.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-sand text-primary relative">
        <Navbar />
        {/* Padding-top to compensate for the fixed Navbar */}
        <main className="flex-grow pt-24 md:pt-28 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
