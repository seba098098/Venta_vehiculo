import { CONTACT, VEHICLE } from '../config/vehicle';

export const generateWhatsAppUrl = (message) => {
  const phone = CONTACT.whatsapp.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
};

export const MESSAGES = {
  interest: `Hola, estoy interesado en la Nissan X-Trail 2023 T30 AWD que vi en su página web. ¿Podrían darme más información?`,
  
  appointment: (data) => `Hola, ya agendé una cita para ver la Nissan X-Trail 2023:

📋 *Datos de la cita:*
• Nombre: ${data.name}
• Teléfono: ${data.phone}
• Fecha: ${data.date}
• Hora: ${data.time}

Quedo atento a la confirmación.`,

  testDrive: `Hola, me gustaría agendar un test drive para la Nissan X-Trail 2023. ¿Cuáles son los horarios disponibles?`,
  
  financing: `Hola, me interesa conocer las opciones de financiación para la Nissan X-Trail 2023. ¿Podrían mostrarme los planes disponibles?`,

  general: `Hola, tengo una consulta sobre la Nissan X-Trail 2023.`
};

export const openWhatsApp = (messageType, customData = null) => {
  let message;
  
  if (typeof messageType === 'string' && MESSAGES[messageType]) {
    message = customData ? MESSAGES[messageType](customData) : MESSAGES[messageType];
  } else {
    message = messageType;
  }
  
  const url = generateWhatsAppUrl(message);
  window.open(url, '_blank');
};

export default { generateWhatsAppUrl, openWhatsApp, MESSAGES };
