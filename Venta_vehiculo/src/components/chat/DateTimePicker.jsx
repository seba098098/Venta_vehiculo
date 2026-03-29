import { useState } from 'react';
import { format, addDays, isBefore, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar, Clock, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const TIME_SLOTS = [
  { value: '9:00 AM', label: '9:00 AM' },
  { value: '10:00 AM', label: '10:00 AM' },
  { value: '11:00 AM', label: '11:00 AM' },
  { value: '2:00 PM', label: '2:00 PM' },
  { value: '3:00 PM', label: '3:00 PM' },
  { value: '4:00 PM', label: '4:00 PM' }
];

const DateTimePicker = ({ onSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const today = startOfDay(new Date());
  const maxDate = addDays(today, 60);

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const handleDateSelect = (date) => {
    if (!date || isBefore(date, today) || isBefore(maxDate, date)) return;
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onSelect({
        date: format(selectedDate, 'dd/MM/yyyy'),
        time: selectedTime
      });
    }
  };

  const prevMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    if (newMonth.getMonth() >= today.getMonth() || newMonth.getFullYear() > today.getFullYear()) {
      setCurrentMonth(newMonth);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isDateDisabled = (date) => {
    if (!date) return true;
    return isBefore(date, today) || isBefore(maxDate, date) || date.getDay() === 0;
  };

  const canGoPrevMonth = () => {
    const prevMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    return prevMonthDate.getMonth() >= today.getMonth() && prevMonthDate.getFullYear() >= today.getFullYear();
  };

  const isSelectionComplete = selectedDate && selectedTime;

  const days = getDaysInMonth();

  return (
    <div className="bg-surface rounded-2xl p-5 space-y-5 w-full max-w-sm mx-auto border border-white/10">
      <div className="flex items-center gap-3 pb-3 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h4 className="text-white font-semibold">Agenda tu cita</h4>
          <p className="text-text-secondary text-xs">Selecciona fecha y hora</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button 
          onClick={prevMonth} 
          disabled={!canGoPrevMonth()}
          className={`p-2 rounded-lg transition-colors ${canGoPrevMonth() ? 'hover:bg-white/10 text-white' : 'text-text-secondary/30 cursor-not-allowed'}`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold text-white text-base">
          {format(currentMonth, 'MMMM yyyy', { locale: es })}
        </span>
        <button 
          onClick={nextMonth} 
          className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-text-secondary mb-2">
        <span>Dom</span>
        <span>Lun</span>
        <span>Mar</span>
        <span>Mié</span>
        <span>Jue</span>
        <span>Vie</span>
        <span>Sáb</span>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const disabled = isDateDisabled(date);
          const isSelected = selectedDate && format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
          const isToday = format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');

          return (
            <button
              key={date.toISOString()}
              onClick={() => handleDateSelect(date)}
              disabled={disabled}
              className={`
                aspect-square rounded-lg text-sm font-medium transition-all
                ${disabled 
                  ? 'text-text-secondary/30 cursor-not-allowed' 
                  : 'hover:bg-white/10 text-white'
                }
                ${isSelected ? 'bg-accent text-background font-bold' : ''}
                ${isToday && !isSelected ? 'ring-1 ring-accent/50' : ''}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4 pt-4 border-t border-white/10"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent" />
            <span className="text-text-secondary text-sm">Selecciona una hora:</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot.value}
                onClick={() => handleTimeSelect(slot.value)}
                className={`
                  py-2.5 px-3 rounded-xl text-sm font-medium transition-all
                  ${selectedTime === slot.value 
                    ? 'bg-accent text-background font-semibold shadow-lg shadow-accent/20' 
                    : 'bg-white/5 text-white hover:bg-white/10'
                  }
                `}
              >
                {slot.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {isSelectionComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 pt-4 border-t border-white/10"
        >
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-4">
            <div className="flex items-center gap-2 text-accent mb-2">
              <Check className="w-5 h-5" />
              <span className="font-semibold">Cita seleccionada</span>
            </div>
            <div className="text-white space-y-1">
              <p className="font-medium">
                {format(selectedDate, 'dddd, dd MMMM', { locale: es })}
              </p>
              <p className="text-text-secondary text-sm">{selectedTime}</p>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full py-3.5 bg-accent text-background font-semibold rounded-xl hover:bg-accent-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
          >
            <span>Confirmar y continuar</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default DateTimePicker;
