'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

// ── Fake data : PERSONNES ──────────────────────────────────

const candidaturesParMois = [
  { mois: 'Jan', candidatures: 42, placements: 28 },
  { mois: 'Fév', candidatures: 58, placements: 35 },
  { mois: 'Mar', candidatures: 75, placements: 52 },
  { mois: 'Avr', candidatures: 89, placements: 61 },
  { mois: 'Mai', candidatures: 112, placements: 78 },
  { mois: 'Juin', candidatures: 134, placements: 95 },
  { mois: 'Juil', candidatures: 98, placements: 72 },
  { mois: 'Août', candidatures: 67, placements: 48 },
  { mois: 'Sep', candidatures: 105, placements: 80 },
  { mois: 'Oct', candidatures: 91, placements: 65 },
  { mois: 'Nov', candidatures: 78, placements: 54 },
  { mois: 'Déc', candidatures: 53, placements: 38 },
];

const parDestination = [
  { destination: 'Irlande', stagiaires: 45 },
  { destination: 'Espagne', stagiaires: 38 },
  { destination: 'Corée', stagiaires: 32 },
  { destination: 'Japon', stagiaires: 28 },
  { destination: 'Canada', stagiaires: 25 },
  { destination: 'Italie', stagiaires: 22 },
  { destination: 'Portugal', stagiaires: 19 },
  { destination: 'Grèce', stagiaires: 15 },
  { destination: 'Malte', stagiaires: 12 },
  { destination: 'UK', stagiaires: 10 },
];

const parDomaine = [
  { domaine: 'Hôtellerie', value: 35 },
  { domaine: 'Restauration', value: 28 },
  { domaine: 'Marketing', value: 15 },
  { domaine: 'Tech', value: 12 },
  { domaine: 'Commerce', value: 10 },
];

const toutesLesCandidatures = [
  { id: 1, nom: 'Marie Dupont', destination: 'Dublin', domaine: 'Hôtellerie', statut: 'Placé', date: '28 Mar 2025' },
  { id: 2, nom: 'Lucas Martin', destination: 'Séoul', domaine: 'Tech', statut: 'En cours', date: '27 Mar 2025' },
  { id: 3, nom: 'Emma Bernard', destination: 'Madrid', domaine: 'Marketing', statut: 'Placé', date: '26 Mar 2025' },
  { id: 4, nom: 'Hugo Petit', destination: 'Tokyo', domaine: 'Restauration', statut: 'Entretien', date: '25 Mar 2025' },
  { id: 5, nom: 'Léa Moreau', destination: 'Lisbonne', domaine: 'Commerce', statut: 'Placé', date: '24 Mar 2025' },
  { id: 6, nom: 'Tom Leroy', destination: 'Rome', domaine: 'Hôtellerie', statut: 'En attente', date: '23 Mar 2025' },
  { id: 7, nom: 'Chloé Roux', destination: 'Montréal', domaine: 'Restauration', statut: 'Placé', date: '22 Mar 2025' },
  { id: 8, nom: 'Antoine Girard', destination: 'Dublin', domaine: 'Hôtellerie', statut: 'En cours', date: '21 Mar 2025' },
  { id: 9, nom: 'Inès Fournier', destination: 'Barcelone', domaine: 'Marketing', statut: 'Placé', date: '20 Mar 2025' },
  { id: 10, nom: 'Maxime Dubois', destination: 'Tokyo', domaine: 'Tech', statut: 'Entretien', date: '19 Mar 2025' },
  { id: 11, nom: 'Camille Laurent', destination: 'Athènes', domaine: 'Hôtellerie', statut: 'Placé', date: '18 Mar 2025' },
  { id: 12, nom: 'Nathan Mercier', destination: 'La Valette', domaine: 'Commerce', statut: 'En attente', date: '17 Mar 2025' },
  { id: 13, nom: 'Jade Simon', destination: 'Toronto', domaine: 'Restauration', statut: 'Placé', date: '16 Mar 2025' },
  { id: 14, nom: 'Raphaël Bonnet', destination: 'Dublin', domaine: 'Hôtellerie', statut: 'En cours', date: '15 Mar 2025' },
  { id: 15, nom: 'Zoé Lambert', destination: 'Séoul', domaine: 'Tech', statut: 'Placé', date: '14 Mar 2025' },
];

