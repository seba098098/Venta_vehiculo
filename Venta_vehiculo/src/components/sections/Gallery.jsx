import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_IMAGES } from '../../config/vehicle';

const DOUBLE_TAP_DELAY = 300;

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showZoomHint, setShowZoomHint] = useState(true);

  const thumbnailsRef = useRef(null);
  const lastTapRef = useRef(0);

  const isMobile = typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  // 🔥 Handler unificado (desktop + mobile)
  const handleImageInteraction = useCallback((e) => {
    const now = Date.now();

    if (isMobile) {
      // doble tap
      if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
        openLightbox(currentIndex);
        lastTapRef.current = 0;
      } else {
        lastTapRef.current = now;
      }
    } else {
      // doble click real
      if (e.detail === 2) {
        openLightbox(currentIndex);
      }
    }
  }, [currentIndex, isMobile]);

  useEffect(() => {
    const timer = setTimeout(() => setShowZoomHint(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const scrollThumbnails = (direction) => {
    if (thumbnailsRef.current) {
      thumbnailsRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth'
      });
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLightboxOpen) {
        if (e.key === 'Escape') setIsLightboxOpen(false);
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

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
          className="relative aspect-video rounded-2xl overflow-hidden bg-background group mx-auto max-w-5xl cursor-zoom-in"
          onClick={handleImageInteraction}
        >
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={GALLERY_IMAGES[currentIndex].url}
            alt={GALLERY_IMAGES[currentIndex].alt}
            className="w-full h-full object-cover"
          />

          {/* overlay FIX */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* botón zoom */}
          <button
            onClick={() => openLightbox(currentIndex)}
            className="absolute top-4 right-4 p-3 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 z-10"
          >
            <ZoomIn />
          </button>

          {/* navegación */}
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <ChevronLeft />
          </button>

          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
            <ChevronRight />
          </button>

          {/* hint */}
          {showZoomHint && (
            <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded text-white text-xs">
              {isMobile ? 'Doble tap para ampliar' : 'Doble clic para ampliar'}
            </div>
          )}

          {/* contador */}
          <div className="absolute bottom-4 right-4 bg-black/60 px-3 py-1 rounded text-white text-xs">
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

      {/* LIGHTBOX */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
            onClick={() => setIsLightboxOpen(false)}
          >
            <img
              src={GALLERY_IMAGES[currentIndex].url}
              className="max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;