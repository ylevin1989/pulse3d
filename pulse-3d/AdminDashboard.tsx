import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { LogOut, Save, RotateCcw, Plus, Trash2, Wand2, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

type Tab = 'contacts' | 'pricing' | 'equipment' | 'portfolio' | 'faq';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('contacts');
  const [generatingImages, setGeneratingImages] = useState<Record<number, boolean>>({});
  
  const { 
    contactInfo, updateContactInfo, 
    tariffs, updateTariffs, 
    equipment, updateEquipment,
    portfolio, updatePortfolio,
    faqs, updateFaqs,
    resetData 
  } = useData();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const generatePortfolioImage = async (index: number) => {
    const item = portfolio[index];
    if (!item.title) {
        alert("Пожалуйста, введите название проекта");
        return;
    }

    setGeneratingImages(prev => ({ ...prev, [index]: true }));

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `Professional studio product photography of a 3D printed object: "${item.title}". 
      Material appearance: ${item.material}. Category: ${item.category || 'Industrial'}.
      Style: Industrial design, dark moody atmosphere, cinematic lighting with subtle gold rim light, high detail, 8k resolution, macro shot showing 3D printed layer texture.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [{ text: prompt }]
        },
        config: {
            imageConfig: { aspectRatio: '1:1' }
        }
      });

      const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      
      if (part && part.inlineData) {
        const base64Image = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        const newPortfolio = [...portfolio];
        newPortfolio[index].imageUrl = base64Image;
        updatePortfolio(newPortfolio);
      } else {
        alert('Не удалось сгенерировать изображение. Попробуйте еще раз.');
      }
    } catch (error) {
      console.error('AI Generation Error:', error);
      alert('Ошибка при генерации. Проверьте консоль и API_KEY.');
    } finally {
      setGeneratingImages(prev => ({ ...prev, [index]: false }));
    }
  };

  const InputField = ({ label, value, onChange, type = "text", className = "" }: any) => (
    <div className={`mb-4 ${className}`}>
      <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-brand-black/50 border border-gray-700 text-white px-4 py-2 rounded-lg focus:border-brand-gold focus:outline-none"
          rows={3}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-brand-black/50 border border-gray-700 text-white px-4 py-2 rounded-lg focus:border-brand-gold focus:outline-none"
        />
      )}
    </div>
  );

  return (
    <Section className="min-h-screen bg-brand-black pt-24">
      <div className="flex flex-col md:flex-row gap-8 min-h-[600px]">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="glass-card p-6 rounded-xl sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Админ Панель</h2>
            <nav className="space-y-2">
              {[
                { id: 'contacts', label: 'Контакты' },
                { id: 'pricing', label: 'Тарифы' },
                { id: 'equipment', label: 'Оборудование' },
                { id: 'portfolio', label: 'Портфолио' },
                { id: 'faq', label: 'FAQ' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-brand-gold text-brand-black font-bold' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
            <div className="mt-8 pt-8 border-t border-gray-800 space-y-4">
              <button 
                onClick={() => { if(confirm('Сбросить все изменения?')) resetData() }}
                className="flex items-center text-red-400 hover:text-red-300 text-sm"
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Сбросить данные
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center text-gray-500 hover:text-white text-sm"
              >
                <LogOut className="w-4 h-4 mr-2" /> Выйти
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow glass-card p-8 rounded-xl border border-white/5">
          {activeTab === 'contacts' && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Редактирование Контактов</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Телефон" value={contactInfo.phone} onChange={(v: string) => updateContactInfo({...contactInfo, phone: v})} />
                <InputField label="Email" value={contactInfo.email} onChange={(v: string) => updateContactInfo({...contactInfo, email: v})} />
                <InputField label="Адрес" value={contactInfo.address} onChange={(v: string) => updateContactInfo({...contactInfo, address: v})} />
                <InputField label="Город" value={contactInfo.city} onChange={(v: string) => updateContactInfo({...contactInfo, city: v})} />
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white mb-6">Тарифы</h3>
              {tariffs.map((tariff, idx) => (
                <div key={idx} className="p-6 bg-brand-black/40 rounded-xl border border-white/5">
                  <div className="flex justify-between mb-4">
                    <h4 className="text-brand-gold font-bold">Тариф #{idx + 1}</h4>
                    <label className="flex items-center text-sm text-gray-400">
                      <input 
                        type="checkbox" 
                        checked={tariff.highlight || false} 
                        onChange={(e) => {
                          const newTariffs = [...tariffs];
                          newTariffs[idx].highlight = e.target.checked;
                          updateTariffs(newTariffs);
                        }}
                        className="mr-2 accent-brand-gold"
                      /> Highlight
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Название" value={tariff.name} onChange={(v: string) => {
                      const newTariffs = [...tariffs];
                      newTariffs[idx].name = v;
                      updateTariffs(newTariffs);
                    }} />
                    <InputField label="Цена" value={tariff.price} onChange={(v: string) => {
                      const newTariffs = [...tariffs];
                      newTariffs[idx].price = v;
                      updateTariffs(newTariffs);
                    }} />
                    <InputField label="Материалы" value={tariff.materials} onChange={(v: string) => {
                      const newTariffs = [...tariffs];
                      newTariffs[idx].materials = v;
                      updateTariffs(newTariffs);
                    }} />
                    <InputField label="Оборудование" value={tariff.equipment} onChange={(v: string) => {
                      const newTariffs = [...tariffs];
                      newTariffs[idx].equipment = v;
                      updateTariffs(newTariffs);
                    }} />
                    <InputField label="Использование" value={tariff.usage} onChange={(v: string) => {
                      const newTariffs = [...tariffs];
                      newTariffs[idx].usage = v;
                      updateTariffs(newTariffs);
                    }} className="col-span-2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'equipment' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white mb-6">Оборудование</h3>
              {equipment.map((item, idx) => (
                <div key={idx} className="p-6 bg-brand-black/40 rounded-xl border border-white/5 relative">
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Название" value={item.name} onChange={(v: string) => {
                      const newEq = [...equipment];
                      newEq[idx].name = v;
                      updateEquipment(newEq);
                    }} />
                    <InputField label="Количество" value={item.count} type="number" onChange={(v: string) => {
                      const newEq = [...equipment];
                      newEq[idx].count = parseInt(v) || 0;
                      updateEquipment(newEq);
                    }} />
                     <InputField label="Описание" type="textarea" value={item.description} onChange={(v: string) => {
                      const newEq = [...equipment];
                      newEq[idx].description = v;
                      updateEquipment(newEq);
                    }} className="col-span-2" />
                     <InputField label="Назначение" value={item.purpose} onChange={(v: string) => {
                      const newEq = [...equipment];
                      newEq[idx].purpose = v;
                      updateEquipment(newEq);
                    }} className="col-span-2" />
                     <InputField label="Badge (Optional)" value={item.badge || ''} onChange={(v: string) => {
                      const newEq = [...equipment];
                      newEq[idx].badge = v;
                      updateEquipment(newEq);
                    }} />
                     <InputField label="Image URL" value={item.imageUrl} onChange={(v: string) => {
                      const newEq = [...equipment];
                      newEq[idx].imageUrl = v;
                      updateEquipment(newEq);
                    }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'portfolio' && (
             <div className="space-y-8">
               <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Портфолио</h3>
                <Button 
                  onClick={() => updatePortfolio([...portfolio, { title: 'New Project', material: 'PLA', category: 'Other', imageUrl: 'https://via.placeholder.com/800' }])}
                  variant="outline"
                  className="px-4 py-2"
                >
                  <Plus className="w-4 h-4 mr-2" /> Добавить
                </Button>
               </div>
               
               <div className="grid grid-cols-1 gap-6">
                 {portfolio.map((item, idx) => (
                   <div key={idx} className="flex flex-col xl:flex-row gap-6 p-6 bg-brand-black/40 rounded-xl border border-white/5 items-start">
                     <div className="w-full xl:w-48 h-48 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0 border border-white/5 relative group">
                       <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-xs text-white uppercase tracking-widest font-bold">Preview</span>
                       </div>
                     </div>
                     <div className="flex-grow w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Название" value={item.title} onChange={(v: string) => {
                          const newPort = [...portfolio];
                          newPort[idx].title = v;
                          updatePortfolio(newPort);
                        }} />
                        <InputField label="Категория" value={item.category || ''} onChange={(v: string) => {
                          const newPort = [...portfolio];
                          newPort[idx].category = v;
                          updatePortfolio(newPort);
                        }} />
                        <InputField label="Материал" value={item.material} onChange={(v: string) => {
                          const newPort = [...portfolio];
                          newPort[idx].material = v;
                          updatePortfolio(newPort);
                        }} />
                        
                        {/* Custom Image URL Input with AI Gen Button */}
                        <div className="col-span-1">
                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">URL Фото / AI Gen</label>
                            <div className="flex gap-2">
                                <input 
                                    value={item.imageUrl} 
                                    onChange={(e) => {
                                        const newPort = [...portfolio];
                                        newPort[idx].imageUrl = e.target.value;
                                        updatePortfolio(newPort);
                                    }} 
                                    className="w-full bg-brand-black/50 border border-gray-700 text-white px-4 py-2 rounded-lg focus:border-brand-gold focus:outline-none"
                                    placeholder="https://..."
                                />
                                <button
                                    onClick={() => generatePortfolioImage(idx)}
                                    disabled={generatingImages[idx]}
                                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-brand-gold/10 text-brand-gold border border-brand-gold/50 rounded-lg hover:bg-brand-gold/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    title="Сгенерировать AI изображение"
                                >
                                    {generatingImages[idx] ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                     </div>
                     <button 
                       onClick={() => updatePortfolio(portfolio.filter((_, i) => i !== idx))}
                       className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg self-start"
                       title="Удалить"
                     >
                       <Trash2 className="w-5 h-5" />
                     </button>
                   </div>
                 ))}
               </div>
             </div>
          )}

           {activeTab === 'faq' && (
             <div className="space-y-8">
               <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">FAQ</h3>
                <Button 
                  onClick={() => updateFaqs([...faqs, { question: 'Новый вопрос?', answer: 'Ответ...' }])}
                  variant="outline"
                  className="px-4 py-2"
                >
                  <Plus className="w-4 h-4 mr-2" /> Добавить
                </Button>
               </div>
               
               <div className="space-y-6">
                 {faqs.map((item, idx) => (
                   <div key={idx} className="p-6 bg-brand-black/40 rounded-xl border border-white/5 relative">
                     <div className="absolute top-4 right-4">
                        <button 
                          onClick={() => updateFaqs(faqs.filter((_, i) => i !== idx))}
                          className="text-red-500 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                     </div>
                     <InputField label="Вопрос" value={item.question} onChange={(v: string) => {
                        const newFaqs = [...faqs];
                        newFaqs[idx].question = v;
                        updateFaqs(newFaqs);
                      }} />
                      <InputField label="Ответ" type="textarea" value={item.answer} onChange={(v: string) => {
                        const newFaqs = [...faqs];
                        newFaqs[idx].answer = v;
                        updateFaqs(newFaqs);
                      }} className="mb-0" />
                   </div>
                 ))}
               </div>
             </div>
          )}
        </div>
      </div>
    </Section>
  );
};
