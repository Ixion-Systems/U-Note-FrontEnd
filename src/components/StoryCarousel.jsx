import React, { useState } from 'react';

const stories = [
  {
    id: 1,
    title: '01 / REGISTRARSE',
    story: '"Como estudiante, quiero registrarme en la aplicación para poder acceder a los apuntes compartidos por otros usuarios."',
    badge: '[ DIFICULTAD: MODERADA ]',
    badgeColor: 'bg-[#F3F3F3] text-black border-[2px] border-black',
    justification: 'Sin un mecanismo de autenticación es imposible identificar a los usuarios ni asociarles apuntes, descargas o acciones dentro de la aplicación. Es una funcionalidad clave para el funcionamiento del sistema.',
  },
  {
    id: 2,
    title: '02 / INICIAR SESIÓN',
    story: '"Como estudiante registrado, quiero iniciar sesión para acceder a mi perfil y a los apuntes disponibles."',
    badge: '[ DIFICULTAD: MODERADA ]',
    badgeColor: 'bg-[#F3F3F3] text-black border-[2px] border-black',
    justification: 'Requiere un formulario para ingresar datos, validar que el usuario exista y guardar la información de sesión en la base de datos local. La lógica es directa, pero actúa como un control de acceso crítico para el resto de los módulos.',
  },
  {
    id: 3,
    title: '03 / SUBIR APUNTES (MÓDULO PDF)',
    story: '"Como estudiante, quiero subir apuntes en formato PDF para compartir material de estudio con otros alumnos."',
    badge: '[ DIFICULTAD: ALTA ]',
    badgeColor: 'bg-[#000000] text-white border-[2px] border-black',
    justification: 'Implica gestionar la carga física de archivos binarios mediante el backend local, procesar el almacenamiento directo en el directorio del servidor y registrar su información asociada en la base de datos para que sea accesible de forma segura.',
  },
  {
    id: 4,
    title: '04 / DESCARGAR APUNTES',
    story: '"Como estudiante, quiero descargar apuntes compartidos para utilizarlos en mi estudio personal."',
    badge: '[ DIFICULTAD: BAJA ]',
    badgeColor: 'bg-[#F3F3F3] text-black border-[2px] border-black',
    justification: 'Lógica de consumo directa en red interna. Al estar el servidor corriendo localmente, la descarga no requiere peticiones web externas complejas ni consumo de ancho de banda en la nube; el sistema mapea la URL de almacenamiento local del archivo y expone el recurso binario de forma inmediata.',
  },
  {
    id: 5,
    title: '05 / MOTOR DE BÚSQUEDA INDEXADO',
    story: '"Como estudiante, quiero filtrar apuntes por materia, carrera o cátedra para encontrar material útil rápidamente."',
    badge: '[ DIFICULTAD: CRÍTICA ]',
    badgeColor: 'bg-[#FF6B00] text-black border-[2px] border-black',
    justification: 'El core interactivo de la interfaz exige una respuesta instantánea en tiempo real. Requiere estructurar estados lógicos complejos en React para filtrar los metadatos de los archivos dinámicamente y consultar de forma eficiente los paths locales indexados en la base de datos mientras el usuario escribe.',
  }
];

const StoryCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <div className="relative w-full max-w-container-max-width mx-auto flex flex-col items-center">
      
      {/* 3D Scene Container */}
      <div className="relative w-full h-[550px] flex items-center justify-center perspective-[1000px] overflow-hidden md:overflow-visible">
        
        {/* Left Arrow */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 md:-left-8 z-50 w-16 h-16 bg-white border-[3px] border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_#FF6B00]"
        >
          <span className="text-[32px] font-headline-md leading-none mb-1">←</span>
        </button>

        {stories.map((story, index) => {
          
          // Calculate distance wrapping around
          let diff = index - activeIndex;
          if (diff > 2) diff -= stories.length;
          if (diff < -2) diff += stories.length;

          // Compute styles based on distance
          let translateX = 0;
          let scale = 1;
          let zIndex = 30;
          let opacity = 1;
          let rotateY = 0;
          let filter = 'blur(0px)';

          if (diff === 0) {
            translateX = 0;
            scale = 1;
            zIndex = 30;
            opacity = 1;
            rotateY = 0;
          } else if (diff === 1 || diff === -1) {
            translateX = diff > 0 ? 50 : -50; // %
            scale = 0.75;
            zIndex = 20;
            opacity = 0.6;
            rotateY = diff > 0 ? -15 : 15;
            filter = 'blur(2px)';
          } else if (diff === 2 || diff === -2) {
            translateX = diff > 0 ? 90 : -90;
            scale = 0.55;
            zIndex = 10;
            opacity = 0.2;
            rotateY = diff > 0 ? -30 : 30;
            filter = 'blur(6px)';
          }

          return (
            <div
              key={story.id}
              className="absolute w-[90%] max-w-[450px] bg-[#FFFFFF] border-[3px] border-black shadow-[8px_8px_0px_#000000] flex flex-col p-8 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
              style={{
                transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
                zIndex: zIndex,
                opacity: opacity,
                filter: filter,
                pointerEvents: diff === 0 ? 'auto' : 'none'
              }}
            >
              <h2 className="font-headline-md text-headline-md text-black uppercase mb-4 leading-none">{story.title}</h2>
              <p className="font-body-md text-black italic mb-8 flex-grow text-lg">
                {story.story}
              </p>
              <div className={`inline-block px-3 py-1 mb-8 self-start ${story.badgeColor}`}>
                <span className="font-headline-sm text-[16px] uppercase tracking-wider">
                  {story.badge}
                </span>
              </div>
              <p className="font-body-md text-black text-sm leading-relaxed">
                {story.justification}
              </p>
            </div>
          );
        })}

        {/* Right Arrow */}
        <button 
          onClick={handleNext}
          className="absolute right-4 md:-right-8 z-50 w-16 h-16 bg-white border-[3px] border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_#FF6B00]"
        >
          <span className="text-[32px] font-headline-md leading-none mb-1">→</span>
        </button>

      </div>

    </div>
  );
};

export default StoryCarousel;
