export const VEHICLE = {
  brand: 'Nissan',
  model: 'X-Trail',
  year: 2023,
  version: 'T30 AWD',
  price: 105000000,
  mileage: 80000,
  motor: '2.5L 4 cilindros',
  potencia: '181 hp @ 6,000 rpm',
  torque: '181 lb-ft @ 3,600 rpm',
  traccion: 'AWD (All-Wheel Drive) inteligente',
  color: 'Plata Metálico',
  combustible: 'Gasolina',
  transmision: 'CVT Xtronic con modo Sport',
  dimensiones: {
    largo: '4,680 mm',
    ancho: '1,840 mm',
    alto: '1,727 mm',
    batalla: '2,705 mm',  
    clearence: '208 mm'
  },
  capacidad: {
    pasajeros: 7,
    cajuela: '547L / 1,316L (asientos plegados)',
    tanque: '60 litros',
    remolque: '1,500 kg'
  },
  extras: [
    'Pantalla táctil 12.3"',
    'Sistema de sonido Bose premium',
    'Techo panorámico',
    'Asientos de cuero ventilados',
    'Cámara 360°',
    'Sensores de estacionamiento',
    'Control de crucero adaptativo',
    'Asistente de mantenimiento de carril',
    'Frenado automático de emergencia',
    'Detección de punto ciego',
    'Apple CarPlay / Android Auto',
    'Carga inalambrica',
    'Climatizador automático trizona',
    'Llantas de aleación 20"',
    'Faros LED adaptativos'
  ],
  garantia: '5 años o 100,000 km',
  condicion: 'Excelente estado, Segundo Dueño'
};

export const CONTACT = {
  whatsapp: '3106031601',
  email: 'seba098098@gmail.com',
  emailJS: {
    serviceId: 'service_xrail2023',
    templateId: 'template_appointment',
    publicKey: 'YOUR_PUBLIC_KEY'
  },
  ubicacion: 'Kilometro 1 via Sogamoso-Tibasosa',
  ciudad: 'Sogamoso-Boyaca',
  vendedor: 'Sebastian Alvarez Laverde',
  horario: 'Lun - Sáb: 9:00 - 18:00'
};

export const GALLERY_IMAGES = [
  { id: 1, url: '/img/nissan1.jpg', alt: 'Vista lateral atras derecho' },
  { id: 2, url: '/img/nissan2.jpg', alt: 'Vista lateral frente izquierdo' },
  { id: 3, url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800', alt: 'Vista posterior' },
  { id: 4, url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800', alt: 'Interior - Panel' },
  { id: 5, url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', alt: 'Interior - Asientos' },
  { id: 6, url: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800', alt: 'Consola central' },
  { id: 7, url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800', alt: 'Vista tres cuartos' },
  { id: 8, url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', alt: 'Ruedas' },
  { id: 9, url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800', alt: 'Detalle frontal' },
  { id: 10, url: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800', alt: 'Faros LED' },
  { id: 11, url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', alt: 'Vista nocturna' },
  { id: 12, url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800', alt: 'Cajuela abierta' },
  { id: 13, url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800', alt: 'Tercera fila asientos' },
  { id: 14, url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', alt: 'Modo off-road' },
  { id: 15, url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800', alt: 'Pantalla multimedia' }
];

export const FEATURES = [
  {
    icon: 'Shield',
    title: 'Seguridad Total',
    description: '7 airbags, sistema de frenado autónomo, asistente de mantenimiento de carril y monitor de presión de neumáticos.'
  },
  {
    icon: 'Mountain',
    title: 'Tracción AWD',
    description: 'Sistema inteligente de tracción en las cuatro ruedas para cualquier terreno y condición climática.'
  },
  {
    icon: 'Users',
    title: '7 Pasajeros',
    description: 'Capacidad para toda la familia con tercera fila reclinable y amplio espacio interior.'
  },
  {
    icon: 'Gauge',
    title: 'Potencia Excelente',
    description: 'Motor 2.5L con 181 hp, perfecto balance entre rendimiento y eficiencia de combustible.'
  },
  {
    icon: 'Smartphone',
    title: 'Conectividad',
    description: 'Pantalla táctil 12.3", Apple CarPlay, Android Auto y carga inalámbrica para dispositivos.'
  },
  {
    icon: 'Sparkles',
    title: 'Full Equipamiento',
    description: 'Techo panorámico, asientos de cuero ventilados, sonido Bose premium y climatizador trizona.'
  }
];
