import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  to?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  to, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300 rounded-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-gold text-brand-black hover:bg-white hover:text-black border border-brand-gold",
    secondary: "bg-brand-gray text-white hover:bg-brand-gold hover:text-black border border-transparent",
    outline: "border border-white/20 text-white hover:border-brand-gold hover:text-brand-gold bg-transparent",
    ghost: "text-brand-gold hover:text-white bg-transparent",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};