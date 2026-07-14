import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeImage } from '../components/SafeImage';
import { SEO } from '../components/SEO';

const AA_WEALTH_REVIEW_DATA = [
  { 
    image: '/images/drive_11SkczFb1XHrgWcMlRyxo0Ncx1XGUsWdR.png', 
    title: 'LUXURY WITHIN BUDGET', 
    desc: 'Premium office aesthetics achieved with smart planning, functional design, and budget-conscious execution.',
    videoLink: 'https://youtube.com/shorts/IsQJ_I5lvC0?si=Ipj9R8upW-J3wP6o'
  },
  { 
    image: '/images/drive_1t2y0zdd55FJSIRuzTM54EXPCSt-7Udf5.jpg', 
    title: 'SMOOTH PROCESS', 
    desc: 'A seamless design journey with clear communication, timely execution, and hassle-free coordination.',
    videoLink: 'https://youtube.com/shorts/obSgqzNZnxM?si=X92oj335io02_qnd'
  },
  { 
    image: '/images/drive_1siPgPnVrWQFJycGfDi1gPHXgfUYocSbo.jpg', 
    title: 'DELIVERED AS PROMISED', 
    desc: 'Every expectation was fulfilled with precision, transparency, and attention to detail.',
    videoLink: 'https://youtube.com/shorts/oNgfVy2HU7U?si=_FnZsnF6dWZRqz11'
  },
  { 
    image: '/images/drive_1bp9jkz-TNVWZrSIytSx5crAzXC5uRZR_.jpg', 
    title: 'TRUSTED TEAMWORK', 
    desc: 'Strong collaboration and mutual trust helped transform the vision into a refined commercial space.',
    videoLink: 'https://youtube.com/shorts/dMq94n6C6oI?si=fJyqKXr-002R65wI'
  },
  { 
    image: '/images/drive_1lLY4JdpG34ZWglkSrAd6USmhl4_uoEqc.png', 
    title: 'COLLABORATIVE AREAS', 
    desc: 'Smartly planned spaces designed to encourage productivity, teamwork, and seamless daily workflow.',
    videoLink: 'https://youtube.com/shorts/00A-HvP5DF4?si=4zWFpWC5MsMJ0ykp'
  },
  { 
    image: '/images/drive_1E5xewnh4MFm2xWapf5HC8tHwKcbDPO5X.png', 
    title: 'REFINED WORKSPACES', 
    desc: 'Elegant office interiors combining functionality, sophistication, and modern professional aesthetics.',
    videoLink: 'https://youtube.com/shorts/oNgfVy2HU7U?si=AFjvgdJ8luVTNL-G' 
  }
];

export const AAWealthReviewGalleryPage: React.FC = () => {
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
        title="A & A Wealth Client Review | Dhwanish Shah Architects"
        description="Read the client feedback and review gallery of A & A Wealth corporate office designed by Dhwanish Shah Architects."
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
              A & A <span className="text-gradient">Wealth</span> Review
            </h1>
            <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto font-light">
               A detailed look at the premium commercial interiors of A & A Wealth through this exclusive review gallery.
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
                  href="https://youtu.be/2ZEw3Ne2YQI?si=6eOsFa8B42EM9kPu"
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
            {AA_WEALTH_REVIEW_DATA.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col"
              >
                <div className="relative group/card mb-6">
                  {item.videoLink ? (
                    <a 
                      href={item.videoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 glass shadow-2xl ring-neon-cyan/0 group-hover/card:ring-4 group-hover/card:ring-neon-cyan/20 transition-all duration-500">
                        <SafeImage
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                        />
                        {/* Video Overlay Button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                          <div className="w-16 h-16 rounded-full bg-neon-cyan text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.4)]">
                            <div className="ml-1 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-black" />
                          </div>
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 glass shadow-2xl">
                      <SafeImage
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    </div>
                  )}
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
