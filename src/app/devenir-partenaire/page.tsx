import LandingPage from '@/components/LandingPage';

export default function DevenirPartenairePage() {
  return (
    <LandingPage
      lang="fr"
      badge="Programme Partenariat"
      title="Devenez partenaire Alzéa"
      subtitle="Accueillez des stagiaires internationaux motivés et développez votre réseau"
      ctaText="Demander un appel →"
      ctaSubtext="30 min · Gratuit · Sans engagement"
      featuresTitle="Pourquoi devenir partenaire ?"
      features={[
        { icon: '🎯', title: 'Talents qualifiés', desc: 'Accédez à un vivier de jeunes motivés et formés dans leur domaine' },
        { icon: '📋', title: 'Zéro paperasse', desc: 'Alzéa gère les conventions, visas et démarches administratives' },
        { icon: '🌍', title: 'Ouverture internationale', desc: 'Enrichissez vos équipes avec des profils multiculturels' },
        { icon: '🤝', title: 'Accompagnement dédié', desc: 'Un interlocuteur unique pour un suivi personnalisé' },
      ]}
      testimonial={{
        text: "Nous travaillons avec Alzéa depuis 3 ans. Les stagiaires sont toujours bien préparés et motivés. Un vrai plus pour notre équipe.",
        author: "Thomas R.",
        role: "DRH · Entreprise partenaire, Lyon"
      }}
    />
  );
}
