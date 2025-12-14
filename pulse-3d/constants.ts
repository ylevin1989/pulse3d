import { Zap, Settings, Package, MapPin } from 'lucide-react';
import { NavItem, Feature, Tariff, EquipmentItem, PortfolioItem, FAQItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Главная', path: '/' },
  { label: 'Цены', path: '/pricing' },
  { label: 'Оборудование', path: '/equipment' },
  { label: 'Портфолио', path: '/portfolio' },
  { label: 'Контакты', path: '/contacts' },
];

export const CONTACT_INFO = {
  phone: '+7 (911) 910-40-12',
  email: 'Ylevin89@gmail.com',
  address: 'СПб, 18-я линия В.О., д. 3В',
  city: 'Санкт-Петербург',
};

export const FEATURES: Feature[] = [
  {
    title: 'СКОРОСТЬ',
    description: 'Печатаем в 3-4 раза быстрее обычных студий. Срочные заказы "день в день".',
    icon: Zap,
  },
  {
    title: 'ИНЖЕНЕРИЯ',
    description: 'Флагманы X1E с термокамерой. Печать Нейлоном (PA) и Поликарбонатом (PC) без брака.',
    icon: Settings,
  },
  {
    title: 'МОЩНОСТЬ',
    description: '10 принтеров в строю. Берем партии от 1 до 1000 шт.',
    icon: Package,
  },
  {
    title: 'ЛОКАЦИЯ',
    description: 'Производство на Васильевском острове. Доставка по РФ.',
    icon: MapPin,
  },
];

export const TARIFFS: Tariff[] = [
  {
    name: 'СТАНДАРТ',
    price: '250 ₽ / час',
    materials: 'PLA, PETG',
    equipment: 'Bambu Lab A1 / P1S',
    usage: 'Декор, макеты, корпуса, проставки.',
    highlight: false,
  },
  {
    name: 'ПРО',
    price: '300 ₽ / час',
    materials: 'ABS, ASA, TPU (Flex)',
    equipment: 'Bambu Lab P1S',
    usage: 'Термостойкие детали, автозапчасти, резина.',
    highlight: true,
  },
  {
    name: 'ИНЖЕНЕР',
    price: '400 ₽ / час',
    materials: 'NYLON (PA), PC, CF',
    equipment: 'Bambu Lab X1E',
    usage: 'Шестерни, нагруженные узлы, замена металла.',
    highlight: false,
  },
];

export const EQUIPMENT: EquipmentItem[] = [
  {
    name: 'BAMBU LAB X1E',
    count: 2,
    description: 'Высшая лига FDM печати. Активный подогрев камеры до 60°C.',
    purpose: 'Идеальная печать сложными усадочными пластиками (Nylon, PC). Гарантия прочности и спайки слоев.',
    imageUrl: 'https://images.unsplash.com/photo-1631541909061-71e349d1f203?q=80&w=1000&auto=format&fit=crop',
    badge: 'FLAGSHIP',
  },
  {
    name: 'BAMBU LAB P1S',
    count: 6,
    description: 'Скоростные закрытые кубы. Работают 24/7.',
    purpose: 'Основной объем заказов (ABS, PETG). Печать до 4 цветов (AMS).',
    imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab6245b0264?q=80&w=1000&auto=format&fit=crop',
    badge: 'WORKHORSE',
  },
  {
    name: 'BAMBU LAB A1',
    count: 2,
    description: 'Открытые системы для экологичных пластиков.',
    purpose: 'Быстрая печать PLA/PETG. Декор, игрушки, макеты.',
    imageUrl: 'https://images.unsplash.com/photo-1504270997636-07ddfbd48945?q=80&w=1000&auto=format&fit=crop',
  },
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    title: 'Шестерня для станка',
    material: 'Nylon',
    imageUrl: 'https://images.unsplash.com/photo-1565043589221-1a6fd49745ea?q=80&w=800&auto=format&fit=crop',
    category: 'Industrial',
  },
  {
    title: 'Корпус прибора (50 шт)',
    material: 'PETG',
    imageUrl: 'https://images.unsplash.com/photo-1617791160588-241658c0f566?q=80&w=800&auto=format&fit=crop',
    category: 'Prototyping',
  },
  {
    title: 'Дизайнерская лампа Wavy',
    material: 'PLA',
    imageUrl: 'https://images.unsplash.com/photo-1513506003013-d30628285511?q=80&w=800&auto=format&fit=crop',
    category: 'Design',
  },
  {
    title: 'Автозапчасть / Заглушка',
    material: 'ASA',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop',
    category: 'Automotive',
  },
  {
    title: 'Макет здания',
    material: 'PLA',
    imageUrl: 'https://images.unsplash.com/photo-1476973422084-e0fa66ff9456?q=80&w=800&auto=format&fit=crop',
    category: 'Architecture',
  },
];

export const FAQS: FAQItem[] = [
  {
    question: 'Как узнать точную цену?',
    answer: 'Пришлите нам 3D модель (STL/STEP). Мы загрузим её в слайсер и скажем точное время печати и стоимость.',
  },
  {
    question: 'Как быстро сделаете?',
    answer: 'Благодаря парку из 10 машин, небольшие заказы отдаем в день обращения. Партии — от 2 дней.',
  },
];