import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
  const navigate = useNavigate();
  
  // Data States
  const [careers, setCareers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form States
  const [selectedCareer, setSelectedCareer] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  
  // UI States
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/notes/filters')
      .then(res => res.json())
      .then(data => {
        setCareers(data.careers || []);
        setSubjects(data.subjects || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching filters:", err);
        setError("Error de conexión con el servidor.");
        setLoading(false);
      });
  }, []);

  // Update available subjects when Career or Year changes
  useEffect(() => {
    if (selectedCareer && selectedYear) {
      const filtered = subjects.filter(s => 
        s.career_id.toString() === selectedCareer && 
        s.year.toString() === selectedYear
      );
      setAvailableSubjects(filtered);
      setSelectedSubject(''); // reset
    } else {
      setAvailableSubjects([]);
    }
  }, [selectedCareer, selectedYear, subjects]);

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (selectedFile) => {
    if (!selectedFile) return false;
    if (selectedFile.type !== 'application/pdf') {
      setError("Solo se permiten archivos PDF.");
      return false;
    }
    if (selectedFile.size > 30 * 1024 * 1024) { // 30MB
      setError("El archivo supera el límite de 30MB.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSubject || !title || !file) {
      setError("Por favor completa los campos obligatorios (Carrera, Año, Materia, Título y Archivo PDF).");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('subjectId', selectedSubject);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/notes/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Error al subir el archivo.');
      }

      // Redirigir al dashboard al terminar la carga
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center text-white font-headline-lg text-4xl uppercase z-10 relative">Cargando...</div>;
  }

  // Años únicos
  const allYears = Array.from(new Set(subjects.map(s => s.year))).sort((a, b) => a - b);

  return (
    <div className="h-screen overflow-hidden bg-transparent flex flex-col pt-28 pb-8 px-4 md:px-lg relative z-10 max-w-7xl mx-auto w-full">
      
      {/* Header Animado */}
      <div className="flex-shrink-0 bg-white/90 backdrop-blur-md border-[3px] border-black p-6 shadow-[6px_6px_0px_#000000] mb-8 opacity-0 animate-[slideInTopBounce_0.6s_ease-out_forwards]" style={{ animationDelay: '0.1s' }}>
        <h1 className="font-headline-lg text-4xl md:text-5xl uppercase tracking-tighter text-black">Aportar Apunte</h1>
        <p className="font-body-md text-xl mt-2">Comparte tu material de estudio con la comunidad U-Notes.</p>
      </div>

      {/* Formulario Area Scrollable */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-6 opacity-0 animate-[zoomInUp_0.6s_ease-out_forwards] pr-4" style={{ animationDelay: '0.3s' }}>
        
        {error && (
          <div className="bg-red-500 text-white font-headline-sm border-[3px] border-black p-4 shadow-[6px_6px_0px_#000000] uppercase flex items-center gap-2">
            <span className="material-symbols-outlined">error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 pb-8">
          
          {/* Columna Izquierda: Metadatos */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            
            {/* Cascada de Selects */}
            <div className="bg-[#F3F3F3] border-[3px] border-black p-6 shadow-[6px_6px_0px_#000000]">
              <h2 className="font-headline-md text-2xl uppercase border-b-2 border-black pb-2 mb-4">Ubicación Académica</h2>
              
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block font-headline-sm text-sm uppercase mb-2">Carrera *</label>
                  <select 
                    value={selectedCareer} 
                    onChange={e => {
                      setSelectedCareer(e.target.value);
                      setSelectedYear('');
                      setSelectedSubject('');
                    }}
                    className="w-full bg-white border-2 border-black p-3 font-body-md text-lg focus:outline-none focus:border-[#FF6B00]"
                  >
                    <option value="">Seleccione Carrera</option>
                    {careers.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-headline-sm text-sm uppercase mb-2">Año de Cursada *</label>
                  <select 
                    value={selectedYear} 
                    onChange={e => {
                      setSelectedYear(e.target.value);
                      setSelectedSubject('');
                    }}
                    disabled={!selectedCareer}
                    className="w-full bg-white border-2 border-black p-3 font-body-md text-lg focus:outline-none focus:border-[#FF6B00] disabled:bg-gray-200 disabled:cursor-not-allowed"
                  >
                    <option value="">Seleccione Año</option>
                    {allYears.map(y => (
                      <option key={y} value={y}>{y}° Año</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-headline-sm text-sm uppercase mb-2">Materia *</label>
                  <select 
                    value={selectedSubject} 
                    onChange={e => setSelectedSubject(e.target.value)}
                    disabled={availableSubjects.length === 0}
                    className="w-full bg-white border-2 border-black p-3 font-body-md text-lg focus:outline-none focus:border-[#FF6B00] disabled:bg-gray-200 disabled:cursor-not-allowed"
                  >
                    <option value="">Seleccione Materia</option>
                    {availableSubjects.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Detalles del Apunte */}
            <div className="bg-[#F3F3F3] border-[3px] border-black p-6 shadow-[6px_6px_0px_#000000]">
              <h2 className="font-headline-md text-2xl uppercase border-b-2 border-black pb-2 mb-4">Detalles del Apunte</h2>
              
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block font-headline-sm text-sm uppercase mb-2">Título *</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Ej. Resumen Final de Álgebra"
                    className="w-full bg-white border-2 border-black p-3 font-body-md text-lg focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
                
                <div>
                  <label className="block font-headline-sm text-sm uppercase mb-2">Descripción (Opcional)</label>
                  <textarea 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Incluye temas específicos, si tiene ejercicios resueltos, etc..."
                    rows={4}
                    className="w-full bg-white border-2 border-black p-3 font-body-md text-lg focus:outline-none focus:border-[#FF6B00] resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Dropzone y Submit */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            
            <div 
              className={`flex-1 bg-[#F3F3F3] border-[4px] border-dashed transition-all duration-300 flex flex-col items-center justify-center p-8 text-center cursor-pointer relative min-h-[300px] ${
                dragActive ? 'border-[#FF6B00] bg-[#FF6B00]/10 shadow-[8px_8px_0px_#FF6B00]' : 'border-black hover:bg-white hover:shadow-[6px_6px_0px_#000000]'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                accept="application/pdf"
                className="hidden" 
                onChange={handleChange}
              />
              
              {file ? (
                <div className="flex flex-col items-center gap-4 animate-[zoomInUp_0.3s_ease-out_forwards]">
                  <span className="material-symbols-outlined text-[64px] text-[#FF6B00]">description</span>
                  <div>
                    <p className="font-headline-sm text-xl uppercase text-black break-all">{file.name}</p>
                    <p className="font-body-md text-gray-600 mt-2">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    className="mt-4 bg-black text-white font-headline-sm uppercase px-4 py-2 border-2 border-transparent hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors"
                  >
                    Cambiar Archivo
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 pointer-events-none">
                  <span className="material-symbols-outlined text-[80px] text-black">upload_file</span>
                  <div>
                    <p className="font-headline-sm text-2xl uppercase text-black">Haz clic o arrastra tu PDF aquí</p>
                    <p className="font-body-md text-gray-600 mt-2">Límite de tamaño: 30MB</p>
                  </div>
                </div>
              )}
            </div>

            <button 
              type="submit"
              disabled={uploading || !file || !title || !selectedSubject}
              className="w-full bg-[#FF6B00] text-black font-headline-md text-2xl border-[4px] border-black p-6 uppercase hover:bg-black hover:text-[#FF6B00] transition-colors shadow-[8px_8px_0px_#000000] hover:shadow-[8px_8px_0px_#FF6B00] disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-500 disabled:shadow-[4px_4px_0px_#888888] disabled:cursor-not-allowed flex items-center justify-center gap-4"
            >
              {uploading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">sync</span>
                  Subiendo...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">cloud_upload</span>
                  Subir a U-Notes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideInTopBounce {
          0% { opacity: 0; transform: translateY(-40px); }
          60% { opacity: 1; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomInUp {
          0% { opacity: 0; transform: translateY(40px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #000; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #FF6B00; }
      `}} />
    </div>
  );
};

export default UploadPage;
