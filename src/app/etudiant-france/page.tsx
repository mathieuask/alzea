'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import BookingModal from '@/components/BookingModal';
import JourneyPath from '@/components/JourneyPath';
import TestimonialCard from '@/components/TestimonialCard';

const steps = [
  { icon: '📝', title: 'Candidature', description: 'Remplissez le formulaire et réservez un appel découverte gratuit' },
  { icon: '💬', title: 'Entretien', description: '30 min avec votre conseiller dédié pour définir votre projet' },
  { icon: '🎯', title: 'Matching', description: 'On vous propose les offres qui correspondent à votre profil' },
  { icon: '📋', title: 'Visa & démarches', description: 'Convention, assurance, visa : on gère toute la paperasse' },
  { icon: '✈️', title: 'Départ', description: 'Logement prêt, contacts sur place, vous partez serein' },
  { icon: '🤝', title: 'Suivi sur place', description: 'Votre conseiller reste disponible tout au long du stage' },
];

const destinations = [
  '🇰🇷 Corée du Sud', '🇯🇵 Japon', '🇮🇪 Irlande', '🇪🇸 Espagne', '🇬🇧 Angleterre', '🇵🇹 Portugal',
  '🇮🇹 Italie', '🇬🇷 Grèce', '🇲🇹 Malte', '🇨🇦 Canada', '🇦🇺 Australie', '🇹🇭 Thaïlande',
];

export default function EtudiantFrancePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-20 min-h-screen flex items-center bg-white overflow-hidden">
        <div className="flex-1 px-8 lg:px-16 xl:px-24 py-12">
          <div className="max-w-xl">
            <p className="text-[#33A7B5] text-sm font-medium tracking-wider uppercase mb-4">
              Programme Mobilité Internationale
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#32373c] leading-tight mb-6">
              Votre stage à l&apos;étranger,{' '}
              <span className="text-[#D13D6A]">clé en main.</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl mb-10 leading-relaxed">
              15 destinations • Visa & logement inclus • Accompagnement personnalisé
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#D13D6A] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#B8325A] transition-all text-lg"
              >
                Demander un appel →
              </button>
              <a
                href="#parcours"
                className="border-2 border-gray-200 text-gray-600 px-8 py-4 rounded-full font-semibold hover:border-[#D13D6A] hover:text-[#D13D6A] transition-all"
              >
                Voir le parcours
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
            Nos <span className="text-[#D13D6A]">destinations</span>
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
            Votre parcours en <span className="text-[#D13D6A]">6 étapes</span>
          </h2>
          <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">
            De la candidature au suivi sur place, Alzéa vous accompagne à chaque étape.
          </p>
          <JourneyPath steps={steps} />
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#32373c] mb-4">
            Ils témoignent
          </h2>
          <p className="text-gray-500 text-center mb-12">
            Rejoignez les 200+ jeunes qui nous font confiance chaque année
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <TestimonialCard
              quote="Grâce à Alzéa, j'ai fait mon stage de fin d'études à Séoul. Visa, logement, tout était géré. Je recommande à 100%."
              author="Marie L."
              role="Stage Marketing • Corée du Sud, 2024"
              rating={5}
              initials="ML"
              image="/images/avis/marie.jpg"
            />
            <TestimonialCard
              quote="Mon conseiller a été disponible tout au long de mon séjour en Irlande. Une expérience inoubliable, parfaitement organisée."
              author="Lucas M."
              role="Stage Hôtellerie • Dublin, 2024"
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
            Prêt à vivre l&apos;aventure ?
          </h2>
          <p className="text-gray-500 mb-8">
            Répondez à quelques questions et recevez des propositions personnalisées.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#D13D6A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#B8325A] transition-all"
          >
            Trouver mon programme →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#32373c] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <Image src="/images/logo-alzea.png" alt="Alzéa" width={120} height={60} className="h-10 w-auto mb-4 brightness-0 invert" />
              <p className="text-gray-400 text-sm">Association française de mobilité internationale fondée en 2005.</p>
            </div>
            <div>
              <div className="font-semibold mb-3">Contact</div>
              <p className="text-gray-400 text-sm">Lyon, France</p>
              <p className="text-gray-400 text-sm">contact@alzea.org</p>
            </div>
            <div>
              <div className="font-semibold mb-3">Liens</div>
              <Link href="/start" className="text-gray-400 text-sm hover:text-white block">Nos programmes</Link>
              <Link href="/#about" className="text-gray-400 text-sm hover:text-white block">À propos</Link>
            </div>
          </div>
          <div className="border-t border-gray-600 pt-8 text-center text-gray-500 text-sm">
            © 2025 Alzéa — Tous droits réservés
          </div>
        </div>
      </footer>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} lang="fr" />
    </main>
  );
}
