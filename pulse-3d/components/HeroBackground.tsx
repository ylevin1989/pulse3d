import React, { useEffect, useRef } from 'react';

export const HeroBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      
      // Subtle parallax for the grid
      const moveX = x * -10; 
      const moveY = y * -10;
      
      gridRef.current.style.transform = `perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px) translateX(${moveX}px) translateY(${moveY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-brand-black pointer-events-none">
      {/* Deep Background Gradient - Subtle Gold hint at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-[#09090B] to-[#12100C]" />
      
      {/* 3D Grid Layer - Very faint */}
      <div 
        ref={gridRef}
        className="absolute inset-[-50%] transition-transform duration-100 ease-out will-change-transform opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(212, 180, 131, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(212, 180, 131, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
        }}
      >
        {/* Radial mask to fade out grid at edges */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 0%, #09090B 80%)'
          }} 
        />
      </div>

      {/* Atmospheric Fog */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-brand-black via-brand-black/90 to-transparent" />
      
      {/* Subtle Light Beam */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-brand-gold/5 blur-[150px] rounded-full" />
    </div>
  );
};