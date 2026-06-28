import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SafeImage } from "./SafeImage";
import { ChevronLeft, ChevronRight, Grid, X, Eye } from "lucide-react";

interface InteractiveGalleryProps {
  images: string[];
  alt: string;
}

const COMPLEMENTARY_POOL = [
  "/images/1WC-BXDJSfS3GKFozaBavmZkHfrGeWE8k.jpg",
  "/images/1cb-sHqV2zBhZm-q_xzutywoL5Mk38mOx.jpg",
  "/images/1A-GMMiT7zVSVme_9ANjVRoJpd6cbuNjY.jpg",
  "/images/1QtyrH4BL03_19HDNi4U5L8jdjWxbGmqG.jpg",
  "/images/1zLZcMS7ehDmOXqZ3xftn68HSZIpPf-eG.jpg",
  "/images/1WTeS-ivEHtUgCizv4QWCr-0OMg4-h8gT.jpg",
  "/images/13dT40m1keBawrXj_LTFiqHf5L68DurIW.jpg",
  "/images/1OlTdX7oAFnvHokByvAo7CDRtG3Ev0jKh.jpg",
  "/images/1WcsfUWRrmZ3_KCXMIssJEjm0p6WzBCld.jpg",
  "/images/1-muYkqhKVHIFcPnOTRMuHckfveopxo9M.jpg",
  "/images/1U7YxzdLn1xQcth_3bK9aNjKxS9XHEMJ9.jpg",
  "/images/1f9c0oNatpygcipVjuBuTEn6JukHXPiXT.jpg"
];

export const InteractiveGallery: React.FC<InteractiveGalleryProps> = ({ images, alt }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter unique items and return only actual gallery images
  const getEnrichedImages = (): string[] => {
    let result = [...images];
    return Array.from(new Set(result.filter(Boolean)));
  };

  const enrichedImages = getEnrichedImages();

  // Navigation handlers within lightbox
  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === null ? null : prev === enrichedImages.length - 1 ? 0 : prev + 1));
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
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

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Instagram Profile Grid Header Row */}
      <div className="mb-2 flex items-center justify-between border-b border-zinc-900 pb-3">
        <div className="flex items-center gap-2">
          <Grid className="w-4 h-4 text-neon-cyan" />
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.25em]">
            PROJECT WORK REEL
          </span>
        </div>
        <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-wider">
          {enrichedImages.length} POSTS AVAILABLE
        </span>
      </div>

      {/* 3x3 Square Grid Layout like Instagram postings */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-neutral-950/30 p-2 rounded-xl border border-zinc-900/40">
        {enrichedImages.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setLightboxIndex(idx)}
            className="aspect-square relative group rounded-lg overflow-hidden bg-zinc-950 border border-zinc-900 hover:border-neon-cyan/40 cursor-pointer shadow-md transform transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Position reference badge */}
            <div className="absolute top-2 left-2 z-10 w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-black/85 border border-zinc-800/80 flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold text-neon-cyan select-none shadow-md">
              {idx + 1}
            </div>

            <SafeImage
              src={img}
              alt={`${alt} post frame ${idx + 1}`}
              objectFit="cover"
              className="w-full h-full"
            />
            
            {/* Minimal architectural gallery frame hover overlay */}
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2 text-[10px] font-mono text-zinc-100 uppercase tracking-[0.25em]">
              <Eye className="w-4 h-4 text-neon-cyan" />
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
            className="fixed inset-0 bg-black/98 z-100 flex items-center justify-center p-4 sm:p-10 select-none backdrop-blur-md"
          >
            {/* Top Bar with metadata and controls */}
            <div className="absolute top-6 inset-x-6 flex justify-between items-center z-110 pointer-events-none">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-neon-cyan tracking-[0.3em] uppercase font-bold">
                  {alt.toUpperCase()}
                </span>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                  FRAME NOD_{lightboxIndex + 1 < 10 ? `0${lightboxIndex + 1}` : lightboxIndex + 1} // {enrichedImages.length}
                </span>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="pointer-events-auto p-3 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg border border-zinc-800 transition-colors cursor-pointer flex items-center justify-center"
                title="Close Lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Previous Image Trigger */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg border border-zinc-800 transition-colors pointer-events-auto cursor-pointer"
              title="Previous Frame"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Image Trigger */}
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg border border-zinc-800 transition-colors pointer-events-auto cursor-pointer"
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
              transition={{ duration: 0.3 }}
              className="relative flex items-center justify-center bg-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={enrichedImages[lightboxIndex]}
                alt={`${alt} Cinematic Zoom ${lightboxIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain rounded-xl border border-zinc-800 shadow-2xl"
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
