'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import PartnersCarousel from '@/components/PartnersCarousel';
import { useLang } from '@/context/LangContext';
import tr, { t } from '@/i18n/translations';

export default function Home() {
  const { lang } = useLang();
  const f = tr.home.features[lang];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-20 min-h-screen flex items-center bg-white overflow-hidden">
        <div className="flex-1 px-8 lg:px-16 xl:px-24 py-12">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#32373c] leading-tight mb-6">
              {t(tr.home.heroTitle1, lang)}{' '}
              <span className="text-[#D13D6A]">{t(tr.home.heroTitle2, lang)}</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl mb-10 leading-relaxed">
              {t(tr.home.heroSub, lang)}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/start" className="bg-[#D13D6A] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#B8325A] transition-all text-lg">
                {t(tr.home.heroCta, lang)}
              </Link>
              <Link href="/#about" className="border-2 border-gray-200 text-gray-600 px-8 py-4 rounded-full font-semibold hover:border-[#D13D6A] hover:text-[#D13D6A] transition-all">
                {t(tr.home.heroMore, lang)}
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:block flex-1 relative h-[85vh] max-w-2xl">
          <div className="absolute -top-10 -right-20 w-[500px] h-[500px] rounded-full border border-[#D13D6A]/10" />
          <div className="absolute bottom-20 -right-10 w-[300px] h-[300px] rounded-full border border-[#33A7B5]/10" />
          <div className="absolute top-[8%] left-[5%] w-[55%] h-[65%] rounded-3xl overflow-hidden shadow-2xl">
            <Image src="/images/hero2.jpg" alt="" fill className="object-cover" priority />
          </div>
          <div className="absolute bottom-[5%] right-[5%] w-[50%] h-[45%] rounded-3xl overflow-hidden shadow-2xl">
            <Image src="/images/hero1.jpg" alt="" fill className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-6 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '20', suffix: ' ans', label: t(tr.home.stat1Label, lang) },
              { number: '200', suffix: '+', label: t(tr.home.stat2Label, lang) },
              { number: '400', suffix: '', label: t(tr.home.stat3Label, lang) },
              { number: '15', suffix: '+', label: '' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-bold text-[#D13D6A]">
                  {stat.number}<span className="text-[#33A7B5]">{stat.suffix}</span>
                </div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 images */}
      <section className="grid grid-cols-1 md:grid-cols-3 w-full">
        <Link href="/etudiant-etranger" className="relative h-[400px] md:h-[500px] group overflow-hidden block">
          <Image src="/images/hero1.jpg" alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">{t(tr.home.imgFrance, lang)}</h2>
            <span className="text-white/80 border border-white/50 px-6 py-2 rounded-full text-sm font-medium group-hover:bg-white group-hover:text-[#32373c] transition-all">
              {t(tr.home.discover, lang)}
            </span>
          </div>
        </Link>

        <Link href="/etudiant-france" className="relative h-[400px] md:h-[500px] group overflow-hidden block">
          <Image src="/images/hero2.jpg" alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">{t(tr.home.imgAbroad, lang)}</h2>
            <span className="text-white/80 border border-white/50 px-6 py-2 rounded-full text-sm font-medium group-hover:bg-white group-hover:text-[#32373c] transition-all">
              {t(tr.home.discover, lang)}
            </span>
          </div>
        </Link>

        <Link href="/devenir-partenaire" className="relative h-[400px] md:h-[500px] group overflow-hidden block">
          <Image src="/images/hero3.jpg" alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">{t(tr.home.imgPartner, lang)}</h2>
            <span className="text-white/80 border border-white/50 px-6 py-2 rounded-full text-sm font-medium group-hover:bg-white group-hover:text-[#32373c] transition-all">
              {t(tr.home.heroMore, lang)}
            </span>
          </div>
        </Link>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white border-t border-gray-100 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#32373c] mb-2">{t(tr.home.partnersTitle, lang)}</h2>
          <p className="text-gray-500 text-center text-sm">{t(tr.home.partnersSub, lang)}</p>
        </div>
        <PartnersCarousel />
      </section>

      {/* Features */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#32373c] mb-4">
            {t(tr.home.whyTitle, lang)} <span className="text-[#D13D6A]">Alzéa</span>{t(tr.home.whySuffix, lang)}
          </h2>
          <p className="text-gray-500 text-center mb-16 max-w-2xl mx-auto">{t(tr.home.whySub, lang)}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {f.map((feature, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-[#32373c] mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#32373c] mb-4">{t(tr.home.ctaTitle, lang)}</h2>
          <p className="text-gray-500 mb-8">{t(tr.home.ctaSub, lang)}</p>
          <Link href="/start" className="bg-[#D13D6A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#B8325A] transition-all inline-block">
            {t(tr.home.ctaBtn, lang)}
          </Link>
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
          <div className="border-t border-gray-600 pt-8 text-center text-gray-500 text-sm">{t(tr.footer.rights, lang)}</div>
        </div>
      </footer>
    </main>
  );
}
