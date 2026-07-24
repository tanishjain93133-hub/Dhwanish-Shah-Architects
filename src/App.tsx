import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/LandingHero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { OurProjectsSection } from './components/OurProjectsSection';
import { Assembly } from './components/Assembly';
import { Workspace } from './components/Workspace';
import { Lights } from './components/Lights';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Testimonials } from './components/Testimonials';
import { NebulaBackground } from './components/NebulaBackground';
import { ScrollRestoration } from './components/ScrollRestoration';
import { ProjectsShowcasePage } from './pages/ProjectsShowcasePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AnchorHousePage } from './pages/AnchorHousePage';
import { AAWealthPage } from './pages/AAWealthPage';
import { CPHouseReviewGalleryPage } from './pages/CPHouseReviewGalleryPage';
import { AAWealthReviewGalleryPage } from './pages/AAWealthReviewGalleryPage';
import { ParthShahReviewGalleryPage } from './pages/ParthShahReviewGalleryPage';
import { JSHouseReviewGalleryPage } from './pages/JSHouseReviewGalleryPage';
import { ShelaHouseReviewGalleryPage } from './pages/ShelaHouseReviewGalleryPage';
import { JDOfficeReviewGalleryPage } from './pages/JDOfficeReviewGalleryPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { SyncPage } from './pages/SyncPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { LightsPage } from './pages/LightsPage';
import { AchiraPage } from './pages/AchiraPage';
import { SEO } from './components/SEO';

const HomePage: React.FC = () => (
  <>
    <SEO 
      title="DSA | Dhwanish Shah Architects | Luxury Architecture & Interior Design"
      description="Dhwanish Shah Architects (DSA) is a premium architecture and interior design studio in Ahmedabad specializing in luxury residential, commercial, office interiors, villas, bungalows, renovation, planning, and bespoke spaces."
    />
    <NebulaBackground />
    <Navbar />
    <main>
      <Hero />
      <About />
      <Projects />
      <Testimonials />
      <OurProjectsSection />
      <Services />
      <Assembly />
      <Lights />
      <Workspace />
      <Contact />
    </main>
    <Footer />
  </>
);

export default function App() {
  React.useEffect(() => {
    fetch('/api/list-drive-ids')
      .then(res => res.json())
      .then(data => {
        if (data && data.cached) {
          (window as any).__cachedDriveIds = new Set(data.cached);
          window.dispatchEvent(new CustomEvent('cached-drive-ids-updated'));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <Router>
      <ScrollRestoration />
      <div className="relative min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsShowcasePage />} />
          <Route path="/portfolio" element={<ProjectsShowcasePage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="/anchor-house" element={<AnchorHousePage />} />
          <Route path="/aa-wealth" element={<AAWealthPage />} />
          <Route path="/cp-house-review" element={<CPHouseReviewGalleryPage />} />
          <Route path="/aa-wealth-review" element={<AAWealthReviewGalleryPage />} />
          <Route path="/parth-shah-review" element={<ParthShahReviewGalleryPage />} />
          <Route path="/js-house-review" element={<JSHouseReviewGalleryPage />} />
          <Route path="/shela-house-review" element={<ShelaHouseReviewGalleryPage />} />
          <Route path="/jd-office-review" element={<JDOfficeReviewGalleryPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/lights" element={<LightsPage />} />
          <Route path="/achira" element={<AchiraPage />} />
          <Route path="/jewellery" element={<AchiraPage />} />
          <Route path="/sync" element={<SyncPage />} />
        </Routes>
      </div>
    </Router>
  );
}
