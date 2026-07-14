import React from "react";
import { Instagram, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-black border-t border-zinc-900 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left Side: Circular stamp seal logo */}
        <div className="flex items-center justify-center">
          <img
            src="/images/dsa-logo-white.jpg"
            alt="DSA Seal"
            className="w-20 h-20 object-contain rounded-full"
          />
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
