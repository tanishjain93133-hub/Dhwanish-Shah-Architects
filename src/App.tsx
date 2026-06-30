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
              className="w-full min-h-screen bg-white text-zinc-900 px-6 py-12 md:py-24 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-6xl mx-auto w-full space-y-16">
                {/* Back button and title */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-200 pb-8 gap-6">
                  <button
                    onClick={() => setSelectedHeroProject(null)}
                    className="flex items-center gap-2 text-zinc-500 hover:text-blue-600 font-mono text-[9px] uppercase tracking-[0.2em] transition-colors cursor-pointer"
                  >
                    &larr; BACK TO PORTFOLIO
                  </button>

                </div>

                {/* Hero information block */}
                <div className="space-y-4 max-w-4xl">
                  <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-light text-zinc-900 tracking-widest uppercase leading-none">
                    {selectedHeroProject.alt}
                  </h2>
                  <p className="text-zinc-600 text-sm md:text-base leading-relaxed tracking-wide font-light max-w-3xl pt-2">
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
