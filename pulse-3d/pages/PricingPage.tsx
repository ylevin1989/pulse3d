import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { useData } from '../context/DataContext';
import { ShieldCheck, Box, Layers, ArrowRight } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { tariffs, faqs } = useData();

  return (
    <>
      <Section className="bg-brand-black pt-32">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Transparent Economics</span>
          <h1 className="text-4xl md:text-6xl font-display font-medium text-white mb-6">Pay-per-Hour Model</h1>
          <p className="text-xl text-gray-500 leading-relaxed font-light max-w-2xl mx-auto">
            Честная тарификация времени работы оборудования. <br/>
            Без скрытых наценок за сложность геометрии.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {tariffs.map((tariff, idx) => (
            <div 
              key={idx} 
              className={`relative flex flex-col p-10 border transition-all duration-500 group ${
                tariff.highlight 
                  ? 'bg-brand-dark border-brand-gold/50 shadow-[0_0_50px_rgba(212,180,131,0.05)]' 
                  : 'bg-transparent border-white/10 hover:border-white/20'
              }`}
            >
              {tariff.highlight && (
                <div className="absolute top-0 right-0 p-4">
                   <div className="w-2 h-2 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(212,180,131,0.8)]"></div>
                </div>
              )}

              <div className="mb-10">
                <h3 className={`text-sm font-bold uppercase tracking-[0.15em] mb-6 ${tariff.highlight ? 'text-brand-gold' : 'text-gray-400'}`}>
                    {tariff.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-display font-medium text-white">{tariff.price}</span>
                </div>
              </div>

              <div className="flex-grow space-y-8 border-t border-white/5 pt-8 mb-10">
                <div>
                    <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Материалы</h4>
                    <p className="text-gray-300 font-light text-sm">{tariff.materials}</p>
                </div>
                <div>
                    <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Оборудование</h4>
                    <p className="text-gray-300 font-light text-sm">{tariff.equipment}</p>
                </div>
                 <div>
                    <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Применение</h4>
                    <p className="text-gray-300 font-light text-sm">{tariff.usage}</p>
                </div>
              </div>

              <Button to="/contacts" variant={tariff.highlight ? 'primary' : 'outline'} className="w-full">
                Выбрать план
              </Button>
            </div>
          ))}
        </div>

        {/* Machine Hour Economics Section */}
        <div className="mt-40 max-w-7xl mx-auto border-t border-white/5 pt-20">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-display text-white mb-6">
                    Сравнение стоимости
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto font-light">
                   Наглядная демонстрация выгоды почасовой оплаты (Pulse 3D) против классической оплаты за вес.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Example 1 */}
                <div className="bg-brand-dark/30 p-8 border border-white/5 hover:border-brand-gold/20 transition-all duration-500">
                    <div className="flex items-start justify-between mb-8">
                        <div className="flex gap-4 items-center">
                            <Box className="w-6 h-6 text-brand-gold" strokeWidth={1.5} />
                            <div>
                                <h3 className="text-lg font-display text-white">Крупный корпус</h3>
                                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">400г / PETG</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-4 border-b border-white/5 opacity-50">
                            <span className="text-sm text-gray-400">Рыночная цена (за грамм)</span>
                            <span className="text-lg font-display text-white line-through decoration-red-900/50">14 000 ₽</span>
                        </div>
                        <div className="flex justify-between items-center py-4">
                            <span className="text-sm text-brand-gold font-bold uppercase tracking-wide">Pulse 3D (по часам)</span>
                            <span className="text-2xl font-display text-brand-gold">~3 800 ₽</span>
                        </div>
                    </div>
                </div>

                {/* Example 2 */}
                <div className="bg-brand-dark/30 p-8 border border-white/5 hover:border-brand-gold/20 transition-all duration-500">
                    <div className="flex items-start justify-between mb-8">
                         <div className="flex gap-4 items-center">
                            <Layers className="w-6 h-6 text-brand-gold" strokeWidth={1.5} />
                            <div>
                                <h3 className="text-lg font-display text-white">Серия (50 шт)</h3>
                                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">ABS Пластик</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-4 border-b border-white/5 opacity-50">
                            <span className="text-sm text-gray-400">Рыночная цена (за шт)</span>
                            <span className="text-lg font-display text-white line-through decoration-red-900/50">15 000 ₽</span>
                        </div>
                        <div className="flex justify-between items-center py-4">
                            <span className="text-sm text-brand-gold font-bold uppercase tracking-wide">Pulse 3D (оптимизация)</span>
                            <span className="text-2xl font-display text-brand-gold">5 000 ₽</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-12 bg-white/5 border border-white/5 p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex gap-4">
                <ShieldCheck className="w-12 h-12 text-brand-gold opacity-80" strokeWidth={1} />
                <div>
                    <h4 className="text-white font-display text-lg">Точный расчет</h4>
                    <p className="text-gray-500 text-sm mt-1 max-w-md font-light">
                        Цена фиксируется после слайсинга модели в Bambu Studio.
                    </p>
                </div>
            </div>
            <Link to="/contacts" className="flex items-center text-sm font-bold uppercase tracking-widest text-white hover:text-brand-gold transition-colors">
                Отправить файл <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
        </div>
      </Section>
      
       <Section className="bg-brand-black border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-display text-white mb-10 text-center">FAQ</h2>
          <div className="space-y-px bg-white/10 border border-white/10">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-brand-black p-8">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">{faq.question}</h4>
                <p className="text-gray-500 font-light text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
};