import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'motion/react';
// Custom wrap function to replace @motionone/utils
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function VelocityText({ children, baseVelocity = 100 }: VelocityTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  /**
   * This is a magic number to accommodate the length of the text and of the viewport
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll based on scroll speed
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  /**
   * The number of times to repeat the child text should be enough to fill the screen
   * and allow for a seamless loop.
   */
  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="flex flex-nowrap whitespace-nowrap" style={{ x }}>
        <div className="flex flex-nowrap">{children}</div>
        <div className="flex flex-nowrap">{children}</div>
        <div className="flex flex-nowrap">{children}</div>
        <div className="flex flex-nowrap">{children}</div>
      </motion.div>
    </div>
  );
}

interface ScrollVelocityProps {
  texts: string[];
  velocity?: number;
  className?: string;
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({ texts, velocity = 15 }) => {
  const half = Math.ceil(texts.length / 2);
  const row1 = texts.slice(0, half);
  const row2 = texts.slice(half);

  return (
    <section className="relative z-10 py-12 flex flex-col gap-12 overflow-hidden">
      {/* Upper Row */}
      <div className="w-full">
        <VelocityText baseVelocity={velocity}>
          {row1.map((text, i) => (
            <div 
              key={`upper-${i}`} 
              className="velocity-badge inline-flex items-center justify-center mx-10 px-8 py-4 rounded-full bg-white/[0.03] border-[1.5px] border-[#9CA3AF] backdrop-blur-2xl text-white font-sans font-black uppercase text-xl md:text-2xl tracking-tighter transition-all duration-700 hover:bg-electric-purple/10 hover:text-white hover:border-electric-purple/50 hover:scale-105 group cursor-default min-w-[180px]"
            >
              <span className="drop-shadow-md text-center group-hover:text-electric-purple transition-colors duration-500">{text}</span>
            </div>
          ))}
        </VelocityText>
      </div>

      {/* Lower Row */}
      <div className="w-full">
        <VelocityText baseVelocity={velocity}>
          {row2.map((text, i) => (
            <div 
              key={`lower-${i}`} 
              className="velocity-badge inline-flex items-center justify-center mx-10 px-8 py-4 rounded-full bg-white/[0.03] border-[1.5px] border-[#9CA3AF] backdrop-blur-2xl text-white font-sans font-black uppercase text-xl md:text-2xl tracking-tighter transition-all duration-700 hover:bg-neon-cyan/10 hover:text-white hover:border-neon-cyan/50 hover:scale-105 group cursor-default min-w-[180px]"
            >
              <span className="drop-shadow-md text-center group-hover:text-neon-cyan transition-colors duration-500">{text}</span>
            </div>
          ))}
        </VelocityText>
      </div>
    </section>
  );
};
