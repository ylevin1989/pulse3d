import React, { useState } from 'react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { useData } from '../context/DataContext';

export const ContactPage: React.FC = () => {
  const { contactInfo } = useData();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Заявка принята. Менеджер свяжется с вами.');
    setFormData({ name: '', phone: '', email: '', description: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const InputGroup = ({ label, name, type = "text", placeholder, value }: any) => (
     <div className="group">
        <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest group-focus-within:text-brand-gold transition-colors">{label}</label>
        <input 
            type={type} 
            name={name}
            value={value}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-b border-white/20 text-white py-3 focus:outline-none focus:border-brand-gold transition-colors placeholder-gray-700"
            placeholder={placeholder}
        />
     </div>
  );

  return (
    <>
      <Section className="bg-brand-black min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 w-full max-w-6xl mx-auto">
          
          {/* Info Side */}
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-display font-medium text-white mb-16">Contact Us</h1>
            
            <div className="space-y-12 border-l border-white/10 pl-8">
              <div>
                  <h3 className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mb-2">Location</h3>
                  <p className="text-xl text-white font-light">{contactInfo.address}</p>
                  <p className="text-sm text-gray-500 mt-1">{contactInfo.city}</p>
              </div>

              <div>
                  <h3 className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mb-2">Phone</h3>
                  <p className="text-xl text-white font-light">{contactInfo.phone}</p>
              </div>

              <div>
                  <h3 className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mb-2">Email</h3>
                  <p className="text-xl text-white font-light">{contactInfo.email}</p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-brand-dark/20 p-12 border border-white/5 backdrop-blur-sm">
            <h2 className="text-xl font-display text-white mb-10">Start a Project</h2>
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-2 gap-8">
                <InputGroup label="Name" name="name" value={formData.name} placeholder="Иван Иванов" />
                <InputGroup label="Phone" name="phone" value={formData.phone} type="tel" placeholder="+7 (999) 000-00-00" />
              </div>
              
              <InputGroup label="Email" name="email" value={formData.email} type="email" placeholder="corporate@company.com" />

              <div className="group">
                <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest group-focus-within:text-brand-gold transition-colors">Project Details</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 text-white py-3 focus:outline-none focus:border-brand-gold transition-colors resize-none placeholder-gray-700"
                  placeholder="Опишите задачу, тираж и требования..."
                ></textarea>
              </div>

              <div className="pt-6">
                <Button type="submit" variant="primary" className="w-full">
                    Отправить запрос
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
};