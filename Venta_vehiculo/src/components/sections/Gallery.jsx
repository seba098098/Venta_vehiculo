import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_IMAGES } from '../../config/vehicle';

const DOUBLE_TAP_DELAY = 300;

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showZoomHint, setShowZoomHint] = useState(true);
  const [showControls, setShowControls] = useState(false);

  const thumbnailsRef = useRef(null);
  const lastTapRef = useRef(0);

  const isMobile =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  // 🔥 Mostrar controles temporalmente
  const triggerControls = () => {
    setShowControls(true);
    setTimeout(() => setShowControls(false), 3000);
  };

  // 🔥 doble click / doble tap
const handleImageInteraction = () => {
  setShowControls(true);
  setTimeout(() => setShowControls(false), 13000);
};

  useEffect(() => {
    const timer = setTimeout(() => setShowZoomHint(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section id="galeria" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Galería
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Imágenes del Vehículo
          </h2>
        </div>

        {/* IMAGEN PRINCIPAL */}
        <div
          className="relative aspect-video rounded-2xl overflow-hidden bg-background group mx-auto max-w-5xl cursor-pointer"
          onClick={handleImageInteraction}
        >
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={GALLERY_IMAGES[currentIndex].url}
            alt={GALLERY_IMAGES[currentIndex].alt}
            className="w-full h-full object-contain"     />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />

          {/* 🔥 CONTROLES CON DOBLE CLICK */}
          <AnimatePresence>
            {showControls && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/10 rounded-full text-white z-20"
                >
                  <ChevronLeft />
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/10 rounded-full text-white z-20"
                >
                  <ChevronRight />
                </motion.button>
              </>
            )}
          </AnimatePresence>

          {/* HINT */}
          {showZoomHint && (
            <div className="absolute bottom-4 left-4 bg-black/10 px-3 py-1 rounded text-white text-xs">
              {isMobile ? 'Doble tap para navegar' : 'Doble clic para navegar'}
            </div>
          )}

          {/* CONTADOR */}
          <div className="absolute bottom-4 right-4 bg-black/10 px-3 py-1 rounded text-white text-xs">
            {currentIndex + 1} / {GALLERY_IMAGES.length}
          </div>
        </div>

        {/* THUMBNAILS */}
        <div className="flex gap-3 mt-4 overflow-x-auto" ref={thumbnailsRef}>
          {GALLERY_IMAGES.map((img, index) => (
            <button key={img.id} onClick={() => goToSlide(index)}>
              <img
                src={img.url}
                className={`w-24 h-16 object-cover rounded ${
                  index === currentIndex ? 'ring-2 ring-accent' : 'opacity-60'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;