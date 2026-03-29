import { useState } from 'react';
import { format, addDays, isBefore, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '2:00 PM', '3:00 PM', '4:00 PM'
];

const DateTimePicker = ({ onSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const today = startOfDay(new Date());
  const maxDate = addDays(today, 30);

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
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    if (selectedDate) {
      onSelect({
        date: format(selectedDate, 'dd/MM/yyyy'),
        time
      });
    }
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
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isDateDisabled = (date) => {
    return !date || isBefore(date, today) || isBefore(maxDate, date) || date.getDay() === 0;
  };

  const days = getDaysInMonth();

  return (
    <div className="bg-surface rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
          <ChevronLeft className="w-5 h-5 text-text-secondary" />
        </button>
        <span className="font-semibold text-white">
          {format(currentMonth, 'MMMM yyyy', { locale: es })}
        </span>
        <button onClick={nextMonth} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
          <ChevronRight className="w-5 h-5 text-text-secondary" />
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
                  : 'hover:bg-white/10'
                }
                ${isSelected ? 'bg-accent text-background' : 'text-white'}
                ${isToday && !isSelected ? 'border border-accent' : ''}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3 pt-4 border-t border-white/10"
        >
          <p className="text-sm text-text-secondary">Selecciona una hora:</p>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                className={`
                  py-2 px-3 rounded-lg text-sm font-medium transition-all
                  ${selectedTime === time 
                    ? 'bg-accent text-background' 
                    : 'bg-white/5 text-white hover:bg-white/10'
                  }
                `}
              >
                {time}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {selectedDate && selectedTime && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-4"
        >
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 text-sm">
            <p className="text-accent font-medium">Cita seleccionada:</p>
            <p className="text-white mt-1">
              📅 {format(selectedDate, 'dddd, dd MMMM', { locale: es })}
            </p>
            <p className="text-white">
              🕐 {selectedTime}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DateTimePicker;
