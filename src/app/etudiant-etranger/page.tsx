import LandingPage from '@/components/LandingPage';

export default function EtudiantEtrangerPage() {
  return (
    <LandingPage
      lang="en"
      badge="Jeunes Professionnels Program"
      title="Launch your career in France."
      subtitle="12-18 months • Paid position • Visa & housing included"
      ctaText="Book a discovery call →"
      ctaSubtext="30 min · Free · No commitment"
      featuresTitle="What's included"
      features={[
        { icon: '🎯', title: 'Placement', desc: 'Access to 300+ partner establishments in France' },
        { icon: '📋', title: 'Visa support', desc: 'We handle the entire visa process for you' },
        { icon: '🏠', title: 'Housing', desc: 'Staff accommodation or shared apartment near work' },
        { icon: '🤝', title: 'Ongoing support', desc: 'A dedicated advisor throughout your stay' },
      ]}
      extraSection={
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Available sectors</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: '👨‍🍳', title: 'Culinary Arts', desc: 'Work in Michelin-starred restaurants and learn from French masters.' },
                { icon: '🍰', title: 'Pastry & Bakery', desc: 'Master French pastry techniques in renowned establishments.' },
                { icon: '🏨', title: 'Hospitality', desc: 'Join luxury hotels and experience French service excellence.' },
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
        text: "Thanks to Alzéa, I worked at a 2-star Michelin restaurant in Lyon. The experience transformed my career.",
        author: "Kenji T.",
        role: "Culinary Internship • Lyon, 2023"
      }}
    />
  );
}
