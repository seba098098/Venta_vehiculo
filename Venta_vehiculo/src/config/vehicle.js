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
    'Asientos de tela',
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
  whatsapp: '573106031601',
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
  { id: 3, url: '/img/nissan3.jpg', alt: 'Vista posterior' },
  { id: 4, url: '/img/nissan4.jpg', alt: 'Vista lateral frente Izquierda' },
  { id: 5, url: '/img/nissan5.jpg', alt: 'Vista posterior izquierda' },
  { id: 6, url: '/img/nissan6.jpg', alt: 'Consola central' },
  { id: 7, url: '/img/nissan7.jpg', alt: 'Vista tres cuartos' },
  { id: 8, url: '/img/nissan8.jpg', alt: 'Ruedas' },
  { id: 9, url: '/img/nissan9.jpg', alt: 'Detalle frontal' },
  { id: 10, url: '/img/nissan10.jpg', alt: 'Faros LED' }
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
    description: 'Techo panorámico, asientos de tela ventilados, sonido Bose premium y climatizador trizona.'
  }
];
