import emailjs from '@emailjs/browser';
import { CONTACT } from '../config/vehicle';

const { serviceId, templateId, publicKey } = CONTACT.emailJS;

export const sendAppointmentEmail = async (appointmentData) => {
  const templateParams = {
    to_email: CONTACT.email,
    to_name: CONTACT.vendedor,
    from_name: appointmentData.name,
    phone: appointmentData.phone,
    date: appointmentData.date,
    time: appointmentData.time,
    message: appointmentData.message || 'Sin mensaje adicional',
    vehicle: `Nissan X-Trail 2023 T30 AWD`,
    timestamp: new Date().toLocaleString('es-MX', {
      timeZone: 'America/Mexico_City',
      dateStyle: 'full',
      timeStyle: 'short'
    })
  };

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );
    return { success: true, message: 'Email enviado correctamente', response };
  } catch (error) {
    console.error('Error enviando email:', error);
    return { success: false, message: 'Error al enviar el email', error };
  }
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export default { sendAppointmentEmail, validateEmail };
