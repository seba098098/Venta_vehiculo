import { motion } from 'framer-motion';
import { Calendar, Cpu, Gauge, Fuel, Users, Settings } from 'lucide-react';
import { VEHICLE } from '../../config/vehicle';

const specs = [
  {
    icon: Calendar,
    label: 'Año',
    value: VEHICLE.year,
    unit: ''
  },
  {
    icon: Cpu,
    label: 'Motor',
    value: VEHICLE.motor,
    unit: ''
  },
  {
    icon: Gauge,
    label: 'Kilometraje',
    value: VEHICLE.mileage.toLocaleString(),
    unit: 'km'
  },
  {
    icon: Fuel,
    label: 'Combustible',
    value: VEHICLE.combustible,
    unit: ''
  },
  {
    icon: Users,
    label: 'Pasajeros',
    value: VEHICLE.capacidad.pasajeros,
    unit: ''
  },
  {
    icon: Settings,
    label: 'Transmisión',
    value: VEHICLE.transmision.split(' ')[0],
    unit: VEHICLE.transmision.split(' ').slice(1).join(' ')
  }
];

const Specs = () => {
  return (
    <section id="caracteristicas" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Especificaciones
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Todo lo que necesitas saber sobre la Nissan X-Trail 2023
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {specs.map((spec, index) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-background rounded-xl p-4 border border-white/5 hover:border-accent/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <spec.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-text-secondary text-xs mb-1">{spec.label}</p>
              <p className="text-white font-semibold text-lg">{spec.value}</p>
              {spec.unit && (
                <p className="text-text-secondary text-xs">{spec.unit}</p>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-background rounded-2xl p-6 border border-white/5"
        >
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="text-center">
              <p className="text-accent font-mono text-3xl font-bold">{VEHICLE.potencia}</p>
              <p className="text-text-secondary text-sm">Potencia</p>
            </div>
            <div className="text-center">
              <p className="text-accent font-mono text-3xl font-bold">{VEHICLE.torque}</p>
              <p className="text-text-secondary text-sm">Torque</p>
            </div>
            <div className="text-center">
              <p className="text-accent font-mono text-3xl font-bold">{VEHICLE.traccion.split(' ')[0]}</p>
              <p className="text-text-secondary text-sm">Tracción</p>
            </div>
            <div className="text-center">
              <p className="text-accent font-mono text-3xl font-bold">{VEHICLE.dimensiones.clearence}</p>
              <p className="text-text-secondary text-sm">Clearance</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Specs;
