import React from 'react';
import { motion } from 'motion/react';
import { ScrollVelocity } from './ScrollVelocity';
import CountUp from './CountUp';

const industryExpertise = [
  "Designer", "Client", "Electrician", "Plumber", "Contractor", 
  "POP", "Mistry", "AC", "Curtain", "Glass", "Plywood", 
  "Hardware", "Laminate", "List", "Paint", "Texture", "Premium Hardware", 
  "Fabricator", "Tiles", "Marble", "Fabric", "Sanitary Fixtures", 
  "Switchboard", "Chair", "Sofa", "Dining Table", "Flooring", 
  "Fan", "Handle", "Jali", "Ceiling", "Flooring"
];

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="pt-0 pb-4 bg-black/30">
      <div className="mb-12">
        <ScrollVelocity texts={industryExpertise} velocity={0.6} />
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-3xl sm:text-5xl md:text-8xl font-bold mb-8 leading-tight">
            Our Achievements <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-electric-purple">
              in Numbers
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full max-w-5xl">
            <div className="flex flex-col items-center">
              <div className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter flex items-baseline justify-center">
                <CountUp 
                  to={50} 
                  duration={3} 
                  decimals={0} 
                  className="stat-num"
                />
                <span className="stat-plus ml-0.5">+</span>
              </div>
              <p className="text-white/60 tracking-[0.3em] text-[10px] md:text-xs uppercase font-medium">
                Projects Completed
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter flex items-baseline justify-center">
                <CountUp 
                  to={7} 
                  duration={3} 
                  decimals={0} 
                  className="stat-num"
                />
                <span className="stat-plus ml-0.5">+</span>
              </div>
              <p className="text-white/60 tracking-[0.3em] text-[10px] md:text-xs uppercase font-medium">
                Years of Experience
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter flex items-baseline justify-center">
                <CountUp 
                  to={100000} 
                  duration={3} 
                  decimals={0} 
                  separator="," 
                  className="stat-num"
                />
                <span className="stat-plus ml-0.5">+</span>
              </div>
              <p className="text-white/60 tracking-[0.3em] text-[10px] md:text-xs uppercase font-medium">
                Area of sq ft design
              </p>
            </div>
          </div>
        </div>



        {/* Why Choose DSA Section */}
        <div className="mt-12 relative">
          <div className="flex flex-col items-center text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-6 tracking-tight">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-electric-purple">DSA?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[2.5rem] border-[1.5px] border-[#9CA3AF] shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-neon-cyan/30 transition-colors duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 flex items-center justify-center mb-8">
                <span className="card-num text-neon-cyan font-bold text-xl">01</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">Quality & Transparency</h3>
              <p className="text-white/70 leading-relaxed font-light bg-[#F8F8F8]/92 border border-[#E5E5E5] p-5 md:p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                At DSA, we focus on delivering quality, transparency, and a smooth experience for every client. 
                We complete projects on or before the promised timeline, ensuring no unnecessary delays. 
                We personally assist clients in selecting materials, ensuring full transparency with no hidden commissions.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] border-[1.5px] border-[#9CA3AF] shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-electric-purple/30 transition-colors duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-electric-purple/10 flex items-center justify-center mb-8">
                <span className="card-num text-electric-purple font-bold text-xl">02</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">Hassle-Free Execution</h3>
              <p className="text-white/70 leading-relaxed font-light bg-[#F8F8F8]/92 border border-[#E5E5E5] p-5 md:p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                Our team works with highly professional vendors, maintaining cleanliness, discipline, 
                and hassle-free execution at every stage. We use premium-quality materials, 
                including the best-grade plywood and finishes, to ensure durability and long-lasting results.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-10 rounded-[2.5rem] border-[1.5px] border-[#9CA3AF] shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-[#C9A66B]/30 transition-colors duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-[#C9A66B]/10 flex items-center justify-center mb-8">
                <span className="card-num text-[#C9A66B] font-bold text-xl">03</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">Balanced Solutions</h3>
              <p className="text-white/70 leading-relaxed font-light bg-[#F8F8F8]/92 border border-[#E5E5E5] p-5 md:p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                Most importantly, we balance quality with affordability — offering budget-friendly solutions 
                without compromising on design or execution. We believe that elegant architecture 
                should be accessible and sustainable for every dream space.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