// ── Fake data : APPELS À VENIR ─────────────────────────────

interface Appel {
  id: number;
  nom: string;
  email: string;
  heure: string;
  type: 'Découverte' | 'Suivi' | 'Partenaire';
  jour: number; // 0-6 dans la semaine affichée
}

const JOURS_SEMAINE = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'];

function getWeekDates(): Date[] {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

const appelsAVenir: Appel[] = [
  { id: 1, nom: 'Sophie Mercier', email: 'sophie.m@gmail.com', heure: '09:00', type: 'Découverte', jour: 0 },
  { id: 2, nom: 'Pierre Duval', email: 'p.duval@outlook.com', heure: '10:30', type: 'Suivi', jour: 0 },
  { id: 3, nom: 'Amira Benali', email: 'amira.b@yahoo.fr', heure: '14:00', type: 'Découverte', jour: 0 },
  { id: 4, nom: 'Jules Fontaine', email: 'jules.f@gmail.com', heure: '09:30', type: 'Découverte', jour: 1 },
  { id: 5, nom: 'Clara Rousseau', email: 'clara.r@gmail.com', heure: '11:00', type: 'Partenaire', jour: 1 },
  { id: 6, nom: 'Lycée Saint-Exupéry', email: 'direction@st-ex.fr', heure: '15:00', type: 'Partenaire', jour: 1 },
  { id: 7, nom: 'Théo Martin', email: 'theo.m@outlook.fr', heure: '10:00', type: 'Suivi', jour: 2 },
  { id: 8, nom: 'Lina Chevalier', email: 'lina.c@gmail.com', heure: '14:30', type: 'Découverte', jour: 2 },
  { id: 9, nom: 'Univ. Lyon 3', email: 'partenariats@univ-lyon3.fr', heure: '09:00', type: 'Partenaire', jour: 3 },
  { id: 10, nom: 'Noé Garcia', email: 'noe.g@gmail.com', heure: '11:00', type: 'Découverte', jour: 3 },
  { id: 11, nom: 'Manon Lefevre', email: 'manon.l@gmail.com', heure: '16:00', type: 'Suivi', jour: 3 },
  { id: 12, nom: 'Enzo Robert', email: 'enzo.r@yahoo.fr', heure: '09:30', type: 'Découverte', jour: 4 },
  { id: 13, nom: 'Eva Morel', email: 'eva.morel@gmail.com', heure: '14:00', type: 'Découverte', jour: 4 },
];

// ── Fake data : SITE ───────────────────────────────────────

const visitesParMois = [
  { mois: 'Jan', visiteurs: 1240, sessions: 1890, pages_vues: 5420 },
  { mois: 'Fév', visiteurs: 1580, sessions: 2310, pages_vues: 6780 },
  { mois: 'Mar', visiteurs: 2100, sessions: 3150, pages_vues: 9230 },
  { mois: 'Avr', visiteurs: 2450, sessions: 3680, pages_vues: 10540 },
  { mois: 'Mai', visiteurs: 3200, sessions: 4720, pages_vues: 13650 },
  { mois: 'Juin', visiteurs: 3890, sessions: 5640, pages_vues: 16320 },
  { mois: 'Juil', visiteurs: 2980, sessions: 4380, pages_vues: 12450 },
  { mois: 'Août', visiteurs: 2140, sessions: 3250, pages_vues: 9180 },
  { mois: 'Sep', visiteurs: 3450, sessions: 5020, pages_vues: 14560 },
  { mois: 'Oct', visiteurs: 2870, sessions: 4190, pages_vues: 12080 },
  { mois: 'Nov', visiteurs: 2340, sessions: 3510, pages_vues: 10120 },
  { mois: 'Déc', visiteurs: 1680, sessions: 2540, pages_vues: 7340 },
];

const tempsParPage = [
  { page: 'Accueil', slug: 'accueil', temps: 45, vues: 32400, rebond: 38 },
  { page: 'Stage France', slug: 'stage-france', temps: 187, vues: 18200, rebond: 22 },
  { page: 'Stage Étranger', slug: 'stage-etranger', temps: 203, vues: 21500, rebond: 19 },
  { page: 'Partenaire', slug: 'partenaire', temps: 156, vues: 8900, rebond: 31 },
  { page: 'Entreprise FR', slug: 'entreprise-fr', temps: 134, vues: 5400, rebond: 35 },
  { page: 'Entreprise ETR', slug: 'entreprise-etr', temps: 128, vues: 4200, rebond: 37 },
  { page: 'Start', slug: 'start', temps: 67, vues: 28700, rebond: 42 },
];

const sourcesTrafic = [
  { source: 'Google', value: 42 },
  { source: 'Direct', value: 24 },
  { source: 'Instagram', value: 16 },
  { source: 'LinkedIn', value: 11 },
  { source: 'Autres', value: 7 },
];

const tauxConversionParMois = [
  { mois: 'Jan', conversion: 3.4, booking: 1.8 },
  { mois: 'Fév', conversion: 3.7, booking: 2.1 },
  { mois: 'Mar', conversion: 4.2, booking: 2.5 },
  { mois: 'Avr', conversion: 4.6, booking: 2.8 },
  { mois: 'Mai', conversion: 5.1, booking: 3.2 },
  { mois: 'Juin', conversion: 5.5, booking: 3.6 },
  { mois: 'Juil', conversion: 4.8, booking: 3.0 },
  { mois: 'Août', conversion: 4.1, booking: 2.4 },
  { mois: 'Sep', conversion: 5.3, booking: 3.4 },
  { mois: 'Oct', conversion: 4.7, booking: 2.9 },
  { mois: 'Nov', conversion: 4.3, booking: 2.6 },
  { mois: 'Déc', conversion: 3.6, booking: 2.0 },
];

const appareilsData = [
  { appareil: 'Mobile', value: 58 },
  { appareil: 'Desktop', value: 34 },
  { appareil: 'Tablette', value: 8 },
];

const COLORS_PIE = ['#D13D6A', '#33A7B5', '#F59E0B', '#8B5CF6', '#10B981'];
const COLORS_SOURCES = ['#4285F4', '#32373c', '#E4405F', '#0A66C2', '#9CA3AF'];
const COLORS_DEVICES = ['#D13D6A', '#33A7B5', '#F59E0B'];

// ── Shared components ──────────────────────────────────────

// ── SVG Icons ──────────────────────────────────────────────

function IconGrad({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}12` }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </div>
  );
}

function IconStudents() {
  return (
    <IconGrad color="#D13D6A">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </IconGrad>
  );
}

function IconGlobe() {
  return (
    <IconGrad color="#33A7B5">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </IconGrad>
  );
}

function IconHandshake() {
  return (
    <IconGrad color="#8B5CF6">
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
    </IconGrad>
  );
}

function IconPhone() {
  return (
    <IconGrad color="#F59E0B">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </IconGrad>
  );
}

function IconEye() {
  return (
    <IconGrad color="#D13D6A">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </IconGrad>
  );
}

function IconFile() {
  return (
    <IconGrad color="#33A7B5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </IconGrad>
  );
}

function IconClock() {
  return (
    <IconGrad color="#8B5CF6">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </IconGrad>
  );
}

function IconTrendDown() {
  return (
    <IconGrad color="#F59E0B">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </IconGrad>
  );
}

const KPI_ICONS: Record<string, React.ReactNode> = {
  students: <IconStudents />,
  globe: <IconGlobe />,
  handshake: <IconHandshake />,
  phone: <IconPhone />,
  eye: <IconEye />,
  file: <IconFile />,
  clock: <IconClock />,
  trendDown: <IconTrendDown />,
};

function KpiCard({ label, value, suffix, change, icon }: {
  label: string; value: string; suffix?: string; change: string; icon: string;
}) {
  const isPositive = change.startsWith('+');
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        {KPI_ICONS[icon] ?? <span className="text-2xl">{icon}</span>}
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
          isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
        }`}>
          {change}
        </span>
      </div>
      <div className="text-3xl font-bold text-[#32373c]">
        {value}<span className="text-lg text-gray-400 font-normal">{suffix}</span>
      </div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}

