import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const FloatingShapesBackground = ({ position = 'fixed' }) => {
  const containerRef = useRef(null);
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    // Generate shapes randomly on client mount
    const generatedShapes = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      type: ['circle', 'square', 'triangle', 'plus'][Math.floor(Math.random() * 4)],
      color: i % 2 === 0 ? '#FF6B00' : '#000000', // Exactly 50/50 ratio
      size: Math.floor(Math.random() * 200) + 80, // Size between 80px and 280px
      startX: Math.random() * 120 - 10, // Wider spread (allows spawning slightly off-screen)
      startY: Math.random() * 120 - 10, 
      startRotation: Math.random() * 360,
      opacity: Math.random() * 0.15 + 0.05 // Faint opacity: 0.05 to 0.20
    }));
    setShapes(generatedShapes);
  }, []);

  useEffect(() => {
    if (shapes.length === 0) return;
    
    const elements = containerRef.current.children;
    const ctx = gsap.context(() => {
      Array.from(elements).forEach((el) => {
        // Continuous slow floating animation
        gsap.to(el, {
          x: () => `+=${Math.random() * 600 - 300}`, // Drift x much further
          y: () => `+=${Math.random() * 600 - 300}`, // Drift y much further
          rotation: () => `+=${Math.random() * 360 - 180}`, // Rotate more
          duration: () => Math.random() * 10 + 10, // Faster movement (10-20 seconds)
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [shapes]);

  const renderShape = (shape) => {
    const commonProps = {
      fill: 'none',
      stroke: shape.color,
      strokeWidth: 2,
      vectorEffect: 'non-scaling-stroke'
    };

    switch (shape.type) {
      case 'circle':
        return <circle cx="50" cy="50" r="45" {...commonProps} />;
      case 'square':
        return <rect x="5" y="5" width="90" height="90" {...commonProps} />;
      case 'triangle':
        return <polygon points="50,5 95,95 5,95" {...commonProps} />;
      case 'plus':
        return (
          <>
            <line x1="50" y1="10" x2="50" y2="90" {...commonProps} />
            <line x1="10" y1="50" x2="90" y2="50" {...commonProps} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className={`${position} inset-0 w-full h-full pointer-events-none z-0 overflow-hidden`}>
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.startX}vw`,
            top: `${shape.startY}vh`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            transform: `rotate(${shape.startRotation}deg)`,
            opacity: shape.opacity,
          }}
        >
          <svg viewBox="0 0 100 100" width="100%" height="100%" className="overflow-visible">
            {renderShape(shape)}
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FloatingShapesBackground;
