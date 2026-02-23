'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BookingModal from './BookingModal';

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

interface LandingPageProps {
  lang: 'fr' | 'en';
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaSubtext: string;
  features: Feature[];
  featuresTitle: string;
  extraSection?: React.ReactNode;
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
}

export default function LandingPage({
  lang,
  badge,
  title,
  subtitle,
  ctaText,
  ctaSubtext,
  features,
  featuresTitle,
  extraSection,
  testimonial,
}: LandingPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navCta = lang === 'fr' ? 'Réserver un appel' : 'Book a call';
  const footerText = lang === 'fr' ? 'Mobilité internationale depuis 2005' : 'International mobility since 2005';
  const ctaTitle = lang === 'fr' ? 'Prêt à vous lancer ?' : 'Ready to start?';
  const ctaDesc = lang === 'fr' 
    ? 'Discutez avec un conseiller et concrétisez votre projet'
    : 'Talk to an advisor and make your project happen';

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <Image
              src="/images/logo-alzea.png"
              alt="Alzéa"
              width={120}
              height={60}
              className="h-10 w-auto"
            />
          </Link>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#D13D6A] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#B8325A] transition-all text-sm"
          >
            {navCta}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-3xl mx-auto text-center animate-fadeIn">
          <p className="text-[#33A7B5] text-sm font-medium tracking-wider uppercase mb-4">
            {badge}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#32373c] leading-tight mb-6">
            {title}
          </h1>
          <p className="text-xl text-gray-500 mb-10">
            {subtitle}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#D13D6A] hover:bg-[#B8325A] text-white font-semibold px-8 py-4 rounded-full text-lg transition-all hover:shadow-lg hover:shadow-pink-500/20"
          >
            {ctaText}
          </button>
          <p className="mt-4 text-gray-400 text-sm">
            {ctaSubtext}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#32373c] mb-16">{featuresTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-[#32373c] mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Section */}
      {extraSection}

      {/* Testimonial */}
      {testimonial && (
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl text-gray-700 italic mb-6">"{testimonial.text}"</p>
            <p className="font-semibold text-[#32373c]">{testimonial.author}</p>
            <p className="text-[#D13D6A] text-sm">{testimonial.role}</p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#32373c] mb-4">{ctaTitle}</h2>
          <p className="text-gray-500 mb-8">{ctaDesc}</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#D13D6A] hover:bg-[#B8325A] text-white font-semibold px-8 py-4 rounded-full text-lg transition-all hover:shadow-lg hover:shadow-pink-500/20"
          >
            {ctaText}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#32373c] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo-alzea.png"
                alt="Alzéa"
                width={100}
                height={50}
                className="h-8 w-auto brightness-0 invert"
              />
              <span className="text-gray-400 text-sm">{footerText}</span>
            </div>
            <p className="text-gray-500 text-sm">© 2025 Alzéa</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        lang={lang}
      />
    </main>
  );
}
