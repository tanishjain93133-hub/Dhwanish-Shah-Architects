import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface ServiceCardItem {
  id: string;
  filterName: string;
  title: string;
  subtitle: string;
  image: string;
}

const serviceCards: ServiceCardItem[] = [
  {
    id: 'residential',
    filterName: 'Residential',
    title: 'Residential',
    subtitle: 'Luxury Homes, Villas & Apartments',
    image: '/images/residential-category-bg.jpg',
  },
  {
    id: 'commercial',
    filterName: 'Commercial',
    title: 'Commercial',
    subtitle: 'Corporate Offices, Retail & Hospitality',
    image: '/images/commercial-category-bg.jpg',
  },
  {
    id: 'sphere',
    filterName: 'Sphere',
    title: 'Sphere',
    subtitle: '3D Visualization, Planning & Execution',
    image: '/images/1XibxVzxzjgvmI85XDUywtUpJTUus7bzM.jpg',
  },
  {
    id: 'portfolio',
    filterName: 'All',
    title: 'Complete Portfolio',
    subtitle: 'Explore Our Complete Collection of Projects',
    image: '/images/all-portfolio-bg.jpg',
  },
];

export const OurServicesSection: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (filterName: string) => {
    sessionStorage.setItem('projects-active-filter', filterName);
    navigate('/projects');
  };

  return (
    <section className="bg-white py-20 border-b border-zinc-200/60 relative overflow-hidden">
      {/* Subtle ambient light glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-amber-600/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-amber-600 text-[10px] font-mono font-black tracking-[0.8em] uppercase block mb-3">
            OUR SERVICES
          </span>
          <h2 className="text-zinc-950 text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight uppercase leading-tight mb-4">
            Luxury Architecture &amp; Interior Design Solutions
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed tracking-wide font-normal max-w-2xl mx-auto">
            Discover our complete range of architecture and interior design services, crafted to deliver timeless aesthetics, intelligent planning, and exceptional execution.
          </p>
        </motion.div>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {serviceCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleCardClick(card.filterName)}
              className="relative h-[280px] sm:h-[340px] rounded-[24px] overflow-hidden group transition-all duration-500 cursor-pointer shadow-md hover:shadow-2xl hover:scale-[1.03] border border-zinc-200/80 bg-zinc-900"
            >
              {/* Card Image */}
              <SafeImage
                src={card.image}
                alt={card.title}
                objectFit="cover"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
              />

              {/* Luxury dark gradient overlay */}
              <div 
                className="absolute inset-0 z-10 transition-opacity duration-500" 
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.15) 100%)' }}
              />

              {/* Hover accent blue glow */}
              <div className="absolute inset-0 z-10 bg-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                <h3 
                  className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide uppercase mb-1.5"
                  style={{
                    color: '#ffffff',
                    fontWeight: 700,
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)'
                  }}
                >
                  {card.title}
                </h3>
                <p 
                  className="text-zinc-300 text-xs sm:text-sm font-sans font-medium leading-snug max-w-[90%]"
                  style={{
                    color: '#e4e4e7',
                    fontWeight: 500,
                    textShadow: '0 1px 6px rgba(0, 0, 0, 0.6)'
                  }}
                >
                  {card.subtitle}
                </p>

                {/* Bottom accent trace line */}
                <div className="h-[2px] bg-amber-600 w-0 group-hover:w-full mt-4 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={() => {
              sessionStorage.setItem('projects-active-filter', 'All');
              navigate('/projects');
            }}
            className="inline-flex items-center gap-3 bg-zinc-950 hover:bg-amber-600 text-white font-mono text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 border border-zinc-800 cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
