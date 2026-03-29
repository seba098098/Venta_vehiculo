# Nissan X-Trail 2023 - Landing Page Premium

## 1. Concept & Vision

Landing page de alto impacto para la venta del Nissan X-Trail 2023 T30 AWD. La experiencia está diseñada para simular una conversación con un asesor virtual inteligente que guía al usuario desde el interés inicial hasta el agendamiento de una cita. El diseño transmite confianza, tecnología de vanguardia y exclusividad, evocando la sensación de estar en un concesionario premium pero desde la comodidad del celular.

## 2. Design Language

### Aesthetic Direction
Inspiración en concesionarios de lujo con interfaces dark mode premium. El vehículo es protagonista absoluto; el resto de elementos orbitan alrededor para no distraer. Referencias: Tesla configurator meets Mercedes-Benz digital experience.

### Color Palette
```css
--primary: #D4002A;        /* Nissan Red */
--primary-dark: #A80020;   /* Red hover */
--secondary: #1A1A1A;      /* Carbon Black */
--background: #0D0D0D;     /* Deep Black */
--surface: #1A1A1A;        /* Card Background */
--surface-light: #262626;  /* Elevated Surface */
--text-primary: #FFFFFF;    /* Primary Text */
--text-secondary: #A0A0A0;  /* Secondary Text */
--accent: #00D4AA;         /* Teal Accent (success/CTAs) */
--accent-glow: rgba(0, 212, 170, 0.3);
```

### Typography
- **Headings**: `Inter`, weight 700-800, tracking -0.02em
- **Body**: `Inter`, weight 400-500
- **Accent/Labels**: `JetBrains Mono` for specs and prices
- **Scale**: 14px base, 1.25 ratio

### Spatial System
- Base unit: 4px
- Section padding: 80px vertical (desktop), 48px (mobile)
- Card padding: 24px
- Component gaps: 16px-24px
- Max content width: 1280px

### Motion Philosophy
- **Micro-interactions**: 200ms ease-out para botones y hover
- **Transitions de sección**: 600ms ease-out con stagger de 100ms
- **Chat messages**: slide-in desde bottom con fade, 300ms
- **Lightbox**: scale desde thumbnail, 400ms spring
- **Typing indicator**: 3 puntos pulsando, 200ms cada uno
- **Scroll animations**: fade-up con Intersection Observer

### Visual Assets
- **Icons**: Lucide React (línea fina, consistente)
- **Imágenes**: Placeholders de Unsplash para demo, configurables
- **Decorativos**: Gradientes sutiles, glassmorphism en cards

## 3. Layout & Structure

### Page Architecture
```
┌─────────────────────────────────────────────┐
│ NAVBAR (fixed, blur backdrop)               │
│ Logo | Características | Galería | Contacto │
├─────────────────────────────────────────────┤
│ HERO SECTION                               │
│ Full viewport, imagen hero con overlay      │
│ Título + Precio + CTA principal              │
├─────────────────────────────────────────────┤
│ SPECS GRID (3 columnas)                     │
│ Año | Motor | Tracción | Kilometraje       │
├─────────────────────────────────────────────┤
│ FEATURES SECTION                            │
│ Grid de 6 beneficios con iconos             │
├─────────────────────────────────────────────┤
│ GALLERY SECTION                             │
│ Carrusel + Thumbnails + Lightbox            │
├─────────────────────────────────────────────┤
│ CHAT SECTION                                │
│ Panel flotante expandible                   │
├─────────────────────────────────────────────┤
│ FOOTER                                      │
│ Info del vendedor + WhatsApp directo        │
└─────────────────────────────────────────────┘
┌──────────────────┐
│ CHAT WIDGET      │ ← Fixed bottom-right
│ (Expandible)     │
└──────────────────┘
```

### Responsive Strategy
- **Desktop (1024px+)**: Layout completo, chat lateral
- **Tablet (768px-1023px)**: Grid adaptado, chat flotante
- **Mobile (<768px)**: Stack vertical, chat full-width cuando abierto

