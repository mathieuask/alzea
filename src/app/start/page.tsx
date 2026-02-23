'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/context/UserContext';

export default function StartPage() {
  const router = useRouter();
  const { setUserData } = useUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    age: '',
    statut: '',
    domaine: '',
    location: '',
  });

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStep1Valid = formData.prenom && formData.nom && formData.email && formData.age;
  const isStep2Valid = formData.statut && formData.domaine;

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const selectLocation = (location: string) => {
    const updatedData = { ...formData, location };
    setUserData(updatedData);
    
    const isEntreprise = ['entreprise', 'ecole'].includes(formData.statut);
    const type = isEntreprise ? 'entreprise' : 'etudiant';
    const route = `/${type}-${location}`;
    
    setTimeout(() => router.push(route), 300);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="block text-center mb-8">
          <Image
            src="/images/logo-alzea.png"
            alt="Alzéa"
            width={140}
            height={70}
            className="h-14 w-auto mx-auto"
          />
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#32373c] mb-2">
              Parlez-nous de vous
            </h1>
            <p className="text-gray-500 text-sm">
              Quelques questions pour personnaliser votre expérience
            </p>
          </div>

          {/* Progress */}
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? 'w-8 bg-[#D13D6A]' : 
                  i < step ? 'w-4 bg-[#D13D6A]' : 'w-4 bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <p className="font-medium text-[#32373c] mb-6 text-center">Vos informations</p>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Prénom</label>
                  <input
                    type="text"
                    value={formData.prenom}
                    onChange={e => updateForm('prenom', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-[#D13D6A] focus:outline-none transition-colors bg-gray-50/50"
                    placeholder="Prénom"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Nom</label>
                  <input
                    type="text"
                    value={formData.nom}
                    onChange={e => updateForm('nom', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-[#D13D6A] focus:outline-none transition-colors bg-gray-50/50"
                    placeholder="Nom"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => updateForm('email', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-[#D13D6A] focus:outline-none transition-colors bg-gray-50/50"
                  placeholder="vous@email.com"
                />
              </div>

              <div className="mb-6">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Âge</label>
                <select
                  value={formData.age}
                  onChange={e => updateForm('age', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-[#D13D6A] focus:outline-none transition-colors bg-gray-50/50 appearance-none"
                >
                  <option value="">Sélectionnez</option>
                  <option value="15-18">15-18 ans</option>
                  <option value="18-25">18-25 ans</option>
                  <option value="25-30">25-30 ans</option>
                  <option value="30+">30 ans et +</option>
                </select>
              </div>

              <button
                onClick={nextStep}
                disabled={!isStep1Valid}
                className="w-full py-3.5 bg-[#D13D6A] text-white rounded-full font-medium disabled:bg-gray-200 disabled:text-gray-400 hover:bg-[#B8325A] transition-all"
              >
                Continuer →
              </button>
            </div>
          )}

          {/* Step 2: Profile */}
          {step === 2 && (
            <div className="animate-fadeIn">
              <p className="font-medium text-[#32373c] mb-6 text-center">Votre profil</p>
              
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Vous êtes...</label>
                <select
                  value={formData.statut}
                  onChange={e => updateForm('statut', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-[#D13D6A] focus:outline-none transition-colors bg-gray-50/50 appearance-none"
                >
                  <option value="">Sélectionnez</option>
                  <option value="lyceen">Lycéen(ne)</option>
                  <option value="etudiant">Étudiant(e)</option>
                  <option value="jeune-pro">Jeune professionnel(le)</option>
                  <option value="entreprise">Représentant d'entreprise</option>
                  <option value="ecole">Représentant d'école</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Domaine / Secteur</label>
                <select
                  value={formData.domaine}
                  onChange={e => updateForm('domaine', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-[#D13D6A] focus:outline-none transition-colors bg-gray-50/50 appearance-none"
                >
                  <option value="">Sélectionnez</option>
                  <option value="commerce">Commerce / Marketing</option>
                  <option value="hotellerie">Hôtellerie / Restauration</option>
                  <option value="ingenierie">Ingénierie / Tech</option>
                  <option value="communication">Communication / Média</option>
                  <option value="finance">Finance / Comptabilité</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={prevStep}
                  className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition-all"
                >
                  ← Retour
                </button>
                <button
                  onClick={nextStep}
                  disabled={!isStep2Valid}
                  className="flex-[2] py-3.5 bg-[#D13D6A] text-white rounded-full font-medium disabled:bg-gray-200 disabled:text-gray-400 hover:bg-[#B8325A] transition-all"
                >
                  Continuer →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div className="animate-fadeIn">
              <p className="font-medium text-[#32373c] mb-6 text-center">Vous êtes basé(e)...</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => selectLocation('france')}
                  className="p-6 border-2 border-gray-100 rounded-2xl hover:border-[#D13D6A] hover:bg-pink-50/50 transition-all group"
                >
                  <div className="text-4xl mb-3">🇫🇷</div>
                  <div className="font-medium text-[#32373c] group-hover:text-[#D13D6A]">En France</div>
                </button>
                <button
                  onClick={() => selectLocation('etranger')}
                  className="p-6 border-2 border-gray-100 rounded-2xl hover:border-[#33A7B5] hover:bg-teal-50/50 transition-all group"
                >
                  <div className="text-4xl mb-3">🌍</div>
                  <div className="font-medium text-[#32373c] group-hover:text-[#33A7B5]">À l'étranger</div>
                </button>
              </div>

              <button
                onClick={prevStep}
                className="w-full py-3 text-gray-500 font-medium hover:text-gray-700 transition-colors"
              >
                ← Modifier mon profil
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          Vos données sont protégées et ne seront jamais partagées.
        </p>
      </div>
    </main>
  );
}
