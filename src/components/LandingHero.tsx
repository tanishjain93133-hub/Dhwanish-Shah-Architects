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
          background: 'linear-gradient(rgba(0,0,0,0.30), rgba(0,0,0,0.30))'
        }}
      />

      {/* Hero Title & Centered Branding Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <div className="flex flex-col items-center max-w-5xl mx-auto w-full select-none">
          
          {/* DSA Monogram Logo */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-4 sm:mb-6"
          >
            <img 
              src="/logo.png" 
              alt="DSA Logo" 
              className="h-14 sm:h-18 md:h-22 w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] brightness-0 invert" 
            />
          </motion.div>

          {/* Top Thin Accent Line */}
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.8, scaleX: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white to-transparent mb-4 sm:mb-6"
          />

          {/* Main Title Container: DHWANISH SHAH */}
          <div className="relative py-1 px-2">
            {/* Layer 1: Black Outline Always Visible First */}
            <h1
              className="text-[28px] sm:text-[50px] md:text-[68px] lg:text-[84px] font-['Montserrat',sans-serif] font-[900] tracking-[0.05em] uppercase leading-none text-center select-none"
              style={{
                WebkitTextStroke: '3.5px #000000',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 20px rgba(0,0,0,0.5)'
              }}
            >
              DHWANISH SHAH
            </h1>

            {/* Layer 2: White Fill Smoothly Sweeping Left-to-Right Over 1.2 Seconds */}
            <motion.h1
              initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
              animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
              transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
              className="text-[28px] sm:text-[50px] md:text-[68px] lg:text-[84px] font-['Montserrat',sans-serif] font-[900] tracking-[0.05em] uppercase text-white leading-none text-center select-none absolute inset-0 py-1 px-2"
              style={{
                WebkitTextStroke: '3.5px #000000',
                paintOrder: 'stroke fill',
                textShadow: '0 4px 20px rgba(0,0,0,0.5)'
              }}
            >
              DHWANISH SHAH
            </motion.h1>
          </div>

          {/* Subtitle: ARCHITECTS (20-30px Spacing, 0.4em Letter Spacing) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="mt-5 sm:mt-7 text-[12px] sm:text-[18px] md:text-[22px] font-['Montserrat',sans-serif] font-[800] tracking-[0.4em] uppercase text-white text-center pl-[0.4em]"
            style={{
              WebkitTextStroke: '1.2px #000000',
              paintOrder: 'stroke fill',
              textShadow: '0 2px 10px rgba(0,0,0,0.7)'
            }}
          >
            ARCHITECTS
          </motion.div>

          {/* Bottom Thin Accent Line */}
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.8, scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1.0, ease: "easeOut" }}
            className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white to-transparent mt-5 sm:mt-7"
          />
        </div>
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
