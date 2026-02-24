'use client';

const partners = [
  '/images/partenaires/Logo-CEFAM.png',
  '/images/partenaires/Logo-College-de-paris.png',
  '/images/partenaires/Logo-ESG.png',
  '/images/partenaires/Logo-ESPL.png',
  '/images/partenaires/Logo-IDRAC.png',
  '/images/partenaires/LOGO-long-ARAM.png',
  '/images/partenaires/Logo-study-experience.png',
  '/images/partenaires/Logo-Isifa.png',
  '/images/partenaires/logo-CY-Cergy-Paris-Universite.png',
  '/images/partenaires/Logo-annee-lumiere.png',
  '/images/partenaires/Logo-Take-me-abroad.png',
  '/images/partenaires/Logo-Campus-Globers.png',
  '/images/partenaires/Logo-Ankuran-Education.png',
  '/images/partenaires/logo-the-rise-hub.png',
  '/images/partenaires/Logo-visa-vacances-travail.png',
];

export default function PartnersCarousel() {
  // Chaque logo = 140px width + 60px margin (30px chaque côté) = 200px
  const logoWidth = 200;
  const totalWidth = partners.length * logoWidth;
  const duration = 50; // secondes pour un cycle complet

  return (
    <div style={{ overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          width: `${totalWidth * 2}px`,
          animation: `scroll ${duration}s linear infinite`,
        }}
      >
        {/* Copie 1 */}
        {partners.map((src, i) => (
          <img
            key={`a-${i}`}
            src={src}
            alt=""
            loading="lazy"
            style={{
              height: 48,
              width: 140,
              objectFit: 'contain',
              flexShrink: 0,
              margin: '0 30px',
              opacity: 0.7,
            }}
          />
        ))}
        {/* Copie 2 — identique, suit la première */}
        {partners.map((src, i) => (
          <img
            key={`b-${i}`}
            src={src}
            alt=""
            loading="lazy"
            style={{
              height: 48,
              width: 140,
              objectFit: 'contain',
              flexShrink: 0,
              margin: '0 30px',
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${totalWidth}px); }
        }
      `}</style>
    </div>
  );
}
