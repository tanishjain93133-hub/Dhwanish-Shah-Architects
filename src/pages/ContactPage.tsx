import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Contact } from '../components/Contact';
import { SEO } from '../components/SEO';

export const ContactPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="bg-zinc-50 min-h-screen text-zinc-900">
      <SEO 
        title="Contact DSA | Inquire About Luxury Design Services"
        description="Get in touch with Dhwanish Shah Architects (DSA) for your luxury residential, commercial, or retail architecture and interior design requirements."
      />
      <Navbar />

      <main className="pt-32 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <Link 
            to="/" 
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-amber-600 text-xs font-bold tracking-[0.3em] uppercase mb-8 hover:translate-x-[-10px] transition-transform"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
};
