'use client';

import { useState, useMemo } from 'react';
import { useUser } from '@/context/UserContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'fr' | 'en';
}

export default function BookingModal({ isOpen, onClose, lang = 'fr' }: BookingModalProps) {
  const { userData, isLoggedIn } = useUser();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const t = {
    fr: {
      title: 'Réserver un appel',
      subtitle: '30 min · Gratuit · Sans engagement',
      selectDay: 'Choisissez un jour',
      selectTime: 'Choisissez un horaire',
      messagePlaceholder: 'Une question ? (optionnel)',
      confirm: 'Confirmer le rendez-vous →',
      success: 'Rendez-vous confirmé !',
      successMsg: `${userData.prenom || 'Vous'}, on vous envoie un email de confirmation.`,
      close: 'Fermer',
      days: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    },
    en: {
      title: 'Book a call',
      subtitle: '30 min · Free · No commitment',
      selectDay: 'Select a day',
      selectTime: 'Select a time',
      messagePlaceholder: 'Any questions? (optional)',
      confirm: 'Confirm appointment →',
      success: 'Appointment confirmed!',
      successMsg: `${userData.prenom || 'We'}'ll send you a confirmation email.`,
      close: 'Close',
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    },
  }[lang];

  // Generate next 14 days (excluding weekends)
  const availableDates = useMemo(() => {
    const dates: Date[] = [];
    const today = new Date();
    let day = new Date(today);
    day.setDate(day.getDate() + 1); // Start from tomorrow
    
    while (dates.length < 10) {
      const dayOfWeek = day.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude weekends
        dates.push(new Date(day));
      }
      day.setDate(day.getDate() + 1);
    }
    return dates;
  }, []);

  // Available time slots
  const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];

  // Simulate some slots being unavailable (random for demo)
  const getAvailableSlots = (dateStr: string) => {
    const hash = dateStr.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return timeSlots.filter((_, i) => (hash + i) % 3 !== 0);
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDisplayDate = (date: Date) => {
    const day = date.getDate();
    const month = t.months[date.getMonth()];
    return `${day} ${month}`;
  };

  if (!isOpen) return null;

  const handleSubmit = () => {
    setStep(2);
  };

  const handleClose = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setMessage('');
    onClose();
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

        {/* Body */}
        <div className="p-6">
          {step === 1 && (
            <div className="animate-fadeIn">
              {/* User info banner */}
              {isLoggedIn && (
                <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-teal-50 rounded-2xl border border-pink-100">
                  <p className="text-sm font-medium text-[#32373c]">
                    👋 {userData.prenom} {userData.nom}
                  </p>
                  <p className="text-xs text-[#D13D6A]">{userData.email}</p>
                </div>
              )}

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#32373c] mb-3">
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
                    📅 {formatDisplayDate(selectedDateObj)}
                  </p>
                )}
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="mb-6 animate-fadeIn">
                  <label className="block text-sm font-semibold text-[#32373c] mb-3">
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

              {/* Message */}
              {selectedTime && (
                <div className="mb-6 animate-fadeIn">
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-[#D13D6A] focus:outline-none transition-colors bg-gray-50/50 resize-none text-sm"
                    rows={2}
                    placeholder={t.messagePlaceholder}
                  />
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!selectedDate || !selectedTime}
                className="w-full py-4 bg-[#D13D6A] text-white rounded-full font-semibold disabled:bg-gray-200 disabled:text-gray-400 hover:bg-[#B8325A] transition-all text-base"
              >
                {t.confirm}
              </button>
            </div>
          )}

          {step === 2 && (
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
              <p className="text-gray-500 mb-6">{t.successMsg}</p>
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
