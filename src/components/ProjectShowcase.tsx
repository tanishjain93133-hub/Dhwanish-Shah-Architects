import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS_IMAGES, ProjectImageItem } from "../data";
import { SafeImage } from "./SafeImage";
import DomeGallery from "./DomeGallery";
import { InteractiveGallery } from "./InteractiveGallery";
import { Footer } from "./Footer";
import { cn } from "../lib/utils";
import { X, Sparkles, Compass, Award, ExternalLink, SlidersHorizontal, Layers, LayoutGrid } from "lucide-react";

interface ProjectShowcaseProps {
  lightMode: "day" | "evening";
}

export default function ProjectShowcase({ lightMode }: ProjectShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectImageItem | null>(null);

  // Handle local filter storage
  React.useEffect(() => {
    const saved = sessionStorage.getItem("projects-active-filter");
    if (saved) {
      setActiveFilter(saved);
    }
  }, []);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    sessionStorage.setItem("projects-active-filter", filter);
    
    // Smooth scroll down to outcomes grid
    const targetElement = document.getElementById("project-results-grid");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Gather all unique images: filter out non-loading files and put all custom user-uploaded images first
  const domeImages = React.useMemo(() => {
    const CORRUPTED_IMAGES = [
      "10sHG9fUvsCcHyVbG2_bwNBtsMT9LXrnE.jpg",
      "11XftRsAgmFH5D7qMo63aC_DJqsgxkg8W.jpg",
      "12vmmKtDJg-KxJPSbW3wTTg8gOxsrMFwa.jpg",
      "13dT40m1keBawrXj_LTFiqHf5L68DurIW.jpg",
      "13nXjHCUV7Xwp08vBD9hlm7_OuAj5ojeA.jpg",
      "13Q7hqay2vgWNX89s3LREPa6-6xR39cXr.jpg",
      "13T307RnsS1YhLREczMaA3LxGwzKPGd99.jpg",
      "16DTIb9D_Uc7F_EZNe2bUHR8Ho1yNrEia.jpg",
      "17DcOSeL0NDn-RTmQu1UJs7FuquZ1hGkl.jpg",
      "18SLksv2YuecX-2m5uf_0RjLZhSrBaF7P.jpg",
      "18ZAqVZ_dUvWc_Ty2yITX2JVYMpQl0C96.jpg",
      "18_7CMiYHoSYBhdpz3wpWKfoQkGwhUvof.jpg",
      "1A-GMMiT7zVSVme_9ANjVRoJpd6cbuNjY.jpg",
      "1aCHCMZzRq3yWKp1t2lsYUQoB8VAD9uTf.jpg",
      "1BNBKIOSfwDEegRlGUvlblYBZr-DZIuWB.jpg",
      "1bVVYnAZbYa0_9IOXRNHIvFMm6VlS8zXj.jpg",
      "1cb-sHqV2zBhZm-q_xzutywoL5Mk38mOx.jpg",
      "1CwpouFmp3RkObvO8v0kStEZr5Qho1upO.jpg",
      "1EBDT9KSQ0tVHiK9YAPSf2V41Rkbmk_nV.jpg",
      "1egyW-7Pk2mNGz2x_Yew2TvgZsTzTZhye.jpg",
      "1EsMLe08jkprzx3ZDo1GAcmzZH3N-Frpp.jpg",
      "1F3pCKJ3AoRscrUBLCp7lq3CuVY6H9qgW.jpg",
      "1f3UEQQ1VViht-LPMzcJ1YR4XnJe3FEM1.jpg",
      "1fRywdtBR8KPW3elUsh2gVq1DDGUKaCZO.jpg",
      "1g-gFVfcAh7GKfJKGu8Ho_mxnW_KBXBRq.jpg",
      "1hLLKbRkEReJrsKZTUt-WcNRZ-2jKmJXu.jpg",
      "1iQmVJffURWt36pHSEUDtBVea6DohwNui.jpg",
      "1IvJZ2tMlDc86dsptcjWoTjVBbn2GLJXe.jpg",
      "1JB_YIBJWi0WTA9orjsZ7CkZ4idWl_czY.jpg",
      "1JvdV2Oq0F3D9CZThPXoueFh-5jyeB0_P.jpg",
      "1kB8bKqSplggAku-hV9hXCH1--RAFnbxE.jpg",
      "1kBeDniq8YscJ_Y9hrfeT9AmRP1-FFg5b.jpg",
      "1LIvIFzb6MjxslW3Cn78ocU-0FcZqJflW.jpg",
      "1lSfBE5V_CdMKRaEKH7K6WcJvOPpxPorW.jpg",
      "1M7c0BZg5Nbhje6pCXcx6ArpwXfzrfpW8.jpg",
      "1mIw6i3D6_sdoSUAqZwnQvc1P5M_R8t35.jpg",
      "1mWy1CeWH5709dOqETSpugRmcbvZPMn84.jpg",
      "1N84kFIXt8RgGocPWEwGaF7Ei2E6TcQCl.jpg",
      "1nCDhbW97MEx7Teo-E8-0FM74rds5iXr6.jpg",
      "1NwhwZ0nGjvRJsBdTN4cdislcgS9PApia.jpg",
      "1OIqQK1dHsNWH90MLsNi_TgL24y-qD-67.jpg",
      "1OlTdX7oAFnvHokByvAo7CDRtG3Ev0jKh.jpg",
      "1ougaUOsunQBGofdyvOBG9Khbgdk0vqUv.jpg",
      "1qlBFCwSljLD0BHKzzcQLvhTz6CMEQ6vK.jpg",
      "1QLoxtToMtlmg-ipEwkZmSlumXOUQN8xl.jpg",
      "1QO4RG4r3lLjHg8LSxlGJgsL27ndNJQDR.jpg",
      "1qyYGAq-QLx_c7RdlVOSRNkC5VI3Tg_xr.jpg",
      "1Ru7DZbc773GZXuWnQv2_v5USMbOhiagQ.jpg",
      "1sN2oH3O1ZuOl6CPssgOQXNVWE-gAe6Yf.jpg",
      "1U7YxzdLn1xQcth_3bK9aNjKxS9XHEMJ9.jpg",
      "1UfmiDAau64UhaDRwp63ecE7kzN41Ha-F.jpg",
      "1uJkc_WYTa2QKKj2wXn2Ru6ZAixQQ1dHP.jpg",
      "1v6qalvsM3Qea36VXgliizpmmhqogNXId.jpg",
      "1VjfTyEtMHhfE8ISVmigmsRXnT6hq5Kys.jpg",
      "1VmORiXXnSwLwAMa6ZFZNUyFSeODRuJvZ.jpg",
      "1WC-BXDJSfS3GKFozaBavmZkHfrGeWE8k.jpg",
      "1WcsfUWRrmZ3_KCXMIssJEjm0p6WzBCld.jpg",
      "1WTeS-ivEHtUgCizv4QWCr-0OMg4-h8gT.jpg",
      "1xkHElGhMv4jn-CIUb44MF-EULoI7tVN9.jpg",
      "1xx9p6jmi5997vpWR9EBJmH1VS_ab2r6S.jpg",
      "1YKi3G5pqqWpgkGck8vVD5lvCX6foAyHp.jpg",
      "1YyyJgCvAd-Q9_dcwhd7A7YLY_MGaTjuF.jpg",
      "1zLZcMS7ehDmOXqZ3xftn68HSZIpPf-eG.jpg",
      "1zNL7CP90IA229Yj6BeTWvK_Su_mRzrRj.jpg",
      "1_2JrbLu7tQ1Un6V5mZ5BdyDyF6LeS0cY.jpg",
      "1_dQa9-W2cs1dPXmMbnpArSnl-DG6sIlb.jpg",
      "1_WQe69FYXc7h9LienyBKK-gT7t7RPEiT.jpg"
    ];

    const isCorrupted = (path: string) => {
      const parts = path.split("/");
      const filename = parts[parts.length - 1];
      return CORRUPTED_IMAGES.includes(filename);
    };

    const customImages = [
      "/images/white-house-custom-1.jpg",
      "/images/white-house-custom-2.jpg",
      "/images/white-house-custom-3.jpg",
      "/images/white-house-custom-4.jpg",
      "/images/white-house-custom-5.jpg",

      "/images/custom-dome-11.png",
      "/images/custom-dome-12.jpg",
      "/images/shlip-aaron-custom-1.jpg",
      "/images/shlip-aaron-custom-2.jpg",
      "/images/shlip-aaron-custom-3.jpg",
      "/images/shlip-aaron-custom-4.jpg",
      "/images/shlip-aaron-custom-5.jpg",
      "/images/custom-dome-1.jpg",
      "/images/custom-dome-2.jpg",
      "/images/custom-dome-4.jpg",
      "/images/custom-dome-5.jpg",
      "/images/custom-dome-6.jpg",
      "/images/custom-dome-7.jpg",
      "/images/custom-dome-8.jpg",
      "/images/custom-dome-9.jpg",
      "/images/custom-dome-10.jpg"
    ];

    const original16 = [
      "/images/1IvJZ2tMlDc86dsptcjWoTjVBbn2GLJXe.jpg",
      "/images/1WC-BXDJSfS3GKFozaBavmZkHfrGeWE8k.jpg",
      "/images/1cb-sHqV2zBhZm-q_xzutywoL5Mk38mOx.jpg",
      "/images/1A-GMMiT7zVSVme_9ANjVRoJpd6cbuNjY.jpg",
      "/images/1ATpVoCZUuKvgssfy4TcClIPCA6v8K3yz.jpg",
      "/images/1QtyrH4BL03_19HDNi4U5L8jdjWxbGmqG.jpg",
      "/images/1UlOsOlkAnM_Z-ohufO0QsFR1gQ7NzcnK.jpg",
      "/images/1zLZcMS7ehDmOXqZ3xftn68HSZIpPf-eG.jpg",
      "/images/1WTeS-ivEHtUgCizv4QWCr-0OMg4-h8gT.jpg",
      "/images/13dT40m1keBawrXj_LTFiqHf5L68DurIW.jpg",
      "/images/1OlTdX7oAFnvHokByvAo7CDRtG3Ev0jKh.jpg",
      "/images/1WcsfUWRrmZ3_KCXMIssJEjm0p6WzBCld.jpg",
      "/images/1-muYkqhKVHIFcPnOTRMuHckfveopxo9M.jpg",
      "/images/1EsMLe08jkprzx3ZDo1GAcmzZH3N-Frpp.jpg",
      "/images/1U7YxzdLn1xQcth_3bK9aNjKxS9XHEMJ9.jpg",
      "/images/1f9c0oNatpygcipVjuBuTEn6JukHXPiXT.jpg"
    ];
    
    const imagesSet = new Set<string>();
    
    // Add valid custom images first
    customImages.forEach(img => {
      if (!isCorrupted(img)) imagesSet.add(img);
    });

    // Add remaining original 16 if not corrupted
    original16.forEach(img => {
      if (!isCorrupted(img)) imagesSet.add(img);
    });
    
    // Add rest of projects images if not corrupted
    PROJECTS_IMAGES.forEach((project) => {
      if (project.src && !isCorrupted(project.src)) {
        imagesSet.add(project.src);
      }
      if (project.gallery) {
        project.gallery.forEach((img) => {
          if (!isCorrupted(img)) {
            imagesSet.add(img);
          }
        });
      }
    });
    
    return Array.from(imagesSet);
  }, []);

  const filteredProjects = activeFilter === "All"
    ? PROJECTS_IMAGES
    : PROJECTS_IMAGES.filter((p) => p.category === activeFilter);

  return (
    <div id="projects" className="relative w-full bg-white">
      
      {/* ==================== 1. FILTER CATEGORIES SECTION ==================== */}
      <section className="bg-white pt-20 pb-10 border-b border-zinc-200/60 relative overflow-hidden">
        {/* Immersive radial glows */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-25">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[140px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/3 rounded-full blur-[140px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-blue-600 text-[10px] font-black tracking-[1em] uppercase block mb-3 font-mono">
              CURATED DISCOVERY
            </span>
            <h2 className="text-zinc-950 text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-wide uppercase">
              PROJECT <span className="text-blue-600 font-bold tracking-widest">SPHERES</span>
            </h2>

          </motion.div>

          {/* Interactive Bento Box Category selection */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                name: "All",
                img: "/images/all-portfolio-bg.jpg",
                type: "Complete portfolio",
                count: PROJECTS_IMAGES.length,
              },
              {
                name: "Residential",
                img: "/images/residential-category-bg.jpg",
                type: "Living Spaces & Villas",
                count: PROJECTS_IMAGES.filter(p => p.category === "Residential").length,
              },
              {
                name: "Commercial",
                img: "/images/commercial-category-bg.jpg",
                type: "Bespoke Retail & Offices",
                count: PROJECTS_IMAGES.filter(p => p.category === "Commercial").length,
              },
              {
                name: "Sphere",
                img: "/images/1XibxVzxzjgvmI85XDUywtUpJTUus7bzM.jpg",
                type: "3D Experimental Canvas",
                count: domeImages.length,
              },
            ].map((cat, idx) => {
              const isActive = activeFilter === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => handleFilterChange(cat.name)}
                  className={cn(
                    "relative h-[150px] sm:h-[220px] rounded-2xl overflow-hidden text-left group transition-all duration-700 outline-none cursor-pointer",
                    isActive
                      ? "ring-2 ring-blue-600 ring-offset-4 ring-offset-white shadow-lg"
                      : "ring-1 ring-zinc-200 opacity-80 hover:opacity-100"
                  )}
                >
                  {/* Category Image Cover */}
                  <SafeImage
                    src={cat.img}
                    alt={cat.name}
                    objectFit="cover"
                    className="absolute inset-0 w-full h-full object-top transition-transform duration-[1.5s] group-hover:scale-110"
                  />
                  {/* Immersive overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  {/* Highlight neon-cyan tint */}
                  <div
                    className={cn(
                      "absolute inset-0 transition-opacity duration-1000 bg-blue-600/10",
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )}
                  />

                  {/* Inner text content card */}
                  <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end z-20">
                    <span className={cn(
                      "text-[9px] font-mono tracking-[0.4em] uppercase transition-all mb-1.5",
                      isActive ? "text-blue-400 font-bold" : "text-zinc-400"
                    )}>
                      {cat.type}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-medium text-white tracking-widest uppercase">
                      {cat.name}
                    </h3>

                    {/* Accent glowing trace bar */}
                    <div
                      className={cn(
                        "h-[2px] bg-blue-600 mt-2 sm:mt-4 transition-all duration-700",
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Anchor identifier scroll target */}
      <div id="project-results-grid" className="scroll-mt-24" />

      {/* ==================== 2. MAIN RESULTS DISPLAY ==================== */}
      <AnimatePresence mode="wait">
        {activeFilter === "Sphere" ? (
          <motion.section
            key="dome-gallery-viewport"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[650px] bg-white py-16"
          >
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
              <span className="text-blue-600 text-[10px] font-black tracking-[1em] uppercase block font-mono">
                DSA EARTH
              </span>
            </div>
            <DomeGallery
              images={domeImages}
              fit={0.45}
              minRadius={550}
              maxRadius={950}
              grayscale={false}
              overlayBlurColor="#ffffff"
            />
          </motion.section>
        ) : (
          <motion.section
            key="cinematic-linear-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-20 px-6 md:px-12 py-12 bg-neutral-50/60 backdrop-blur-3xl border-t border-zinc-200/50"
          >
            <div className="max-w-7xl mx-auto space-y-16">
              {filteredProjects.map((project, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setSelectedProject(project)}
                    className={cn(
                      "flex flex-col lg:flex-row gap-12 md:gap-20 items-center w-full pb-12 border-b border-zinc-200 last:border-b-0 cursor-pointer group",
                      isEven ? "" : "lg:flex-row-reverse"
                    )}
                  >
                    {/* Visual Media Block (Left/Right) */}
                    <div className="w-full lg:w-1/2 aspect-16/10 rounded-2xl overflow-hidden border border-zinc-200/60 relative bg-white shadow-md group-hover:shadow-xl transition-shadow duration-500">
                      <SafeImage
                        src={project.src}
                        alt={project.alt}
                        objectFit="cover"
                        className="w-full h-full transition-transform duration-[2.5s] ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                      

                    </div>

                    {/* Description Narrative card */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start gap-6">
                      <div className="flex items-center gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                        <span className="text-blue-600 font-mono text-[10px] font-black tracking-[0.4em] uppercase">
                          {project.category} SPECIFICATION
                        </span>
                      </div>

                      <h3 className="text-4xl md:text-5xl font-display font-medium text-zinc-950 tracking-widest uppercase leading-tight group-hover:text-blue-600 transition-colors duration-300">
                        {project.alt}
                      </h3>

                      <p className="text-zinc-800 text-sm sm:text-base leading-relaxed tracking-wide font-normal max-w-xl">
                        {project.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ==================== 3. DEEP LANDSCAPE SPECS DRAWER (LIGHTBOX) ==================== */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 overflow-y-auto w-full min-h-screen"
            onClick={() => setSelectedProject(null)}
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
                  onClick={() => setSelectedProject(null)}
                  className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-zinc-900 text-white hover:bg-blue-600 shadow-md hover:shadow-lg hover:scale-102 transition-all duration-300 text-[10px] sm:text-xs font-mono tracking-[0.15em] uppercase cursor-pointer"
                >
                  &larr; BACK TO PORTFOLIO
                </button>
              </div>

              <div className="max-w-6xl mx-auto w-full space-y-16">

                {/* Hero information block */}
                <div className="space-y-4 max-w-4xl">
                  <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-medium text-zinc-950 tracking-widest uppercase leading-none">
                    {selectedProject.alt}
                  </h2>
                  <p className="text-zinc-800 text-sm md:text-base leading-relaxed tracking-wide font-normal max-w-3xl pt-2">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Main 3x3 Large Instagram style Reel Grid */}
                <div className="w-full bg-zinc-50 border border-zinc-200 p-4 sm:p-8 rounded-2xl">
                  <InteractiveGallery
                    images={selectedProject.gallery || [selectedProject.src]}
                    alt={selectedProject.alt}
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

    </div>
  );
}
