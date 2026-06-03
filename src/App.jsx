import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SpecStatusPage from './pages/SpecStatusPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingShapesBackground from './components/FloatingShapesBackground';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-transparent font-sans overflow-x-hidden selection:bg-[#FF6B00] selection:text-white relative">
        <FloatingShapesBackground />
        <Navbar />
        <main className="relative z-10 w-full min-h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/specs" element={<SpecStatusPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
