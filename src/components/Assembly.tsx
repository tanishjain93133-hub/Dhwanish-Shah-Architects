import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DecryptedText from './DecryptedText';
import { SafeImage } from './SafeImage';

export const Assembly: React.FC = () => {
  return (
    <section id="founder" className="pt-8 pb-8 bg-black relative overflow-hidden flex items-center">
      {/* Black Background */}
      <div className="absolute inset-0 bg-black" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-neon-cyan text-sm font-bold tracking-[0.4em] mb-6 block uppercase font-mono opacity-80">
              About Us
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-10 leading-tight tracking-tighter text-white">
              Ar. Dhwanish <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-electric-purple">
                <DecryptedText 
                  text="Shah" 
                  animateOn="view" 
                  revealDirection="center"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-electric-purple"
                />
              </span>
            </h2>
            <p className="text-white/70 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-16 border-l border-white/10 pl-4">
              Founder & Principal Architect
            </p>
            
            <div className="space-y-10 text-white/80 text-base md:text-lg leading-relaxed font-light max-w-xl">
              <p>
                <strong className="text-white font-medium">Dhwanish Shah Architects</strong> is a creative studio dedicated to designing modern, functional, and elegant spaces. Founded in 2018 by Ar. Dhwanish Shah, our firm focuses on delivering high-quality architectural and interior solutions that reflect both style and practicality.
              </p>
              <p>
                Ar. Dhwanish Shah holds a Bachelor of Architecture degree from <span className="text-white/70">Anant National University</span> and brings a strong foundation of design thinking and innovation to every project.
              </p>
              <p className="border-l border-neon-cyan/40 pl-6 py-2 bg-white/5 rounded-r-2xl text-white/70">
                In 2026, he further expanded his vision by founding <span className="text-white font-medium">The Timber Light</span>, a brand dedicated to crafting premium lighting solutions using natural wood, blending aesthetics with sustainability.
              </p>
            </div>

            {window.location.pathname !== '/about' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12"
              >
                <Link to="/about#founder-detailed">
                  <motion.button
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="group flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-[10px] tracking-[0.3em] font-bold uppercase text-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Read Full Biography
                    <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Visual Column */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5]"
            >
              <div className="absolute inset-0 border border-white/5 rounded-[3rem] p-4 lg:p-6 bg-white/[0.02]">
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 group">
                  <SafeImage 
                    src="/images/drive_11pcH9eTpIsNc2YMB7Sis-jInvHOu_ESl.png" 
                    alt="Dhwanish Shah Architects" 
                    className="w-full h-full object-cover opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
                  />
                </div>
              </div>

              <div className="absolute -top-12 -right-12 w-48 h-48 bg-neon-cyan/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-electric-purple/10 rounded-full blur-[100px] pointer-events-none" />
            </motion.div>
          </div>
        </div>

        {/* Milestones - Centered in Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-8 md:gap-32 mt-8 pt-8 border-t border-white/5 text-center max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center">
            <p className="text-4xl md:text-6xl font-display font-medium text-white mb-3 tracking-tighter">2018</p>
            <p className="text-[10px] md:text-xs tracking-[0.3em] text-white/40 uppercase font-bold leading-relaxed">
              Foundation <span className="text-white/60 block mt-1 font-medium">Dhwanish Shah Architects</span>
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl md:text-6xl font-display font-medium text-white mb-3 tracking-tighter">2026</p>
            <p className="text-[10px] md:text-xs tracking-[0.3em] text-white/40 uppercase font-bold leading-relaxed">
              Foundation <span className="text-white/60 block mt-1 font-medium">The Timber Lights</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
