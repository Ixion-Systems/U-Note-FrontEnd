import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const isTargetPage = location.pathname === '/' || location.pathname === '/specs';
  const [navVisible, setNavVisible] = useState(!isTargetPage);
  
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  useEffect(() => {
    // Si estamos en dashboard o upload, esperamos 1.5s para que terminen las animaciones.
    // Si no, aparece de inmediato.
    const delay = (location.pathname === '/dashboard' || location.pathname === '/upload') ? 1500 : 0;
    setMounted(false);
    const timer = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    if (isTargetPage) {
      setNavVisible(false);
    } else {
      setNavVisible(true);
    }
  }, [location.pathname, isTargetPage]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    const handleShowNav = () => setNavVisible(true);
    window.addEventListener('show-nav', handleShowNav);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('show-nav', handleShowNav);
    };
  }, []);

  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  const isDarkPage = location.pathname === '/dashboard' || location.pathname === '/upload';

  const bgClass = (scrolled || isDarkPage)
    ? 'bg-black/80 backdrop-blur-md border-b-[1px] border-white/10' 
    : 'bg-transparent';
    
  const visibilityClass = (navVisible && mounted)
    ? 'translate-y-0 opacity-100 pointer-events-auto' 
    : '-translate-y-full opacity-0 pointer-events-none';

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out flex justify-between items-center h-[80px] md:h-[100px] px-lg ${bgClass} ${visibilityClass}`}
    >
      <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
        <img src="/IMG/U-NOTES LOGO Orange.svg" alt="U-NOTES Logo" className="h-[56px] md:h-[72px] w-auto object-contain" />
      </Link>
      
      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-lg">
        <Link
          to="/"
          className="font-headline-sm text-headline-sm uppercase text-white hover:text-primary-container hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200"
        >
          INICIO
        </Link>
        <Link
          to="/specs"
          className="font-headline-sm text-headline-sm uppercase text-white hover:text-primary-container hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200"
        >
          ESPECIFICACIONES
        </Link>
        
        {isLoggedIn ? (
          <>
            <Link
              to="/dashboard"
              className={`font-headline-sm text-headline-sm uppercase transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 ${location.pathname === '/dashboard' ? 'text-[#FF6B00]' : 'text-white hover:text-primary-container'}`}
            >
              DASHBOARD
            </Link>
            <Link
              to="/upload"
              className={`font-headline-sm text-headline-sm uppercase transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 ${location.pathname === '/upload' ? 'text-[#FF6B00]' : 'text-white hover:text-primary-container'}`}
            >
              SUBIR APUNTE
            </Link>
            <button onClick={handleLogout} className="flex items-center justify-center gap-2 bg-transparent text-white font-headline-sm text-headline-sm uppercase px-8 py-3 rounded-full hover:opacity-90 hover:shadow-brutal-hover hover:-translate-y-1 hover:-translate-x-1 transition-all border-[3px] border-white hover:border-[#FF6B00] hover:text-[#FF6B00]">
              <span className="material-symbols-outlined text-[24px]">logout</span>
              CERRAR SESIÓN
            </button>
          </>
        ) : (
          <Link to="/login" className="flex items-center justify-center gap-2 bg-primary-container text-white font-headline-sm text-headline-sm uppercase px-8 py-3 rounded-full hover:opacity-90 hover:shadow-brutal-hover hover:-translate-y-1 hover:-translate-x-1 transition-all border-[3px] border-transparent">
            <span className="material-symbols-outlined text-[24px]">login</span>
            INICIAR SESIÓN
          </Link>
        )}
      </div>
      
      {/* Mobile Menu Icon (Hidden on desktop) */}
      <button className="md:hidden flex items-center justify-center p-sm border-[3px] border-white text-white shadow-brutal-white bg-transparent">
        <span className="material-symbols-outlined" data-icon="menu">
          menu
        </span>
      </button>
    </nav>
  );
};

export default Navbar;
