import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BlurText from './BlurText';

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
    '/hero-images/slide-4.jpg'
  ];
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
      className="relative w-full h-[70vh] md:h-[80vh] lg:h-screen flex items-center justify-center overflow-hidden bg-zinc-950 select-none"
    >
      {/* Hidden preloader for 60fps instant transitions without white flashes */}
      <div className="hidden" aria-hidden="true">
        {slides.map(src => (
          <img key={src} src={src} alt="" />
        ))}
      </div>

      {/* Smooth Cross-Fade Image Slideshow */}
      <div className="absolute inset-0 w-full h-full z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentIndex}
            src={slides[currentIndex]}
            alt={`Dhwanish Shah Architects Architecture Slide ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="w-full h-full object-cover object-center absolute inset-0"
          />
        </AnimatePresence>
      </div>

      {/* Luxury Subtle Gradient Overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.28) 50%, rgba(0,0,0,0.45) 100%)'
        }}
      />

      {/* Branding Overlay */}
      <div className="absolute top-[84px] md:top-[105px] left-0 right-0 z-20 flex justify-center text-center px-6 pointer-events-none">
        <div className="flex flex-col items-center w-full">
          <BlurText
            text="Dhwanish Shah Architects"
            delay={150}
            animateBy="words"
            direction="top"
            className="dsa-title-sub text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white font-extrabold select-none justify-center w-full drop-shadow-md"
          />
        </div>
      </div>

      {/* Left Navigation Arrow */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-4 sm:left-8 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg group cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-4 sm:right-8 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg group cursor-pointer"
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
                ? 'w-8 h-2 bg-white shadow-md'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
