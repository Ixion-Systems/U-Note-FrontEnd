import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', keepSession: false });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo('.orange-stripe', 
        { x: '-100%' }, 
        { x: '0%', duration: 1, ease: 'power3.out' }
      )
      .fromTo('.form-content',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' },
        '-=0.5'
      )
      .to('.mask-block', 
        { scaleY: 0, duration: 0.8, ease: 'power3.inOut' },
        '-=0.4'
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: formData.name, 
          email: formData.email, 
          password: formData.password 
        })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al registrarse');
      }

      // Si todo va bien, redirigimos al login para que inicie sesión
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="w-full min-h-screen flex flex-col md:flex-row relative z-10 overflow-hidden">
      
      {/* Back Button */}
      <Link 
        to="/" 
        className="form-content absolute top-6 left-6 md:top-8 md:left-8 z-50 flex items-center gap-2 text-white font-headline-sm uppercase text-lg hover:-translate-x-2 transition-transform bg-[#1A1A1A] px-6 py-3 rounded-full border-[2px] border-black shadow-[4px_4px_0px_#000000]"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        VOLVER
      </Link>

      {/* 1/3 Orange Stripe with Form */}
      <div className="orange-stripe w-full md:w-1/3 bg-[#FF6B00] min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative z-20 border-b-[3px] md:border-b-0 md:border-r-[3px] border-black shadow-[10px_0px_20px_rgba(0,0,0,0.5)]">
        
        {/* Logo Normal */}
        <div className="form-content mb-10 mt-20 md:mt-0">
          <img src="/IMG/U-NOTES LOGO.svg" alt="U-Notes Logo" className="h-[80px] md:h-[100px] object-contain drop-shadow-xl" />
        </div>

        <div className="form-content w-full max-w-[450px] bg-[#1A1A1A] p-8 md:p-10 rounded-2xl border-[3px] border-black shadow-[8px_8px_0px_#000000]">
          <h2 className="font-headline-lg text-[40px] md:text-[50px] uppercase text-white mb-8 leading-none tracking-tight">REGISTRARSE</h2>
          
          {error && (
            <div className="bg-red-500 text-white p-4 mb-6 font-headline-sm uppercase border-[2px] border-black">
              ! {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-2">
              <label className="font-headline-sm text-white uppercase tracking-wider text-sm">NOMBRE COMPLETO</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej. Juan Pérez"
                required
                className="bg-transparent border-b-[3px] border-white/30 text-white placeholder-white/30 p-2 font-body-md focus:outline-none focus:border-[#FF6B00] transition-colors text-lg"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-headline-sm text-white uppercase tracking-wider text-sm">CORREO ELECTRÓNICO</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="estudiante@universidad.edu"
                required
                className="bg-transparent border-b-[3px] border-white/30 text-white placeholder-white/30 p-2 font-body-md focus:outline-none focus:border-[#FF6B00] transition-colors text-lg"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-headline-sm text-white uppercase tracking-wider text-sm">CONTRASEÑA</label>
              <div className="relative w-full">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-transparent border-b-[3px] border-white/30 text-white placeholder-white/30 p-2 pr-10 font-body-md focus:outline-none focus:border-[#FF6B00] transition-colors text-lg"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <span className={`material-symbols-outlined transition-colors ${showPassword ? 'text-[#FF6B00]' : 'text-white'}`}>
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-6 h-6 bg-white border-[2px] border-black group-hover:bg-[#FF6B00] transition-colors">
                  <input 
                    type="checkbox" 
                    name="keepSession"
                    checked={formData.keepSession}
                    onChange={handleChange}
                    className="absolute opacity-0 cursor-pointer w-full h-full"
                  />
                  {formData.keepSession && <span className="material-symbols-outlined text-black text-[18px]">check</span>}
                </div>
                <span className="font-body-md text-white/80 text-sm select-none">Mantener sesión</span>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="mt-4 w-full bg-[#FFFFFF] text-black font-headline-sm text-[24px] py-4 border-[3px] border-black hover:bg-[#FF6B00] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#FFFFFF] transition-all uppercase tracking-widest disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {loading ? 'REGISTRANDO...' : 'REGISTRARSE'}
            </button>
          </form>

          <p className="font-body-md text-white/60 text-center mt-10 text-sm">
            ¿Ya tienes cuenta? <Link to="/login" className="text-white hover:text-[#FF6B00] hover:underline transition-colors font-bold">Inicia Sesión</Link>
          </p>
        </div>
      </div>

      {/* 2/3 Text Area */}
      <div className="w-full md:w-2/3 flex items-center justify-center p-8 md:p-16 relative z-10">
        <h1 className="font-headline-xl text-[12vw] md:text-[8vw] leading-[0.85] uppercase text-black max-w-[1200px] text-center md:text-left drop-shadow-md">
          <span className="relative inline-block overflow-hidden py-1">
            <span className="mask-block bg-black absolute inset-0 z-10 origin-bottom"></span>
            TU FUTURO
          </span>
          <br />
          <span className="relative inline-block overflow-hidden py-1">
            <span className="mask-block bg-[#E5E5E5] absolute inset-0 z-10 origin-bottom"></span>
            <span className="text-transparent" style={{ WebkitTextStroke: '3px black' }}>COMIENZA</span>
          </span>
          <br />
          <span className="relative inline-block overflow-hidden py-1">
            <span className="mask-block bg-black absolute inset-0 z-10 origin-bottom"></span>
            CON UN APUNTE
          </span>
        </h1>
      </div>

    </div>
  );
};

export default SignupPage;
