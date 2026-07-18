import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BlurText from './BlurText';

const getHeroImages = (): string[] => {
  const originalHero = '/images/drive_1QzCXp_vMHvJvz2x2S0Czff8Fk2IsXN7h.png';
  let additionalImages: string[] = [];

  try {
    const glob = import.meta.glob('/public/hero-images/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' });
    const paths = Object.keys(glob).map(key => key.replace('/public', ''));
    if (paths.length > 0) {
      additionalImages = paths.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
    }
  } catch {
    additionalImages = [
      '/hero-images/slide-1.jpg',
      '/hero-images/slide-2.jpg',
      '/hero-images/slide-3.jpg',
      '/hero-images/slide-4.jpg'
    ];
  }

  // Slide 1 is always the original hero image, followed by hero-images
  return [originalHero, ...additionalImages];
};

export const Hero: React.FC = () => {
  const [slides, setSlides] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    const images = getHeroImages();
    setSlides(images);
  }, []);

  const handleNext = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentIndex(prev => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Autoplay 5-second interval
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleNext, isPaused, slides.length]);

  if (slides.length === 0) return null;

  return (
    <section 
      id="home" 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[70vh] md:h-[80vh] lg:h-screen flex items-center justify-center overflow-hidden select-none"
      style={{
        background: 'linear-gradient(180deg, #fafafa 0%, #f2f2f2 100%)'
      }}
    >
      {/* Crisp HD Image Container with object-contain to prevent stretching & cropping */}
      <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center p-2 sm:p-4 md:p-6">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentIndex}
            src={slides[currentIndex]}
            alt={`Dhwanish Shah Architects Slide ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            loading={currentIndex === 0 ? "eager" : "lazy"}
            decoding="async"
            style={{
              imageRendering: 'auto'
            }}
            className="w-full h-full object-contain object-center transition-all duration-500 drop-shadow-md"
          />
        </AnimatePresence>
      </div>

      {/* Subtle luxury ambient gradient overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.02) 50%, rgba(0,0,0,0.06) 100%)'
        }}
      />

      {/* Branding Header Text Overlay */}
      <div className="absolute top-[84px] md:top-[105px] left-0 right-0 z-20 flex justify-center text-center px-6 pointer-events-none">
        <div className="flex flex-col items-center w-full">
          <BlurText
            text="Dhwanish Shah Architects"
            delay={150}
            animateBy="words"
            direction="top"
            className="dsa-title-sub text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-zinc-950 font-extrabold select-none justify-center w-full"
          />
        </div>
      </div>

      {/* Left Navigation Arrow */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-4 sm:left-8 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-zinc-950/70 hover:bg-zinc-950 text-white backdrop-blur-md border border-zinc-700/40 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-xl group cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-4 sm:right-8 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-zinc-950/70 hover:bg-zinc-950 text-white backdrop-blur-md border border-zinc-700/40 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-xl group cursor-pointer"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-500 rounded-full cursor-pointer ${
              index === currentIndex
                ? 'w-8 h-2 bg-zinc-950 shadow-md'
                : 'w-2 h-2 bg-zinc-400/60 hover:bg-zinc-800'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
