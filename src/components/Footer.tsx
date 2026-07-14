import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import { SafeImage } from './SafeImage';

export const Footer: React.FC = () => {
  return (
    <footer className="premium-footer py-16 relative overflow-hidden bg-[#000000] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative">
          
          {/* Left: Logo and Brand */}
          <div className="flex-1 flex flex-col items-center gap-3 text-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/10 overflow-hidden flex items-center justify-center p-0 bg-white shadow-xl hover:border-white/30 transition-all duration-300"
            >
              <img
               src="/logo.png"
               alt="DSA Logo"
               className="w-full h-full object-cover"
            />
            </motion.div>
            <span className="footer-text-primary text-[12px] md:text-[14px] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold select-none text-white">
              Dhwanish Shah Architects
            </span>
          </div>
          
          {/* Center: Social Icons */}
          <div className="flex-1 flex justify-center">
            <div className="flex gap-4 items-center">
              <a 
                href="https://www.instagram.com/dsa.architects.and.interiors?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-icon p-3 transition-all duration-300 transform hover:scale-110 active:scale-95"
                title="Instagram"
              >
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Instagram size={20} />
                </motion.div>
              </a>
              <a 
                href="https://www.facebook.com/dsa.architects.and.interiors" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-icon p-3 transition-all duration-300 transform hover:scale-110 active:scale-95"
                title="Facebook"
              >
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Facebook size={20} />
                </motion.div>
              </a>
              <a 
                href="https://www.linkedin.com/company/dsa-architects-interiors/?viewAsMember=true" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-icon p-3 transition-all duration-300 transform hover:scale-110 active:scale-95"
                title="LinkedIn"
              >
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Linkedin size={20} />
                </motion.div>
              </a>
            </div>
          </div>

          {/* Right: Copyright */}
          <div className="flex-1 flex justify-end">
            <div className="flex flex-col items-center md:items-end font-display">
              <p className="text-[10px] tracking-[0.3em] footer-text-primary uppercase font-semibold text-center md:text-right mb-1">
                © 2026 DSA ARCHITECTS & INTERIORS.
              </p>
              <p className="text-[10px] tracking-[0.3em] footer-text-secondary uppercase font-semibold text-center md:text-right">
                ALL RIGHTS RESERVED.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

