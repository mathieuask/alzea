'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import BookingModal from '@/components/BookingModal';
import JourneyPath from '@/components/JourneyPath';
import TestimonialCard from '@/components/TestimonialCard';

const steps = [
  { icon: '📝', title: 'Application', description: 'Fill out the form and book a free discovery call' },
  { icon: '💬', title: 'Interview', description: '30-min call with your dedicated advisor to define your project' },
  { icon: '🎯', title: 'Placement', description: 'We match you with the right French establishment' },
  { icon: '📋', title: 'Visa & paperwork', description: 'We handle the entire administrative process for you' },
  { icon: '✈️', title: 'Arrival', description: 'Arrive ready with housing sorted and contacts on the ground' },
  { icon: '🤝', title: 'Ongoing support', description: 'Your advisor is always available throughout your stay' },
];

const sectors = [
  { icon: '👨‍🍳', title: 'Culinary Arts', desc: 'Work in Michelin-starred restaurants and learn from French masters.' },
  { icon: '🍰', title: 'Pastry & Bakery', desc: 'Master French pastry techniques in renowned establishments.' },
  { icon: '🏨', title: 'Hospitality', desc: 'Join luxury hotels and experience French service excellence.' },
];

export default function EtudiantEtrangerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-20 min-h-screen flex items-center bg-white overflow-hidden">
        <div className="flex-1 px-8 lg:px-16 xl:px-24 py-12">
          <div className="max-w-xl">
            <p className="text-[#33A7B5] text-sm font-medium tracking-wider uppercase mb-4">
              Jeunes Professionnels Program
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#32373c] leading-tight mb-6">
              Launch your career{' '}
              <span className="text-[#D13D6A]">in France.</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl mb-10 leading-relaxed">
              12-18 months • Paid position • Visa & housing included
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#D13D6A] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#B8325A] transition-all text-lg"
              >
                Book a discovery call →
              </button>
              <a
                href="#journey"
                className="border-2 border-gray-200 text-gray-600 px-8 py-4 rounded-full font-semibold hover:border-[#D13D6A] hover:text-[#D13D6A] transition-all"
              >
                See the process
              </a>
            </div>
          </div>
        </div>

        <div className="hidden lg:block flex-1 relative h-[85vh] max-w-2xl">
          <div className="absolute -top-10 -right-20 w-[500px] h-[500px] rounded-full border border-[#D13D6A]/10" />
          <div className="absolute bottom-20 -right-10 w-[300px] h-[300px] rounded-full border border-[#33A7B5]/10" />
          <div className="absolute top-[8%] left-[5%] w-[55%] h-[65%] rounded-3xl overflow-hidden shadow-2xl">
            <Image src="/images/hero2.jpg" alt="Career in France" fill className="object-cover" priority />
          </div>
          <div className="absolute bottom-[5%] right-[5%] w-[50%] h-[45%] rounded-3xl overflow-hidden shadow-2xl">
            <Image src="/images/hero1.jpg" alt="Professional experience" fill className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-16 px-6 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#32373c] mb-10">
            Available <span className="text-[#D13D6A]">sectors</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {sectors.map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-[#D13D6A]/5 to-[#33A7B5]/5 rounded-3xl p-8 text-center border border-[#D13D6A]/10">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg text-[#32373c] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Path */}
      <section id="journey" className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#32373c] mb-4">
            Your journey in <span className="text-[#D13D6A]">6 steps</span>
          </h2>
          <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">
            From application to ongoing support, Alzéa guides you every step of the way.
          </p>
          <JourneyPath steps={steps} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#32373c] mb-4">
            What they say
          </h2>
          <p className="text-gray-500 text-center mb-12">
            Join 200+ young professionals who trusted us with their career
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <TestimonialCard
              quote="Thanks to Alzéa, I worked at a 2-star Michelin restaurant in Lyon. The experience transformed my career."
              author="Kenji T."
              role="Culinary Internship • Lyon, 2023"
              rating={5}
              initials="KT"
              image="/images/avis/kenji.jpg"
            />
            <TestimonialCard
              quote="Everything was perfectly organized — visa, housing, and a great placement. I felt supported from day one."
              author="Sofia R."
              role="Pastry Internship • Paris, 2024"
              rating={5}
              initials="SR"
              image="/images/avis/sofia.jpg"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#32373c] mb-4">
            Ready to start your French adventure?
          </h2>
          <p className="text-gray-500 mb-8">
            Answer a few questions and receive personalized proposals.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#D13D6A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#B8325A] transition-all"
          >
            Find my program →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#32373c] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <Image src="/images/logo-alzea.png" alt="Alzéa" width={120} height={60} className="h-10 w-auto mb-4 brightness-0 invert" />
              <p className="text-gray-400 text-sm">French international mobility association founded in 2005.</p>
            </div>
            <div>
              <div className="font-semibold mb-3">Contact</div>
              <p className="text-gray-400 text-sm">Lyon, France</p>
              <p className="text-gray-400 text-sm">contact@alzea.org</p>
            </div>
            <div>
              <div className="font-semibold mb-3">Links</div>
              <Link href="/start" className="text-gray-400 text-sm hover:text-white block">Our programs</Link>
              <Link href="/#about" className="text-gray-400 text-sm hover:text-white block">About</Link>
            </div>
          </div>
          <div className="border-t border-gray-600 pt-8 text-center text-gray-500 text-sm">
            © 2025 Alzéa — All rights reserved
          </div>
        </div>
      </footer>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} lang="en" />
    </main>
  );
}
