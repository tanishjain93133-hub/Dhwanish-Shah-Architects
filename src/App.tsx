/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS_IMAGES, ProjectImageItem } from "./data";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProjectShowcase from "./components/ProjectShowcase";
import { InteractiveGallery } from "./components/InteractiveGallery";
import InquiryModal from "./components/InquiryModal";
import Footer from "./components/Footer";

export default function App() {
  const [lightMode, setLightMode] = useState<"day" | "evening">("evening");
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedHeroProject, setSelectedHeroProject] = useState<ProjectImageItem | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [loading, setLoading] = useState(true);

  // Initial loading screen simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Update active section on window scroll
  useEffect(() => {
    const handleScroll = () => {
      const projectsEl = document.getElementById("projects");
      const scrollPosition = window.scrollY + 180;
      
      if (projectsEl && scrollPosition >= projectsEl.offsetTop) {
        setActiveSection("projects");
      } else {
        setActiveSection("home");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-zinc-900 select-none no-scrollbar">
      
      {/* 1. Custom High-End Preloader with Static Logo */}
      <AnimatePresence>
        {loading && (
          <motion.div
            id="dsa-app-preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#000000] z-[9999] flex flex-col justify-center items-center p-6 select-none"
          >
            <motion.img
              src="/images/dsa-logo-black.png"
              alt="DSA Logo"
              initial={{ opacity: 0, scale: 1.0 }}
              animate={{ 
                opacity: 1, 
                scale: [1.0, 1.03, 1.0],
              }}
              transition={{
                opacity: { duration: 0.6, ease: "easeOut" },
                scale: { repeat: Infinity, duration: 2.2, ease: "easeInOut" }
              }}
              className="w-[75px] h-[75px] md:w-[110px] md:h-[110px] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Glassmorphic Sticky Header */}
      <Header
        lightMode={lightMode}
        setLightMode={setLightMode}
        onOpenInquiry={() => setInquiryOpen(true)}
        activeSection={activeSection}
      />

      {/* 3. Hero Interactive Showcase Slider */}
      <Hero
        projects={PROJECTS_IMAGES}
        lightMode={lightMode}
        onSelectProject={(project) => setSelectedHeroProject(project)}
      />

      {/* 4. Curated Projects Showcase (Loads directly as the main page content) */}
      <ProjectShowcase lightMode={lightMode} />

      {/* 5. Floating spec sheets details modal drawer for Hero-selected projects */}
      <AnimatePresence>
        {selectedHeroProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/95 z-50 overflow-y-auto w-full min-h-screen backdrop-blur-md"
            onClick={() => setSelectedHeroProject(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full min-h-screen bg-white text-zinc-900 px-6 pb-12 md:pb-24 flex flex-col justify-between pt-0"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky header bar */}
              <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md -mx-6 px-6 py-4 md:-mx-24 md:px-24 border-b border-zinc-200/80 shadow-xs flex items-center justify-between mb-8 sm:mb-12">
                <button
                  onClick={() => setSelectedHeroProject(null)}
                  className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-zinc-900 text-white hover:bg-blue-600 shadow-md hover:shadow-lg hover:scale-102 transition-all duration-300 text-[10px] sm:text-xs font-mono tracking-[0.15em] uppercase cursor-pointer"
                >
                  &larr; BACK TO PORTFOLIO
                </button>
              </div>

              <div className="max-w-6xl mx-auto w-full space-y-16">

                {/* Hero information block */}
                <div className="space-y-4 max-w-4xl">
                  <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-medium text-zinc-950 tracking-widest uppercase leading-none">
                    {selectedHeroProject.alt}
                  </h2>
                  <p className="text-zinc-800 text-sm md:text-base leading-relaxed tracking-wide font-normal max-w-3xl pt-2">
                    {selectedHeroProject.description}
                  </p>
                </div>

                {/* Main 3x3 Large Instagram style Reel Grid */}
                <div className="w-full bg-zinc-50 border border-zinc-200 p-4 sm:p-8 rounded-2xl">
                  <InteractiveGallery
                    images={selectedHeroProject.gallery || [selectedHeroProject.src]}
                    alt={selectedHeroProject.alt}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-20 -mx-6 -mb-12 md:-mx-24 md:-mb-24">
                <Footer />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Patron Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />

      {/* 7. Boutique Offices Footer */}
      <Footer />

      {/* Interactive Global Renders Ambient Background Overlay */}
      <div className={`fixed inset-0 -z-50 pointer-events-none transition-all duration-1000 ${
        lightMode === "evening"
          ? "bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.04),transparent_50%)]"
          : "bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.02),transparent_50%)]"
      }`} />

    </div>
  );
}
