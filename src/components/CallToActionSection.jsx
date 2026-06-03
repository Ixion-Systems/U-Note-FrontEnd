import React from 'react';
import { useNavigate } from 'react-router-dom';

const TickerContent = () => (
  <>
    <span className="mx-8 flex items-center gap-2">COMPARTÍ <span className="material-symbols-outlined text-[24px]">school</span></span>
    <span className="mx-8 flex items-center gap-2">DESCARGÁ <span className="material-symbols-outlined text-[24px]">download</span></span>
    <span className="mx-8 flex items-center gap-2">APROBÁ <span className="material-symbols-outlined text-[24px]">verified</span></span>
    <span className="mx-8 flex items-center gap-2">REPETÍ <span className="material-symbols-outlined text-[24px]">replay</span></span>
  </>
);

const TickerBlock = () => (
  <div className="flex items-center flex-shrink-0 px-4">
    <TickerContent />
    <TickerContent />
    <TickerContent />
    <TickerContent />
  </div>
);

const CallToActionSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative z-10 w-full flex flex-col mt-xl">
      {/* Top Banner Ticker (Right to Left) */}
      <div className="w-full h-[50px] bg-[#FF6B00] border-y-[3px] border-black overflow-hidden flex items-center whitespace-nowrap relative">
        <div className="marquee-content font-headline-sm text-[24px] uppercase text-black font-bold h-full flex items-center w-max">
          <TickerBlock />
          <TickerBlock />
        </div>
      </div>

      {/* Main CTA Block */}
      <div className="w-full bg-[#111111] py-48 min-h-[80vh] px-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Subtle background decoration to keep it brutalist but not empty */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
        
        <h2 className="font-headline-lg text-[40px] md:text-[70px] uppercase text-white mb-16 max-w-5xl leading-none tracking-tight z-10">
          DEJÁ DE PADECER LOS EXÁMENES. UNITE HOY.
        </h2>
        
        <button 
          onClick={() => navigate('/signup')}
          className="bg-[#FF6B00] text-black font-headline-md text-headline-md uppercase px-12 py-5 shadow-[6px_6px_0px_0px_#FFFFFF] border-[3px] border-transparent hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_#FFFFFF] transition-all rounded-none flex items-center justify-center z-10">
          CREAR MI CUENTA
        </button>
      </div>

      {/* Bottom Banner Ticker (Left to Right) */}
      <div className="w-full h-[50px] bg-[#FF6B00] border-b-[3px] border-black overflow-hidden flex items-center whitespace-nowrap relative">
        <div className="marquee-content-reverse font-headline-sm text-[24px] uppercase text-black font-bold h-full flex items-center w-max">
          <TickerBlock />
          <TickerBlock />
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
