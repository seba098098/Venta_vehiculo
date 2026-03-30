import { useState, useEffect, useRef, useCallback } from "react";
import { X, MessageCircle, ArrowRight, Check, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { useChat } from "../../hooks/useChat";
import { openWhatsApp } from "../../utils/whatsapp";

// Horarios disponibles
const TIME_SLOTS = [
  { value: "9:00 AM", label: "9:00 AM" },
  { value: "10:00 AM", label: "10:00 AM" },
  { value: "11:00 AM", label: "11:00 AM" },
  { value: "2:00 PM", label: "2:00 PM" },
  { value: "3:00 PM", label: "3:00 PM" },
  { value: "4:00 PM", label: "4:00 PM" },
];

// Componente interno del calendario
const DateTimePickerInline = ({
  onSelect,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfDay(new Date());
  const maxDate = addDays(today, 60);

  const getDaysInMonth = useCallback(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    for (let i = 1; i <= lastDay.getDate(); i++)
      days.push(new Date(year, month, i));
    return days;
  }, [currentMonth]);

  const isDateDisabled = useCallback(
    (date) => {
      if (!date) return true;
      return isBefore(date, today) || isBefore(maxDate, date) || date.getDay() === 0;
    },
    [today, maxDate]
  );

  const canGoPrevMonth = useCallback(() => {
    const prevMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    return (
      prevMonthDate.getMonth() >= today.getMonth() &&
      prevMonthDate.getFullYear() >= today.getFullYear()
    );
  }, [currentMonth, today]);

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onSelect({ date: format(selectedDate, "dd/MM/yyyy"), time: selectedTime });
    }
  };

  const days = getDaysInMonth();
  const isComplete = selectedDate && selectedTime;

  return (
    <div className="bg-surface rounded-2xl p-3 md:p-4 space-y-3 md:space-y-4 w-full border border-white/10 select-none">
      {/* Header Mes */}
      <div className="flex items-center justify-between">
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
            )
          }
          disabled={!canGoPrevMonth()}
          className={`p-1.5 md:p-2 rounded-lg transition-all active:scale-90 ${
            canGoPrevMonth()
              ? "hover:bg-white/10 text-white"
              : "text-text-secondary/30 cursor-not-allowed"
          }`}
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-semibold text-white text-sm md:text-base">
          {format(currentMonth, "MMMM yyyy", { locale: es })}
        </span>
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
            )
          }
          className="p-1.5 md:p-2 rounded-lg hover:bg-white/10 text-white transition-all active:scale-90"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Días semana */}
      <div className="grid grid-cols-7 gap-0.5 md:gap-1 text-center text-xs text-text-secondary">
        <span>Dom</span>
        <span>Lun</span>
        <span>Mar</span>
        <span>Mié</span>
        <span>Jue</span>
        <span>Vie</span>
        <span>Sáb</span>
      </div>

      {/* Días mes */}
      <div className="grid grid-cols-7 gap-0.5 md:gap-1" style={{ touchAction: "manipulation" }}>
        {days.map((date, index) => {
          if (!date) return <div key={`empty-${index}`} className="aspect-square" />;
          const disabled = isDateDisabled(date);
          const isSelected = selectedDate && format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
          const isToday = format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
          return (
            <button
              key={date.toISOString()}
              onClick={() => !disabled && onDateSelect(date)}
              className={`
                aspect-square rounded-lg text-xs md:text-sm font-medium transition-all active:scale-90
                ${disabled ? "text-text-secondary/30 cursor-not-allowed" : "text-white active:bg-white/20"}
                ${isSelected ? "bg-accent text-background font-bold" : ""}
                ${isToday && !isSelected ? "ring-1 ring-accent/50 ring-inset" : ""}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Selección de hora */}
      {selectedDate && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2 pt-3 border-t border-white/10">
          <div className="flex items-center gap-2 text-text-secondary text-xs md:text-sm">
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Selecciona una hora:</span>
          </div>
          <div className="grid grid-cols-3 gap-1 md:gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot.value}
                onClick={() => onTimeSelect(slot.value)}
                className={`
                  py-2 px-1 md:py-2.5 md:px-2 rounded-lg text-xs md:text-sm font-medium transition-all active:scale-95
                  ${selectedTime === slot.value ? "bg-accent text-background font-semibold" : "bg-white/5 text-white active:bg-white/10"}
                `}
              >
                {slot.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Confirmar cita */}
      {selectedDate && selectedTime && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-3 border-t border-white/10">
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-3 mb-3">
            <div className="flex items-center gap-2 text-accent text-xs md:text-sm mb-1">
              <Check className="w-4 h-4" />
              <span className="font-semibold">Cita seleccionada</span>
            </div>
            <p className="text-white text-sm md:text-base font-medium">
              {format(selectedDate, "dddd, dd MMMM", { locale: es })}
            </p>
            <p className="text-text-secondary text-xs md:text-sm">{selectedTime}</p>
          </div>
          <button
            onClick={() => onSelect({ date: format(selectedDate, "dd/MM/yyyy"), time: selectedTime })}
            className="w-full py-3 bg-accent text-background font-semibold rounded-xl hover:bg-accent-dark active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm md:text-base"
          >
            <span>Confirmar y continuar</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

// -------------------- CHAT WIDGET --------------------
const ChatWidget = () => {
  const {
    messages,
    isTyping,
    isOpen,
    toggleChat,
    handleSendMessage,
    handleQuickAction,
    handleDateTimeSelection,
    appointmentData,
    appointmentStep,
    messagesEndRef
  } = useChat();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (appointmentStep === "calendar" && !showDatePicker) {
      setShowDatePicker(true);
      setSelectedDate(null);
      setSelectedTime(null);
      setTimeout(() => {
        chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: "smooth" });
      }, 100);
    }
  }, [appointmentStep, showDatePicker]);

  const handleActionClick = (action) => {
    if (action === "Continuar por WhatsApp") {
      openWhatsApp("interest");
      return;
    }
    if (action === "Corregir datos") {
      handleQuickAction(action);
      setShowDatePicker(false);
      setSelectedDate(null);
      setSelectedTime(null);
      return;
    }
    handleQuickAction(action);
  };

  const handleDateSelect = (selection) => {
    setShowDatePicker(false);
    setTimeout(() => {
      handleDateTimeSelection(selection.date, selection.time);
      setTimeout(() => {
        openWhatsApp("appointment", {
          name: appointmentData.name,
          phone: appointmentData.phone,
          date: selection.date,
          time: selection.time,
        });
      }, 800);
    }, 300);
  };

  const shouldShowCalendar = appointmentStep === "calendar" && showDatePicker;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 left-4 right-4 h-[70vh] rounded-2xl 
            md:inset-auto md:bottom-28 md:right-4 md:left-auto md:w-[380px] md:h-[580px] 
            bg-secondary shadow-2xl flex flex-col overflow-hidden z-[9999] border border-white/10"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between p-3 md:p-4 bg-surface-light border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 md:w-6 md:h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm md:text-base">Asesor Virtual</h3>
                  <p className="text-xs text-accent">En línea</p>
                </div>
              </div>
              <button onClick={toggleChat} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            {/* CHAT MESSAGES */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-3 md:p-4 chat-scroll"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {messages.map((message, index) => {
                const isLastCalendarMsg =
                  message.action === "appointment_calendar" && index === messages.length - 1;
                return (
                  <div key={message.id}>
                    <ChatMessage message={message} onQuickAction={handleActionClick} />
                    {shouldShowCalendar && isLastCalendarMsg && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-3 md:mt-4">
                        <DateTimePickerInline
                          onSelect={handleDateSelect}
                          selectedDate={selectedDate}
                          selectedTime={selectedTime}
                          onDateSelect={setSelectedDate}
                          onTimeSelect={setSelectedTime}
                        />
                      </motion.div>
                    )}
                  </div>
                );
              })}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            <ChatInput onSend={handleSendMessage} disabled={isTyping || showDatePicker} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTÓN CHAT */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="fixed bottom-16 right-4 md:bottom-16 md:right-6 w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg z-[9999] flex items-center justify-center bg-primary text-white"
      >
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </motion.button>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ delay: 1 }}
        className="fixed bottom-16 right-20 md:bottom-16 md:right-24 z-[9999]"
      >
        <div className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl shadow-lg text-sm whitespace-nowrap relative border border-white/30">
          ¿Tienes alguna pregunta?

          {/* flechita */}
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45" />
        </div>
      </motion.div>

    </>
  );
};

export default ChatWidget;