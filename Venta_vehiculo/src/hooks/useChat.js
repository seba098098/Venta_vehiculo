import { useState, useCallback, useRef, useEffect } from 'react';
import { getResponse, getWelcomeMessage, shouldShowWhatsAppButton } from '../utils/chatEngine';

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
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
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
        '¡Perfecto! Me encantaría agendar una cita para ti.\n\nPrimero, ¿Cuál es tu nombre?',
        'bot',
        [],
        'appointment_name'
      );
      return;
    }

    if (appointmentStep) {
      handleAppointmentFlow(text);
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

  const handleAppointmentFlow = useCallback((input) => {
    switch (appointmentStep) {
      case 'name':
        setAppointmentData(prev => ({ ...prev, name: input }));
        setAppointmentStep('phone');
        addMessage(
          `¡Hola ${input}!\n\nAhora necesito tu número de teléfono para contactarte.`,
          'bot',
          [],
          'appointment_phone'
        );
        break;

      case 'phone':
        setAppointmentData(prev => ({ ...prev, phone: input }));
        setAppointmentStep('calendar');
        addMessage(
          'Perfecto.\n\nSelecciona la fecha y hora para tu cita.',
          'bot',
          [],
          'appointment_calendar'
        );
        break;

      default:
        break;
    }
  }, [appointmentStep, addMessage]);

  const handleDateTimeSelection = useCallback((date, time) => {
    setAppointmentData(prev => ({ ...prev, date, time }));
    setAppointmentStep('confirm');
    
    addMessage(
      `¡Listo! Tu cita está por confirmarse.\n\n*Resumen:*\n• Nombre: ${appointmentData.name}\n• Teléfono: ${appointmentData.phone}\n• Fecha: ${date}\n• Hora: ${time}`,
      'bot',
      [],
      'appointment_confirm'
    );
  }, [addMessage, appointmentData]);

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
      case 'Corregir datos':
        setAppointmentStep('name');
        setAppointmentData({ name: '', phone: '', date: '', time: '' });
        addMessage(
          'Entendido, volvamos a empezar.\n\n¿Cuál es tu nombre?',
          'bot',
          [],
          'appointment_name'
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
      `¡Cita confirmada!\n\nTe esperamos el ${appointmentData.date} a las ${appointmentData.time}.\n\n¡Hasta pronto!`,
      'bot',
      [],
      'completed'
    );
  }, [appointmentData, addMessage]);

  const getAppointmentData = useCallback(() => appointmentData, [appointmentData]);

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
    handleDateTimeSelection,
    confirmAppointment,
    getAppointmentData,
    resetAppointment,
    appointmentData,
    appointmentStep
  };
};

export default useChat;
