import React from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { SafeImage } from './SafeImage';
import { InquireModal } from './InquireModal';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isInquireOpen, setIsInquireOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: isHome ? '#home' : '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Blog', href: '/blog' },
    { name: 'Lights', href: '/lights' },
    { name: 'Jewellery', href: '/jewellery' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-200/60 shadow-sm px-6 py-3"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-zinc-200 overflow-hidden bg-white flex items-center justify-center p-0 shadow-sm">
              <img
                  src="/logo.png"
                  alt="DSA Logo"
                  className="w-full h-full object-cover"
               />
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-900 font-extrabold tracking-[0.15em] text-[10px] md:text-sm uppercase whitespace-nowrap select-none">
                Dhwanish Shah Architects
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {link.href.startsWith('http') || link.href.startsWith('#') || link.href.includes('#') ? (
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="px-4 py-2 rounded-full text-[10px] tracking-[0.2em] text-zinc-700 hover:text-amber-600 hover:bg-zinc-50 transition-all font-semibold"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className="px-4 py-2 rounded-full text-[10px] tracking-[0.2em] text-zinc-700 hover:text-amber-600 hover:bg-zinc-50 transition-all font-semibold"
                  >
                    {link.name}
                  </Link>
                )}
              </motion.div>
            ))}

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setIsInquireOpen(true)}
              className="ml-4 px-6 py-2 rounded-full bg-zinc-900 text-white text-[10px] font-bold tracking-widest hover:bg-amber-600 transition-colors shadow-md hover:shadow-lg"
            >
              Inquire
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-zinc-850 hover:text-amber-600 transition-colors p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-zinc-200/80 p-6 md:hidden flex flex-col gap-4 shadow-lg"
          >
            {navLinks.map((link) => (
              link.href.startsWith('http') || link.href.startsWith('#') || link.href.includes('#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-display font-bold text-zinc-800 hover:text-amber-600 transition-colors py-1"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-display font-bold text-zinc-800 hover:text-amber-600 transition-colors py-1"
                >
                  {link.name}
                </Link>
              )
            ))}
            <button 
              onClick={() => {
                setIsOpen(false);
                setIsInquireOpen(true);
              }}
              className="mt-4 px-6 py-4 rounded-full bg-zinc-900 text-white text-sm font-bold tracking-widest hover:bg-amber-600 transition-all shadow-md"
            >
              Inquire Now
            </button>
          </motion.div>
        )}
      </nav>

      <InquireModal isOpen={isInquireOpen} onClose={() => setIsInquireOpen(false)} />
    </>
  );
};
