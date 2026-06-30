import React from "react";
import { Instagram, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-black border-t border-zinc-900 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left Side: Circular stamp seal logo */}
        <div className="flex items-center justify-center">
          <div className="relative w-20 h-20 text-white">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_40s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer">
              <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="43" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path id="sealPath" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
              <text className="font-mono text-[7px] tracking-[0.22em] uppercase fill-current">
                <textPath href="#sealPath" startOffset="50%" textAnchor="middle">
                  Architects & Interiors • Estd 2003 •
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col select-none pointer-events-none">
              <div className="font-display font-black text-[13px] tracking-wider text-white leading-none">DSA</div>
              <div className="text-[7px] text-zinc-500 mt-0.5">★ ★</div>
            </div>
          </div>
        </div>

        {/* Center: Social icons inside circles */}
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://www.instagram.com/dsa.architects.and.interiors"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-blue-500 hover:border-blue-500 transition-all duration-300"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://www.facebook.com/dsa.architects.and.interiors"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-blue-500 hover:border-blue-500 transition-all duration-300"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/company/dsa-architects-interiors/?viewAsMember=true"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-blue-500 hover:border-blue-500 transition-all duration-300"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>

        {/* Right Side: Copyright details and Sync Assets */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-1 text-[9px] font-mono text-zinc-400 tracking-widest uppercase">
          <div>
            &copy; {new Date().getFullYear()} DSA ARCHITECTS & INTERIORS.
          </div>
          <div>
            ALL RIGHTS RESERVED.
          </div>
          <a
            href="#projects"
            className="text-zinc-650 hover:text-blue-500 transition-colors mt-1 block tracking-[0.3em] text-[8px]"
          >
            SYNC ASSETS
          </a>
        </div>

      </div>
    </footer>
  );
}
