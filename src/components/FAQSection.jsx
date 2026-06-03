import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    id: 1,
    question: '¿CÓMO BUSCO APUNTES DE MI MATERIA ESPECÍFICA?',
    answer: 'Es inmediato. Usá la barra de búsqueda en tiempo real de la cabecera. Podés tipear el nombre de la materia, la carrera o el apellido del profesor, y el sistema filtrará los archivos indexados al instante sin recargar la página.'
  },
  {
    id: 2,
    question: '¿QUÉ FORMATOS DE ARCHIVOS ESTÁN PERMITIDOS PARA SUBIR?',
    answer: 'Para asegurar la máxima compatibilidad, orden y limpieza en la lectura, el MVP de la plataforma admite únicamente archivos en formato .PDF con un límite de peso por archivo que se valida localmente al momento de la subida.'
  },
  {
    id: 3,
    question: '¿EL ALMACENAMIENTO DE LOS ARCHIVOS ES SEGURO Y EN LA NUBE?',
    answer: 'No, todo el almacenamiento se gestiona de manera 100% local en los servidores internos de la aplicación. Esto garantiza una velocidad de subida y descarga brutal dentro de la red del colegio/universidad, sin depender de una conexión a internet externa.'
  },
  {
    id: 4,
    question: '¿NECESITO CREAR UNA CUENTA PARA DESCARGAR MATERIAL?',
    answer: 'Para explorar y previsualizar los apuntes disponibles en la Landing Page no es obligatorio. Sin embargo, para realizar descargas directas locales o subir tus propios resúmenes para colaborar con la red, es necesario iniciar sesión con tu cuenta de estudiante.'
  },
  {
    id: 5,
    question: '¿CÓMO SE ORGANIZA EL CONTENIDO PARA QUE NO SEA UN CAOS?',
    answer: 'Cada PDF subido se indexa obligatoriamente bajo tres etiquetas rígidas: Universidad/Institución, Carrera y Asignatura. Así nos aseguramos de que el buscador relacione de forma exacta lo que necesitás estudiar con el material disponible.'
  }
];

const FAQItem = ({ faq, isOpen, onClick, ref }) => {
  return (
    <div ref={ref} className="border-b-[3px] border-black flex flex-col group bg-white overflow-hidden">
      <button 
        onClick={onClick}
        className={`w-full flex justify-between items-center text-left px-6 py-5 transition-colors duration-200 cursor-pointer rounded-none outline-none focus:outline-none ${
          isOpen ? 'bg-[#FF6B00] text-black' : 'bg-white text-black hover:bg-[#FF6B00] hover:text-black'
        }`}
      >
        <span className="font-headline-sm text-[24px] md:text-[28px] uppercase tracking-wide leading-none pt-1">
          {faq.question}
        </span>
        <span 
          className={`material-symbols-outlined text-[36px] transition-transform duration-300 ${
            isOpen ? 'rotate-45' : 'rotate-0'
          }`}
        >
          add
        </span>
      </button>
      <div 
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden bg-[#F3F3F3]">
          <div className="p-6">
            <p className="font-body-md text-[16px] leading-[1.5] text-black font-medium">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [openId, setOpenId] = useState(null);
  const faqItemsRef = useRef([]);

  useEffect(() => {
    if (faqItemsRef.current.length > 0) {
      gsap.fromTo(
        faqItemsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: faqItemsRef.current[0].parentNode,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative z-10 w-full py-24 px-4 md:px-lg">
      <div className="w-full max-w-[900px] mx-auto">
        <h2 className="font-headline-lg text-[50px] uppercase text-black mb-[40px] text-center md:text-left leading-none tracking-tight">
          PREGUNTAS FRECUENTES // FAQ
        </h2>
        
        <div className="flex flex-col border-t-[3px] border-black">
          {faqData.map((faq, index) => (
            <FAQItem 
              key={faq.id} 
              ref={(el) => (faqItemsRef.current[index] = el)}
              faq={faq} 
              isOpen={openId === faq.id} 
              onClick={() => toggleFAQ(faq.id)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
