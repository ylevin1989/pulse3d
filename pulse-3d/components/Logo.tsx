import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-4 select-none ${className}`}>
      {/* Icon "P" - Pulse Wave Style */}
      <div className="relative w-10 h-10 flex items-center justify-center">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 45 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
           <defs>
             <linearGradient id="logo_gold" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
               <stop stopColor="#E4D4B5"/>
               <stop offset="0.5" stopColor="#D4B483"/>
               <stop offset="1" stopColor="#9F8054"/>
             </linearGradient>
           </defs>
           
           {/* Recreating the P shape with vertical lines based on the brand identity */}
           {/* Stem Group */}
           <path d="M2 10C2 9.17 2.67 8.5 3.5 8.5C4.33 8.5 5 9.17 5 10V30C5 30.83 4.33 31.5 3.5 31.5C2.67 31.5 2 30.83 2 30V10Z" fill="url(#logo_gold)" />
           <path d="M8 6C8 5.17 8.67 4.5 9.5 4.5C10.33 4.5 11 5.17 11 6V34C11 34.83 10.33 35.5 9.5 35.5C8.67 35.5 8 34.83 8 34V6Z" fill="url(#logo_gold)" />
           <path d="M14 4C14 3.17 14.67 2.5 15.5 2.5C16.33 2.5 17 3.17 17 4V36C17 36.83 16.33 37.5 15.5 37.5C14.67 37.5 14 36.83 14 36V4Z" fill="url(#logo_gold)" />
           
           {/* Loop Group */}
           <path d="M20 4C20 3.17 20.67 2.5 21.5 2.5C22.33 2.5 23 3.17 23 4V24C23 24.83 22.33 25.5 21.5 25.5C20.67 25.5 20 24.83 20 24V4Z" fill="url(#logo_gold)" />
           <path d="M26 6C26 5.17 26.67 4.5 27.5 4.5C28.33 4.5 29 5.17 29 6V22C29 22.83 28.33 23.5 27.5 23.5C26.67 23.5 26 22.83 26 22V6Z" fill="url(#logo_gold)" />
           <path d="M32 8C32 7.17 32.67 6.5 33.5 6.5C34.33 6.5 35 7.17 35 8V18C35 18.83 34.33 19.5 33.5 19.5C32.67 19.5 32 18.83 32 18V8Z" fill="url(#logo_gold)" />
           <path d="M38 10C38 9.17 38.67 8.5 39.5 8.5C40.33 8.5 41 9.17 41 10V14C41 14.83 40.33 15.5 39.5 15.5C38.67 15.5 38 14.83 38 14V10Z" fill="url(#logo_gold)" />
        </svg>
      </div>
      
      {/* Text */}
      <div className="flex flex-col justify-center">
         <div className="flex items-center gap-2">
            <span className="font-display font-bold text-xl tracking-[0.15em] text-white uppercase leading-none">
              Pulse
            </span>
             <span className="font-sans text-lg text-brand-gold uppercase leading-none tracking-widest">
              3D
            </span>
         </div>
      </div>
    </div>
  );
};