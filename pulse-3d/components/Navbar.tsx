import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { NAV_ITEMS } from '../constants';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-brand-black/80 backdrop-blur-xl border-white/5 py-4' 
          : 'bg-transparent border-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex-shrink-0 opacity-100 hover:opacity-80 transition-opacity">
            <Logo />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs font-bold uppercase tracking-[0.1em] transition-colors duration-300 relative group ${
                  location.pathname === item.path 
                    ? 'text-brand-gold' 
                    : 'text-brand-light hover:text-white'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-2 left-0 w-full h-[1px] bg-brand-gold transform origin-left transition-transform duration-300 ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <Link 
              to="/contacts"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-white border border-white/20 px-6 py-3 hover:bg-brand-gold hover:border-brand-gold hover:text-brand-black transition-all duration-300"
            >
              Start Project <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-brand-gold transition-colors focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-brand-black transform transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '80px' }}
      >
        <div className="px-6 py-12 space-y-8 flex flex-col items-center">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-xl font-display font-light uppercase tracking-[0.15em] ${
                location.pathname === item.path ? 'text-brand-gold' : 'text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-12 w-full border-t border-white/10 flex justify-center">
             <Link to="/contacts" className="text-brand-gold uppercase text-sm tracking-widest border-b border-brand-gold pb-1">
                Связаться с нами
             </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};