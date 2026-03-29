import { motion } from 'framer-motion';
import { Shield, Mountain, Users, Gauge, Smartphone, Sparkles, ArrowRight } from 'lucide-react';
import { FEATURES } from '../../config/vehicle';

const iconMap = {
  Shield,
  Mountain,
  Users,
  Gauge,
  Smartphone,
  Sparkles
};

const Features = () => {
  return (
    <section id="beneficios" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
            Por qué elegirlo
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Beneficios Exclusivos
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Más que un vehículo, te oferecemos una experiencia completa
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || Shield;
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group bg-surface rounded-2xl p-6 border border-white/5 hover:border-accent/30 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-7 h-7 text-accent" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-text-secondary text-sm leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-4 flex items-center text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Saber más</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary/20 via-surface to-accent/20 rounded-2xl p-8 md:p-12 border border-white/5"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Equipamiento Incluido
              </h3>
              <p className="text-text-secondary">
                {FEATURES.length * 2}+ características premium en tu nuevo vehículo
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {FEATURES.slice(0, 4).map((f, i) => (
                <span 
                  key={i}
                  className="px-4 py-2 bg-surface rounded-full text-sm text-white"
                >
                  {f.title}
                </span>
              ))}
              <span className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium">
                +11 más
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
