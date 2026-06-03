import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NotesPreviewSection from '../components/NotesPreviewSection';
import CallToActionSection from '../components/CallToActionSection';
import FAQSection from '../components/FAQSection';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const navigate = useNavigate();
  const h1Ref = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    // GSAP Animations
    const ctx = gsap.context(() => {
      // Hero Entrance
      const tl = gsap.timeline({
        onComplete: () => {
          window.dispatchEvent(new Event('show-nav'));
        }
      });

      tl.fromTo(
        h1Ref.current,
        { letterSpacing: '0.8em', opacity: 0, scale: 0.95 },
        { letterSpacing: '0.05em', opacity: 0.8, scale: 1, duration: 1.5, ease: 'power3.out' }
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        "-=1"
      )
      .fromTo(
        buttonsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)' },
        "-=0.7"
      );

      // Cards Entrance on scroll (Staggered for faster appearance)
      if (cardsRef.current.length > 0) {
        gsap.fromTo(
          cardsRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current[0].parentNode,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => {
      ctx.revert(); // Cleanup GSAP animations on unmount
    };
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className="w-full relative z-0">
      {/* Hero Section */}
      <header className="relative z-10 w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Student workspace background"
            className="w-full h-full object-cover"
            src="/IMG/hero_BG.png"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-md w-full max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center justify-center text-center w-full max-w-[1400px]">
            <h1
              ref={h1Ref}
              className="font-headline-xl text-[28vw] md:text-[25vw] leading-[0.8] uppercase text-outline-orange select-none mb-md whitespace-nowrap"
              style={{ letterSpacing: '0.05em' }}
            >
              U-NOTES
            </h1>
            <div
              ref={subtitleRef}
              className="font-body-lg text-[36px] font-bold uppercase tracking-[0.1em] px-md text-white"
            >
              APUNTES DE ESTUDIANTES PARA ESTUDIANTES
            </div>
            <div className="flex flex-wrap justify-center gap-md mt-xl">
              <button
                ref={(el) => (buttonsRef.current[0] = el)}
                onClick={() => navigate('/signup')}
                className="flex items-center justify-center gap-3 bg-white text-black font-headline-md text-headline-md px-12 py-5 rounded-full shadow-none border-[3px] border-transparent hover:shadow-brutal-hover hover:-translate-y-1 hover:-translate-x-1 hover:border-primary-container transition-all uppercase"
              >
                <span className="material-symbols-outlined text-[32px]">rocket_launch</span>
                Probá Ya
              </button>
              <button
                ref={(el) => (buttonsRef.current[1] = el)}
                onClick={() => navigate('/login')}
                className="flex items-center justify-center gap-3 bg-primary-container text-white font-headline-md text-headline-md px-12 py-5 rounded-full shadow-none border-[3px] border-transparent hover:shadow-brutal-hover hover:-translate-y-1 hover:-translate-x-1 hover:border-white transition-all uppercase"
              >
                <span className="material-symbols-outlined text-[32px]">person</span>
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          onClick={handleScrollDown}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce cursor-pointer z-20 group"
        >
          <span className="text-white/80 font-label-md uppercase text-sm tracking-widest mb-1 group-hover:text-primary-container transition-colors">
            Descubrí más
          </span>
          <span className="material-symbols-outlined text-white text-4xl group-hover:text-primary-container transition-colors">
            keyboard_arrow_down
          </span>
        </div>
      </header>

      {/* Features Grid */}
      <section className="relative z-10 w-full max-w-container-max-width mx-auto px-md md:px-lg py-32 md:py-48">
        <div className="mb-24">
          <h2 className="font-headline-lg text-headline-lg uppercase inline-block">CARACTERÍSTICAS</h2>
          <div className="h-[4px] w-24 bg-primary-container mt-xs"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          {/* Card 1 */}
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="bg-white/40 backdrop-blur-md border-[3px] border-black rounded-xl shadow-none p-lg flex flex-col justify-between min-h-[300px] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[8px_8px_0px_0px_#000000] hover:border-primary-container transition-all duration-300 group"
          >
            <div className="flex flex-col gap-md">
              <span className="material-symbols-outlined text-primary-container text-[48px] group-hover:scale-110 transition-transform origin-left">
                search
              </span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface uppercase group-hover:text-primary-container transition-colors">
                BUSCÁ AL INSTANTE
              </h2>
              <p className="font-body-md text-on-surface">
                Encontrá el material exacto que necesitás para salvar la materia gracias a nuestro motor indexado en tiempo real.
              </p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="bg-white/40 backdrop-blur-md border-[3px] border-black rounded-xl shadow-none p-lg flex flex-col justify-between min-h-[300px] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[8px_8px_0px_0px_#000000] hover:border-primary-container transition-all duration-300 group"
          >
            <div className="flex flex-col gap-md">
              <span className="material-symbols-outlined text-primary-container text-[48px] group-hover:scale-110 transition-transform origin-left">
                upload
              </span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface uppercase group-hover:text-primary-container transition-colors">
                COLABORÁ CON LA RED
              </h2>
              <p className="font-body-md text-on-surface">
                Subí tus resúmenes y apuntes limpios en formato PDF directamente desde tu dispositivo para ayudar a tus compañeros.
              </p>
            </div>
          </div>
          
          {/* Card 3 */}
          <div
            ref={(el) => (cardsRef.current[2] = el)}
            className="bg-white/40 backdrop-blur-md border-[3px] border-black rounded-xl shadow-none p-lg flex flex-col justify-between min-h-[300px] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[8px_8px_0px_0px_#000000] hover:border-primary-container transition-all duration-300 group"
          >
            <div className="flex flex-col gap-md">
              <span className="material-symbols-outlined text-primary-container text-[48px] group-hover:scale-110 transition-transform origin-left">
                download
              </span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface uppercase group-hover:text-primary-container transition-colors">
                APUNTES DESCARGABLES
              </h2>
              <p className="font-body-md text-on-surface">
                Material descargable para poder llevártelo o usarlo donde sea sin conexión.
              </p>
            </div>
          </div>
        </div>
      </section>
      <NotesPreviewSection />
      <FAQSection />
      <CallToActionSection />
    </div>
  );
};

export default LandingPage;
