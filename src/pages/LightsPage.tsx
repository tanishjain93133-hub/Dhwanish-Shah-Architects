import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Lights } from '../components/Lights';
import { SEO } from '../components/SEO';

export const LightsPage: React.FC = () => {
  return (
    <div className="bg-[#050505] min-h-screen text-white">
      <SEO 
        title="Luxury Lighting Design | Dhwanish Shah Architects"
        description="Experience luxury bespoke lighting, modern installations, and custom light layouts by Dhwanish Shah Architects."
      />
      <Navbar />
      <main className="pt-32 pb-6">
        <Lights />
      </main>
      <Footer />
    </div>
  );
};
