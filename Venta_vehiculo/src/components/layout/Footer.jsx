import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { CONTACT, VEHICLE } from '../../config/vehicle';
import { openWhatsApp, MESSAGES } from '../../utils/whatsapp';

const Footer = () => {
  return (
    <footer id="contacto" className="bg-background border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <div>
                <span className="text-white font-bold text-xl">NISSAN</span>
                <span className="text-text-secondary text-xs block">{VEHICLE.brand} {VEHICLE.model} {VEHICLE.year}</span>
              </div>
            </div>
            
            <p className="text-text-secondary mb-6 max-w-md">
              Tu carro de confianza es la Nissan X-Trail 2023 T30 AWD. 
              Te Ofrecemos el mejor vehiculo y el mejores precio del mercado.
            </p>

            <Button 
              variant="whatsapp" 
              size="lg"
              icon={MessageCircle}
              onClick={() => openWhatsApp('interest')}
            >
              Escribir por WhatsApp
            </Button>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-text-secondary text-sm">
                  {CONTACT.ubicacion}<br />
                  {CONTACT.ciudad}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href={`tel:+${CONTACT.whatsapp}`} className="text-text-secondary text-sm hover:text-white transition-colors">
                  +{CONTACT.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href={`mailto:${CONTACT.email}`} className="text-text-secondary text-sm hover:text-white transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-text-secondary text-sm">
                  {CONTACT.horario}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Horario de Atención</h4>
            <div className="bg-surface rounded-xl p-4">
              <table className="w-full text-sm">
                <tbody className="text-text-secondary">
                  <tr className="border-b border-white/5">
                    <td className="py-2 text-white">Lunes - Viernes</td>
                    <td className="py-2 text-right">9:00 - 18:00</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 text-white">Sábado</td>
                    <td className="py-2 text-right">9:00 - 14:00</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-white">Domingo</td>
                    <td className="py-2 text-right text-primary">Cerrado</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <p className="text-text-secondary text-sm mb-2">Tu vendedor:</p>
              <p className="text-white font-medium">{CONTACT.vendedor}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-text-secondary text-sm">
              © {new Date().getFullYear()} Nissan {VEHICLE.model} {VEHICLE.year}. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-text-secondary">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-4 right-4 z-40"
      >
        <Button
          variant="whatsapp"
          icon={MessageCircle}
          onClick={() => openWhatsApp('interest')}
          className="shadow-lg"
        >
          ¿Interesado?
        </Button>
      </motion.div>
    </footer>
  );
};

export default Footer;
