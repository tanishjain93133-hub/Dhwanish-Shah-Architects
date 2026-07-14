import React from 'react';
import { motion } from 'motion/react';
import { PencilRuler, Armchair, Box, Hammer } from 'lucide-react';

const services = [
  {
    icon: <PencilRuler className="w-8 h-8" />,
    title: "Architecture Design",
    desc: "We design innovative and well-planned architectural spaces that combine functionality, aesthetics, and long-term value.",
    color: "from-neon-cyan to-white/20",
    theme: "dark-icon"
  },
  {
    icon: <Armchair className="w-8 h-8" />,
    title: "Interior Design",
    desc: "We create stylish and practical interiors that reflect your personality while ensuring comfort and usability.",
    color: "from-electric-purple to-white/20",
    theme: "light-icon"
  },
  {
    icon: <Box className="w-8 h-8" />,
    title: "3D Visualization",
    desc: "We provide realistic 3D views to help you visualize your space before execution, ensuring clarity and confidence in design decisions.",
    color: "from-neon-cyan to-electric-purple",
    theme: "light-icon"
  },
  {
    icon: <Hammer className="w-8 h-8" />,
    title: "Renovation & Remodeling",
    desc: "We transform existing spaces into modern, efficient, and visually appealing environments with smart design solutions.",
    color: "from-[#C9A66B] to-[#C9A66B]/30",
    theme: "light-icon"
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="pt-8 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-9xl font-bold mb-10 tracking-tighter"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-electric-purple">Services.</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <p className="text-white text-xl md:text-3xl font-light tracking-wide">
              Complete design and execution solutions.
            </p>
            <p className="text-white/60 text-base md:text-xl font-light">
              Tailored for functional, modern, and elegant spaces.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white p-12 rounded-[3.5rem] border-[1.5px] border-[#9CA3AF] shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-700 overflow-hidden"
            >
              {/* Background Glow */}
              <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700`} />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-black flex items-center justify-center mb-10 shadow-lg group-hover:scale-110 transition-transform duration-500 service-icon-custom">
                  {service.icon}
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-neon-cyan transition-colors duration-500">{service.title}</h3>
                
                <p className="text-white/70 text-lg leading-relaxed font-light mb-10 group-hover:text-white/90 transition-colors duration-500">
                  {service.desc}
                </p>


              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