## 4. Features & Interactions

### 4.1 Galería de Imágenes
- **Carrusel principal**: Swipe/drag, autoplay cada 5s (pausado en hover)
- **Thumbnails**: 5 visibles, scroll horizontal
- **Lightbox**: Click en imagen abre modal fullscreen
- **Navegación lightbox**: Flechas + teclado + swipe
- **Contador**: "3/15" visible en lightbox

### 4.2 Chat Inteligente
**Triggers de respuesta (keywords)**:
- `precio` → "El precio es $105.000.000 COL. ¿Te gustaría conocer las opciones de financiación?"
- `características`, `equipo` → Lista de equipamiento completo
- `kilometraje`, `km` → "80.000 km, perfectamente mantenido"
- `motor`, `potencia` → Especificaciones del motor
- `tracción`, `awd` → 4WD/AWD con explicacion
- `estado`, `condición` → Garantía y estado del vehículo
- `financiación`, `crédito` → Opciones de pago
- `ubicación`, `dirección` → Ubicación del concesionario
- `interesado`, `comprar`, `info` → Mostrar botón WhatsApp
- `agendar`, `cita`, `ver carro` → Iniciar flujo de agendamiento

**Estados del chat**:
1. Idle: Burbuja con icono de chat + tooltip "Chatea con nosotros"
2. Open: Panel expandido con historial
3. Typing: 3 puntos pulsando antes de respuesta
4. Input focus: Borde accent iluminado

### 4.3 Sistema de Agendamiento
**Flujo**:
1. Usuario dice "agendar"
2. Chat pide: Nombre
3. Chat pide: Teléfono
4. Chat pide: Fecha (date picker inline)
5. Chat pide: Hora (time slots predefinidos: 9:00, 10:00, 11:00, 14:00, 15:00, 16:00)
6. Confirmación con resumen
7. Botón "Confirmar por WhatsApp" + envío de email automático

### 4.4 Envío de Email (EmailJS)
- Template: Cita agendada
- Datos: Nombre, Teléfono, Fecha, Hora, Mensaje opcional
- Destinatario: Configurable en variables

### 4.5 Redirección WhatsApp
- URL: `https://wa.me/{NUMERO}?text={MENSAJE_ENCODED}`
- Mensajes predefinidos según contexto
- Botones con iconos de WhatsApp

## 5. Component Inventory

### Navbar
- **Default**: Fondo transparente, texto blanco
- **Scrolled**: Fondo blur dark, sombra sutil
- **Mobile**: Hamburger menu

### HeroSection
- **Background**: Imagen con gradient overlay oscuro
- **Content**: Título, subtítulo, precio badge, 2 CTAs
- **Animation**: Fade-in staggered en load

### SpecsCard
- **Default**: Icono + label + valor
- **Hover**: Elevación + glow sutil
- **Loading**: Skeleton pulse

### FeatureCard
- **Default**: Icono circular + título + descripción
- **Hover**: Scale 1.02 + shadow

### GalleryCarousel
- **Main image**: 16:9 ratio, object-cover
- **Thumbnails**: 80x60px, border accent on active
- **Navigation**: Chevron buttons + dots

### Lightbox
- **Overlay**: Black 95% opacity
- **Image**: Max 90vw/90vh, centered
- **Controls**: Close (X), prev/next, counter
- **Keyboard**: Esc close, arrows navigate

### ChatWidget
- **Closed**: FAB con icono mensaje + badge opcional
- **Open**: Panel 380px width, rounded, shadow-xl
- **Header**: Avatar + nombre + status + close button
- **Messages**: Scroll auto, date dividers  
- **Input**: Auto-grow textarea, send button

### ChatMessage
- **User**: Alineado derecha, fondo primary, texto blanco
- **Bot**: Alineado izquierda, fondo surface-light, texto blanco
- **With CTA**: Botón integrado en mensaje

