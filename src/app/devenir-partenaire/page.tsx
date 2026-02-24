'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import tr, { t } from '@/i18n/translations';
import Navbar from '@/components/Navbar';
import BookingModal from '@/components/BookingModal';
import TestimonialCard from '@/components/TestimonialCard';
import PartnersCarousel from '@/components/PartnersCarousel';

export default function DevenirPartenairePage() {
  const { lang } = useLang();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const processSteps = tr.partner.howSteps[lang];
  const features = tr.partner.features[lang];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero — fond image pleine largeur */}
      <section className="relative pt-20 min-h-screen flex items-center overflow-hidden">
        <Image src="/images/hero3.jpg" alt="Partenaire Alzéa" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[#32373c]/75" />
        <div className="relative z-10 w-full px-8 lg:px-16 xl:px-24 py-20">
          <div className="max-w-2xl">
            <p className="text-[#33A7B5] text-sm font-medium tracking-wider uppercase mb-4">
              {t(tr.partner.badge, lang)}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {t(tr.partner.heroTitle1, lang)}{' '}
              <span className="text-[#D13D6A]">Alzéa</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed">
              {t(tr.partner.heroSub, lang)}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#D13D6A] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#B8325A] transition-all text-lg"
              >
                {t(tr.partner.ctaCall, lang)} →
              </button>
              <a
                href="#process"
                className="border-2 border-white/40 text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#32373c] transition-all"
              >
                {t(tr.partner.ctaHow, lang)}
              </a>
            </div>
            {/* Badge */}
            <div className="mt-10 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-5 py-3 border border-white/20">
              <div className="w-3 h-3 bg-green-400 rounded-full" />
              <span className="text-white text-sm font-medium">{t(tr.partner.badgePartners, lang)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#32373c] mb-4">
            {t(tr.partner.whyTitle1, lang)} <span className="text-[#D13D6A]">{t(tr.partner.whyTitle2, lang)}</span> {t(tr.partner.whySuffix, lang)}
          </h2>
          <p className="text-gray-500 text-center mb-16 max-w-2xl mx-auto">
            {t(tr.partner.whySub, lang)}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-all">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-[#32373c] mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process - 3 étapes horizontales */}
      <section id="process" className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#32373c] mb-4">
            {t(tr.partner.howTitle, lang)}
          </h2>
          <p className="text-gray-500 text-center mb-16">
            {t(tr.partner.howSub, lang)}
          </p>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Ligne pointillée horizontale (desktop) */}
            <div className="hidden md:block absolute top-8 left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-0.5 border-t-2 border-dashed border-gray-300" />

            {processSteps.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 rounded-full bg-[#D13D6A] text-white text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg relative z-10">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-[#33A7B5] uppercase tracking-widest mb-2">
                  {t(tr.partner.howStepLabel, lang)} {i + 1}
                </div>
                <h3 className="font-bold text-[#32373c] mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#32373c] mb-4">
            {t(tr.partner.testimTitle, lang)}
          </h2>
          <p className="text-gray-500 text-center mb-12">
            {t(tr.partner.testimSub, lang)}
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <TestimonialCard
              quote={t(tr.partner.testim1Quote, lang)}
              author="Thomas R."
              role={t(tr.partner.testim1Role, lang)}
              rating={5}
              initials="TR"
              image="/images/avis/thomas.jpg"
            />
            <TestimonialCard
              quote={t(tr.partner.testim2Quote, lang)}
              author="Claire D."
              role={t(tr.partner.testim2Role, lang)}
              rating={5}
              initials="CD"
              image="/images/avis/claire.jpg"
            />
          </div>
        </div>
      </section>

      {/* Partners Carousel */}
      <section className="py-16 bg-white border-t border-gray-100 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#32373c] mb-2">
            {t(tr.partner.partnersTitle, lang)}
          </h2>
          <p className="text-gray-500 text-center text-sm">
            {t(tr.partner.partnersSub, lang)}
          </p>
        </div>
        <PartnersCarousel />
      </section>

      {/* CTA Dark */}
      <section className="py-24 px-6 bg-[#32373c]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t(tr.partner.ctaTitle, lang)}
          </h2>
          <p className="text-gray-400 mb-8">
            {t(tr.partner.ctaSub, lang)}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#32373c] transition-all"
          >
            {t(tr.partner.ctaCall, lang)} →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#32373c] text-white border-t border-gray-600">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <Image src="/images/logo-alzea.png" alt="Alzéa" width={120} height={60} className="h-10 w-auto mb-4 brightness-0 invert" />
              <p className="text-gray-400 text-sm">{t(tr.footer.desc, lang)}</p>
            </div>
            <div>
              <div className="font-semibold mb-3">{t(tr.footer.contact, lang)}</div>
              <p className="text-gray-400 text-sm">Lyon, France</p>
              <p className="text-gray-400 text-sm">contact@alzea.org</p>
            </div>
            <div>
              <div className="font-semibold mb-3">{t(tr.footer.links, lang)}</div>
              <Link href="/start" className="text-gray-400 text-sm hover:text-white block">{t(tr.footer.programs, lang)}</Link>
              <Link href="/#about" className="text-gray-400 text-sm hover:text-white block">{t(tr.footer.about, lang)}</Link>
            </div>
          </div>
          <div className="border-t border-gray-600 pt-8 text-center text-gray-500 text-sm">
            {t(tr.footer.rights, lang)}
          </div>
        </div>
      </footer>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} lang={lang} />
    </main>
  );
}
