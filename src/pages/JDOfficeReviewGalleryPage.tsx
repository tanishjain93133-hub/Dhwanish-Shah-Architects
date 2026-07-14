import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeImage } from '../components/SafeImage';
import { SEO } from '../components/SEO';

const JD_OFFICE_REVIEW_DATA = [
  { 
    image: '/images/drive_1_BEEwFeRswSl-qmhg6cGM3CSVZBNxitc.jpg', 
    title: 'Executive Presence', 
    desc: 'Refining modern office culture with deep natural tones and rich leather finishes.' 
  },
  { 
    image: '/images/drive_1BFzYFW7w2D_fSzHxGGXC0jP_9NLJ1k0O.jpg', 
    title: 'Linear Geometry', 
    desc: 'A precise layout offering fluid transitions and clutter-free focus environments.' 
  },
  { 
    image: '/images/drive_1O52HcsPN87XM4fbK7Geh4MXe4Gd49je-.jpg', 
    title: 'Corporate Luminescence', 
    desc: 'Masterfully positioned warm ceiling arrays to ensure comfort and productivity.' 
  },
  { 
    image: '/images/drive_1Y7u30gzvsxNrgdhMvs6XhsqzlEjpHY2i.jpg', 
    title: 'Bespoke Collaborations', 
    desc: 'Meeting spaces engineered to spark ideas through a premium, distraction-free environment.' 
  }
];

export const JDOfficeReviewGalleryPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    const stackData = sessionStorage.getItem('nav-history-stack');
    const stack = stackData ? JSON.parse(stackData) : [];
    if (stack.length > 1) {
      navigate(-1);
    } else {
      navigate('/testimonials');
    }
  };

  return (
    <div className="bg-obsidian min-h-screen text-white">
      <SEO 
        title="JD Office Client Review | Dhwanish Shah Architects"
        description="Read the client feedback and review gallery of JD Office corporate space designed by Dhwanish Shah Architects."
      />
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <Link 
            to="/testimonials" 
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-neon-cyan text-xs font-bold tracking-[0.3em] uppercase mb-12 hover:translate-x-[-10px] transition-transform"
          >
            <ArrowLeft size={16} /> Back to Testimonials
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight uppercase">
              Mr. Jayesh <span className="text-gradient">Patel</span> Review
            </h1>
            <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto font-light">
              Explore the premium design journey of JD Office through this exclusive review gallery.
            </p>
          </motion.div>

          {/* Watch Full Client Review */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 max-w-4xl mx-auto"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan/30 via-electric-purple/30 to-neon-cyan/30 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative glass p-12 rounded-[2.5rem] border border-white/10 bg-black/60 backdrop-blur-3xl text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight uppercase tracking-[0.05em]">
                  Watch <span className="text-gradient">Full Client Review</span>
                </h2>
                <p className="text-white/60 text-base md:text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                  See the complete one-shot experience and detailed feedback from the client about their journey with DSA.
                </p>
                
                <motion.a
                  href="https://youtu.be/PClXJVyL4sE?si=EVjXrBVgoA6qUycH"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 py-4 px-10 rounded-full bg-[#FF0000] hover:bg-[#CC0000] text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,0,0,0.3)] hover:shadow-[0_0_40px_rgba(255,0,0,0.5)] group/video"
                >
                  <div className="w-4 h-4 bg-white flex items-center justify-center" style={{ clipPath: 'polygon(20% 0%, 20% 100%, 100% 50%)' }} />
                  <span className="text-xs uppercase tracking-[0.2em] font-bold">
                    Play Full Review
                  </span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {JD_OFFICE_REVIEW_DATA.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col"
              >
                <div className="relative group/card mb-6">
                  <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 glass shadow-2xl">
                    <SafeImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                    />
                  </div>
                </div>
                <div className="px-2">
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight uppercase tracking-[0.1em]">{item.title}</h3>
                  <div className="h-px w-12 bg-neon-cyan mb-3 opacity-50" />
                  <p className="text-white/40 text-sm font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
