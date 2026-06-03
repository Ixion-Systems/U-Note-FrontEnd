import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const notesData = [
  {
    id: 1,
    title: 'Cálculo Avanzado',
    metadata: 'Matemáticas - 2do Año - Ingeniería',
    description: 'Resumen completo de integrales múltiples, teoremas de Green, Gauss y Stokes con ejemplos prácticos y resoluciones paso a paso. Ideal para preparar el examen final.',
    image: '/IMG/math.png',
  },
  {
    id: 2,
    title: 'Historia Mundial',
    metadata: 'Historia - 1er Año - Humanidades',
    description: 'Línea de tiempo detallada de los eventos más cruciales desde la Revolución Francesa hasta la Guerra Fría. Incluye mapas conceptuales y causas/consecuencias.',
    image: '/IMG/history.png',
  },
  {
    id: 3,
    title: 'Anatomía Humana',
    metadata: 'Biología - 3er Año - Medicina',
    description: 'Apuntes detallados del sistema óseo y muscular. Esquemas etiquetados a mano, mnemotecnias y cuadros sinópticos para memorizar orígenes e inserciones.',
    image: '/IMG/anatomy.png',
  },
  {
    id: 4,
    title: 'Estructuras de Datos',
    metadata: 'Programación - 2do Año - Ingeniería',
    description: 'Guía práctica de árboles binarios, grafos y tablas hash. Código en C++ y Python con análisis de complejidad espacial y temporal.',
    image: '/IMG/programming.png',
  },
  {
    id: 5,
    title: 'Filosofía Moderna',
    metadata: 'Filosofía - 1er Año - Letras',
    description: 'Resumen crítico sobre Descartes, Kant y Hegel. Incluye debates contemporáneos sobre la ontología y epistemología del ser.',
    image: '/IMG/philosophy.png',
  },
];

const NotesPreviewSection = () => {
  const navigate = useNavigate();
  const [activeNote, setActiveNote] = useState(notesData[0]);
  const sectionRef = useRef(null);
  const detailsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for the whole section
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animation when changing note
  useEffect(() => {
    if (detailsRef.current) {
      gsap.fromTo(detailsRef.current, 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeNote]);

  return (
    <section ref={sectionRef} className="relative z-10 w-full max-w-container-max-width mx-auto px-md md:px-lg py-xl">
      <div className="mb-xl text-center md:text-right flex flex-col items-center md:items-end">
        <h2 className="font-headline-lg text-headline-lg uppercase inline-block">EXPLORAR APUNTES</h2>
        <div className="h-[4px] w-24 bg-primary-container mt-xs"></div>
      </div>

      {/* Dashboard Container */}
      <div className="flex flex-col md:flex-row gap-0 border-[3px] border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_#000000] bg-white">
        
        {/* Left Column: List */}
        <div className="w-full md:w-1/3 flex flex-col border-b-[3px] md:border-b-0 md:border-r-[3px] border-black bg-white">
          {notesData.map((note) => (
            <button
              key={note.id}
              onClick={() => setActiveNote(note)}
              className={`px-lg py-8 text-left transition-all duration-300 border-b-[3px] border-black last:border-b-0 flex-1 flex flex-col justify-center hover:pl-10 ${
                activeNote.id === note.id 
                  ? 'bg-primary-container text-white' 
                  : 'bg-white text-black hover:bg-gray-100 hover:text-primary-container'
              }`}
            >
              <h3 className="font-headline-md text-headline-md uppercase mb-1 leading-tight">{note.title}</h3>
              <p className={`font-body-sm text-sm transition-colors duration-300 ${activeNote.id === note.id ? 'text-white/80' : 'text-gray-500'}`}>
                {note.metadata.split(' - ')[0]}
              </p>
            </button>
          ))}
        </div>

        {/* Right Column: Details */}
        <div className="w-full md:w-2/3 p-xl flex flex-col md:flex-row gap-xl bg-[#fcfcfc]">
          {/* Cover Image */}
          <div className="w-full md:w-1/2 flex-shrink-0">
            <div className="w-full aspect-[3/4] border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden relative">
              <img 
                src={activeNote.image} 
                alt={activeNote.title} 
                className="w-full h-full object-cover transition-opacity duration-500"
                key={activeNote.image} // Force re-render for image transition
              />
            </div>
          </div>
          
          {/* Text Details */}
          <div ref={detailsRef} className="w-full md:w-1/2 flex flex-col justify-start pt-md">
            <h3 className="font-headline-lg text-[48px] uppercase mb-sm text-black leading-none">
              {activeNote.title}
            </h3>
            <span className="font-body-md text-primary-container font-bold tracking-widest uppercase mb-xl block border-b-[3px] border-black pb-4">
              {activeNote.metadata}
            </span>
            
            <h4 className="font-headline-sm text-[24px] font-bold mb-md text-black uppercase mt-sm">Descripción:</h4>
            <p className="font-body-lg text-gray-800 leading-relaxed mb-xl">
              {activeNote.description}
            </p>

            {/* Embedded CTA Button */}
            <div className="mt-auto pt-lg flex justify-end">
              <button 
                onClick={() => navigate('/signup')}
                className="flex items-center justify-center gap-3 bg-primary-container text-white font-headline-md text-[28px] uppercase px-10 py-4 rounded-full shadow-none border-[3px] border-transparent hover:shadow-brutal-hover hover:-translate-y-1 hover:-translate-x-1 hover:border-white transition-all">
                <span className="material-symbols-outlined text-[32px]">visibility</span>
                VER MÁS
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotesPreviewSection;
