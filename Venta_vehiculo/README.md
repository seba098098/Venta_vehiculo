# Nissan X-Trail 2023 - Landing Page Premium

Landing page moderna e interactiva para la venta del Nissan X-Trail 2023 T30 AWD con chat inteligente, agendamiento de citas y integración con WhatsApp.

## Características

- **Galería de Imágenes**: Carrusel interactivo con 15+ imágenes y lightbox
- **Chat Inteligente**: Asesor virtual con respuestas automáticas
- **Sistema de Agendamiento**: Selector de fecha y hora integrado
- **Integración WhatsApp**: Redirección automática con mensajes predefinidos
- **Envío de Emails**: Confirmación automática vía EmailJS
- **Diseño Premium**: Dark mode con animaciones fluidas
- **Totalmente Responsive**: Optimizado para móvil, tablet y desktop

## Instalación

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Pasos

1. **Clonar el repositorio**
```bash
git clone <repo-url>
cd Venta_vehiculo
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables**

Edita `src/config/vehicle.js` con tu información:

```javascript
// Número de WhatsApp (solo números, con código de país)
whatsapp: '3106031601',

// Email del vendedor
email: 'seba098098@gmail.com',

// Configuración EmailJS (opcional)
emailJS: {
  serviceId: 'tu_service_id',
  templateId: 'tu_template_id', 
  publicKey: 'tu_public_key'
}
```

4. **Configurar EmailJS (opcional)**

Si deseas el envío automático de emails:

1. Crea una cuenta en [EmailJS](https://www.emailjs.com/)
2. Crea un servicio (Gmail, Outlook, etc.)
3. Crea un template con las variables:
   - `to_email` - Email del vendedor
   - `to_name` - Nombre del vendedor
   - `from_name` - Nombre del cliente
   - `phone` - Teléfono del cliente
   - `date` - Fecha de la cita
   - `time` - Hora de la cita
   - `vehicle` - Nombre del vehículo
   - `message` - Mensaje adicional

5. **Ejecutar en desarrollo**
```bash
npm run dev
```

6. **Build para producción**
```bash
npm run build
npm run preview
```

## Configuración del Vehículo

Edita `src/config/vehicle.js` para personalizar:

```javascript
export const VEHICLE = {
  brand: 'Nissan',
  model: 'X-Trail',
  year: 2023,
  version: 'T30 AWD',
  price: 105000000,              // Precio en COL
  mileage: 15000,            // Kilometraje
  motor: '2.5L 4 cilindros',
  // ... más especificaciones
};

export const GALLERY_IMAGES = [
  // URLs de imágenes (puedes usar Unsplash, tu servidor, etc.)
  { id: 1, url: 'https://...', alt: 'Descripción' },
  // ... más imágenes
];
```

## Integración con WhatsApp

Los mensajes se generan automáticamente según el contexto:

- **Interés general**: "Hola, estoy interesado en la Nissan X-Trail 2023..."
- **Agendamiento**: Incluye nombre, fecha y hora
- **Test drive**: Solicitud de cita

Para cambiar el número, edita `CONTACT.whatsapp` en `src/config/vehicle.js`.

## Tecnologías

- **React 18** - Framework UI
- **Vite** - Build tool
- **TailwindCSS** - Estilos
- **Framer Motion** - Animaciones
- **Lucide React** - Iconos
- **EmailJS** - Envío de emails (client-side)
- **date-fns** - Manipulación de fechas

## Estructura del Proyecto

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx       # Navegación
│   │   └── Footer.jsx       # Pie de página
│   ├── sections/
│   │   ├── Hero.jsx         # Sección principal
│   │   ├── Specs.jsx        # Especificaciones
│   │   ├── Features.jsx     # Beneficios
│   │   └── Gallery.jsx      # Galería de imágenes
│   ├── chat/
│   │   ├── ChatWidget.jsx   # Widget principal
│   │   ├── ChatMessage.jsx # Mensaje individual
│   │   ├── ChatInput.jsx   # Campo de texto
│   │   ├── TypingIndicator.jsx
│   │   └── DateTimePicker.jsx
│   └── ui/
│       ├── Button.jsx
│       └── Lightbox.jsx
├── config/
│   └── vehicle.js           # Configuración centralizada
├── utils/
│   ├── chatEngine.js        # Lógica del chat
│   ├── whatsapp.js          # Helpers de WhatsApp
│   └── email.js            # Envío de emails
├── hooks/
│   └── useChat.js          # Hook del chat
├── App.jsx
└── main.jsx
```

## Personalización

### Colores

Edita `tailwind.config.js`:

```javascript
colors: {
  primary: '#D4002A',     // Color principal (rojo Nissan)
  accent: '#00D4AA',     // Color de acento (verde)
  // ... más colores
}
```

### Fuentes

Las fuentes se cargan desde Google Fonts en `index.html`. Cambia los enlaces si deseas otras fuentes.

## Licencia

MIT License - Libre para uso comercial y personal.
