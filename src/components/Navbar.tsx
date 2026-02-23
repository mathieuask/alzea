'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo-alzea.png"
            alt="Alzéa"
            width={140}
            height={70}
            className="h-12 w-auto"
          />
        </Link>
        
        {/* Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/#partenaire" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
            Devenir partenaire
          </Link>
          <Link
            href="/start"
            className="bg-[#D13D6A] text-white px-6 py-3 rounded-full font-medium hover:bg-[#B8325A] transition-all text-sm"
          >
            Trouver un stage
          </Link>
        </div>
      </div>
    </nav>
  );
}
