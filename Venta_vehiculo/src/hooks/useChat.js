import { useState, useCallback, useRef, useEffect } from 'react';
import { getResponse, getWelcomeMessage, shouldShowWhatsAppButton, shouldStartAppointment } from '../utils/chatEngine';

const INITIAL_MESSAGE = {
  id: 'welcome',
  type: 'bot',
  text: getWelcomeMessage().text,
  quickActions: getWelcomeMessage().quickActions,
  timestamp: new Date()
};

export const useChat = () => {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [appointmentStep, setAppointmentStep] = useState(null);
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    phone: '',
    date: '',
    time: ''
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, scrollToBottom]);

  const addMessage = useCallback((text, type = 'bot', quickActions = [], action = null) => {
    const newMessage = {
      id: Date.now().toString(),
      type,
      text,
      quickActions,
      action,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const simulateTyping = useCallback(() => {
    setIsTyping(true);
    return new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
  }, []);

  const handleSendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    addMessage(text, 'user');
    setIsTyping(true);

    await simulateTyping();

    const response = getResponse(text);

    setIsTyping(false);

    if (response.action === 'appointment' && !appointmentStep) {
      setAppointmentStep('name');
      addMessage(
        '¡Perfecto! Me encantaría agendar una cita para ti. 🇺🇸\n\nPrimero, ¿Cuál es tu nombre?',
        'bot',
        [],
        'appointment'
      );
      return;
    }

    if (appointmentStep) {
      handleAppointmentFlow(text, response);
      return;
    }

    const showWhatsApp = shouldShowWhatsAppButton(response.action);
    
    addMessage(
      response.text,
      'bot',
      showWhatsApp ? ['Continuar por WhatsApp'] : response.quickActions,
      response.action
    );
  }, [addMessage, simulateTyping, appointmentStep]);

  const handleAppointmentFlow = async (input, response) => {
    switch (appointmentStep) {
      case 'name':
        setAppointmentData(prev => ({ ...prev, name: input }));
        setAppointmentStep('phone');
        addMessage(
          `¡Hola ${input}! 👋\n\nAhora necesito tu número de teléfono para contactarte.`,
          'bot',
          [],
          'appointment'
        );
        break;

      case 'phone':
        setAppointmentData(prev => ({ ...prev, phone: input }));
        setAppointmentStep('date');
        addMessage(
          'Perfecto. 📅\n\n¿Para qué fecha te gustaría agendar la cita? (DD/MM/AAAA)',
          'bot',
          [],
          'appointment'
        );
        break;

      case 'date':
        setAppointmentData(prev => ({ ...prev, date: input }));
        setAppointmentStep('time');
        addMessage(
          'Excelente. 🕐\n\n¿A qué hora prefieres?\n\nNuestros horarios disponibles:\n• 9:00 AM\n• 10:00 AM\n• 11:00 AM\n• 2:00 PM\n• 3:00 PM\n• 4:00 PM',
          'bot',
          [],
          'appointment'
        );
        break;

      case 'time':
        setAppointmentData(prev => ({ ...prev, time: input }));
        await simulateTyping();
        setAppointmentStep('confirm');
        
        const { name, phone, date, time } = { ...appointmentData, time: input };
        
        addMessage(
          `¡Listo! Tu cita está por confirmarse. 📝\n\n*Resumen:*\n• Nombre: ${name}\n• Teléfono: ${phone}\n• Fecha: ${date}\n• Hora: ${time}\n\n¿Confirmas la cita?`,
          'bot',
          ['Confirmar cita', 'Corregir datos'],
          'confirm'
        );
        break;

      default:
        addMessage(response.text, 'bot', response.quickActions);
    }
  };

  const handleQuickAction = useCallback(async (action) => {
    let message = '';
    
    switch (action) {
      case 'Precio':
        message = 'precio';
        break;
      case 'Características':
        message = 'características';
        break;
      case 'Equipamiento completo':
        message = 'equipamiento';
        break;
      case 'Agendar cita':
        message = 'agendar';
        break;
      case 'WhatsApp':
        message = 'whatsapp';
        break;
      case 'Financiación':
        message = 'financiación';
        break;
      case 'Continuar por WhatsApp':
        return 'openWhatsApp';
      case 'Confirmar cita':
        return 'confirmAppointment';
      case 'Corregir datos':
        setAppointmentStep('name');
        setAppointmentData({ name: '', phone: '', date: '', time: '' });
        addMessage(
          'Entendido, volvamos a empezar. 🇺🇸\n\n¿Cuál es tu nombre?',
          'bot',
          [],
          'appointment'
        );
        return;
      default:
        message = action.toLowerCase();
    }

    handleSendMessage(message);
  }, [handleSendMessage, addMessage]);

  const confirmAppointment = useCallback(() => {
    setAppointmentStep('completed');
    addMessage(
      `¡Cita confirmada! 🎉\n\nTe esperamos el ${appointmentData.date} a las ${appointmentData.time}.\n\nTe recomiendo confirmar por WhatsApp para recibir un recordatorio.`,
      'bot',
      ['Confirmar por WhatsApp'],
      'completed'
    );
  }, [appointmentData, addMessage]);

  const resetAppointment = useCallback(() => {
    setAppointmentStep(null);
    setAppointmentData({ name: '', phone: '', date: '', time: '' });
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    messages,
    isTyping,
    isOpen,
    messagesEndRef,
    toggleChat,
    handleSendMessage,
    handleQuickAction,
    confirmAppointment,
    resetAppointment,
    appointmentData,
    appointmentStep
  };
};

export default useChat;
