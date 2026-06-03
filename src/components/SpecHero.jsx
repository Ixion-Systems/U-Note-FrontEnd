import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import FloatingShapesBackground from './FloatingShapesBackground';

const SpecHero = () => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const pdfRef = useRef(null);
  const forFreeRef = useRef(null);
  const worldRef = useRef(null);
  const userQRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    // Lock scroll while animating
    document.body.style.overflow = 'hidden';
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Unlock scroll and show navbar
          document.body.style.overflow = '';
          window.dispatchEvent(new Event('show-nav'));
        }
      });
      
      // 1. Initial states
      gsap.set([pdfRef.current, forFreeRef.current, worldRef.current, userQRef.current], { 
        x: 0, y: 0, scale: 0.1, opacity: 0, rotation: 0 
      });
      gsap.set(logoRef.current, { scale: 0, opacity: 0 });
      gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 30 });
      
      // 2. Logo pops in
      tl.to(logoRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.5)'
      })
      
      // 3. Icons explode out
      .to(pdfRef.current, { x: -250, y: -180, scale: 1.5, opacity: 1, rotation: -20, duration: 0.8, ease: 'power4.out' }, '-=0.2')
      .to(forFreeRef.current, { x: 250, y: -180, scale: 1.5, opacity: 1, rotation: 20, duration: 0.8, ease: 'power4.out' }, '<')
      .to(worldRef.current, { x: -180, y: 160, scale: 0.9, opacity: 1, rotation: -15, duration: 0.8, ease: 'power4.out' }, '<')
      .to(userQRef.current, { x: 180, y: 160, scale: 0.9, opacity: 1, rotation: 15, duration: 0.8, ease: 'power4.out' }, '<')
      
      // 4. Texts fade up
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      
      // 5. Scroll Indicator fades in
      .to(scrollIndicatorRef.current, { opacity: 1, duration: 0.5 }, '-=0.2');

    }, containerRef);
    
    return () => {
      document.body.style.overflow = ''; 
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full h-screen bg-[#1A1A1A] flex flex-col items-center justify-center relative overflow-hidden border-b-[3px] border-black z-20">
      
      <FloatingShapesBackground position="absolute" />
      
      {/* Absolute center for the explosion origin */}
      <div className="relative flex items-center justify-center w-full h-[300px]">
        {/* Background Icons */}
        <img ref={pdfRef} src="/IMG/PDF.svg" alt="PDF Icon" className="absolute w-[80px] h-[80px] z-10" />
        <img ref={forFreeRef} src="/IMG/ForFree.svg" alt="For Free Icon" className="absolute w-[80px] h-[80px] z-10" />
        <img ref={worldRef} src="/IMG/World.svg" alt="World Icon" className="absolute w-[60px] h-[60px] z-10" />
        <img ref={userQRef} src="/IMG/UserQ.svg" alt="User Question Icon" className="absolute w-[60px] h-[60px] z-10" />
        
        {/* Main Logo over icons */}
        <img ref={logoRef} src="/IMG/U-NOTES LOGO Orange.svg" alt="U-NOTES Central Logo" className="relative z-20 h-[220px] object-contain drop-shadow-[0px_0px_20px_rgba(255,107,0,0.4)]" />
      </div>

      <div className="flex flex-col items-center mt-20 text-center px-4 relative z-20">
        <h1 ref={titleRef} className="font-headline-lg text-[50px] md:text-[80px] leading-none uppercase text-white tracking-wide mb-2">
          U-NOTES // ALCANCE DEL MVP
        </h1>
        <p ref={subtitleRef} className="font-body-lg text-[18px] md:text-[24px] text-[#A0A0A0] uppercase tracking-[0.2em]">
          REQUISITOS DEL SISTEMA
        </p>
      </div>
      
      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer z-20 group opacity-0"
      >
        <span className="text-white/80 font-label-md uppercase text-[12px] tracking-widest mb-1 group-hover:text-[#FF6B00] transition-colors">
          Descubrí más
        </span>
        <span className="material-symbols-outlined text-white text-[32px] group-hover:text-[#FF6B00] transition-colors animate-bounce">
          keyboard_arrow_down
        </span>
      </div>

    </section>
  );
};

export default SpecHero;
