import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const getHeroImages = (): string[] => {
  try {
    const glob = import.meta.glob('/public/hero-images/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' });
    const paths = Object.keys(glob).map(key => key.replace('/public', ''));
    if (paths.length > 0) {
      return paths.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
    }
  } catch {
    // Fallback if glob import is unavailable
  }
  return [
    '/hero-images/slide-1.jpg',
    '/hero-images/slide-2.jpg',
    '/hero-images/slide-3.jpg',
    '/hero-images/slide-4.jpg',
    '/hero-images/slide-5.jpg'
  ];
};

export const Hero: React.FC = () => {
  const [slides, setSlides] = useState<string[]>([]);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const images = getHeroImages();
    setSlides(images);
  }, []);

  const validSlides = slides.filter(src => !failedImages.has(src));

  const handleNext = useCallback(() => {
    if (validSlides.length === 0) return;
    setCurrentIndex(prev => (prev + 1) % validSlides.length);
  }, [validSlides.length]);

  // Autoplay every 3 seconds (3000ms), pauseOnHover: false, disableOnInteraction: false
  useEffect(() => {
    if (validSlides.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [handleNext, validSlides.length]);

  const handleImageError = (src: string) => {
    setFailedImages(prev => {
      const next = new Set(prev);
      next.add(src);
      return next;
    });
    if (validSlides.length > 1) {
      handleNext();
    }
  };

  if (validSlides.length === 0) return null;

  const currentSlideSrc = validSlides[currentIndex % validSlides.length];

  return (
    <section 
      id="home" 
      className="relative w-full h-[75vh] md:h-[85vh] lg:h-screen flex items-center justify-center overflow-hidden bg-zinc-950 select-none"
    >
      {/* Hidden Full HD Preloader Container */}
      <div className="hidden" aria-hidden="true">
        {validSlides.map((src, i) => (
          <img 
            key={src} 
            src={src} 
            alt="" 
            loading={i === 0 ? "eager" : "lazy"} 
            decoding={i === 0 ? "sync" : "async"}
          />
        ))}
      </div>

      {/* Fullscreen HD Image Slider with 1000ms Fade & Crisp Native Resolution Rendering */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentSlideSrc}
            src={currentSlideSrc}
            alt={`Dhwanish Shah Architects Slide ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            loading={currentIndex === 0 ? "eager" : "lazy"}
            decoding={currentIndex === 0 ? "sync" : "async"}
            onError={() => handleImageError(currentSlideSrc)}
            style={{ 
              imageRendering: 'auto',
              filter: 'none',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              willChange: 'opacity'
            }}
            className="w-full h-full object-cover object-center absolute inset-0"
          />
        </AnimatePresence>
      </div>

      {/* Soft Dark Overlay for Text Legibility */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25))'
        }}
      />

      {/* Hero Title & Animated Branding Overlay */}
      <div className="absolute top-[75px] md:top-[90px] left-0 right-0 z-20 flex justify-center text-center px-4 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 1 }}
          animate={{ 
            opacity: 1, 
            scale: [1, 1.05, 1] 
          }}
          transition={{ 
            duration: 3, 
            ease: [0.25, 0.1, 0.25, 1],
            times: [0, 0.7, 1]
          }}
          className="flex flex-col items-center max-w-5xl mx-auto w-full select-none"
        >
          {/* DSA Monogram Emblem Logo */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-1 sm:mb-2"
          >
            <img 
              src="/logo.png" 
              alt="DSA Monogram Logo" 
              className="h-10 sm:h-14 md:h-16 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] brightness-0 invert" 
            />
          </motion.div>

          {/* Top Thin Accent Line with Center Light Reflection */}
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.85, scaleX: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex items-center justify-center w-full max-w-xl sm:max-w-2xl mb-2 sm:mb-3"
          >
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white to-transparent" />
          </motion.div>

          {/* Main Title Container with Left-to-Right Stroke Draw + Liquid White Fill + Glossy Shine Sweep */}
          <div className="relative overflow-hidden py-1 px-4 max-w-full">
            {/* Title: DHWANISH SHAH */}
            <motion.h1
              initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
              animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
              transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
              className="text-[26px] sm:text-[48px] md:text-[66px] lg:text-[80px] font-['Montserrat',sans-serif] font-[900] tracking-[0.06em] uppercase text-white leading-none text-center relative z-10"
              style={{
                WebkitTextStroke: '2.5px #000000',
                paintOrder: 'stroke fill',
                textShadow: '0 4px 20px rgba(0,0,0,0.45)',
                filter: 'drop-shadow(0 0 14px rgba(255,255,255,0.45)) drop-shadow(0 4px 25px rgba(0,0,0,0.7))'
              }}
            >
              DHWANISH SHAH
            </motion.h1>

            {/* Glossy Shine Sweep Moving Across Letters Once */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ delay: 1.8, duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg]"
            />
          </div>

          {/* Subtitle: A R C H I T E C T S */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 1.0, ease: "easeOut" }}
            className="mt-1 sm:mt-2 text-[11px] sm:text-[16px] md:text-[20px] lg:text-[22px] font-['Montserrat',sans-serif] font-[800] tracking-[0.45em] sm:tracking-[0.55em] uppercase text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] text-center pl-[0.45em]"
            style={{
              WebkitTextStroke: '1.2px #000000',
              paintOrder: 'stroke fill',
              textShadow: '0 2px 12px rgba(0,0,0,0.6)'
            }}
          >
            ARCHITECTS
          </motion.div>

          {/* Bottom Thin Accent Line with Center Light Reflection */}
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.85, scaleX: 1 }}
            transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
            className="flex items-center justify-center w-full max-w-xl sm:max-w-2xl mt-2 sm:mt-3"
          >
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white to-transparent" />
          </motion.div>
        </motion.div>
      </div>

      {/* Minimal Slide Indicator Dots */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {validSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-500 rounded-full cursor-pointer ${
              index === (currentIndex % validSlides.length)
                ? 'w-8 h-2 bg-white shadow-md'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
