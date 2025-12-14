import { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Tariff {
  name: string;
  price: string;
  materials: string;
  equipment: string;
  usage: string;
  highlight?: boolean;
}

export interface EquipmentItem {
  name: string;
  count: number;
  description: string;
  purpose: string;
  imageUrl: string;
  badge?: string;
}

export interface PortfolioItem {
  title: string;
  material: string;
  imageUrl: string;
  category?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  city: string;
}