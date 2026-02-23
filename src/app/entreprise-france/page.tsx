import LandingPage from '@/components/LandingPage';

export default function EntrepriseFrancePage() {
  return (
    <LandingPage
      lang="fr"
      badge="Recrutement International"
      title="Recrutez des talents qualifiés, sans paperasse."
      subtitle="Candidats présélectionnés • Visa géré • Accompagnement complet"
      ctaText="Planifier un appel →"
      ctaSubtext="15 min · Gratuit · Profils sous 7 jours"
      featuresTitle="Pourquoi Alzéa ?"
      features={[
        { icon: '✅', title: 'Candidats présélectionnés', desc: 'Motivation, compétences et français évalués avant envoi' },
        { icon: '📋', title: 'Zéro paperasse', desc: 'On gère visa et démarches administratives' },
        { icon: '⏱️', title: 'Rapidité', desc: 'Profils envoyés sous 7 jours' },
        { icon: '🤝', title: 'Suivi continu', desc: 'Accompagnement pendant toute la durée du contrat' },
      ]}
      extraSection={
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Profils disponibles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: '👨‍🍳', title: 'Cuisine', desc: 'Chefs, commis, cuisiniers formés internationalement.' },
                { icon: '🍰', title: 'Pâtisserie', desc: 'Pâtissiers et boulangers passionnés par les techniques françaises.' },
                { icon: '🏨', title: 'Service & Hôtellerie', desc: 'Serveurs, réceptionnistes, housekeeping avec sens du service.' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      }
      testimonial={{
        text: "Alzéa nous accompagne depuis 3 ans dans nos recrutements internationaux. Les profils sont toujours de qualité.",
        author: "Jean-Marc D.",
        role: "Directeur RH • Groupe hôtelier, Paris"
      }}
    />
  );
}
