import Link from 'next/link';
import Image from 'next/image';

export default function StartPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <Link href="/" className="block mb-12">
        <Image
          src="/images/logo-alzea.png"
          alt="Alzéa"
          width={160}
          height={80}
          className="h-16 w-auto"
        />
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-[#32373c] text-center mb-4">
        Où souhaitez-vous faire votre stage ?
      </h1>
      <p className="text-gray-500 text-center mb-12 max-w-md">
        Choisissez votre destination et découvrez nos programmes adaptés.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        <Link
          href="/etudiant-etranger"
          className="relative h-[350px] rounded-3xl overflow-hidden group block"
        >
          <Image
            src="/images/hero1.jpg"
            alt="Stages en France"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <span className="text-5xl mb-4">🇫🇷</span>
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-3">En France</h2>
            <span className="text-white/80 border border-white/50 px-6 py-2 rounded-full text-sm font-medium group-hover:bg-white group-hover:text-[#32373c] transition-all">
              Découvrir
            </span>
          </div>
        </Link>

        <Link
          href="/etudiant-france"
          className="relative h-[350px] rounded-3xl overflow-hidden group block"
        >
          <Image
            src="/images/hero2.jpg"
            alt="Stages à l'étranger"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <span className="text-5xl mb-4">🌍</span>
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-3">À l&apos;étranger</h2>
            <span className="text-white/80 border border-white/50 px-6 py-2 rounded-full text-sm font-medium group-hover:bg-white group-hover:text-[#32373c] transition-all">
              Découvrir
            </span>
          </div>
        </Link>
      </div>

      <Link href="/" className="mt-10 text-gray-400 hover:text-gray-600 text-sm transition-colors">
        ← Retour à l&apos;accueil
      </Link>
    </main>
  );
}
