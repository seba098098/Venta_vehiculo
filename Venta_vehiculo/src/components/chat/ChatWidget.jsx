import { useState, useEffect } from 'react';
import { X, MessageCircle, Bot, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import DateTimePicker from './DateTimePicker';
import { useChat } from '../../hooks/useChat';
import { openWhatsApp, MESSAGES } from '../../utils/whatsapp';
import { sendAppointmentEmail } from '../../utils/email';
import { CONTACT } from '../../config/vehicle';

const ChatWidget = () => {
  const {
    messages,
    isTyping,
    isOpen,
    messagesEndRef,
    toggleChat,
    handleSendMessage,
    handleQuickAction,
    confirmAppointment,
    appointmentData,
    appointmentStep
  } = useChat();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleActionClick = (action) => {
    if (action === 'Continuar por WhatsApp') {
      openWhatsApp('interest');
      return;
    }
    if (action === 'Confirmar por WhatsApp') {
      openWhatsApp('appointment', appointmentData);
      return;
    }
    if (action === 'Confirmar cita') {
      handleQuickAction(action);
      return;
    }
    if (action === 'Corregir datos') {
      handleQuickAction(action);
      return;
    }
    handleQuickAction(action);
  };

  const handleDateSelect = (selection) => {
    handleSendMessage(`${selection.date} a las ${selection.time}`);
    setShowDatePicker(false);
  };

  useEffect(() => {
    if (appointmentStep === 'date' && !showDatePicker) {
      setShowDatePicker(true);
    }
  }, [appointmentStep, showDatePicker]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-4 w-[380px] h-[600px] max-h-[calc(100vh-120px)] bg-secondary rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-white/10"
          >
            <div className="flex items-center justify-between p-4 bg-surface-light border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Asesor Virtual</h3>
                  <p className="text-xs text-accent">En línea</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 chat-scroll">
              {messages.map((message) => (
                <div key={message.id}>
                  {message.action === 'appointment' && showDatePicker && appointmentStep === 'date' ? (
                    <div className="mb-4">
                      <ChatMessage 
                        message={message} 
                        onQuickAction={handleActionClick}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4"
                      >
                        <DateTimePicker onSelect={handleDateSelect} />
                      </motion.div>
                    </div>
                  ) : message.action === 'confirm' ? (
                    <div className="mb-4">
                      <ChatMessage 
                        message={message} 
                        onQuickAction={handleActionClick}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4"
                      >
                        <button
                          onClick={async () => {
                            const result = await sendAppointmentEmail({
                              name: appointmentData.name,
                              phone: appointmentData.phone,
                              date: appointmentData.date,
                              time: appointmentData.time,
                              message: 'Cita agendada desde landing page'
                            });
                            confirmAppointment();
                          }}
                          className="w-full py-3 bg-accent text-background font-semibold rounded-xl hover:bg-accent-dark transition-colors"
                        >
                          Confirmar y Enviar Email
                        </button>
                      </motion.div>
                    </div>
                  ) : (
                    <ChatMessage 
                      message={message} 
                      onQuickAction={handleActionClick}
                    />
                  )}
                </div>
              ))}
              
              {isTyping && <TypingIndicator />}
              
              <div ref={messagesEndRef} />
            </div>

            <ChatInput 
              onSend={handleSendMessage} 
              disabled={isTyping || showDatePicker}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className={`
          fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-lg z-50
          flex items-center justify-center transition-all
          ${isOpen 
            ? 'bg-surface-light hover:bg-surface' 
            : 'bg-primary hover:bg-primary-dark glow-red'
          }
        `}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed bottom-20 right-4 bg-surface-light px-4 py-2 rounded-lg shadow-lg z-40 hidden md:block"
        >
          <p className="text-sm text-white">¿Tienes preguntas? <span className="text-accent">Chatea con nosotros</span></p>
        </motion.div>
      )}
    </>
  );
};

export default ChatWidget;
