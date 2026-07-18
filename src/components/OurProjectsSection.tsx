import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { cn } from '../lib/utils';

interface ProjectCardItem {
  id: string;
  filterName: string;
  title: string;
  image: string;
}

const projectCards: ProjectCardItem[] = [
  {
    id: 'all',
    filterName: 'All',
    title: 'ALL',
    image: '/images/all-portfolio-bg.jpg',
  },
  {
    id: 'residential',
    filterName: 'Residential',
    title: 'RESIDENTIAL',
    image: '/images/residential-category-bg.jpg',
  },
  {
    id: 'commercial',
    filterName: 'Commercial',
    title: 'COMMERCIAL',
    image: '/images/commercial-category-bg.jpg',
  },
  {
    id: 'sphere',
    filterName: 'Sphere',
    title: 'SPHERE',
    image: '/images/1XibxVzxzjgvmI85XDUywtUpJTUus7bzM.jpg',
  },
];

export const OurProjectsSection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const handleCardClick = (filterName: string) => {
    setSelectedFilter(filterName);
    sessionStorage.setItem('projects-active-filter', filterName);
    navigate('/projects');
  };

  return (
    <section className="bg-white pt-10 pb-16 border-b border-zinc-200/60 relative overflow-hidden">
      {/* Subtle ambient light glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-amber-600/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header Section - Luxury Residential & in pure black */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-[1050px] mx-auto"
        >
          <h2 
            className="text-[30px] sm:text-[42px] md:text-[54px] lg:text-[66px] font-[900] tracking-[-0.03em] leading-[1.08] text-center mb-5 font-['Geist','Inter',sans-serif]"
          >
            <span style={{ color: '#000000' }}>Luxury Residential &amp;</span>{' '}
            <span style={{ color: '#4A4A4A' }}>bespoke Commercial Projects</span>
          </h2>

          <p 
            className="text-[13px] sm:text-[15px] lg:text-[16px] font-normal tracking-normal leading-[1.6] text-[#6B7280] text-center max-w-[650px] mx-auto mt-0 mb-[48px] font-['Geist','Inter',sans-serif]"
          >
            Thoughtfully designed spaces that blend timeless aesthetics, intelligent planning, and exceptional craftsmanship.
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {projectCards.map((card, index) => {
            const isActive = selectedFilter === card.filterName;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => handleCardClick(card.filterName)}
                className={cn(
                  "relative h-[210px] sm:h-[260px] rounded-[24px] overflow-hidden group transition-all duration-500 cursor-pointer shadow-md hover:shadow-2xl hover:scale-[1.03] border bg-zinc-900 our-projects-card",
                  isActive
                    ? "ring-2 ring-blue-600 ring-offset-2 ring-offset-white border-blue-600 shadow-xl"
                    : "border-zinc-200/80 hover:border-blue-500/50"
                )}
              >
                {/* Card Image */}
                <SafeImage
                  src={card.image}
                  alt={card.title}
                  objectFit="cover"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />

                {/* Premium luxury gradient overlay */}
                <div 
                  className="absolute inset-0 z-10 transition-opacity duration-500" 
                  style={{ 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 100%)' 
                  }}
                />

                {/* Highlight blue tint when active or hovered */}
                <div 
                  className={cn(
                    "absolute inset-0 z-10 transition-opacity duration-500 bg-blue-600/15",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  )} 
                />

                {/* Content Overlay - Only Main Title */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                  <h3 
                    className="text-xl sm:text-2xl font-display font-bold text-white tracking-[2px] uppercase card-title"
                    style={{
                      color: '#ffffff',
                      fontWeight: 700,
                      letterSpacing: '2px',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    {card.title}
                  </h3>

                  {/* Blue Underline when active or hovered */}
                  <div 
                    className={cn(
                      "h-[3px] bg-blue-600 mt-3 transition-all duration-500 rounded-full",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )} 
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* VIEW ALL PROJECTS Button - Exact Testimonials 'More Testimonials' style */}
        <div className="flex justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sessionStorage.setItem('projects-active-filter', 'All');
              navigate('/projects');
            }}
            className="px-10 py-5 h-14 rounded-full bg-white border border-zinc-200 hover:border-amber-600/50 hover:bg-zinc-50 transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg group cursor-pointer"
          >
            <span className="text-zinc-800 text-xs uppercase tracking-[0.2em] font-bold group-hover:text-amber-600 transition-colors">
              VIEW ALL PROJECTS
            </span>
            <ChevronRight size={16} className="text-zinc-500 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
