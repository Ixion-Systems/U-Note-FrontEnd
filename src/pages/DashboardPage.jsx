import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';

const API_URL = 'http://localhost:5000/api';
const UPLOADS_URL = 'http://localhost:5000/uploads';

const DashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  
  const [availableCareers, setAvailableCareers] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  
  const [selectedCarrera, setSelectedCarrera] = useState('');
  const [selectedMateria, setSelectedMateria] = useState('');
  const [selectedAno, setSelectedAno] = useState('');

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/notes/filters`)
      .then(res => res.json())
      .then(data => {
        setAvailableCareers(data.careers || []);
        setAvailableSubjects(data.subjects || []);
      })
      .catch(err => console.error("Error cargando filtros:", err));
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCarrera, selectedMateria, selectedAno]);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (debouncedSearch) queryParams.append('q', debouncedSearch);
        if (selectedCarrera) queryParams.append('careerId', selectedCarrera);
        if (selectedMateria) queryParams.append('subjectId', selectedMateria);
        if (selectedAno) queryParams.append('year', selectedAno);
        queryParams.append('page', currentPage);

        const res = await fetch(`${API_URL}/notes/search?${queryParams.toString()}`);
        const data = await res.json();
        
        setFiles(data.notes || []);
        if (data.pagination) {
            setTotalPages(data.pagination.totalPages || 1);
            setTotalCount(data.pagination.totalCount || 0);
        }
      } catch (err) {
        console.error("Error buscando apuntes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [debouncedSearch, selectedCarrera, selectedMateria, selectedAno, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const filteredSubjects = selectedCarrera 
    ? availableSubjects.filter(s => s.career_id === parseInt(selectedCarrera))
    : availableSubjects;

  const openModal = (file) => setSelectedFile(file);
  const closeModal = () => setSelectedFile(null);

  return (
    <div className={`h-screen overflow-hidden bg-transparent flex flex-col md:flex-row pt-28 pb-8 px-4 md:px-lg gap-8 relative z-10 transition-all duration-300 ${selectedFile ? 'pointer-events-none blur-sm' : ''}`}>
      
      {/* SIDEBAR - Filtros (Fijo en altura y animado) */}
      <aside className="hidden md:flex w-1/4 flex-col gap-6 h-full opacity-0 animate-[slideInLeftBounce_0.6s_ease-out_forwards] pb-4">
        <div className="bg-[#FFFFFF]/95 backdrop-blur-sm border-[3px] border-black p-6 shadow-[6px_6px_0px_#000000] h-full overflow-y-auto custom-scrollbar flex flex-col">
          <h2 className="font-headline-md text-2xl uppercase border-b-2 border-black pb-2 mb-6 shrink-0">Filtros</h2>
          
          <div className="mb-6">
            <label className="block font-headline-sm text-sm uppercase mb-2">Carrera</label>
            <select 
              value={selectedCarrera}
              onChange={(e) => {
                setSelectedCarrera(e.target.value);
                setSelectedMateria('');
              }}
              className="w-full border-[3px] border-black bg-white p-3 font-body-md focus:outline-none focus:ring-0 focus:border-[#FF6B00] transition-colors"
            >
              <option value="">Todas las Carreras</option>
              {availableCareers.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block font-headline-sm text-sm uppercase mb-2">Materia</label>
            <select 
              value={selectedMateria}
              onChange={(e) => setSelectedMateria(e.target.value)}
              className="w-full border-[3px] border-black bg-white p-3 font-body-md focus:outline-none focus:ring-0 focus:border-[#FF6B00] transition-colors"
            >
              <option value="">Todas las Materias</option>
              {filteredSubjects.map(s => (
                <option key={s.id} value={s.id}>{s.name} (Año {s.year})</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block font-headline-sm text-sm uppercase mb-2">Año de Cursada</label>
            <select 
              value={selectedAno}
              onChange={(e) => setSelectedAno(e.target.value)}
              className="w-full border-[3px] border-black bg-white p-3 font-body-md focus:outline-none focus:ring-0 focus:border-[#FF6B00] transition-colors"
            >
              <option value="">Todos los Años</option>
              <option value="1">1er Año</option>
              <option value="2">2do Año</option>
              <option value="3">3er Año</option>
              <option value="4">4to Año</option>
              <option value="5">5to Año</option>
            </select>
          </div>
          
          <p className="font-body-md text-[#A0A0A0] text-sm text-center italic mt-4">
            Resultados totales: {totalCount}
          </p>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="w-full md:w-3/4 flex flex-col gap-4 relative h-full overflow-hidden pb-4">
        
        {/* Top Bar: Buscador (Fijo arriba y animado) */}
        <div className="flex-shrink-0 z-40 bg-white/90 backdrop-blur-md border-[3px] border-black p-4 shadow-[6px_6px_0px_#000000] flex flex-col lg:flex-row gap-4 items-center justify-between opacity-0 animate-[slideInTopBounce_0.6s_ease-out_forwards] w-full" style={{ animationDelay: '0.1s' }}>
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-black text-[28px]">search</span>
            <input 
              type="text" 
              placeholder="Buscar apuntes por título, tema..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#FFFFFF] border-[3px] border-black p-3 pl-14 font-headline-sm text-[18px] uppercase placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#FF6B00] transition-colors"
            />
          </div>
        </div>

        {/* CONTENEDOR CON SCROLL PARA LA GRILLA */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
            {loading ? (
               <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white border-[3px] border-black shadow-[6px_6px_0px_#000000]">
                <span className="material-symbols-outlined text-[64px] text-[#FF6B00] animate-spin mb-4">refresh</span>
                <h2 className="font-headline-md text-xl uppercase">Cargando apuntes...</h2>
             </div>
          ) : files.length > 0 ? (
            files.map((file, index) => (
              <div 
                key={file.id} 
                onClick={() => openModal(file)}
                style={{ animationDelay: `${Math.floor(index / 3) * 0.15 + 0.3}s` }}
                className="bg-white border-[3px] border-black p-4 flex flex-col shadow-[6px_6px_0px_#000000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#FF6B00] transition-all cursor-pointer group opacity-0 animate-[zoomInUp_0.5s_ease-out_forwards]"
              >
                {/* Vistazo Rápido (PDF iframe con Zoom in para eliminar bordes grises) */}
                <div className="w-full h-40 border-2 border-black mb-4 overflow-hidden relative pointer-events-none bg-white flex justify-center items-center">
                  <iframe 
                    src={`${UPLOADS_URL}/${file.file_path}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    className="absolute w-[140%] h-[600px] top-0 left-[-20%] transform origin-top scale-[1.1] md:scale-[1.2]"
                    title={file.title}
                    scrolling="no"
                  />
                  <div className="absolute inset-0 bg-transparent z-10" />
                </div>
                
                <h3 className="font-headline-md text-lg uppercase mb-2 line-clamp-2 leading-tight">{file.title}</h3>
                <p className="font-body-md text-black/80 font-bold text-sm mb-1">{file.materia}</p>
                <div className="mt-auto pt-3 flex flex-col gap-1 border-t-2 border-black/10">
                  <span className="font-body-sm text-xs text-[#A0A0A0] uppercase">{file.carrera}</span>
                  <span className="font-body-sm text-xs text-[#A0A0A0]">AÑO {file.ano}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center border-[3px] border-black bg-white shadow-[6px_6px_0px_#000000]">
              <span className="material-symbols-outlined text-[64px] text-[#A0A0A0] mb-4">sentiment_dissatisfied</span>
              <h2 className="font-headline-md text-2xl uppercase">No se encontraron apuntes</h2>
            </div>
            )}
          </div>
        </div>

        {/* Paginación (Fija abajo) */}
        {!loading && totalPages > 1 && (
          <div className="flex-shrink-0 flex items-center justify-between bg-white border-[3px] border-black shadow-[6px_6px_0px_#000000] p-4 mt-2 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]" style={{ animationDelay: '0.8s' }}>
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="font-headline-sm uppercase text-lg hover:text-[#FF6B00] disabled:text-[#A0A0A0] transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Anterior
            </button>
            <span className="font-headline-sm text-xl">
              {currentPage} / {totalPages}
            </span>
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="font-headline-sm uppercase text-lg hover:text-[#FF6B00] disabled:text-[#A0A0A0] transition-colors flex items-center gap-2"
            >
              Siguiente
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        )}

      </main>

      {/* MODAL BRUTALISTA - Usando Portal para asegurar z-index máximo global */}
      {selectedFile && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out_forwards]">
          <div className="bg-white border-[4px] border-black shadow-[12px_12px_0px_#FF6B00] w-full max-w-6xl h-full max-h-[90vh] flex flex-col md:flex-row relative opacity-0 animate-[modalScaleUp_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards] overflow-hidden">
            
            {/* Botón Cerrar */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 bg-black text-white w-10 h-10 flex items-center justify-center border-2 border-transparent hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]"
              style={{ animationDelay: '0.5s' }}
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* Visor PDF (Iframe Interactivo) */}
            <div className="w-full md:w-2/3 h-1/2 md:h-full border-b-[4px] md:border-b-0 md:border-r-[4px] border-black bg-gray-200 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]" style={{ animationDelay: '0.4s' }}>
              <iframe 
                src={`${UPLOADS_URL}/${selectedFile.file_path}#toolbar=1&navpanes=0&view=FitH`}
                className="w-full h-full"
                title="Visor PDF"
              />
            </div>

            {/* Detalles y Descarga */}
            <div className="w-full md:w-1/3 h-1/2 md:h-full bg-[#F3F3F3] flex flex-col p-8 overflow-y-auto custom-scrollbar">
              <h2 className="font-headline-lg text-3xl uppercase leading-tight mb-4 opacity-0 animate-[slideInLeft_0.4s_ease-out_forwards]" style={{ animationDelay: '0.5s' }}>{selectedFile.title}</h2>
              
              <div className="flex flex-col gap-4 mb-8">
                <div className="bg-white border-[2px] border-black p-3 opacity-0 animate-[zoomInUp_0.3s_ease-out_forwards]" style={{ animationDelay: '0.6s' }}>
                  <span className="block font-headline-sm text-xs text-[#FF6B00] uppercase mb-1">Materia</span>
                  <span className="font-body-md font-bold">{selectedFile.materia}</span>
                </div>
                <div className="bg-white border-[2px] border-black p-3 opacity-0 animate-[zoomInUp_0.3s_ease-out_forwards]" style={{ animationDelay: '0.7s' }}>
                  <span className="block font-headline-sm text-xs text-[#FF6B00] uppercase mb-1">Carrera</span>
                  <span className="font-body-md font-bold">{selectedFile.carrera}</span>
                </div>
                <div className="bg-white border-[2px] border-black p-3 opacity-0 animate-[zoomInUp_0.3s_ease-out_forwards]" style={{ animationDelay: '0.8s' }}>
                  <span className="block font-headline-sm text-xs text-[#FF6B00] uppercase mb-1">Año de Cursada</span>
                  <span className="font-body-md font-bold">{selectedFile.ano}</span>
                </div>
              </div>

              <div className="mb-8 flex-1 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]" style={{ animationDelay: '0.9s' }}>
                <h3 className="font-headline-sm text-lg uppercase border-b-2 border-black pb-1 mb-2">Descripción</h3>
                <p className="font-body-md text-black/80 text-sm leading-relaxed">
                  {selectedFile.description || "No hay descripción disponible para este apunte."}
                </p>
              </div>

              <a 
                href={`${UPLOADS_URL}/${selectedFile.file_path}`}
                download={selectedFile.file_path}
                target="_blank"
                rel="noreferrer"
                className="mt-auto w-full bg-[#FF6B00] text-black font-headline-sm text-xl border-[3px] border-black px-6 py-4 flex items-center justify-center gap-2 hover:bg-black hover:text-[#FF6B00] transition-colors shadow-[6px_6px_0px_#000000] hover:shadow-[6px_6px_0px_#FF6B00] uppercase text-center shrink-0 opacity-0 animate-[popIn_0.5s_ease-out_forwards]"
                style={{ animationDelay: '1.1s' }}
              >
                <span className="material-symbols-outlined">download</span>
                Descargar PDF
              </a>
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* Clases CSS personalizadas para animaciones y scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInLeftBounce {
          0% { opacity: 0; transform: translateX(-60px); }
          60% { opacity: 1; transform: translateX(10px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInTopBounce {
          0% { opacity: 0; transform: translateY(-40px); }
          60% { opacity: 1; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomInUp {
          0% { opacity: 0; transform: translateY(40px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes modalScaleUp {
          0% { opacity: 0; transform: scale(0.9) translateY(40px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.8); }
          60% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-left: 2px solid black; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #FF6B00; }
      `}} />
    </div>
  );
};

export default DashboardPage;
