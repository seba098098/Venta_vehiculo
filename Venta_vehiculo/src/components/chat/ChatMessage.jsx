import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const ChatMessage = ({ message, onQuickAction }) => {
  const isBot = message.type === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div
        className={`
          max-w-[85%] rounded-2xl px-4 py-3
          ${isBot 
            ? 'bg-surface-light text-white rounded-tl-sm' 
            : 'bg-primary text-white rounded-tr-sm'
          }
        `}
      >
        <p className="text-sm leading-relaxed whitespace-pre-line">
          {message.text}
        </p>

        {message.quickActions && message.quickActions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.quickActions.map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onQuickAction(action)}
                className={`
                  px-3 py-1.5 text-xs font-medium rounded-full transition-all
                  ${action.includes('WhatsApp') 
                    ? 'bg-[#25D366] text-white hover:bg-[#20BD5A]' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                  }
                `}
              >
                {action.includes('WhatsApp') && (
                  <MessageCircle className="w-3 h-3 inline-block mr-1" />
                )}
                {action}
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
