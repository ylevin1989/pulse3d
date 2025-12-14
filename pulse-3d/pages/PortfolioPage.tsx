import React, { useState, useMemo } from 'react';
import { Section } from '../components/Section';
import { useData } from '../context/DataContext';

export const PortfolioPage: React.FC = () => {
  const { portfolio } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract Unique Categories
  const categories = useMemo(() => {
    const cats = portfolio
      .map(item => item.category)
      .filter((c): c is string => !!c);
    return ['All', ...Array.from(new Set(cats))];
  }, [portfolio]);

  // Filter Items
  const filteredItems = portfolio.filter(item => {
    return selectedCategory === 'All' || item.category === selectedCategory;
  });

  return (
    <Section className="bg-brand-black">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-display font-medium text-white mb-8">Selected Works</h1>
        
        {/* Minimal Category Filter */}
        <div className="flex flex-wrap justify-center gap-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-bold uppercase tracking-[0.15em] transition-all pb-1 border-b ${
                selectedCategory === cat 
                  ? 'text-brand-gold border-brand-gold' 
                  : 'text-gray-500 border-transparent hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
        {filteredItems.map((item, idx) => (
          <div key={`${item.title}-${idx}`} className="group relative aspect-square bg-brand-black overflow-hidden cursor-crosshair">
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-brand-black/60 group-hover:bg-transparent transition-colors duration-500"></div>

            <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
               <div className="bg-brand-black/90 backdrop-blur p-4 border-l-2 border-brand-gold">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">{item.title}</h3>
                  <p className="text-xs text-brand-gold font-mono">{item.material}</p>
               </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};