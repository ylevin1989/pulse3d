import React from 'react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { HeroBackground } from '../components/HeroBackground';
import { FEATURES } from '../constants';
import { ArrowRight, Layers, Cpu, Wrench, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-brand-black overflow-hidden pt-20">
        <HeroBackground />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-8">
                 <div className="h-[1px] w-12 bg-brand-gold"></div>
                 <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em]">Industrial Grade Production</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium text-white leading-[1.05] mb-8 tracking-tight">
                Engineering <br/>
                <span className="text-gold-gradient font-bold">Perfection</span>
              </h1>
              
              <p className="text-lg text-brand-light mb-12 max-w-xl leading-relaxed font-light border-l border-white/10 pl-6">
                Контрактное производство полного цикла. Мы превращаем CAD-модели в физические объекты промышленного качества за 48 часов.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Button to="/contacts" variant="primary">Рассчитать проект</Button>
                <Button to="/equipment" variant="outline">Наш Технопарк</Button>
              </div>
            </div>
            
            {/* Stats Minimal */}
            <div className="lg:col-span-4 lg:mb-12 grid grid-cols-2 gap-px bg-white/10 border border-white/10">
               <div className="bg-brand-black p-6">
                  <p className="text-3xl font-display text-white mb-1">0.1<span className="text-sm text-gray-500 ml-1">mm</span></p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500">Точность</p>
               </div>
               <div className="bg-brand-black p-6">
                  <p className="text-3xl font-display text-white mb-1">48<span className="text-sm text-gray-500 ml-1">h</span></p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500">Срок</p>
               </div>
               <div className="bg-brand-black p-6">
                  <p className="text-3xl font-display text-white mb-1">X1E</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500">Bambu Lab</p>
               </div>
               <div className="bg-brand-black p-6">
                  <p className="text-3xl font-display text-white mb-1">B2B</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500">Юр. Лица</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Minimal Grid */}
      <Section className="bg-brand-black border-y border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5 border border-white/5">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="group p-10 bg-transparent hover:bg-brand-dark transition-colors duration-500">
              <feature.icon className="w-8 h-8 text-brand-gold mb-6 opacity-80 group-hover:opacity-100 transition-opacity" strokeWidth={1} />
              <h3 className="text-lg font-display font-medium text-white mb-3 tracking-wide">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm font-light group-hover:text-gray-400 transition-colors">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Target Audience Section */}
      <Section className="bg-brand-black relative">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white mb-4">Сферы применения</h2>
            <div className="h-[2px] w-24 bg-brand-gold"></div>
          </div>
          <Link to="/portfolio" className="group flex items-center text-brand-gold text-sm font-bold uppercase tracking-widest">
             Смотреть Кейсы <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Layers, title: "Промышленность", text: "Импортозамещение запчастей и функциональные узлы." },
            { icon: Cpu, title: "Приборостроение", text: "Корпуса РЭА, прототипирование, малые серии." },
            { icon: Wrench, title: "Автомотив", text: "Крепеж, детали интерьера, функциональные заглушки." },
            { icon: PenTool, title: "Дизайн и Архитектура", text: "Параметрические макеты и арт-объекты." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col p-8 border border-white/5 hover:border-brand-gold/30 transition-colors duration-500 bg-brand-dark/50">
               <div className="mb-6">
                 <item.icon className="w-8 h-8 text-white" strokeWidth={1} />
               </div>
               <h3 className="text-xl font-display text-white mb-2">{item.title}</h3>
               <p className="text-gray-500 font-light text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};