import React, { createContext, useContext, useState, useEffect } from 'react';
import { CONTACT_INFO, TARIFFS, EQUIPMENT, PORTFOLIO, FAQS } from '../constants';
import { ContactInfo, Tariff, EquipmentItem, PortfolioItem, FAQItem } from '../types';

interface DataContextType {
  contactInfo: ContactInfo;
  tariffs: Tariff[];
  equipment: EquipmentItem[];
  portfolio: PortfolioItem[];
  faqs: FAQItem[];
  updateContactInfo: (info: ContactInfo) => void;
  updateTariffs: (tariffs: Tariff[]) => void;
  updateEquipment: (equipment: EquipmentItem[]) => void;
  updatePortfolio: (portfolio: PortfolioItem[]) => void;
  updateFaqs: (faqs: FAQItem[]) => void;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(CONTACT_INFO);
  const [tariffs, setTariffs] = useState<Tariff[]>(TARIFFS);
  const [equipment, setEquipment] = useState<EquipmentItem[]>(EQUIPMENT);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(PORTFOLIO);
  const [faqs, setFaqs] = useState<FAQItem[]>(FAQS);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('pulse_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.contactInfo) setContactInfo(parsed.contactInfo);
        if (parsed.tariffs) setTariffs(parsed.tariffs);
        if (parsed.equipment) setEquipment(parsed.equipment);
        if (parsed.portfolio) setPortfolio(parsed.portfolio);
        if (parsed.faqs) setFaqs(parsed.faqs);
      } catch (e) {
        console.error("Failed to load data", e);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    const dataToSave = {
      contactInfo,
      tariffs,
      equipment,
      portfolio,
      faqs
    };
    localStorage.setItem('pulse_data', JSON.stringify(dataToSave));
  }, [contactInfo, tariffs, equipment, portfolio, faqs]);

  const resetData = () => {
    setContactInfo(CONTACT_INFO);
    setTariffs(TARIFFS);
    setEquipment(EQUIPMENT);
    setPortfolio(PORTFOLIO);
    setFaqs(FAQS);
    localStorage.removeItem('pulse_data');
  };

  return (
    <DataContext.Provider value={{
      contactInfo,
      tariffs,
      equipment,
      portfolio,
      faqs,
      updateContactInfo: setContactInfo,
      updateTariffs: setTariffs,
      updateEquipment: setEquipment,
      updatePortfolio: setPortfolio,
      updateFaqs: setFaqs,
      resetData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
