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
      className="relative min-h-screen bg-zinc-950 flex flex-col justify-center overflow-hidden pt-24"
    >
      {/* Background Architectural Grid Accent Lines */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-white/20" />
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-white/10 hidden md:block" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 hidden lg:block" />
        <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-white/10 hidden lg:block" />
        <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-white/20" />
        <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-white/10" />
        <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-white/10" />
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
            <span className="w-1.5 h-1.5 bg-neon-cyan rounded-xs animate-ping" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.4em] text-neon-cyan uppercase">
              ARCHITECTURAL PORTFOLIO
            </span>
          </motion.div>

          {/* Massive Heading: PROJECTS */}
          <div id="hero-massive-heading" className="relative mb-6">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-sans font-bold text-white tracking-tight uppercase leading-none"
            >
              PROJECTS
            </motion.h1>
            
            {/* Elegant luxury project code index overlaid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-10 left-32 text-8xl md:text-9xl font-display font-black text-white/5 tracking-widest hidden md:block select-none pointer-events-none"
            >
              0{currentIndex + 1}
            </motion.div>
          </div>

          {/* Luxury Description (exactly as requested) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-zinc-400 font-sans text-sm md:text-base leading-relaxed tracking-wide font-light mb-8 max-w-md border-l border-white/10 pl-4"
          >
            "A collection of architectural narratives that redefine modern living through timeless aesthetics and meticulous spatial planning."
          </motion.p>

          {/* Active Project Title with dynamic hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8 p-6 rounded-xl bg-neutral-900/60 border border-zinc-800/80 backdrop-blur-md relative overflow-hidden"
          >
            {/* Soft backdrop blur decoration */}
            <div className="absolute -top-1/2 -right-1/2 w-48 h-48 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] uppercase">FEATURED RESIDENCE</span>
            </div>
            
            <h3 className="text-2xl font-display font-medium text-white tracking-widest mb-1 uppercase">
              {currentProject.alt}
            </h3>
            
            <p className="text-xs text-zinc-400 font-sans tracking-wide mb-4 line-clamp-2">
              {currentProject.description}
            </p>
            
            <button
              id={`hero-view-proj-${currentProject.id}`}
              onClick={() => onSelectProject(currentProject)}
              className="text-[10px] font-mono text-white hover:text-neon-cyan tracking-[0.25em] uppercase flex items-center gap-2 group/btn cursor-pointer transition-colors"
            >
              <span>DISCOVER ARCHITECTURE</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-2 transition-transform text-neon-cyan" />
            </button>
          </motion.div>

          {/* Navigation Slider Arrows and Progress Indicators */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-2.5">
              <button
                id="hero-prev-slide-btn"
                onClick={prevSlide}
                className="p-3 text-zinc-400 hover:text-white hover:border-zinc-500 border border-zinc-850 rounded-lg transition-all cursor-pointer bg-neutral-900/80 hover:bg-neutral-900"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                id="hero-next-slide-btn"
                onClick={nextSlide}
                className="p-3 text-zinc-400 hover:text-white hover:border-zinc-500 border border-zinc-850 rounded-lg transition-all cursor-pointer bg-neutral-900/80 hover:bg-neutral-900"
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
                    idx === currentIndex ? "w-8 bg-neon-cyan rounded-full" : "w-3 bg-zinc-800 hover:bg-zinc-650 rounded-sm"
                  }`}
                  title={`View Project ${proj.alt}`}
                />
              ))}
            </div>
          </div>

          {/* Left Social Links */}
          <div id="hero-social-links" className="flex items-center gap-6 pt-4 border-t border-zinc-900">
            <span className="text-[10px] font-mono text-zinc-500 tracking-[0.3em] uppercase">CONNECT ON SOCIALS</span>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/dsa.architects.and.interiors"
                target="_blank"
                rel="noreferrer"
                id="hero-social-instagram"
                className="text-zinc-400 hover:text-neon-cyan transition-colors duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/dsa.architects.and.interiors"
                target="_blank"
                rel="noreferrer"
                id="hero-social-facebook"
                className="text-zinc-400 hover:text-neon-cyan transition-colors duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/dsa-architects-interiors/?viewAsMember=true"
                target="_blank"
                rel="noreferrer"
                id="hero-social-linkedin"
                className="text-zinc-400 hover:text-neon-cyan transition-colors duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Right Side: Major Cinematic Image Frame with Glass Spec HUD (7 Columns) */}
        <div id="hero-right-visual" className="lg:col-span-7 flex flex-col items-center justify-center relative">
          
          <div className="relative w-full aspect-16/10 md:aspect-16/9 lg:aspect-4/3 rounded-2xl overflow-hidden border border-zinc-800 shadow-[0_0_80px_rgba(0,0,0,0.95)]">
            
            {/* Golden hour dusk overlays */}
            <div className={`absolute inset-0 z-10 pointer-events-none transition-all duration-1000 ${
              lightMode === "evening"
                ? "bg-gradient-to-t from-black via-black/30 to-purple-950/10"
                : "bg-gradient-to-t from-black/80 via-black/10 to-transparent"
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
