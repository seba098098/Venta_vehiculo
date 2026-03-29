import { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { openWhatsApp, MESSAGES } from '../../utils/whatsapp';

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#caracteristicas', label: 'Características' },
  { href: '#galeria', label: 'Galería' },
  { href: '#beneficios', label: 'Beneficios' },
  { href: '#contacto', label: 'Contacto' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const sectionId = link.href.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        sectionRefs.current[sectionId] = element;
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`
        fixed top-0 left-0 right-0 z-40 transition-all duration-300
        ${isScrolled 
          ? 'bg-background/95 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <span className="text-white font-bold text-lg">NISSAN</span>
              <span className="text-text-secondary text-xs block">Venta directa</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`
                    relative px-4 py-2 text-sm font-medium transition-all duration-300
                    ${isActive 
                      ? 'text-white' 
                      : 'text-text-secondary hover:text-white'
                    }
                  `}
                >
                  {link.label}
                  <span 
                    className={`
                      absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-accent transition-all duration-300
                      ${isActive ? 'w-6' : 'w-0'}
                    `}
                  />
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="whatsapp" 
              size="sm"
              icon={Phone}
              onClick={() => openWhatsApp('general')}
            >
              Contactar
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                      ${isActive 
                        ? 'bg-accent/10 text-accent' 
                        : 'text-text-secondary hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    <span 
                      className={`
                        w-1.5 h-1.5 rounded-full transition-all
                        ${isActive ? 'bg-accent' : 'bg-transparent'}
                      `}
                    />
                    {link.label}
                  </a>
                );
              })}
              <div className="pt-4">
                <Button 
                  variant="whatsapp" 
                  size="md"
                  icon={Phone}
                  onClick={() => {
                    openWhatsApp('general');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Contactar por WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className={`
          hidden md:block absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent transition-opacity duration-300
          ${isScrolled ? 'opacity-100' : 'opacity-0'}
        `}
      />
    </motion.nav>
  );
};

export default Navbar;
