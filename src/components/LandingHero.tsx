import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

  // Slide 1 is always the original hero image, followed by all hero-images
  return [originalHero, ...additionalImages];
};

export const Hero: React.FC = () => {
  const [slides, setSlides] = useState<string[]>([]);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    const images = getHeroImages();
    setSlides(images);
  }, []);

  const validSlides = slides.filter(src => !failedImages.has(src));

  const handleNext = useCallback(() => {
    if (validSlides.length === 0) return;
    setCurrentIndex(prev => (prev + 1) % validSlides.length);
  }, [validSlides.length]);

  // Autoplay 5-second interval
  useEffect(() => {
    if (isPaused || validSlides.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleNext, isPaused, validSlides.length]);

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
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[75vh] md:h-[85vh] lg:h-screen flex items-center justify-center overflow-hidden bg-zinc-950 select-none"
    >
      {/* Hidden Preloader for 60fps instant transitions */}
      <div className="hidden" aria-hidden="true">
        {validSlides.map(src => (
          <img key={src} src={src} alt="" />
        ))}
      </div>

      {/* Fullscreen Cinematic Image Slider with Slow Zoom Effect */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentSlideSrc}
            src={currentSlideSrc}
            alt={`Dhwanish Shah Architects Slide ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.06 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1, ease: 'easeInOut' },
              scale: { duration: 5.5, ease: 'linear' }
            }}
            loading={currentIndex === 0 ? "eager" : "lazy"}
            decoding="async"
            onError={() => handleImageError(currentSlideSrc)}
            style={{ imageRendering: 'auto' }}
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

      {/* Hero Title & Branding Overlay */}
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
