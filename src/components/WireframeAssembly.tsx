import React from 'react';
import { motion } from 'motion/react';

export const WireframeAssembly: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <svg className="w-full h-full opacity-10" viewBox="0 0 1000 1000">
        {/* Iridescent Wireframe Lines */}
        {[...Array(15)].map((_, i) => (
          <motion.path
            key={i}
            d={`M ${Math.random() * 1000} ${Math.random() * 1000} L ${Math.random() * 1000} ${Math.random() * 1000}`}
            stroke="url(#iridescent-gradient)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0], 
              opacity: [0, 0.5, 0],
              d: [
                `M ${Math.random() * 1000} ${Math.random() * 1000} L ${Math.random() * 1000} ${Math.random() * 1000}`,
                `M ${Math.random() * 1000} ${Math.random() * 1000} L ${Math.random() * 1000} ${Math.random() * 1000}`
              ]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}

        <defs>
          <linearGradient id="iridescent-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#007AFF" />
            <stop offset="50%" stopColor="#BF5AF2" />
            <stop offset="100%" stopColor="#007AFF" />
          </linearGradient>
        </defs>

        {/* Floating Geometric Shapes (Wireframes) */}
        {[...Array(8)].map((_, i) => (
          <motion.rect
            key={`rect-${i}`}
            x={Math.random() * 800 + 100}
            y={Math.random() * 800 + 100}
            width={Math.random() * 100 + 50}
            height={Math.random() * 100 + 50}
            stroke="rgba(0, 122, 255, 0.3)"
            strokeWidth="1"
            fill="none"
            animate={{ 
              rotate: [0, 360],
              y: [0, -50, 0],
              x: [0, 30, 0]
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}
      </svg>
    </div>
  );
};
