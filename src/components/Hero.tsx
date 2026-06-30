import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ProjectImageItem } from "../data";
import { Instagram, Facebook, Linkedin, ArrowRight, ArrowLeft, Hexagon, Compass } from "lucide-react";
import { SafeImage } from "./SafeImage";

interface HeroProps {
  projects: ProjectImageItem[];
  lightMode: "day" | "evening";
  onSelectProject: (project: ProjectImageItem) => void;
}

export default function Hero({ projects, lightMode, onSelectProject }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  // We highlight the first 5 premium projects onto the hero slider
  const sliderProjects = projects.slice(0, 5);
  const currentProject = sliderProjects[currentIndex] || projects[0];

  return (
    <section
      id="home"
      className="relative min-h-screen bg-neutral-50 flex flex-col justify-center overflow-hidden pt-24"
    >
      {/* Background Architectural Grid Accent Lines */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-zinc-300" />
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-zinc-200 hidden md:block" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-zinc-200 hidden lg:block" />
        <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-zinc-200 hidden lg:block" />
        <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-zinc-300" />
        <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-zinc-200" />
        <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-zinc-200" />
      </div>

      {/* Main split-screen Layout */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 py-12 md:py-20">
        
        {/* Left Side: Typography & Metadata (5 Columns) */}
        <div id="hero-left-content" className="lg:col-span-5 flex flex-col justify-center relative">
          
          {/* Small label: ARCHITECTURAL PORTFOLIO */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-xs animate-ping" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.4em] text-blue-600 uppercase">
              ARCHITECTURAL PORTFOLIO
            </span>
          </motion.div>

          {/* Massive Heading: PROJECTS */}
          <div id="hero-massive-heading" className="relative mb-6">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-sans font-bold text-zinc-900 tracking-tight uppercase leading-none"
            >
              PROJECTS
            </motion.h1>
            
            {/* Elegant luxury project code index overlaid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-10 left-32 text-8xl md:text-9xl font-display font-black text-zinc-350 tracking-widest hidden md:block select-none pointer-events-none"
            >
              0{currentIndex + 1}
            </motion.div>
          </div>

          {/* Luxury Description (exactly as requested) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-zinc-600 font-sans text-sm md:text-base leading-relaxed tracking-wide font-light mb-8 max-w-md border-l border-zinc-200 pl-4"
          >
            "A collection of architectural narratives that redefine modern living through timeless aesthetics and meticulous spatial planning."
          </motion.p>

          {/* Active Project Title with dynamic hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8 p-6 rounded-xl bg-white border border-zinc-200 relative overflow-hidden shadow-sm"
          >
            {/* Soft backdrop blur decoration */}
            <div className="absolute -top-1/2 -right-1/2 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-mono text-zinc-400 tracking-[0.2em] uppercase">FEATURED RESIDENCE</span>
            </div>
            
            <h3 className="text-2xl font-display font-medium text-zinc-900 tracking-widest mb-1 uppercase">
              {currentProject.alt}
            </h3>
            
            <p className="text-xs text-zinc-600 font-sans tracking-wide mb-4 line-clamp-2">
              {currentProject.description}
            </p>
            
            <button
              id={`hero-view-proj-${currentProject.id}`}
              onClick={() => onSelectProject(currentProject)}
              className="text-[10px] font-mono text-zinc-900 hover:text-blue-600 tracking-[0.25em] uppercase flex items-center gap-2 group/btn cursor-pointer transition-colors"
            >
              <span>DISCOVER ARCHITECTURE</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-2 transition-transform text-blue-600" />
            </button>
          </motion.div>

          {/* Navigation Slider Arrows and Progress Indicators */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-2.5">
              <button
                id="hero-prev-slide-btn"
                onClick={prevSlide}
                className="p-3 text-zinc-500 hover:text-zinc-900 hover:border-zinc-400 border border-zinc-200 rounded-lg transition-all cursor-pointer bg-white hover:bg-zinc-50 shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                id="hero-next-slide-btn"
                onClick={nextSlide}
                className="p-3 text-zinc-500 hover:text-zinc-900 hover:border-zinc-400 border border-zinc-200 rounded-lg transition-all cursor-pointer bg-white hover:bg-zinc-50 shadow-xs"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex gap-1.5">
              {sliderProjects.map((proj, idx) => (
                <button
                  key={proj.id}
                  id={`hero-slide-dot-${idx}`}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1 cursor-pointer transition-all duration-500 ${
                    idx === currentIndex ? "w-8 bg-blue-600 rounded-full" : "w-3 bg-zinc-300 hover:bg-zinc-400 rounded-sm"
                  }`}
                  title={`View Project ${proj.alt}`}
                />
              ))}
            </div>
          </div>

          {/* Left Social Links */}
          <div id="hero-social-links" className="flex items-center gap-6 pt-4 border-t border-zinc-250">
            <span className="text-[12px] font-mono text-zinc-500 tracking-[0.3em] uppercase">CONNECT ON SOCIALS</span>
            <div className="flex gap-4 items-center">
              <a
                href="https://www.instagram.com/dsa.architects.and.interiors"
                target="_blank"
                rel="noreferrer"
                id="hero-social-instagram"
                className="text-zinc-500 hover:text-blue-600 transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/dsa.architects.and.interiors"
                target="_blank"
                rel="noreferrer"
                id="hero-social-facebook"
                className="text-zinc-500 hover:text-blue-600 transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/dsa-architects-interiors/?viewAsMember=true"
                target="_blank"
                rel="noreferrer"
                id="hero-social-linkedin"
                className="text-zinc-500 hover:text-blue-600 transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Right Side: Major Cinematic Image Frame with Glass Spec HUD (7 Columns) */}
        <div id="hero-right-visual" className="lg:col-span-7 flex flex-col items-center justify-center relative">
          
          <div className="relative w-full aspect-16/10 md:aspect-16/9 lg:aspect-4/3 rounded-2xl overflow-hidden border border-zinc-200 shadow-lg">
            
            {/* Golden hour dusk overlays */}
            <div className={`absolute inset-0 z-10 pointer-events-none transition-all duration-1000 ${
              lightMode === "evening"
                ? "bg-gradient-to-t from-black/30 via-black/5 to-transparent"
                : "bg-gradient-to-t from-black/20 via-black/0 to-transparent"
             }`}
            />

            {/* Day/Night images directly rendered */}
            <div className="w-full h-full">
              <SafeImage
                src={currentProject.src}
                alt={currentProject.alt}
                objectFit="cover"
                className="w-full h-full select-none hover:scale-103 transition-transform duration-[3s]"
              />
            </div>


          </div>

        </div>

      </div>
    </section>
  );
}
