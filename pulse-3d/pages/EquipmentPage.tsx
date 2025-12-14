import React from 'react';
import { Section } from '../components/Section';
import { useData } from '../context/DataContext';

export const EquipmentPage: React.FC = () => {
  const { equipment } = useData();

  return (
    <>
      <Section className="bg-brand-black">
        <div className="mb-24 text-center">
           <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Production Fleet</span>
          <h1 className="text-4xl md:text-6xl font-display font-medium text-white mb-6">Technical Arsenal</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
             Мощности студии базируются на экосистеме <span className="text-white">Bambu Lab Enterprise</span>. 
          </p>
        </div>

        <div className="space-y-px bg-white/10 border border-white/10">
          {equipment.map((item, idx) => (
            <div key={idx} className="bg-brand-black grid grid-cols-1 lg:grid-cols-2 gap-0">
              
              {/* Image Side */}
              <div className={`relative h-[400px] lg:h-auto overflow-hidden group ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                 <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                 <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                 />
                 {item.badge && (
                    <div className="absolute top-6 left-6 z-20 bg-brand-gold text-brand-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                        {item.badge}
                    </div>
                 )}
              </div>

              {/* Text Side */}
              <div className={`p-12 lg:p-20 flex flex-col justify-center ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-brand-gold font-mono text-xs uppercase tracking-widest">Quantity: {item.count}</span>
                    <div className="h-px w-8 bg-white/10"></div>
                </div>
                
                <h2 className="text-3xl font-display text-white mb-6">{item.name}</h2>
                <p className="text-gray-400 font-light leading-relaxed mb-8">
                    {item.description}
                </p>

                <div className="border-l-2 border-brand-gold/50 pl-6">
                   <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2">Назначение</h4>
                   <p className="text-gray-500 text-sm">{item.purpose}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};