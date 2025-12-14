import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { useData } from '../context/DataContext';
import { Youtube, Send, MessageCircle, Linkedin, Github, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { contactInfo } = useData();
  const cleanPhone = contactInfo.phone.replace(/[^\d]/g, '');

  const SocialLink = ({ href, icon: Icon }: any) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-brand-gold transition-colors border border-white/5 hover:border-brand-gold"
    >
        <Icon className="w-4 h-4" />
    </a>
  );

  return (
    <footer className="bg-brand-black border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Logo className="mb-6" />
            <p className="text-xs text-gray-500 leading-relaxed font-light max-w-[200px]">
              Advanced Additive Manufacturing. <br/>
              Precision. Speed. Reliability.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Menu</h3>
            <ul className="space-y-4 text-sm font-light">
              <li><Link to="/pricing" className="text-gray-400 hover:text-brand-gold transition-colors">Pricing</Link></li>
              <li><Link to="/equipment" className="text-gray-400 hover:text-brand-gold transition-colors">Equipment</Link></li>
              <li><Link to="/portfolio" className="text-gray-400 hover:text-brand-gold transition-colors">Portfolio</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Contact</h3>
            <ul className="space-y-4 text-sm font-light text-gray-400">
              <li>{contactInfo.address}</li>
              <li className="text-white">{contactInfo.phone}</li>
              <li>{contactInfo.email}</li>
            </ul>
          </div>

          {/* Social */}
          <div>
             <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Connect</h3>
             <div className="flex flex-wrap gap-2">
                <SocialLink href={`https://t.me/+${cleanPhone}`} icon={Send} />
                <SocialLink href={`https://wa.me/${cleanPhone}`} icon={MessageCircle} />
                <SocialLink href={`mailto:${contactInfo.email}`} icon={Mail} />
                <SocialLink href="https://linkedin.com" icon={Linkedin} />
                <SocialLink href="https://github.com" icon={Github} />
                <SocialLink href="https://youtube.com" icon={Youtube} />
             </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest">
          <p>© 2025 PULSE 3D. All Rights Reserved.</p>
          <p>Industrial Design System</p>
        </div>
      </div>
    </footer>
  );
};