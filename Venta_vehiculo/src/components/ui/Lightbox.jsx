import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrev();
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
        onClick={handleOverlayClick}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
        >
          <X className="w-8 h-8" />
        </button>

        <button
          onClick={onPrev}
          className="absolute left-4 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all z-10"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-[90vw] max-h-[85vh]"
        >
          <img
            src={images[currentIndex]?.url}
            alt={images[currentIndex]?.alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
          />
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full text-white/80 text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>

        <button
          onClick={onNext}
          className="absolute right-4 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all z-10"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/60 text-sm">
          Usa ← → para navegar, Esc para cerrar
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
