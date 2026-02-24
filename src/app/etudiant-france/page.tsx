'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import BookingModal from '@/components/BookingModal';
import JourneyPath from '@/components/JourneyPath';
import TestimonialCard from '@/components/TestimonialCard';
import { useLang } from '@/context/LangContext';
import tr, { t } from '@/i18n/translations';

const destinations = [
  '🇰🇷 Corée du Sud', '🇯🇵 Japon', '🇮🇪 Irlande', '🇪🇸 Espagne', '🇬🇧 Angleterre', '🇵🇹 Portugal',
  '🇮🇹 Italie', '🇬🇷 Grèce', '🇲🇹 Malte', '🇨🇦 Canada', '🇦🇺 Australie', '🇹🇭 Thaïlande',
];

export default function EtudiantFrancePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { lang } = useLang();
  
  const steps = tr.etudiantFr.steps[lang];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-20 min-h-screen flex items-center bg-white overflow-hidden">
        <div className="flex-1 px-8 lg:px-16 xl:px-24 py-12">
          <div className="max-w-xl">
            <p className="text-[#33A7B5] text-sm font-medium tracking-wider uppercase mb-4">
              {t(tr.etudiantFr.badge, lang)}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#32373c] leading-tight mb-6">
              {t(tr.etudiantFr.heroTitle1, lang)}{' '}
              <span className="text-[#D13D6A]">{t(tr.etudiantFr.heroTitle2, lang)}</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl mb-10 leading-relaxed">
              {t(tr.etudiantFr.heroSub, lang)}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#D13D6A] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#B8325A] transition-all text-lg"
              >
                {t(tr.etudiantFr.ctaCall, lang)}
              </button>
              <a
                href="#parcours"
                className="border-2 border-gray-200 text-gray-600 px-8 py-4 rounded-full font-semibold hover:border-[#D13D6A] hover:text-[#D13D6A] transition-all"
              >
                {t(tr.etudiantFr.ctaPath, lang)}
              </a>
            </div>
          </div>
        </div>

        <div className="hidden lg:block flex-1 relative h-[85vh] max-w-2xl">
          <div className="absolute -top-10 -right-20 w-[500px] h-[500px] rounded-full border border-[#D13D6A]/10" />
          <div className="absolute bottom-20 -right-10 w-[300px] h-[300px] rounded-full border border-[#33A7B5]/10" />
          <div className="absolute top-[8%] left-[5%] w-[55%] h-[65%] rounded-3xl overflow-hidden shadow-2xl">
            <Image src="/images/hero1.jpg" alt="Stage international" fill className="object-cover" priority />
          </div>
          <div className="absolute bottom-[5%] right-[5%] w-[50%] h-[45%] rounded-3xl overflow-hidden shadow-2xl">
            <Image src="/images/hero3.jpg" alt="Expérience professionnelle" fill className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-16 px-6 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#32373c] mb-8">
            {t(tr.etudiantFr.destTitle, lang)} <span className="text-[#D13D6A]">{t(tr.etudiantFr.destTitle2, lang)}</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {destinations.map((d) => (
              <span key={d} className="px-5 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm font-medium text-[#32373c] hover:border-[#D13D6A] hover:text-[#D13D6A] transition-all cursor-default">
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Parcours Duolingo */}
      <section id="parcours" className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#32373c] mb-4">
            {t(tr.etudiantFr.pathTitle1, lang)} <span className="text-[#D13D6A]">{t(tr.etudiantFr.pathTitle2, lang)}</span>
          </h2>
          <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">
            {t(tr.etudiantFr.pathSub, lang)}
          </p>
          <JourneyPath steps={steps} />
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#32373c] mb-4">
            {t(tr.etudiantFr.testimTitle, lang)}
          </h2>
          <p className="text-gray-500 text-center mb-12">
            {t(tr.etudiantFr.testimSub, lang)}
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <TestimonialCard
              quote={t(tr.etudiantFr.testim1Quote, lang)}
              author="Marie L."
              role={t(tr.etudiantFr.testim1Role, lang)}
              rating={5}
              initials="ML"
              image="/images/avis/marie.jpg"
            />
            <TestimonialCard
              quote={t(tr.etudiantFr.testim2Quote, lang)}
              author="Lucas M."
              role={t(tr.etudiantFr.testim2Role, lang)}
              rating={5}
              initials="LM"
              image="/images/avis/lucas.jpg"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#32373c] mb-4">
            {t(tr.etudiantFr.ctaTitle, lang)}
          </h2>
          <p className="text-gray-500 mb-8">
            {t(tr.etudiantFr.ctaSub, lang)}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#D13D6A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#B8325A] transition-all"
          >
            {t(tr.etudiantFr.ctaBtn, lang)}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#32373c] text-white">
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
