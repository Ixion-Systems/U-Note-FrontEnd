import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpecHero from '../components/SpecHero';
import StoryCarousel from '../components/StoryCarousel';
import FloatingCodeBackground from '../components/FloatingCodeBackground';

gsap.registerPlugin(ScrollTrigger);

const SpecStatusPage = () => {
  const carouselRef = useRef(null);
  const middlewareRef = useRef(null);
  const persistenciaRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Animate Carousel Section
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 80%',
          },
        }
      );

      // Animate Middleware Block
      gsap.fromTo(
        middlewareRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: middlewareRef.current,
            start: 'top 80%',
          },
        }
      );

      // Animate Persistencia Block
      gsap.fromTo(
        persistenciaRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: persistenciaRef.current,
            start: 'top 80%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full flex flex-col bg-transparent">
      
      {/* 1. HEADER HERO: THE MVP MANIFESTO WITH GSAP EXPLOSION */}
      <SpecHero />

      {/* 2. USER STORIES 3D CAROUSEL */}
      <section ref={carouselRef} className="w-full px-4 md:px-lg py-32 md:py-48 overflow-hidden relative z-10 bg-transparent flex flex-col items-center">
        <h2 className="font-headline-lg text-[45px] md:text-[65px] uppercase text-black mb-16 tracking-tight text-center">
          HISTORIAS DE <span className="text-[#FF6B00]">USUARIO</span>
        </h2>
        <StoryCarousel />
      </section>

      {/* 3. INFRASTRUCTURE & FILE PROCESSING STATUS (ARTICLE FORMAT) */}
      <section className="w-full flex flex-col border-y-[3px] border-black bg-transparent relative z-10 my-16">
        
        {/* Block 1: Left Aligned */}
        <div ref={middlewareRef} className="w-full bg-[#FFFFFF] border-b-[3px] border-black min-h-[500px] flex items-center p-12 md:p-24 lg:p-32">
          <div className="w-full md:w-[70%] lg:w-[60%] flex flex-col justify-center">
            <h2 className="font-headline-lg text-[45px] md:text-[65px] uppercase text-black mb-8 tracking-tight">
              MIDDLEWARE Y <span className="text-[#FF6B00]">FLUJO LOCAL</span>
            </h2>
            <p className="font-body-lg text-[20px] md:text-[22px] text-black leading-relaxed">
              El backend local implementa un control estricto sobre las peticiones de subida de archivos (utilizando <span className="font-bold">Multer</span> en el entorno Node.js/Express). Los archivos se validan en tamaño (límite local de <span className="text-[#FF6B00] font-bold">30 MB</span>) y extensión antes de guardarse físicamente en la carpeta <code className="font-mono bg-black text-white px-3 py-1 mx-1 text-[18px]">/uploads</code>, aislando la lógica del frontend y evitando inyecciones de código malicioso.
            </p>
          </div>
        </div>

        {/* Block 2: Right Aligned */}
        <div ref={persistenciaRef} className="w-full bg-[#F3F3F3] min-h-[500px] flex items-center justify-end p-12 md:p-24 lg:p-32">
          <div className="w-full md:w-[70%] lg:w-[60%] flex flex-col justify-center text-left md:text-right">
            <h2 className="font-headline-lg text-[45px] md:text-[65px] uppercase text-black mb-8 tracking-tight">
              PERSISTENCIA Y <span className="text-[#FF6B00]">DESACOPLE</span>
            </h2>
            <p className="font-body-lg text-[20px] md:text-[22px] text-black leading-relaxed">
              Para optimizar el rendimiento y evitar que la base de datos local colapse con archivos pesados, el sistema no almacena archivos binarios en las colecciones. El servidor realiza un <span className="font-bold text-[#FF6B00]">mapeo desacoplado</span>: guarda los metadatos relacionales (Universidad, Carrera, Cátedra) y un puntero de tipo cadena (string) que apunta al path físico del archivo PDF local.
            </p>
          </div>
        </div>

      </section>

      {/* 4. AUDIT FOOTER CALL-TO-ACTION */}
      <section className="w-full bg-[#1A1A1A] py-40 flex flex-col items-center justify-center text-center px-4 relative z-10 overflow-hidden mt-32">
        
        <FloatingCodeBackground />
        
        <div className="relative z-10">
          <h2 className="font-headline-lg text-[32px] md:text-[45px] text-white uppercase mb-12 tracking-wide">
            AUDITORÍA DE CÓDIGO FUENTE // REPOSITORIOS LOCALES
          </h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            
            <a 
              href="https://github.com/Ixion-Systems/U-Note-FrontEnd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#FFFFFF] text-[#000000] font-headline-sm text-[20px] border-[3px] border-[#000000] px-8 py-5 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#FF6B00] transition-all uppercase tracking-wider group">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="group-hover:text-[#FF6B00] transition-colors">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              [ REPO FRONTEND_UI ]
            </a>
            
            <a 
              href="https://github.com/Ixion-Systems/U-Note-BackEnd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#FFFFFF] text-[#000000] font-headline-sm text-[20px] border-[3px] border-[#000000] px-8 py-5 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#FF6B00] transition-all uppercase tracking-wider group">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="group-hover:text-[#FF6B00] transition-colors">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              [ REPO BACKEND_API ]
            </a>
            
          </div>
        </div>
      </section>

    </div>
  );
};

export default SpecStatusPage;
