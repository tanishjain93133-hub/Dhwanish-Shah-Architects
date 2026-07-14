import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeImage } from '../components/SafeImage';
import { SEO } from '../components/SEO';

const AA_WEALTH_DATA = [
  { 
    image: '/images/drive_1HitK9MepXCJqmoMaisI3_pUTzvYJZA00.jpg', 
    title: 'Natural Integration', 
    desc: 'Incorporating light and openness into office design.' 
  },
  { 
    image: '/images/drive_1NPceFslGWT3fUyWn6AGSqGJPxh0a4j1A.jpg', 
    title: 'Dynamic Spaces', 
    desc: 'Versatile areas for various business needs.' 
  },
  { 
    image: '/images/drive_1JHPhEFvokVoMViai2JRY2C97I_wcZ5Ap.jpg', 
    title: 'Professional Hub', 
    desc: 'A central point for excellence and collaboration.' 
  },
  { 
    image: '/images/drive_1QD35D6_0pT2a_j9vYk2IO5-BhrRbXrwc.jpg', 
    title: 'Luminous Design', 
    desc: 'Bright and energetic work environment.' 
  },
  { 
    image: '/images/drive_1Rg-tzflx4mY1yefb608u77YANq5xeFUk.jpg', 
    title: 'Structured Elegance', 
    desc: 'Defined lines and premium material choices.' 
  },
  { 
    image: '/images/drive_1MHk72anDHYgYGtCAuWJx2GWJ02Ts97UC.jpg', 
    title: 'Elite Atmosphere', 
    desc: 'A space that exudes confidence and success.' 
  },
  { 
    image: '/images/drive_1eKA1CHzewmgRmwNRWG_oI2s_fKYrSMDL.jpg', 
    title: 'Visionary Layout', 
    desc: 'Forward-thinking space management.' 
  },
  { 
    image: '/images/drive_1fsRJBocZlFhIge-FrFCk09hJwHK3Vqpt.jpg', 
    title: 'Seamless Flow', 
    desc: 'Effortless transition between different office zones.' 
  },
  { 
    image: '/images/drive_16UwjT1SSzMIS4bVDiB8ZcntJuJcSwtrQ.jpg', 
    title: 'Design Harmony', 
    desc: 'Balanced aesthetics across the workspace.' 
  },
  { 
    image: '/images/drive_1gtqBoeZxA4aXSYVrnm_ldNO2G0aOFjhJ.jpg', 
    title: 'Crafted Excellence', 
    desc: 'High-quality finishes in every corner.' 
  },
  { 
    image: '/images/drive_14xLpEu59w4M4VNtvc7GaQid9pBAwQfd-.jpg', 
    title: 'Interior Precision', 
    desc: 'Meticulous attention to internal spatial arrangements.' 
  },
  { 
    image: '/images/drive_1z1nVJt04BqT5iYcHD8cbRbvFmKg_flY_.jpg', 
    title: 'Innovative Workplace', 
    desc: 'Setting new standards for corporate interiors.' 
  },
  { 
    image: '/images/drive_1O5txCTxKc9EoSV62XE9b09ds8eZtQ61r.jpg', 
    title: 'Clean Aesthetics', 
    desc: 'Minimalist design for maximum focus.' 
  },
  { 
    image: '/images/drive_1kxc3WSIA8ddPNzX0dIpJ4FeGhQYu7uH2.jpg', 
    title: 'Modern Nuances', 
    desc: 'Subtle design elements that add character.' 
  },
  { 
    image: '/images/drive_1-yVVcug6KYFWQvXMQntsOJWdJ7skf4Mh.jpg', 
    title: 'Modern Architecture', 
    desc: 'Contemporary commercial facade design.' 
  }
];

export const AAWealthPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-obsidian min-h-screen text-white">
      <SEO 
        title="A & A Wealth Office | Commercial Design | DSA"
        description="Explore the award-winning corporate office interiors of A & A Wealth designed by Dhwanish Shah Architects."
      />
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <a 
            href="/projects" 
            onClick={(e) => {
              e.preventDefault();
              const stackData = sessionStorage.getItem('nav-history-stack');
              const stack = stackData ? JSON.parse(stackData) : [];
              if (stack.length > 1) {
                navigate(-1);
              } else {
                navigate('/projects');
              }
            }}
            className="inline-flex items-center gap-2 text-neon-cyan text-xs font-bold tracking-[0.3em] uppercase mb-12 hover:translate-x-[-10px] transition-transform cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Projects
          </a>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              A & A <span className="text-gradient">Wealth</span>
            </h1>
            <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto font-light">
              Detailed view of the premium wealth management commercial interiors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {AA_WEALTH_DATA.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col"
              >
                <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 glass group shadow-2xl mb-6">
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
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
