import { motion } from 'framer-motion';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4 px-4">
      <div className="bg-surface-light rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-text-secondary rounded-full"
            animate={{
              scale: [0.6, 1, 0.6],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TypingIndicator;