### AppointmentForm
- **DatePicker**: Calendario inline, días disponibles highlighted
- **TimeSlots**: Pills horizontales, selected = accent
- **ConfirmButton**: Accent background, loading state

### Button
- **Primary**: Fondo accent, texto dark
- **Secondary**: Borde accent, fondo transparent
- **WhatsApp**: Verde WA con icono
- **States**: hover (brightness), active (scale), disabled (opacity), loading (spinner)

### Footer
- **Content**: Logo, links, contacto, social
- **WhatsApp CTA**: Sticky button móvil

## 6. Technical Approach

### Stack
- **Framework**: React 18 + Vite
- **Styling**: TailwindCSS 3.4
- **Animations**: Framer Motion
- **Email**: EmailJS (client-side)
- **Icons**: Lucide React
- **DatePicker**: react-day-picker

### Project Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── Specs.jsx
│   │   ├── Features.jsx
│   │   └── Gallery.jsx
│   ├── chat/
│   │   ├── ChatWidget.jsx
│   │   ├── ChatMessage.jsx
│   │   ├── ChatInput.jsx
│   │   └── AppointmentFlow.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Lightbox.jsx
│   │   └── DateTimePicker.jsx
│   └── VehicleCard.jsx
├── config/
│   └── vehicle.js
├── utils/
│   ├── chatEngine.js
│   ├── whatsapp.js
│   └── email.js
├── hooks/
│   └── useChat.js
├── App.jsx
├── index.css
└── main.jsx
```

### Configuration Variables
```js
// src/config/vehicle.js
export const VEHICLE = {
  brand: 'Nissan',
  model: 'X-Trail',
  year: 2023,
  version: 'T30 AWD',
  price: 105000000,
  mileage: 80000,
  motor: '2.5L 4 cilindros',
  potencia: '181 hp',
  traccion: 'AWD (All-Wheel Drive)',
  color: 'Plata Metálico',
  combustible: 'Gasolina',
  transmision: 'CVT Xtronic',
  extras: [...]
};

export const CONTACT = {
  whatsapp: '3106031601', // Solo números
  email: 'seba098098@gmail.com',
  emailJS: {
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY'
  },
  ubicacion: 'Transversal 1 via Sogamoso Tibasosa, Sogamoso',
  vendedor: 'Sebastian Alvarez Laverde'
};
```

### Chat Engine Logic
```js
const chatResponses = {
  keywords: {
    precio: ['precio', 'cuesta', 'costo', 'valor'],
    caracteristicas: ['característica', 'equipo', 'equipamiento', 'tiene'],
    // ... más keywords
  },
  responses: {
    precio: () => `El Nissan X-Trail 2023 T30 AWD tiene un precio de $${VEHICLE.price} COL...`,
    // ... más respuestas
  },
  actions: {
    whatsapp: ['interesado', 'comprar', 'info', 'hablar'],
    appointment: ['agendar', 'cita', 'ver carro', 'test drive']
  }
};
```

### API Endpoints (Backend - Opcional)
Si se requiere backend:
```
POST /api/send-email
Body: { name, phone, date, time, message }
Response: { success: boolean, message: string }
```

### Deployment
- Build: `npm run build`
- Preview: `npm run preview`
- Variables de entorno para producción

## 7. Estados y Edge Cases

### Chat
- **Empty state**: Mensaje de bienvenida con sugerencias
- **Loading**: Typing indicator mientras "procesa"
- **Error**: "Lo siento, no pude entender. ¿Puedes reformular?"
- **Empty input**: Botón disabled
- **Long message**: Auto-scroll al último mensaje

### Galería
- **Loading**: Skeleton con aspect ratio
- **Error imagen**: Placeholder con icono de foto
- **Single image**: Sin navegación

### Agendamiento
- **Fecha pasado**: Disabled
- **Horario completo**: Mostrar "No disponible"
- **Email error**: Mostrar error pero permitir WhatsApp

### Responsive
- **Touch devices**: Swipe gestures en carrusel
- **Keyboard navigation**: Tab order, focus visible
