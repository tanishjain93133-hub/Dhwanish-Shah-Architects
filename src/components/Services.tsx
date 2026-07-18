import React from 'react';
import { motion } from 'motion/react';
import { Home, Building2, Landmark, Box } from 'lucide-react';

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const services: ServiceItem[] = [
  {
    icon: <Home className="w-[42px] h-[42px] text-[#111111] stroke-[1.5]" />,
    title: "Home Design",
    desc: "Design beautiful, functional, and luxurious homes tailored to your lifestyle with elegant architecture and premium interiors."
  },
  {
    icon: <Building2 className="w-[42px] h-[42px] text-[#111111] stroke-[1.5]" />,
    title: "Office Design",
    desc: "Create modern office environments that improve productivity, reflect your brand, and inspire your team."
  },
  {
    icon: <Landmark className="w-[42px] h-[42px] text-[#111111] stroke-[1.5]" />,
    title: "Residential Design",
    desc: "Premium residential architecture and interior solutions designed for comfort, functionality, and timeless elegance."
  },
  {
    icon: <Box className="w-[42px] h-[42px] text-[#111111] stroke-[1.5]" />,
    title: "3D Visualization",
    desc: "High-quality 3D renders and walkthroughs that help you visualize every detail before construction begins."
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-white border-b border-zinc-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-600 text-[11px] font-mono font-black tracking-[0.6em] uppercase block mb-3"
          >
            OUR SERVICES
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-950 text-3xl sm:text-4xl md:text-5xl font-['Montserrat',sans-serif] font-bold tracking-tight uppercase leading-tight mb-4"
          >
            Our Services.
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <p className="text-zinc-800 text-lg sm:text-xl font-medium tracking-wide">
              Complete design and execution solutions.
            </p>
            <p className="text-[#555555] text-base sm:text-lg font-normal">
              Tailored for functional, modern, and elegant spaces.
            </p>
          </motion.div>
        </div>

        {/* 4 Premium Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white border border-zinc-200/80 rounded-[28px] p-8 sm:p-10 shadow-sm transition-all duration-350 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(200,169,106,0.25)] hover:border-[#C8A96A]/40 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* 80x80px White Icon Container with 18px Border Radius */}
                <div className="w-[80px] h-[80px] bg-white rounded-[18px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-zinc-100 flex items-center justify-center mb-8 group-hover:shadow-[0_8px_24px_rgba(200,169,106,0.3)] transition-all duration-350">
                  {service.icon}
                </div>

                {/* Card Title */}
                <h3 className="text-[#111111] text-2xl sm:text-3xl font-bold font-['Montserrat',sans-serif] tracking-tight mb-4 group-hover:text-amber-600 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Card Description */}
                <p className="text-[#555555] text-base sm:text-lg font-medium leading-relaxed">
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
