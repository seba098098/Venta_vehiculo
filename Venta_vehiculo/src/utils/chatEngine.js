import { VEHICLE, CONTACT } from '../config/vehicle';

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'COL',
    minimumFractionDigits: 0
  }).format(price);
};

const getExtrasList = () => {
  return VEHICLE.extras.map(e => `• ${e}`).join('\n');
};

const RESPONSES = {
  welcome: {
    text: `¡Hola! 👋 Soy tu asesor virtual para la Nissan X-Trail 2023 T30 AWD. 

Puedo ayudarte con:
• Información del vehículo
• Precio del vehiculo
• Agendar una cita

¿En qué puedo ayudarte hoy?`,
    quickActions: ['Precio', 'Características', 'Agendar cita', 'WhatsApp']
  },

  precio: {
    text: `💰 *Precio:* ${formatPrice(VEHICLE.price)} COl

Este precio incluye:
• Vehículo en excellent estado
• Documentación completa

*Se recibe efectivo o un vehiculo de menor o mayor valor *

te puedo ayudar tambien con `,
    quickActions: ['Características', 'Agendar cita', 'WhatsApp']
  },

  caracteristicas: {
    text: `🔧 *Especificaciones*

*Motor:* ${VEHICLE.motor}
*Potencia:* ${VEHICLE.potencia}
*Transmisión:* ${VEHICLE.transmision}
*Tracción:* ${VEHICLE.traccion}

*Dimensiones:*
• Largo: ${VEHICLE.dimensiones.largo}
• Ancho: ${VEHICLE.dimensiones.ancho}
• Alto: ${VEHICLE.dimensiones.alto}

*Equipamiento completo:*
${getExtrasList().substring(0, 300)}...`,
    quickActions: ['Equipamiento completo', 'Extras', 'Precio', 'Agendar cita']
  },

  equipamiento: {
    text: `✨ *Equipamiento Full*

${getExtrasList()}

¿Te gustaría ver el vehículo en persona? Puedo agendar una cita para que lo conozcas.`,
    quickActions: ['Agendar cita', 'Ver galería', 'WhatsApp']
  },

  kilometraje: {
    text: `📊 *Kilometraje:* ${VEHICLE.mileage.toLocaleString()} km

El vehículo se encuentra en ${VEHICLE.condicion}.

Todos los servicios han sido realizados en agencia con refacciones originales.`,
    quickActions: ['Estado del vehículo', 'Servicio', 'Agendar cita']
  },

  motor: {
    text: `⚡ *Motor:* ${VEHICLE.motor}

• Potencia: ${VEHICLE.potencia}
• Torque: ${VEHICLE.torque}

Excelente rendimiento combinando potencia y eficiencia de combustible.`,

    quickActions: ['Características', 'Consumo', 'Agendar cita']
  },

  traccion: {
    text: `🚗 *Sistema AWD Inteligente*

${VEHICLE.traccion}

Características:
• Cambio automático entre 2WD y AWD
• Tracción mejorada en superficies resbaladizas
• Modos de manejo: Auto, Sport, Off-road
• Altura de suspensión: ${VEHICLE.dimensiones.clearence}

Perfecto para cualquier condición de camino.`,
    quickActions: ['Características', 'Capacidad', 'Agendar cita']
  },

  estado: {
    text: `✅ *Estado del Vehículo*

${VEHICLE.condicion}

• Garantía: ${VEHICLE.garantia}
• Kilometraje verificado
• Todos los servicios al día
• Sin accidentes
• Sin deuda

¿Te gustaría venir a verificarlo personalmente?`,
    quickActions: ['Agendar cita', 'Galería', 'WhatsApp']
  },

  garantia: {
    text: `🛡️ *Garantía:* ${VEHICLE.garantia}

La garantía cubre:
• Motor y transmisión
• Sistema eléctrico
• Sistemas de seguridad

*Extensión de garantía disponible*
Pregunta por los planes extendidos.`,
    quickActions: ['Características', 'Precio', 'Agendar cita']
  },

  ubicacion: {
    text: `📍 *Ubicación:*

${CONTACT.ubicacion}
${CONTACT.ciudad}

*Horario:*
${CONTACT.horario}

Estamos a tus órdenes. ¿Te gustaría visitarnos?`,
    quickActions: ['Agendar cita', 'Cómo llegar', 'WhatsApp']
  },

  extras: {
    text: `🎁 *Equipamiento Extra Incluido*

${getExtrasList()}

Todo esto viene incluido en el precio listed. ¿Tienes alguna pregunta sobre algún accessory específico?`,
    quickActions: ['Equipamiento completo', 'Precio', 'Agendar cita']
  },

  asientos: {
    text: `👥 *Capacidad:* ${VEHICLE.capacidad.pasajeros} pasajeros

Distribución:
• 2 asientos delanteros
• 3 segunda fila (banqueta completa)
• 2 tercera fila (plegables)

*Cajuela:*
${VEHICLE.capacidad.cajuela}`,
    quickActions: ['Características', 'Dimensiones', 'Agendar cita']
  },

  default: {
    text: `🤖 Entiendo tu interés en la Nissan X-Trail 2023.

Puedo ayudarte con:
• Precio y financiación
• Características y equipamiento
• Agendar una cita
• Ubicación del concesionario

¿En qué tema te puedo ayudar?`,
    quickActions: ['Precio', 'Características', 'Agendar cita', 'WhatsApp']
  },

  greeting: {
    text: `¡Hola de nuevo! 👋 ¿En qué puedo ayudarte con la Nissan X-Trail 2023?`,
    quickActions: ['Precio', 'Características', 'Agendar cita', 'WhatsApp']
  },

  thanks: {
    text: `¡De nada! 😊 

Estoy aquí para cualquier otra pregunta. ¿Hay algo más que te gustaría saber?`,
    quickActions: ['Agendar cita', 'WhatsApp', 'Cerrar']
  },

  goodbye: {
    text: `¡Hasta luego! 👋 

Fue un placer ayudarte. Si tienes más preguntas, no dudes en volver.

¡Que tengas un excelente día! 🚗`,
    quickActions: []
  }
};

