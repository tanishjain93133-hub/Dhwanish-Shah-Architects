import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

import { SafeImage } from './SafeImage';
import BlurText from './BlurText';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-obsidian">
      
      {/* High-End Architectural Background (Covering the entire hero section) */}
      <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute inset-0 -z-10 w-full h-full pointer-events-none hero-background-container"
      >
        {/* Google Drive: https://drive.google.com/file/d/1QzCXp_vMHvJvz2x2S0Czff8Fk2IsXN7h/view?usp=sharing */}
        <SafeImage 
          src="/images/drive_1QzCXp_vMHvJvz2x2S0Czff8Fk2IsXN7h.png" 
          alt="Premium Architectural Background" 
          size="large"
          className="w-full h-full object-cover object-center hero-background-img"
        />
      </motion.div>

      {/* UPPER CENTER TEXT: Dhwanish Shah Architects (just below the navigation links) */}
      <div className="absolute top-[84px] md:top-[105px] left-0 right-0 z-20 flex justify-center text-center px-6 hero-title-container">
        <div className="flex flex-col items-center w-full">
          <BlurText
            text="Dhwanish Shah Architects"
            delay={150}
            animateBy="words"
            direction="top"
            className="dsa-title-sub text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-black font-extrabold select-none justify-center w-full"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full mt-10 hidden md:block">
        <div className="flex flex-col items-center text-center">
          {/* Empty center content to maximize focus on the architectural sketch background and upper center branding */}
        </div>
      </div>
      
    </section>
  );
};
