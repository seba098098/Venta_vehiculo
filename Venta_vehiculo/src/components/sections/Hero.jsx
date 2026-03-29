import { motion } from 'framer-motion';
import { ChevronDown, MessageCircle, Calendar } from 'lucide-react';
import Button from '../ui/Button';
import { VEHICLE } from '../../config/vehicle';
import { openWhatsApp, MESSAGES } from '../../utils/whatsapp';

const Hero = () => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'COL',
      minimumFractionDigits: 0
    }).format(price);
  };

  const scrollToGallery = () => {
    const element = document.querySelector('#galeria');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/img/nissan3.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full mb-6">
              Año {VEHICLE.year} • Segundo Dueño
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4"
          >
            <span className="text-primary">{VEHICLE.brand}</span> {VEHICLE.model}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-text-secondary mb-8"
          >
            {VEHICLE.version} • Full Equipo
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-block bg-surface/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8"
          >
            <p className="text-text-secondary text-sm mb-2">Precio de lista</p>
            <p className="text-4xl md:text-5xl font-bold text-white font-mono">
              {formatPrice(VEHICLE.price)}
            </p>
            <p className="text-accent text-sm mt-2">COL • {VEHICLE.mileage.toLocaleString()} km</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              variant="whatsapp" 
              size="lg"
              icon={MessageCircle}
              onClick={() => openWhatsApp('interest')}
              className="w-full sm:w-auto"
            >
              Me interesa
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              icon={Calendar}
              onClick={() => {
                document.querySelector('#caracteristicas')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto"
            >
              Conocer más
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16"
          >
            <button
              onClick={scrollToGallery}
              className="text-text-secondary hover:text-white transition-colors animate-bounce"
            >
              <ChevronDown className="w-8 h-8" />
            </button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
