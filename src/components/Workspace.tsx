import React from 'react';
import { motion } from 'motion/react';
import { SafeImage } from './SafeImage';

export const Workspace: React.FC = () => {
  return (
    <section id="workspace" className="pt-0 pb-0 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-12 md:pt-16">
        {/* Cinematic Location Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full aspect-video rounded-[3rem] overflow-hidden border border-white/10 group bg-neutral-900 shadow-2xl"
        >
          {/* India Map Geographic Background - User Provided Asset */}
          <div className="absolute inset-0 z-0">
            <SafeImage 
              src="/images/drive_1o64ShmOwrbN2QYyOC6ptrVy7ADrADxr8.jpg" 
              alt="Geographic Map of Ahmedabad" 
              className="w-full h-full object-cover opacity-100 transition-opacity duration-1000"
            />
            {/* Elegant dark semi-transparent overlay to ensure excellent readability of white text */}
            <div className="absolute inset-0 bg-black/45 z-[1]" />
            {/* Overlay Grid - Subtler */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:60px_60px] opacity-10 z-[2]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-[2]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-90 z-[2]" />
          </div>

          {/* Overlay Info */}
          <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row justify-between items-end gap-10 z-20">
            <div className="max-w-xl text-left">
              <span className="text-[#3B82F6] text-[11px] font-bold tracking-[0.5em] mb-4 block uppercase font-mono border-l-2 border-[#3B82F6] pl-4">
                HEADQUARTERS & STUDIO
              </span>
              <h1 className="text-2xl md:text-3xl font-light text-white mb-6 leading-tight tracking-tight workspace-text-white">
                601, Anikedhya Capitol 2, <br />
                Paldi, Ahmedabad, Gujarat 380007
              </h1>
              <div className="flex items-center gap-6 mt-6">
                <a 
                  href="https://maps.app.goo.gl/rfkJxZ1NbR8NU3FEA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group/link flex items-center gap-3 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-[#3B82F6] hover:text-white transition-all duration-500 tracking-[0.2em] text-[10px] uppercase shadow-lg"
                >
                  Go to Location
                  <span className="text-lg group-hover/link:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
            
            {/* Removed Cinematic Map Zoom and Coordinates */}
          </div>
        </motion.div>

        {/* Dynamic Glowing Accents */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none animate-pulse delay-1000" />
      </div>
    </section>
  );
};
