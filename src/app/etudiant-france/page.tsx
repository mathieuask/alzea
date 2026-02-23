import LandingPage from '@/components/LandingPage';

const destinations = [
  '🇬🇧 Irlande', '🇪🇸 Espagne', '🇩🇪 Allemagne', '🇮🇹 Italie',
  '🇵🇹 Portugal', '🇰🇷 Corée du Sud', '🇯🇵 Japon', '🇨🇦 Canada',
  '🇺🇸 États-Unis', '🇲🇽 Mexique', '🇵🇪 Pérou', '🇦🇺 Australie',
];

export default function EtudiantFrancePage() {
  return (
    <LandingPage
      lang="fr"
      badge="Programme Mobilité Internationale"
      title="Votre stage à l'étranger, clé en main."
      subtitle="15 destinations • Visa & logement inclus • Accompagnement personnalisé"
      ctaText="Réserver un appel découverte →"
      ctaSubtext="30 min · Gratuit · Sans engagement"
      featuresTitle="Ce qui est inclus"
      features={[
        { icon: '🎯', title: 'Recherche de stage', desc: 'Accès à notre réseau de 500+ entreprises partenaires' },
        { icon: '📋', title: 'Visa & démarches', desc: 'On gère toute la paperasse administrative pour vous' },
        { icon: '🏠', title: 'Logement', desc: 'Résidence, coloc ou famille d\'accueil selon vos envies' },
        { icon: '🤝', title: 'Suivi continu', desc: 'Un conseiller dédié avant, pendant et après votre stage' },
      ]}
      extraSection={
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">15 destinations disponibles</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {destinations.map((dest, i) => (
                <span key={i} className="bg-white px-5 py-3 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow">
                  {dest}
                </span>
              ))}
            </div>
          </div>
        </section>
      }
      testimonial={{
        text: "Grâce à Alzéa, j'ai fait mon stage de fin d'études à Séoul. Visa, logement, tout était géré. Je recommande à 100%.",
        author: "Marie L.",
        role: "Stage Marketing • Corée du Sud, 2024"
      }}
    />
  );
}
