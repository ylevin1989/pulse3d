import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  containerClass?: string;
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className = "", 
  id,
  containerClass = ""
}) => {
  return (
    <section id={id} className={`py-20 md:py-32 relative overflow-hidden ${className}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${containerClass}`}>
        {children}
      </div>
    </section>
  );
};