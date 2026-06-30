import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SafeImage } from "./SafeImage";
import { ChevronLeft, ChevronRight, Grid, X, Eye } from "lucide-react";
import { cn } from "../lib/utils";

interface InteractiveGalleryProps {
  images: string[];
  alt: string;
}

export const InteractiveGallery: React.FC<InteractiveGalleryProps> = ({ images, alt }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  // Filter unique items and return only actual gallery images
  const getEnrichedImages = (): string[] => {
    let result = [...images];
    return Array.from(new Set(result.filter(Boolean)));
  };

  const enrichedImages = getEnrichedImages();

  // Navigation handlers within lightbox
  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsZoomed(false);
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === null ? null : prev === enrichedImages.length - 1 ? 0 : prev + 1));
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsZoomed(false);
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === null ? null : prev === 0 ? enrichedImages.length - 1 : prev - 1));
    }
  };

  // Keyboard controls for lightbox navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setLightboxIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* 3x3 Square Grid Layout like Instagram postings */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-zinc-50 p-2 rounded-xl border border-zinc-200">
        {enrichedImages.map((img, idx) => (
          <div
            key={idx}
            onClick={() => {
              setIsZoomed(false);
              setLightboxIndex(idx);
            }}
            className="aspect-square relative group rounded-lg overflow-hidden bg-white border border-zinc-200 hover:border-blue-500/40 cursor-pointer shadow-md transform transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Position reference badge */}
            <div className="absolute top-2 left-2 z-10 w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-white/95 border border-zinc-200/80 flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold text-blue-600 select-none shadow-sm">
              {idx + 1}
            </div>

            <SafeImage
              src={img}
              alt={`${alt} post frame ${idx + 1}`}
              objectFit="cover"
              className="w-full h-full"
              loading="lazy"
            />
            
            {/* Minimal architectural gallery frame hover overlay */}
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2 text-[10px] font-mono text-zinc-100 uppercase tracking-[0.25em]">
              <Eye className="w-4 h-4 text-blue-400" />
              <span>VIEW DETAIL</span>
            </div>
          </div>
        ))}
      </div>

      {/* Cinematic Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="fixed inset-0 bg-black/98 z-100 flex items-center justify-center p-4 sm:p-10 select-none backdrop-blur-md"
          >
            {/* Top Bar with metadata and controls */}
            <div className="absolute top-6 inset-x-6 flex justify-end items-center z-110 pointer-events-none">
              <button
                onClick={() => setLightboxIndex(null)}
                className="pointer-events-auto p-3 bg-white/90 hover:bg-zinc-100 text-zinc-650 hover:text-zinc-900 rounded-lg border border-zinc-200 transition-colors cursor-pointer flex items-center justify-center shadow-sm"
                title="Close Lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Previous Image Trigger */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900 rounded-lg border border-zinc-200 transition-colors pointer-events-auto cursor-pointer shadow-sm z-110"
              title="Previous Frame"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Image Trigger */}
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900 rounded-lg border border-zinc-200 transition-colors pointer-events-auto cursor-pointer shadow-sm z-110"
              title="Next Frame"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Large scale image preview render */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="relative flex items-center justify-center bg-transparent z-105"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={enrichedImages[lightboxIndex]}
                alt={`${alt} Cinematic Zoom ${lightboxIndex + 1}`}
                onClick={toggleZoom}
                className={cn(
                  "max-w-full max-h-[85vh] object-contain rounded-xl border border-zinc-805 shadow-2xl transition-transform duration-300 origin-center select-none",
                  isZoomed ? "cursor-zoom-out scale-150 sm:scale-175 lg:scale-200" : "cursor-zoom-in scale-100"
                )}
                onError={(e) => {
                  const img = e.currentTarget;
                  const match = enrichedImages[lightboxIndex]?.match(/\/images\/(1[a-zA-Z0-9_-]{32})\.jpg/);
                  if (match && !img.dataset.fallbackTried) {
                    img.dataset.fallbackTried = "true";
                    img.src = `https://lh3.googleusercontent.com/d/${match[1]}`;
                  }
                }}
              />
            </motion.div>

            {/* Bottom floating image count badge */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-white font-mono text-[10px] tracking-[0.25em] z-110">
              {lightboxIndex + 1} / {enrichedImages.length}
            </div>

            {/* Image Preloading */}
            <div className="hidden">
              <img src={enrichedImages[(lightboxIndex + 1) % enrichedImages.length]} alt="preload-next" />
              <img src={enrichedImages[(lightboxIndex - 1 + enrichedImages.length) % enrichedImages.length]} alt="preload-prev" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
