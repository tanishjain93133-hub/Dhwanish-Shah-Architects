import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SafeImage } from './SafeImage';
import MagicBento, { BentoCardData } from './MagicBento';

const lightingFeatures: BentoCardData[] = [
  {
    title: 'Precision Craftsmanship',
    label: 'Timber',
    description: 'Each light is carefully crafted from high-quality teak wood, ensuring durability, fine detailing, and a premium finish.',
    image: '/images/drive_1WZuVgBKDE_f97AL27KJB7K31VocjBNXN.jpg'
  },
  {
    title: 'Smart Lighting Technology',
    label: 'Adaptive',
    description: 'Our lights are designed with modern technology to provide optimal brightness and energy efficiency.',
    image: '/images/drive_1ckWSpc9gT8v06ybrmigWqKoQgonLOle6.jpg'
  },
  {
    title: 'Sustainable Wood Collection',
    label: 'Premium',
    description: 'Made from responsibly sourced wood, our designs are eco-friendly and built to age gracefully.',
    image: '/images/drive_1qyz8oKL6ldUULHlZs21mjWCHrNIi39wU.jpg'
  },
  {
    title: 'Atmosphere & Ambience',
    label: 'Experience',
    description: '2700K warmth for a natural architectural feel that bridges nature and home.',
    image: '/images/drive_1ytTl_Rcei72Q7IaTf51CxOGmxm404D1m.jpg'
  },
  {
    title: 'Sculptural Form',
    label: 'Design',
    description: 'Unique miniature architectural sculptures.',
    image: '/images/drive_1EsMLe08jkprzx3ZDo1GAcmzZH3N-Frpp.jpg'
  },
  {
    title: 'Artisanal Detail',
    label: 'Finish',
    description: 'Hand-rubbed natural oil for lasting texture.',
    image: '/images/drive_1VizU1uLT7de9piaTNGn2dJ3PFC1Bqc9h.jpg'
  }
];

export const Lights: React.FC = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <section id="lights" className="py-8 relative overflow-hidden bg-black">
      {/* Custom Styles for Warm Golden Luxury Lighting Effects */}
      <style>{`
        @keyframes softFloat {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.8; }
          50% { transform: translateY(-8px) scale(1.03); opacity: 0.95; }
        }
        @keyframes goldenSheen {
          0% { transform: translateX(-150%) skewX(-25deg); opacity: 0; }
          15% { opacity: 0.35; }
          30% { transform: translateX(150%) skewX(-25deg); opacity: 0; }
          100% { transform: translateX(150%) skewX(-25deg); opacity: 0; }
        }
        @keyframes dynamicBorderGlow {
          0%, 100% { 
            border-color: rgba(245, 158, 11, 0.15); 
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(245, 158, 11, 0.05); 
          }
          50% { 
            border-color: rgba(245, 158, 11, 0.45); 
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.9), 0 0 40px rgba(245, 158, 11, 0.3); 
          }
        }
        .anim-soft-float {
          animation: softFloat 10s infinite ease-in-out;
        }
        .anim-golden-sheen {
          animation: goldenSheen 6s infinite ease-in-out;
        }
        .anim-border-glow {
          border-color: rgba(245, 158, 11, 0.15);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(245, 158, 11, 0.05);
          transition: all 0.5s ease-in-out;
        }
        .anim-border-glow:hover {
          animation: dynamicBorderGlow 3s infinite ease-in-out;
        }
      `}</style>

      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-electric-purple/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column: Premium Single Featured Image Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1 relative group w-full cursor-pointer"
          >
            {/* Soft ambient glow around the image */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-amber-600/30 via-yellow-500/10 to-amber-400/30 rounded-[36px] blur-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            {/* Premium glassmorphism frame with auto-height layout to match actual image ratio */}
            <div className="relative anim-border-glow rounded-[30px] overflow-hidden p-3 md:p-4 bg-white/[0.02] backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-700 hover:scale-[1.01] hover:border-amber-500/40">
              
              {/* Subtle animated background gradient overlay inside the frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-600/5 opacity-40 group-hover:opacity-100 transition-opacity duration-700 rounded-[30px] pointer-events-none" />

              {/* Natural Proportion Containment - No forced aspect ratio to avoid cropping */}
              <div className="relative w-full rounded-[20px] overflow-hidden bg-black/40 flex items-center justify-center">
                
                {/* Floating light reflections / Golden Diagonal Sheen */}
                <div className="absolute inset-0 z-20 pointer-events-none anim-golden-sheen bg-gradient-to-r from-transparent via-amber-400/25 to-transparent w-[200%]" style={{ height: '100%' }} />
                
                {/* Warm golden lighting vignette layer */}
                <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/15 via-transparent to-black/30 mix-blend-color-dodge transition-opacity duration-500 group-hover:opacity-95" />
                
                {/* High-quality optimized image that preserves 100% of the natural aspect ratio */}
                <SafeImage
                  src="/images/drive_14vWYwDCMoQEcmeXOm2ggKXDszMM9EBL_.png"
                  alt="The Timber Lights Premium Showcase"
                  loading="lazy"
                  decoding="async"
                  size="large"
                  objectFit="contain"
                  className="w-full h-auto rounded-[20px] select-none block group-hover:scale-[1.01] transition-transform duration-[1.2s]"
                />

                {/* Ambient Warm Golden Overlay Dust & Dust Particles */}
                <div className="absolute top-[8%] left-[15%] w-[120px] h-[120px] bg-amber-400/20 rounded-full blur-[45px] pointer-events-none anim-soft-float" />
                <div className="absolute bottom-[12%] right-[10%] w-[160px] h-[160px] bg-yellow-500/10 rounded-full blur-[65px] pointer-events-none anim-soft-float" style={{ animationDelay: '2s' }} />
                
                {/* Frame border highlight */}
                <div className="absolute inset-0 border border-white/5 rounded-[20px] pointer-events-none z-10" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 self-start pt-4"
          >
            <span className="text-neon-cyan text-lg font-bold tracking-[0.6em] uppercase block mb-6">
              The Heritage
            </span>
            <h2 className="text-4xl md:text-6xl xl:text-7xl font-bold tracking-tighter leading-tight text-white mb-8 whitespace-nowrap">
              The Timber <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-electric-purple">Lights.</span>
            </h2>
            
            <p className="text-white/80 text-lg md:text-xl font-light mb-12 leading-relaxed">
              Experience the beauty of natural wood lighting designed for modern living. 
              Our handcrafted timber lights combine premium quality wood with elegant design, 
              adding warmth and sophistication to any space. Perfect for homes, offices, 
              and luxury interiors, our lights are built to enhance both style and functionality.
            </p>

            <div className="grid grid-cols-1 gap-8">
              {lightingFeatures.slice(0, 3).map((feature, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-1 h-12 bg-gradient-to-b from-neon-cyan to-transparent shrink-0" />
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">{feature.title}</h4>
                    <p className="text-white/70 text-sm leading-relaxed max-w-md">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
