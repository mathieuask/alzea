'use client';

import { use } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useLang } from '@/context/LangContext';
import tr, { t, type Lang } from '@/i18n/translations';

const LOCALE_MAP: Record<Lang, string> = { fr: 'fr-FR', en: 'en-GB', es: 'es-ES' };

// ── Data ───────────────────────────────────────────────────

interface PageData {
  name: string;
  href: string;
  vues: number;
  tempsMoyen: number;
  rebond: number;
  tauxConversion: number;
  boutons: { label: string; clics: number; taux: number; position: string; lien?: string }[];
  sections: { nom: string; tempsPassé: number; scrollPct: number }[];
  scrollDepth: { profondeur: string; pct: number }[];
}

const PAGES_DATA: Record<string, PageData> = {
  accueil: {
    name: 'Accueil',
    href: '/',
    vues: 32400,
    tempsMoyen: 45,
    rebond: 38,
    tauxConversion: 4.3,
    boutons: [
      { label: 'Découvrir nos programmes', clics: 5240, taux: 16.2, position: 'Hero', lien: '/start' },
      { label: 'En savoir plus', clics: 2890, taux: 8.9, position: 'Hero', lien: '/start' },
      { label: 'Stages en France (Découvrir)', clics: 3180, taux: 9.8, position: 'Section images', lien: '/etudiant-france' },
      { label: 'Stages à l\'étranger (Découvrir)', clics: 3950, taux: 12.2, position: 'Section images', lien: '/etudiant-etranger' },
      { label: 'Devenir partenaire (En savoir plus)', clics: 1420, taux: 4.4, position: 'Section images', lien: '/devenir-partenaire' },
      { label: 'Trouver mon programme', clics: 2680, taux: 8.3, position: 'CTA final', lien: '/start' },
    ],
    sections: [
      { nom: 'Hero', tempsPassé: 12, scrollPct: 100 },
      { nom: 'Statistiques', tempsPassé: 5, scrollPct: 87 },
      { nom: 'Images destinations', tempsPassé: 8, scrollPct: 79 },
      { nom: 'Partenaires carousel', tempsPassé: 4, scrollPct: 65 },
      { nom: 'Pourquoi Alzéa', tempsPassé: 10, scrollPct: 58 },
      { nom: 'CTA final', tempsPassé: 4, scrollPct: 44 },
      { nom: 'Footer', tempsPassé: 2, scrollPct: 36 },
    ],
    scrollDepth: [
      { profondeur: '25%', pct: 87 },
      { profondeur: '50%', pct: 65 },
      { profondeur: '75%', pct: 44 },
      { profondeur: '100%', pct: 28 },
    ],
  },
  'stage-france': {
    name: 'Stage France',
    href: '/etudiant-france',
    vues: 18200,
    tempsMoyen: 187,
    rebond: 22,
    tauxConversion: 5.6,
    boutons: [
      { label: 'Demander un appel', clics: 3420, taux: 18.8, position: 'Hero' },
      { label: 'Voir le parcours', clics: 2180, taux: 12.0, position: 'Hero' },
      { label: 'Trouver mon programme', clics: 1890, taux: 10.4, position: 'CTA final', lien: '/start' },
    ],
    sections: [
      { nom: 'Hero', tempsPassé: 18, scrollPct: 100 },
      { nom: 'Points clés', tempsPassé: 22, scrollPct: 90 },
      { nom: 'Parcours (Journey)', tempsPassé: 45, scrollPct: 81 },
      { nom: 'CTA intermédiaire', tempsPassé: 8, scrollPct: 71 },
      { nom: 'Témoignages', tempsPassé: 35, scrollPct: 62 },
      { nom: 'CTA final', tempsPassé: 12, scrollPct: 54 },
      { nom: 'Footer', tempsPassé: 3, scrollPct: 45 },
    ],
    scrollDepth: [
      { profondeur: '25%', pct: 90 },
      { profondeur: '50%', pct: 71 },
      { profondeur: '75%', pct: 54 },
      { profondeur: '100%', pct: 38 },
    ],
  },
  'stage-etranger': {
    name: 'Stage Étranger',
    href: '/etudiant-etranger',
    vues: 21500,
    tempsMoyen: 203,
    rebond: 19,
    tauxConversion: 5.9,
    boutons: [
      { label: 'Réserver un appel', clics: 4150, taux: 19.3, position: 'Hero' },
      { label: 'Voir le parcours', clics: 2890, taux: 13.4, position: 'Hero' },
      { label: 'Trouver mon programme', clics: 2210, taux: 10.3, position: 'CTA final', lien: '/start' },
    ],
    sections: [
      { nom: 'Hero', tempsPassé: 20, scrollPct: 100 },
      { nom: 'Points clés', tempsPassé: 25, scrollPct: 92 },
      { nom: 'Parcours (Journey)', tempsPassé: 52, scrollPct: 83 },
      { nom: 'CTA intermédiaire', tempsPassé: 10, scrollPct: 73 },
      { nom: 'Témoignages', tempsPassé: 40, scrollPct: 64 },
      { nom: 'CTA final', tempsPassé: 14, scrollPct: 56 },
      { nom: 'Footer', tempsPassé: 3, scrollPct: 47 },
    ],
    scrollDepth: [
      { profondeur: '25%', pct: 92 },
      { profondeur: '50%', pct: 73 },
      { profondeur: '75%', pct: 56 },
      { profondeur: '100%', pct: 40 },
    ],
  },
  partenaire: {
    name: 'Partenaire',
    href: '/devenir-partenaire',
    vues: 8900,
    tempsMoyen: 156,
    rebond: 31,
    tauxConversion: 4.2,
    boutons: [
      { label: 'Demander un appel', clics: 1680, taux: 18.9, position: 'Hero' },
      { label: 'Comment ça marche', clics: 1240, taux: 13.9, position: 'Hero' },
      { label: 'Demander un appel', clics: 1050, taux: 11.8, position: 'CTA dark section' },
    ],
    sections: [
      { nom: 'Hero', tempsPassé: 15, scrollPct: 100 },
      { nom: 'Avantages', tempsPassé: 30, scrollPct: 85 },
      { nom: 'Comment ça marche', tempsPassé: 38, scrollPct: 72 },
      { nom: 'Témoignages', tempsPassé: 28, scrollPct: 58 },
      { nom: 'CTA final', tempsPassé: 10, scrollPct: 46 },
      { nom: 'Footer', tempsPassé: 3, scrollPct: 38 },
    ],
    scrollDepth: [
      { profondeur: '25%', pct: 85 },
      { profondeur: '50%', pct: 65 },
      { profondeur: '75%', pct: 46 },
      { profondeur: '100%', pct: 30 },
    ],
  },
  'entreprise-fr': {
    name: 'Entreprise France',
    href: '/entreprise-france',
    vues: 5400,
    tempsMoyen: 134,
    rebond: 35,
    tauxConversion: 3.9,
    boutons: [
      { label: 'Réserver un appel', clics: 980, taux: 18.1, position: 'Navbar' },
      { label: 'Planifier un appel', clics: 720, taux: 13.3, position: 'Hero' },
      { label: 'Planifier un appel', clics: 540, taux: 10.0, position: 'CTA final' },
    ],
    sections: [
      { nom: 'Hero', tempsPassé: 14, scrollPct: 100 },
      { nom: 'Avantages', tempsPassé: 28, scrollPct: 83 },
      { nom: 'Témoignage', tempsPassé: 22, scrollPct: 67 },
      { nom: 'CTA final', tempsPassé: 8, scrollPct: 52 },
      { nom: 'Footer', tempsPassé: 2, scrollPct: 41 },
    ],
    scrollDepth: [
      { profondeur: '25%', pct: 83 },
      { profondeur: '50%', pct: 62 },
      { profondeur: '75%', pct: 42 },
      { profondeur: '100%', pct: 28 },
    ],
  },
  'entreprise-etr': {
    name: 'Entreprise Étranger',
    href: '/entreprise-etranger',
    vues: 4200,
    tempsMoyen: 128,
    rebond: 37,
    tauxConversion: 3.7,
    boutons: [
      { label: 'Réserver un appel', clics: 760, taux: 18.1, position: 'Navbar' },
      { label: 'Planifier un appel', clics: 540, taux: 12.9, position: 'Hero' },
      { label: 'Planifier un appel', clics: 410, taux: 9.8, position: 'CTA final' },
    ],
    sections: [
      { nom: 'Hero', tempsPassé: 12, scrollPct: 100 },
      { nom: 'Avantages', tempsPassé: 25, scrollPct: 81 },
      { nom: 'Témoignage', tempsPassé: 20, scrollPct: 64 },
      { nom: 'CTA final', tempsPassé: 7, scrollPct: 50 },
      { nom: 'Footer', tempsPassé: 2, scrollPct: 40 },
    ],
    scrollDepth: [
      { profondeur: '25%', pct: 81 },
      { profondeur: '50%', pct: 58 },
      { profondeur: '75%', pct: 40 },
      { profondeur: '100%', pct: 25 },
    ],
  },
  start: {
    name: 'Start (hub de redirection)',
    href: '/start',
    vues: 28700,
    tempsMoyen: 67,
    rebond: 42,
    tauxConversion: 0,
    boutons: [
      { label: 'En France (Découvrir)', clics: 8400, taux: 29.3, position: 'Choix principal', lien: '/etudiant-france' },
      { label: 'À l\'étranger (Découvrir)', clics: 10200, taux: 35.5, position: 'Choix principal', lien: '/etudiant-etranger' },
      { label: 'Retour à l\'accueil', clics: 2100, taux: 7.3, position: 'Lien bas de page', lien: '/' },
    ],
    sections: [
      { nom: 'Page complète', tempsPassé: 67, scrollPct: 100 },
    ],
    scrollDepth: [
      { profondeur: '25%', pct: 95 },
      { profondeur: '50%', pct: 88 },
      { profondeur: '75%', pct: 82 },
      { profondeur: '100%', pct: 78 },
    ],
  },
};

