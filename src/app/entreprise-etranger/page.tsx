import LandingPage from '@/components/LandingPage';

export default function EntrepriseEtrangerPage() {
  return (
    <LandingPage
      lang="en"
      badge="International Partnership"
      title="Partner with France's mobility expert."
      subtitle="20 years experience • 500+ partner institutions • Full support"
      ctaText="Schedule a call →"
      ctaSubtext="30 min · Free · Explore opportunities"
      featuresTitle="Partnership options"
      features={[
        { icon: '🎓', title: 'Schools & Universities', desc: 'Send your students to France or recruit French interns' },
        { icon: '🏨', title: 'Hospitality Groups', desc: 'Access our network of French establishments' },
        { icon: '💼', title: 'Recruitment Agencies', desc: 'Offer international mobility to your clients' },
        { icon: '🏛️', title: 'Government & NGOs', desc: 'Collaborate on youth mobility programs' },
      ]}
      extraSection={
        <section className="py-20 px-6 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid grid-cols-3 gap-8">
              {[
                { number: '20', label: 'Years experience' },
                { number: '500+', label: 'Partner institutions' },
                { number: '15', label: 'Countries' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl font-bold text-amber-400">{stat.number}</div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      }
      testimonial={{
        text: "Partnering with Alzéa has been a game-changer for our culinary school. Our students now have access to top French establishments.",
        author: "Dr. Yuki Tanaka",
        role: "Director • Tokyo Culinary Institute"
      }}
    />
  );
}