function StatutBadge({ statut }: { statut: string }) {
  const styles: Record<string, string> = {
    'Placé': 'bg-emerald-50 text-emerald-700',
    'En cours': 'bg-blue-50 text-blue-700',
    'Entretien': 'bg-amber-50 text-amber-700',
    'En attente': 'bg-gray-100 text-gray-600',
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[statut] ?? 'bg-gray-100 text-gray-600'}`}>
      {statut}
    </span>
  );
}

function TypeAppelBadge({ type }: { type: Appel['type'] }) {
  const styles: Record<string, string> = {
    'Découverte': 'bg-pink-50 text-[#D13D6A] border-[#D13D6A]/20',
    'Suivi': 'bg-teal-50 text-[#33A7B5] border-[#33A7B5]/20',
    'Partenaire': 'bg-purple-50 text-purple-600 border-purple-200',
  };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${styles[type]}`}>
      {type}
    </span>
  );
}

function formatSeconds(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
}

// ── Tab: Personnes ─────────────────────────────────────────

function PersonnesTab() {
  const [showAllCandidatures, setShowAllCandidatures] = useState(false);
  const [selectedJour, setSelectedJour] = useState<number | null>(null);
  const weekDates = getWeekDates();

  const candidaturesAffichees = showAllCandidatures
    ? toutesLesCandidatures
    : toutesLesCandidatures.slice(0, 7);

  const appelsJour = selectedJour !== null
    ? appelsAVenir.filter(a => a.jour === selectedJour)
    : null;

  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon="students" label="Stagiaires actifs" value="246" change="+12%" />
        <KpiCard icon="globe" label="Destinations actives" value="15" change="+2" />
        <KpiCard icon="handshake" label="Entreprises partenaires" value="487" change="+8%" />
        <KpiCard icon="phone" label="Appels cette semaine" value="13" change="+4" />
      </div>

      {/* Calendrier des appels */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-semibold text-[#32373c]">Appels à venir</h2>
            <p className="text-xs text-gray-400 mt-0.5">Semaine du {weekDates[0].getDate()} au {weekDates[4].getDate()} {weekDates[4].toLocaleDateString('fr-FR', { month: 'long' })}</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#D13D6A]" />Découverte</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#33A7B5]" />Suivi</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500" />Partenaire</span>
          </div>
        </div>

        {/* Grille semaine */}
        <div className="grid grid-cols-5 gap-3 mb-4">
          {JOURS_SEMAINE.map((jour, i) => {
            const date = weekDates[i];
            const appelsCount = appelsAVenir.filter(a => a.jour === i).length;
            const isSelected = selectedJour === i;
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <button
                key={jour}
                onClick={() => setSelectedJour(isSelected ? null : i)}
                className={`rounded-xl p-3 border-2 transition-all text-center ${
                  isSelected
                    ? 'border-[#D13D6A] bg-pink-50'
                    : isToday
                    ? 'border-[#33A7B5]/30 bg-teal-50/30'
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="text-xs text-gray-500 font-medium">{jour}</div>
                <div className={`text-xl font-bold mt-0.5 ${isSelected ? 'text-[#D13D6A]' : isToday ? 'text-[#33A7B5]' : 'text-[#32373c]'}`}>
                  {date.getDate()}
                </div>
                {appelsCount > 0 && (
                  <div className="flex justify-center gap-0.5 mt-1.5">
                    {appelsAVenir.filter(a => a.jour === i).map(a => (
                      <span
                        key={a.id}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor: a.type === 'Découverte' ? '#D13D6A' : a.type === 'Suivi' ? '#33A7B5' : '#8B5CF6',
                        }}
                      />
                    ))}
                  </div>
                )}
                <div className="text-[10px] text-gray-400 mt-1">
                  {appelsCount > 0 ? `${appelsCount} appel${appelsCount > 1 ? 's' : ''}` : '-'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Détail du jour sélectionné */}
        {appelsJour !== null && (
          <div className="border-t border-gray-100 pt-4 animate-fadeIn">
            <h3 className="text-sm font-semibold text-[#32373c] mb-3">
              {JOURS_SEMAINE[selectedJour!]} {weekDates[selectedJour!].getDate()} {weekDates[selectedJour!].toLocaleDateString('fr-FR', { month: 'long' })}
              <span className="text-gray-400 font-normal ml-2">{appelsJour.length} appel{appelsJour.length > 1 ? 's' : ''}</span>
            </h3>
            {appelsJour.length === 0 ? (
              <p className="text-sm text-gray-400 py-4 text-center">Aucun appel prévu ce jour</p>
            ) : (
              <div className="space-y-2">
                {appelsJour.map(a => (
                  <div key={a.id} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100/80 transition-colors">
                    <div className="text-sm font-bold text-[#32373c] w-14 flex-shrink-0">{a.heure}</div>
                    <div
                      className="w-1 h-8 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: a.type === 'Découverte' ? '#D13D6A' : a.type === 'Suivi' ? '#33A7B5' : '#8B5CF6',
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-[#32373c] truncate">{a.nom}</div>
                      <div className="text-xs text-gray-400 truncate">{a.email}</div>
                    </div>
                    <TypeAppelBadge type={a.type} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Liste complète si aucun jour sélectionné */}
        {selectedJour === null && (
          <div className="border-t border-gray-100 pt-4">
            <h3 className="text-sm font-semibold text-[#32373c] mb-3">Tous les appels de la semaine</h3>
            <div className="space-y-2">
              {appelsAVenir.map(a => (
                <div key={a.id} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100/80 transition-colors">
                  <div className="text-xs text-gray-400 w-8 flex-shrink-0 font-medium">{JOURS_SEMAINE[a.jour]}</div>
                  <div className="text-sm font-bold text-[#32373c] w-14 flex-shrink-0">{a.heure}</div>
                  <div
                    className="w-1 h-8 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: a.type === 'Découverte' ? '#D13D6A' : a.type === 'Suivi' ? '#33A7B5' : '#8B5CF6',
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-[#32373c] truncate">{a.nom}</div>
                    <div className="text-xs text-gray-400 truncate">{a.email}</div>
                  </div>
                  <TypeAppelBadge type={a.type} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Area chart + Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-[#32373c]">Candidatures & Placements</h2>
              <p className="text-xs text-gray-400 mt-0.5">Evolution sur 12 mois</p>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D13D6A]" />Candidatures
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#33A7B5]" />Placements
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={candidaturesParMois}>
              <defs>
                <linearGradient id="gradCandidatures" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D13D6A" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#D13D6A" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradPlacements" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#33A7B5" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#33A7B5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mois" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0f0f0', fontSize: 13 }} />
              <Area type="monotone" dataKey="candidatures" stroke="#D13D6A" strokeWidth={2.5} fill="url(#gradCandidatures)" />
              <Area type="monotone" dataKey="placements" stroke="#33A7B5" strokeWidth={2.5} fill="url(#gradPlacements)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-[#32373c] mb-1">Domaines de stage</h2>
          <p className="text-xs text-gray-400 mb-4">Répartition des placements</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={parDomaine} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {parDomaine.map((_, i) => (
                  <Cell key={i} fill={COLORS_PIE[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0f0f0', fontSize: 13 }} formatter={(value) => [`${value}%`, '']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
            {parDomaine.map((d, i) => (
              <div key={d.domaine} className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS_PIE[i] }} />
                <span className="text-gray-600 truncate">{d.domaine}</span>
                <span className="text-gray-400 ml-auto">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bar chart destinations */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-[#32373c] mb-1">Top destinations</h2>
        <p className="text-xs text-gray-400 mb-6">Nombre de stagiaires par pays</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={parDestination} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="destination" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} width={70} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0f0f0', fontSize: 13 }} />
            <Bar dataKey="stagiaires" fill="#D13D6A" radius={[0, 6, 6, 0]} barSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Candidatures */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-semibold text-[#32373c]">Candidatures récentes</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {showAllCandidatures ? `${toutesLesCandidatures.length} candidatures` : '7 dernières candidatures'}
            </p>
          </div>
          <button
            onClick={() => setShowAllCandidatures(!showAllCandidatures)}
            className="text-xs text-[#D13D6A] font-medium hover:underline"
          >
            {showAllCandidatures ? 'Voir moins' : 'Voir tout'}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-400 uppercase tracking-wider">Nom</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-400 uppercase tracking-wider">Destination</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-400 uppercase tracking-wider">Domaine</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-400 uppercase tracking-wider">Statut</th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {candidaturesAffichees.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-2 font-medium text-[#32373c]">{c.nom}</td>
                  <td className="py-3 px-2 text-gray-600">{c.destination}</td>
                  <td className="py-3 px-2 text-gray-600">{c.domaine}</td>
                  <td className="py-3 px-2"><StatutBadge statut={c.statut} /></td>
                  <td className="py-3 px-2 text-gray-400 text-right">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Tab: Site ──────────────────────────────────────────────

function SiteTab() {
  return (
    <div className="space-y-8">
      {/* KPIs site */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon="eye" label="Visiteurs uniques / mois" value="3 890" change="+23%" />
        <KpiCard icon="file" label="Pages vues / mois" value="16 320" change="+18%" />
        <KpiCard icon="clock" label="Temps moyen / session" value="2m 34s" change="+12%" />
        <KpiCard icon="trendDown" label="Taux de rebond" value="31" suffix="%" change="-4pts" />
      </div>

      {/* Trafic + Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-[#32373c]">Trafic du site</h2>
              <p className="text-xs text-gray-400 mt-0.5">Visiteurs uniques & sessions sur 12 mois</p>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D13D6A]" />Visiteurs
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#33A7B5]" />Sessions
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={visitesParMois}>
              <defs>
                <linearGradient id="gradVisiteurs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D13D6A" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#D13D6A" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradSessions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#33A7B5" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#33A7B5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mois" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0f0f0', fontSize: 13 }} />
              <Area type="monotone" dataKey="visiteurs" stroke="#D13D6A" strokeWidth={2.5} fill="url(#gradVisiteurs)" />
              <Area type="monotone" dataKey="sessions" stroke="#33A7B5" strokeWidth={2.5} fill="url(#gradSessions)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-[#32373c] mb-1">Sources de trafic</h2>
          <p className="text-xs text-gray-400 mb-4">Origine des visiteurs</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={sourcesTrafic} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {sourcesTrafic.map((_, i) => (
                  <Cell key={i} fill={COLORS_SOURCES[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0f0f0', fontSize: 13 }} formatter={(value) => [`${value}%`, '']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {sourcesTrafic.map((s, i) => (
              <div key={s.source} className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS_SOURCES[i] }} />
                <span className="text-gray-600">{s.source}</span>
                <span className="text-gray-400 ml-auto">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion + Appareils */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-[#32373c]">Taux de conversion</h2>
              <p className="text-xs text-gray-400 mt-0.5">Formulaire de contact & prise de RDV</p>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D13D6A]" />Contact
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#33A7B5]" />Booking
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={tauxConversionParMois}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mois" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0f0f0', fontSize: 13 }} formatter={(value) => [`${value}%`, '']} />
              <Line type="monotone" dataKey="conversion" name="Contact" stroke="#D13D6A" strokeWidth={2.5} dot={{ r: 4, fill: '#D13D6A' }} />
              <Line type="monotone" dataKey="booking" name="Booking" stroke="#33A7B5" strokeWidth={2.5} dot={{ r: 4, fill: '#33A7B5' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-[#32373c] mb-1">Appareils</h2>
          <p className="text-xs text-gray-400 mb-4">Répartition des visites</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={appareilsData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {appareilsData.map((_, i) => (
                  <Cell key={i} fill={COLORS_DEVICES[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0f0f0', fontSize: 13 }} formatter={(value) => [`${value}%`, '']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {appareilsData.map((d, i) => (
              <div key={d.appareil} className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS_DEVICES[i] }} />
                <span className="text-gray-600">{d.appareil}</span>
                <span className="text-gray-400 ml-auto">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performances par page */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-semibold text-[#32373c]">Performance par page</h2>
            <p className="text-xs text-gray-400 mt-0.5">Temps moyen, vues et taux de rebond</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-400 uppercase tracking-wider">Page</th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-400 uppercase tracking-wider">Vues</th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-400 uppercase tracking-wider">Temps moyen</th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-400 uppercase tracking-wider">Taux de rebond</th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-400 uppercase tracking-wider w-40">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {tempsParPage.map((p) => {
                const maxVues = Math.max(...tempsParPage.map(x => x.vues));
                const pct = Math.round((p.vues / maxVues) * 100);
                return (
                  <tr key={p.page} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-2 font-medium">
                      <Link href={`/dashboard/page-detail/${p.slug}`} className="text-[#D13D6A] hover:underline flex items-center gap-1.5">
                        {p.page}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </Link>
                    </td>
                    <td className="py-3 px-2 text-gray-600 text-right">{p.vues.toLocaleString('fr-FR')}</td>
                    <td className="py-3 px-2 text-gray-600 text-right">{formatSeconds(p.temps)}</td>
                    <td className="py-3 px-2 text-right">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        p.rebond <= 25 ? 'bg-emerald-50 text-emerald-700' :
                        p.rebond <= 35 ? 'bg-amber-50 text-amber-700' :
                        'bg-red-50 text-red-600'
                      }`}>
                        {p.rebond}%
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2 justify-end">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-[#D13D6A]" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-gray-400 w-8 text-right">{pct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

// ── Page ───────────────────────────────────────────────────

type Tab = 'personnes' | 'site';

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>('personnes');

  return (
    <main className="min-h-screen bg-[#F7FAFC]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image src="/images/logo-alzea.png" alt="Alzea" width={110} height={55} className="h-9 w-auto" />
            </Link>
            <div className="h-6 w-px bg-gray-200" />
            <h1 className="text-lg font-semibold text-[#32373c]">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setTab('personnes')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  tab === 'personnes' ? 'bg-white text-[#32373c] shadow-sm' : 'text-gray-500'
                }`}
              >
                Personnes
              </button>
              <button
                onClick={() => setTab('site')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  tab === 'site' ? 'bg-white text-[#32373c] shadow-sm' : 'text-gray-500'
                }`}
              >
                Site
              </button>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#D13D6A] flex items-center justify-center text-white text-xs font-bold">
              MA
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {tab === 'personnes' ? <PersonnesTab /> : <SiteTab />}
      </div>
    </main>
  );
}
