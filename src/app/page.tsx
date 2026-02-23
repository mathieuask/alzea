import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero - Texte gauche + Image stylisée droite */}
      <section className="pt-20 min-h-screen flex items-center bg-white overflow-hidden">
        {/* Contenu gauche */}
        <div className="flex-1 px-8 lg:px-16 xl:px-24 py-12">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#32373c] leading-tight mb-6">
              Transformez votre avenir avec un{' '}
              <span className="text-[#D13D6A]">stage international</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl mb-10 leading-relaxed">
              Combinez expérience professionnelle, découverte culturelle et accompagnement personnalisé.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/start"
                className="bg-[#D13D6A] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#B8325A] transition-all text-lg"
              >
                Découvrir nos programmes
              </Link>
              <Link
                href="/#about"
                className="border-2 border-gray-200 text-gray-600 px-8 py-4 rounded-full font-semibold hover:border-[#D13D6A] hover:text-[#D13D6A] transition-all"
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </div>

        {/* Image droite - Composition en grille décalée */}
        <div className="hidden lg:block flex-1 relative h-[85vh] max-w-2xl">
          {/* Élément décoratif - grand cercle */}
          <div className="absolute -top-10 -right-20 w-[500px] h-[500px] rounded-full border border-[#D13D6A]/10" />
          <div className="absolute bottom-20 -right-10 w-[300px] h-[300px] rounded-full border border-[#33A7B5]/10" />

          {/* Image principale - grande */}
          <div className="absolute top-[8%] left-[5%] w-[55%] h-[65%] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/hero2.jpg"
              alt="Stage international"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Image secondaire - décalée en bas à droite */}
          <div className="absolute bottom-[5%] right-[5%] w-[50%] h-[45%] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/hero1.jpg"
              alt="Expérience professionnelle"
              fill
              className="object-cover"
              priority
            />
          </div>


        </div>
      </section>

      {/* Stats - Bandeau séparation */}
      <section className="py-10 px-6 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '20', suffix: ' ans', label: "hôtels / Restaurants membres" },
              { number: '200', suffix: '+', label: 'jeunes accompagnés chaque année' },
              { number: '400', suffix: '', label: 'destinations possibles' },
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

      {/* 3 grandes images - Stages France / Étranger / Partenaire */}
      <section className="grid grid-cols-1 md:grid-cols-3 w-full">
        <Link href="/etudiant-france" className="relative h-[400px] md:h-[500px] group overflow-hidden block">
          <Image
            src="/images/hero1.jpg"
            alt="Stages en France"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Stages en France</h2>
            <span className="text-white/80 border border-white/50 px-6 py-2 rounded-full text-sm font-medium group-hover:bg-white group-hover:text-[#32373c] transition-all">
              Découvrir
            </span>
          </div>
        </Link>

        <Link href="/etudiant-etranger" className="relative h-[400px] md:h-[500px] group overflow-hidden block">
          <Image
            src="/images/hero2.jpg"
            alt="Stages à l'étranger"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Stages à l&apos;étranger</h2>
            <span className="text-white/80 border border-white/50 px-6 py-2 rounded-full text-sm font-medium group-hover:bg-white group-hover:text-[#32373c] transition-all">
              Découvrir
            </span>
          </div>
        </Link>

        <Link href="/devenir-partenaire" className="relative h-[400px] md:h-[500px] group overflow-hidden block">
          <Image
            src="/images/hero3.jpg"
            alt="Devenir partenaire"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Devenir partenaire</h2>
            <span className="text-white/80 border border-white/50 px-6 py-2 rounded-full text-sm font-medium group-hover:bg-white group-hover:text-[#32373c] transition-all">
              En savoir plus
            </span>
          </div>
        </Link>
      </section>


      {/* Partenaires - Défilement horizontal */}
      <section className="py-16 bg-white border-t border-gray-100 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#32373c] mb-2">
            Nos partenaires
          </h2>
          <p className="text-gray-500 text-center text-sm">
            Universités, écoles, associations et institutions
          </p>
        </div>
        <div className="relative">
          <div className="flex animate-scroll-left w-max">
            {[
              'CEFAM', 'Collège de Paris', 'ESG', 'ESPL', 'IDRAC', 'ARAM',
              'Study Experience', 'ISIFA', 'CY Cergy Paris Université',
              'Année Lumière', 'Take me abroad', 'Campus Globers',
              'Ankuran Education', 'The Rise Hub', 'Visa Vacances Travail',
              'CEFAM', 'Collège de Paris', 'ESG', 'ESPL', 'IDRAC', 'ARAM',
              'Study Experience', 'ISIFA', 'CY Cergy Paris Université',
              'Année Lumière', 'Take me abroad', 'Campus Globers',
              'Ankuran Education', 'The Rise Hub', 'Visa Vacances Travail',
            ].map((partner, i) => (
              <div
                key={i}
                className="flex-shrink-0 mx-6 px-8 py-4 bg-gray-50 rounded-2xl flex items-center justify-center min-w-[200px] hover:shadow-md transition-shadow"
              >
                <span className="text-[#32373c] font-semibold text-sm whitespace-nowrap">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#32373c] mb-4">
            Pourquoi choisir <span className="text-[#D13D6A]">Alzéa</span> ?
          </h2>
          <p className="text-gray-500 text-center mb-16 max-w-2xl mx-auto">
            Une expertise reconnue au service de votre réussite internationale
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🤝', title: 'Accompagnement humain', desc: 'Un conseiller dédié à chaque étape de votre projet' },
              { icon: '📋', title: 'Démarches simplifiées', desc: 'Visa, assurance, convention : on gère la paperasse' },
              { icon: '🏠', title: 'Logement inclus', desc: 'Résidence, colocation ou famille d\'accueil' },
              { icon: '🌍', title: 'Réseau mondial', desc: '15 destinations et 500+ entreprises partenaires' },
            ].map((feature, i) => (
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
          <h2 className="text-3xl font-bold text-[#32373c] mb-4">
            Prêt à vivre l'aventure ?
          </h2>
          <p className="text-gray-500 mb-8">
            Répondez à quelques questions et recevez des propositions personnalisées.
          </p>
          <Link 
            href="/start" 
            className="bg-[#D13D6A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#B8325A] transition-all inline-block"
          >
            Trouver mon programme →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#32373c] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <Image
                src="/images/logo-alzea.png"
                alt="Alzéa"
                width={120}
                height={60}
                className="h-10 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-gray-400 text-sm">
                Association française de mobilité internationale fondée en 2005.
              </p>
            </div>
            <div>
              <div className="font-semibold mb-3">Contact</div>
              <p className="text-gray-400 text-sm">📍 Lyon, France</p>
              <p className="text-gray-400 text-sm">📧 contact@alzea.org</p>
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
    </main>
  );
}
