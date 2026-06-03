import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FloatingCodeBackground = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const codeLines = containerRef.current.children;
    const colors = ['#FF6B00', '#FF8533', '#CC5500', '#FFA366'];
    
    Array.from(codeLines).forEach((line) => {
      // Randomize initial positions and sizes to simulate code blocks
      const width = gsap.utils.random(50, 250);
      const height = gsap.utils.random(6, 14);
      const startX = gsap.utils.random(-10, 110);
      const startY = gsap.utils.random(-10, 110);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = gsap.utils.random(0.1, 0.35);
      
      gsap.set(line, {
        width: `${width}px`,
        height: `${height}px`,
        left: `${startX}%`,
        top: `${startY}%`,
        backgroundColor: color,
        opacity: opacity,
        borderRadius: '2px' // brutalist slightly rounded block
      });
      
      // Floating animation mimicking the shapes background but horizontal biased
      gsap.to(line, {
        x: `+=${gsap.utils.random(-30, 30)}vw`,
        y: `+=${gsap.utils.random(-20, 20)}vh`,
        duration: gsap.utils.random(10, 25),
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50">
      {/* Generate 50 code lines */}
      {[...Array(50)].map((_, i) => (
        <div key={i} className="absolute shadow-[2px_2px_0px_#000000]" />
      ))}
    </div>
  );
};

export default FloatingCodeBackground;