const ACTION_PATTERNS = {
  whatsapp: ['whatsapp', 'hablar', 'contacto', 'llamar', 'teléfono', 'comunicarme'],
  appointment: ['agendar', 'cita', 'ver', 'test drive', 'conocer', 'visitar', 'revisar', 'probar', 'manejarla'],
  thanks: ['gracias', 'agradezco', 'excelente', 'perfecto', 'genial'],
  goodbye: ['adiós', 'hasta luego', 'chao', 'nos vemos', 'hasta pronto'],
  greeting: ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'que tal', 'saludos']
};

const KEYWORD_RESPONSES = {
  precio: ['precio', 'cuesta', 'costo', 'valor', 'cuánto', 'cuanto sale', 'caro', 'barato'],
  financiacion: ['financiación', 'financiar', 'crédito', 'préstamo', 'mensualidad', 'enganche', 'pagos', 'abono'],
  caracteristicas: ['característica', 'características', 'equipo', 'equipamiento', 'specs', 'especificación', 'especificaciones'],
  equipamiento: ['equipamiento', 'extra', 'extras', 'accesorios', 'incluye', 'viene con'],
  kilometraje: ['kilometraje', 'km', 'recorrido', 'uso', 'kilómetros'],
  motor: ['motor', 'potencia', 'hp', 'caballos', 'cilindros', 'cc', 'rendimiento'],
  traccion: ['tracción', 'awd', '4x4', '4wd', 'fwd', 'todoterreno', 'off-road'],
  estado: ['estado', 'condición', 'condiciones', 'cómo está', 'condiciones'],
  garantia: ['garantía', 'garantia', 'cobertura', 'respaldar'],
  ubicacion: ['ubicación', 'dirección', 'donde están', 'dónde están', 'ciudad', 'localización', 'llegar'],
  extras: ['extra', 'extras', 'más incluye', 'además'],
  asientos: ['asientos', 'pasajeros', 'capacidad', 'personas', 'cajuela', 'baúl', 'espacio']
};

export const getResponse = (userMessage) => {
  const message = userMessage.toLowerCase().trim();

  for (const [action, patterns] of Object.entries(ACTION_PATTERNS)) {
    if (patterns.some(p => message.includes(p))) {
      return { action, ...RESPONSES[action] };
    }
  }

  for (const [responseKey, keywords] of Object.entries(KEYWORD_RESPONSES)) {
    if (keywords.some(k => message.includes(k))) {
      return { action: 'respond', ...RESPONSES[responseKey] };
    }
  }

  return { action: 'respond', ...RESPONSES.default };
};

export const getWelcomeMessage = () => RESPONSES.welcome;

export const shouldShowWhatsAppButton = (action) => {
  return ['whatsapp', 'appointment'].includes(action);
};

export const shouldStartAppointment = (action) => {
  return action === 'appointment';
};

export default { getResponse, getWelcomeMessage, shouldShowWhatsAppButton, shouldStartAppointment };