function formatSec(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
}

// ── Page ───────────────────────────────────────────────────

export default function PageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const data = PAGES_DATA[slug];
  const [showAllBoutons, setShowAllBoutons] = useState(false);
  const { lang } = useLang();
  const locale = LOCALE_MAP[lang];

  if (!data) {
    return (
      <main className="min-h-screen bg-[#F7FAFC] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#32373c] mb-2">{t(tr.dashboard.detailPageNotFound, lang)}</h1>
          <Link href="/dashboard" className="text-[#D13D6A] hover:underline text-sm">{t(tr.dashboard.detailBack, lang)}</Link>
        </div>
      </main>
    );
  }

  const bestButton = [...data.boutons].sort((a, b) => b.taux - a.taux)[0];
  const boutonsAffiches = showAllBoutons ? data.boutons : data.boutons.slice(0, 4);

  return (
    <main className="min-h-screen bg-[#F7FAFC]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-gray-400 hover:text-[#32373c] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </Link>
            <Link href="/">
              <Image src="/images/logo-alzea.png" alt="Alzea" width={110} height={55} className="h-9 w-auto" />
            </Link>
            <div className="h-6 w-px bg-gray-200" />
            <div>
              <h1 className="text-lg font-semibold text-[#32373c]">{data.name}</h1>
              <p className="text-xs text-gray-400">{data.href}</p>
            </div>
          </div>
          <Link
            href={data.href}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-[#D13D6A] text-white text-sm font-medium rounded-full hover:bg-[#B8325A] transition-colors"
          >
            {t(tr.dashboard.detailViewPage, lang)}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* KPIs compacts */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: t(tr.dashboard.detailKpiViews, lang), value: data.vues.toLocaleString(locale), color: '#D13D6A', icon: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></> },
            { label: t(tr.dashboard.detailKpiAvgTime, lang), value: formatSec(data.tempsMoyen), color: '#33A7B5', icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></> },
            { label: t(tr.dashboard.detailKpiBounce, lang), value: `${data.rebond}%`, color: '#F59E0B', icon: <><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></> },
            { label: t(tr.dashboard.detailKpiConversion, lang), value: `${data.tauxConversion}%`, color: '#8B5CF6', icon: <><polyline points="20 6 9 17 4 12" /></> },
          ].map(kpi => (
            <div key={kpi.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${kpi.color}12` }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={kpi.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {kpi.icon}
                </svg>
              </div>
              <div className="text-2xl font-bold text-[#32373c]">{kpi.value}</div>
              <div className="text-xs text-gray-400 mt-1">{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Boutons : Performance */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="font-semibold text-[#32373c]">{t(tr.dashboard.detailButtonPerf, lang)}</h2>
            </div>
            {bestButton && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-xs font-medium text-emerald-700">Meilleur : {bestButton.label} ({bestButton.taux}%)</span>
              </div>
            )}
          </div>

          <div className="mt-4 space-y-3">
            {boutonsAffiches.map((b, i) => {
              const maxTaux = Math.max(...data.boutons.map(x => x.taux));
              const barW = Math.round((b.taux / maxTaux) * 100);
              const isBest = b.label === bestButton?.label;
              return (
                <div key={i} className={`p-4 rounded-xl border transition-colors ${isBest ? 'bg-emerald-50/50 border-emerald-100' : 'bg-gray-50 border-gray-100'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isBest ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-600'}`}>
                        #{i + 1}
                      </span>
                      {b.lien ? (
                        <Link href={b.lien} target="_blank" className="font-medium text-sm text-[#32373c] hover:text-[#D13D6A] transition-colors flex items-center gap-1">
                          {b.label}
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </Link>
                      ) : (
                        <span className="font-medium text-sm text-[#32373c]">{b.label}</span>
                      )}
                      <span className="text-[10px] text-gray-400 hidden sm:inline">{b.position}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">{b.clics.toLocaleString(locale)} {t(tr.dashboard.detailColClicks, lang).toLowerCase()}</span>
                      <span className={`font-bold ${isBest ? 'text-emerald-600' : 'text-[#D13D6A]'}`}>{b.taux}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200/60 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${isBest ? 'bg-emerald-500' : 'bg-[#D13D6A]'}`}
                      style={{ width: `${barW}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {data.boutons.length > 4 && (
            <button
              onClick={() => setShowAllBoutons(!showAllBoutons)}
              className="text-xs text-[#D13D6A] font-medium hover:underline mt-4"
            >
              {showAllBoutons ? t(tr.dashboard.viewLess, lang) : `${t(tr.dashboard.viewAll, lang)} (${data.boutons.length})`}
            </button>
          )}
        </div>

        {/* Scroll depth + Sections engagement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-[#32373c] mb-1">{t(tr.dashboard.detailScrollDepth, lang)}</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data.scrollDepth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="profondeur" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} unit="%" domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0f0f0', fontSize: 13 }} formatter={(value) => [`${value}%`, '']} />
                <Bar dataKey="pct" fill="#33A7B5" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-[#32373c] mb-1">{t(tr.dashboard.detailSectionEngagement, lang)}</h2>
            <div className="space-y-3">
              {data.sections.map(s => {
                const maxTime = Math.max(...data.sections.map(x => x.tempsPassé));
                const barW = Math.round((s.tempsPassé / maxTime) * 100);
                return (
                  <div key={s.nom} className="flex items-center gap-3">
                    <div className="w-36 flex-shrink-0 text-xs font-medium text-[#32373c] truncate">{s.nom}</div>
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-[#D13D6A]/80" style={{ width: `${barW}%` }} />
                    </div>
                    <div className="text-xs text-gray-500 w-10 text-right flex-shrink-0">{formatSec(s.tempsPassé)}</div>
                    <div className="text-[10px] text-gray-400 w-10 text-right flex-shrink-0">{s.scrollPct}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
