'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import BookingModal from '@/components/BookingModal';
import TestimonialCard from '@/components/TestimonialCard';
import PartnersCarousel from '@/components/PartnersCarousel';

const processSteps = [
  { icon: '📞', title: 'Appel découverte', desc: '30 min pour comprendre vos besoins et vous présenter nos profils' },
  { icon: '🎯', title: 'Matching', desc: 'On sélectionne les candidats qui correspondent à votre établissement' },
  { icon: '✅', title: 'Accueil', desc: 'Le stagiaire arrive, prêt et accompagné. Vous n\'avez rien à gérer' },
];

const features = [
  { icon: '🎯', title: 'Talents qualifiés', desc: 'Accédez à un vivier de jeunes motivés et formés dans leur domaine' },
  { icon: '📋', title: 'Zéro paperasse', desc: 'Alzéa gère les conventions, visas et démarches administratives' },
  { icon: '🌍', title: 'Ouverture internationale', desc: 'Enrichissez vos équipes avec des profils multiculturels' },
  { icon: '🤝', title: 'Accompagnement dédié', desc: 'Un interlocuteur unique pour un suivi personnalisé' },
];

export default function DevenirPartenairePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-20 min-h-screen flex items-center bg-white overflow-hidden">
        <div className="flex-1 px-8 lg:px-16 xl:px-24 py-12">
          <div className="max-w-xl">
            <p className="text-[#33A7B5] text-sm font-medium tracking-wider uppercase mb-4">
              Programme Partenariat
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#32373c] leading-tight mb-6">
              Devenez partenaire{' '}
              <span className="text-[#D13D6A]">Alzéa</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl mb-10 leading-relaxed">
              Accueillez des stagiaires internationaux motivés et développez votre réseau
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#D13D6A] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#B8325A] transition-all text-lg"
              >
                Demander un appel →
              </button>
              <a
                href="#process"
                className="border-2 border-gray-200 text-gray-600 px-8 py-4 rounded-full font-semibold hover:border-[#D13D6A] hover:text-[#D13D6A] transition-all"
              >
                Comment ça marche
              </a>
            </div>
          </div>
        </div>

        <div className="hidden lg:block flex-1 relative h-[85vh] max-w-2xl">
          <div className="absolute -top-10 -right-20 w-[500px] h-[500px] rounded-full border border-[#D13D6A]/10" />
          <div className="absolute bottom-20 -right-10 w-[300px] h-[300px] rounded-full border border-[#33A7B5]/10" />
          <div className="absolute top-[10%] left-[10%] w-[70%] h-[70%] rounded-3xl overflow-hidden shadow-2xl">
            <Image src="/images/hero3.jpg" alt="Partenaire Alzéa" fill className="object-cover" priority />
            {/* Badge flottant */}
            <div className="absolute bottom-6 left-6 bg-white rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full" />
              <span className="font-semibold text-[#32373c] text-sm">20+ partenaires actifs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#32373c] mb-4">
            Pourquoi devenir <span className="text-[#D13D6A]">partenaire</span> ?
          </h2>
          <p className="text-gray-500 text-center mb-16 max-w-2xl mx-auto">
            Simplifiez votre recrutement international avec un accompagnement clé en main
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
            Comment ça marche ?
          </h2>
          <p className="text-gray-500 text-center mb-16">
            3 étapes simples pour accueillir votre premier stagiaire
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
                  Étape {i + 1}
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
            Ils nous font confiance
          </h2>
          <p className="text-gray-500 text-center mb-12">
            Des partenaires satisfaits dans toute la France
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <TestimonialCard
              quote="Nous travaillons avec Alzéa depuis 3 ans. Les stagiaires sont toujours bien préparés et motivés. Un vrai plus pour notre équipe."
              author="Thomas R."
              role="DRH • Entreprise partenaire, Lyon"
              rating={5}
              initials="TR"
              image="/images/avis/thomas.jpg"
            />
            <TestimonialCard
              quote="Le processus est simple et efficace. Alzéa s'occupe de tout et les profils sont toujours de qualité. Je recommande sans hésiter."
              author="Claire D."
              role="Directrice • Hôtel 4 étoiles, Paris"
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
            Nos partenaires
          </h2>
          <p className="text-gray-500 text-center text-sm">
            Universités, écoles et institutions partenaires
          </p>
        </div>
        <PartnersCarousel />
      </section>

      {/* CTA Dark */}
      <section className="py-24 px-6 bg-[#32373c]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à rejoindre notre réseau ?
          </h2>
          <p className="text-gray-400 mb-8">
            Un appel de 30 minutes suffit pour explorer les possibilités.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#32373c] transition-all"
          >
            Demander un appel →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#32373c] text-white border-t border-gray-600">
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
