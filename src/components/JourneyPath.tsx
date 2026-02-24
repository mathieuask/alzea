interface Step {
  icon: string;
  title: string;
  description: string;
}

export default function JourneyPath({ steps }: { steps: readonly Step[] }) {
  return (
    <>
      {/* Desktop — zigzag */}
      <div className="hidden md:block relative max-w-3xl mx-auto">
        {/* Ligne verticale centrale */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 border-l-2 border-dashed border-gray-200" />

        {steps.map((step, i) => {
          const isLeft = i % 2 === 0;
          const color = i % 2 === 0 ? 'bg-[#D13D6A]' : 'bg-[#33A7B5]';

          return (
            <div key={i} className={`relative flex items-center mb-16 last:mb-0 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
              {/* Texte */}
              <div className={`flex-1 ${isLeft ? 'text-right pr-12' : 'text-left pl-12'}`}>
                <h3 className="font-bold text-[#32373c] text-lg">{step.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{step.description}</p>
              </div>

              {/* Cercle central */}
              <div className="relative z-10 flex-shrink-0">
                <div className={`w-14 h-14 rounded-full ${color} text-white text-2xl flex items-center justify-center shadow-lg`}>
                  {step.icon}
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-white text-[#D13D6A] rounded-full text-xs font-bold flex items-center justify-center shadow">
                  {i + 1}
                </div>
              </div>

              {/* Espace symétrique */}
              <div className="flex-1" />
            </div>
          );
        })}
      </div>

      {/* Mobile — vertical à gauche */}
      <div className="md:hidden relative pl-10">
        {/* Ligne verticale */}
        <div className="absolute left-[27px] top-0 bottom-0 w-0.5 border-l-2 border-dashed border-gray-200" />

        {steps.map((step, i) => {
          const color = i % 2 === 0 ? 'bg-[#D13D6A]' : 'bg-[#33A7B5]';

          return (
            <div key={i} className="relative flex items-start mb-10 last:mb-0">
              {/* Cercle */}
              <div className="absolute -left-10 z-10">
                <div className={`w-12 h-12 rounded-full ${color} text-white text-xl flex items-center justify-center shadow-lg`}>
                  {step.icon}
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-white text-[#D13D6A] rounded-full text-xs font-bold flex items-center justify-center shadow">
                  {i + 1}
                </div>
              </div>

              {/* Texte */}
              <div className="ml-4">
                <h3 className="font-bold text-[#32373c]">{step.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
