'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLang, Lang } from '@/context/LangContext';
import tr, { t } from '@/i18n/translations';

const languages: { code: Lang; label: string; flag: string }[] = [
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
];

export default function Navbar() {
  const { lang, setLang } = useLang();
  const [langOpen, setLangOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/">
          <Image src="/images/logo-alzea.png" alt="Alzéa" width={140} height={70} className="h-12 w-auto" />
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          <Link href="/devenir-partenaire" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
            {t(tr.nav.partner, lang)}
          </Link>
          <Link href="/start" className="bg-[#D13D6A] text-white px-6 py-3 rounded-full font-medium hover:bg-[#B8325A] transition-all text-sm">
            {t(tr.nav.findStage, lang)}
          </Link>

          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors px-2 py-1 rounded-lg hover:bg-gray-50"
            >
              <span>{languages.find(l => l.code === lang)?.flag}</span>
              <span className="font-medium">{lang.toUpperCase()}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${langOpen ? 'rotate-180' : ''}`}>
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-1 min-w-[120px]">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      lang === l.code ? 'text-[#D13D6A] font-medium' : 'text-gray-600'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
