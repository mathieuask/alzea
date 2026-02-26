'use client';

import { useState, useMemo } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'fr' | 'en' | 'es';
}

export default function BookingModal({ isOpen, onClose, lang = 'fr' }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    statut: '',
    domaine: '',
    message: '',
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const t = {
    fr: {
      title: 'Demander un appel',
      subtitle: '30 min · Gratuit · Sans engagement',
      step1Title: 'Parlez-nous de vous',
      step2Title: 'Choisissez un créneau',
      selectDay: 'Choisissez un jour',
      selectTime: 'Choisissez un horaire',
      confirm: 'Confirmer le rendez-vous →',
      next: 'Continuer →',
      back: '← Retour',
      success: 'Rendez-vous confirmé !',
      close: 'Fermer',
      days: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    },
    en: {
      title: 'Request a call',
      subtitle: '30 min · Free · No commitment',
      step1Title: 'Tell us about yourself',
      step2Title: 'Pick a time slot',
      selectDay: 'Select a day',
      selectTime: 'Select a time',
      confirm: 'Confirm appointment →',
      next: 'Continue →',
      back: '← Back',
      success: 'Appointment confirmed!',
      close: 'Close',
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    },
    es: {
      title: 'Solicitar una llamada',
      subtitle: '30 min · Gratis · Sin compromiso',
      step1Title: 'Cuéntanos sobre ti',
      step2Title: 'Elige un horario',
      selectDay: 'Elige un día',
      selectTime: 'Elige una hora',
      confirm: 'Confirmar cita →',
      next: 'Continuar →',
      back: '← Volver',
      success: '¡Cita confirmada!',
      close: 'Cerrar',
      days: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    },
  }[lang];

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStep1Valid = formData.prenom && formData.nom && formData.email && formData.statut;

  const availableDates = useMemo(() => {
    const dates: Date[] = [];
    const today = new Date();
    const day = new Date(today);
    day.setDate(day.getDate() + 1);

    while (dates.length < 10) {
      const dayOfWeek = day.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        dates.push(new Date(day));
      }
      day.setDate(day.getDate() + 1);
    }
    return dates;
  }, []);

  const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];

  const getAvailableSlots = (dateStr: string) => {
    const hash = dateStr.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return timeSlots.filter((_, i) => (hash + i) % 3 !== 0);
  };

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const formatDisplayDate = (date: Date) => {
    const day = date.getDate();
    const month = t.months[date.getMonth()];
    return `${day} ${month}`;
  };

  if (!isOpen) return null;

  const handleClose = () => {
    setStep(1);
    setFormData({ prenom: '', nom: '', email: '', telephone: '', statut: '', domaine: '', message: '' });
    setSelectedDate(null);
    setSelectedTime(null);
    onClose();
  };

  const submitToHubSpot = () => {
    const _hsq = (window as any)._hsq = (window as any)._hsq || [];
    _hsq.push(['identify', {
      email: formData.email,
      firstname: formData.prenom,
      lastname: formData.nom,
      phone: formData.telephone || undefined,
      hs_persona: formData.statut || undefined,
      industry: formData.domaine || undefined,
      message: formData.message || undefined,
      appointment_date: selectedDate || undefined,
      appointment_time: selectedTime || undefined,
    }]);
    _hsq.push(['trackEvent', {
      id: 'Booking Request',
      value: null,
    }]);
    _hsq.push(['trackPageView']);
  };

  const selectedDateObj = selectedDate ? availableDates.find(d => formatDate(d) === selectedDate) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-scaleIn overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 flex justify-between items-start border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-[#32373c]">{t.title}</h2>
            <p className="text-gray-500 text-sm">{t.subtitle}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 pt-4">
          <div className="flex gap-2">
            {[1, 2].map(i => (
              <div
                key={i}
                className={`h-1 rounded-full flex-1 transition-all duration-300 ${
                  i <= step ? 'bg-[#D13D6A]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Step 1: Questions */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <p className="font-semibold text-[#32373c] mb-6">{t.step1Title}</p>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Prénom *</label>
                  <input
                    type="text"
                    value={formData.prenom}
                    onChange={e => updateForm('prenom', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-[#D13D6A] focus:outline-none transition-colors bg-gray-50/50"
                    placeholder="Prénom"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Nom *</label>
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
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => updateForm('email', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-[#D13D6A] focus:outline-none transition-colors bg-gray-50/50"
                  placeholder="vous@email.com"
                />
              </div>

              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Téléphone</label>
                <input
                  type="tel"
                  value={formData.telephone}
                  onChange={e => updateForm('telephone', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-[#D13D6A] focus:outline-none transition-colors bg-gray-50/50"
                  placeholder="06 12 34 56 78"
                />
              </div>

              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Vous êtes... *</label>
                <select
                  value={formData.statut}
                  onChange={e => updateForm('statut', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-[#D13D6A] focus:outline-none transition-colors bg-gray-50/50 appearance-none"
                >
                  <option value="">Sélectionnez</option>
                  <option value="lyceen">Lycéen(ne)</option>
                  <option value="etudiant">Étudiant(e)</option>
                  <option value="jeune-pro">Jeune professionnel(le)</option>
                  <option value="entreprise">Entreprise / École</option>
                </select>
              </div>

              <div className="mb-3">
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

              <div className="mb-6">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Message (optionnel)</label>
                <textarea
                  value={formData.message}
                  onChange={e => updateForm('message', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-[#D13D6A] focus:outline-none transition-colors bg-gray-50/50 resize-none text-sm"
                  rows={2}
                  placeholder="Une question, un projet précis ?"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!isStep1Valid}
                className="w-full py-3.5 bg-[#D13D6A] text-white rounded-full font-medium disabled:bg-gray-200 disabled:text-gray-400 hover:bg-[#B8325A] transition-all"
              >
                {t.next}
              </button>
            </div>
          )}

          {/* Step 2: Date/Time */}
          {step === 2 && (
            <div className="animate-fadeIn">
              <p className="font-semibold text-[#32373c] mb-6">{t.step2Title}</p>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-3">
                  {t.selectDay}
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {availableDates.map((date) => {
                    const dateStr = formatDate(date);
                    const isSelected = selectedDate === dateStr;
                    const dayName = t.days[date.getDay()];
                    const dayNum = date.getDate();

                    return (
                      <button
                        key={dateStr}
                        onClick={() => {
                          setSelectedDate(dateStr);
                          setSelectedTime(null);
                        }}
                        className={`p-3 rounded-xl border-2 transition-all text-center ${
                          isSelected
                            ? 'border-[#D13D6A] bg-pink-50 text-[#D13D6A]'
                            : 'border-gray-100 hover:border-pink-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="text-xs text-gray-500 font-medium">{dayName}</div>
                        <div className={`text-lg font-bold ${isSelected ? 'text-[#D13D6A]' : 'text-[#32373c]'}`}>
                          {dayNum}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {selectedDateObj && (
                  <p className="text-sm text-[#33A7B5] mt-2 font-medium">
                    {formatDisplayDate(selectedDateObj)}
                  </p>
                )}
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="mb-6 animate-fadeIn">
                  <label className="block text-sm font-medium text-gray-600 mb-3">
                    {t.selectTime}
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {getAvailableSlots(selectedDate).map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2.5 px-3 rounded-xl border-2 text-sm font-medium transition-all ${
                            isSelected
                              ? 'border-[#D13D6A] bg-[#D13D6A] text-white'
                              : 'border-gray-100 hover:border-pink-200 text-gray-700'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition-all"
                >
                  {t.back}
                </button>
                <button
                  onClick={() => { submitToHubSpot(); setStep(3); }}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-[2] py-3.5 bg-[#D13D6A] text-white rounded-full font-medium disabled:bg-gray-200 disabled:text-gray-400 hover:bg-[#B8325A] transition-all"
                >
                  {t.confirm}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="animate-fadeIn text-center py-8">
              <div className="w-16 h-16 bg-[#33A7B5]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-[#33A7B5]">✓</span>
              </div>
              <h3 className="text-xl font-bold text-[#32373c] mb-2">{t.success}</h3>
              <div className="bg-gray-50 rounded-xl p-4 mb-4 inline-block">
                <p className="text-lg font-semibold text-[#D13D6A]">
                  {selectedDateObj && formatDisplayDate(selectedDateObj)} à {selectedTime}
                </p>
              </div>
              <p className="text-gray-500 mb-6">
                {formData.prenom}, on vous envoie un email de confirmation à {formData.email}.
              </p>
              <button
                onClick={handleClose}
                className="w-full py-3.5 bg-[#D13D6A] text-white rounded-full font-medium hover:bg-[#B8325A] transition-all"
              >
                {t.close}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
