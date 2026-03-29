import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ onSend, disabled }) => {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSend(value.trim());
      setValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-3 border-t border-white/10">
      <textarea
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe un mensaje..."
        disabled={disabled}
        rows={1}
        className="
          flex-1 bg-surface-light rounded-xl px-4 py-3 text-sm text-white
          placeholder:text-text-secondary resize-none
          focus:outline-none focus:ring-2 focus:ring-accent/50
          disabled:opacity-50 transition-all
        "
      />
      <button
        type="submit"
        disabled={!value.trim() || disabled}
        className="
          p-3 rounded-xl bg-accent text-background
          hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
        "
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
};

export default ChatInput;
