import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import AboutPage from '@/pages/AboutPage';
import ExperiencePage from '@/pages/ExperiencePage';
import PublicationsPage from '@/pages/PublicationsPage';
import CertificationsPage from '@/pages/CertificationsPage';
import GalleryPage from '@/pages/GalleryPage';
import ProjectsPage from '@/pages/ProjectsPage';
import ContactPage from '@/pages/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-100/90 via-sky-50/80 to-blue-100/60 text-slate-900 selection:bg-sky-500/20 font-['Inter'] relative overflow-x-hidden">
        {/* Ambient Light Blue Soft Background Orbs */}
        <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-sky-300/40 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="fixed top-1/3 right-10 w-[550px] h-[550px] bg-blue-200/50 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="fixed bottom-10 left-10 w-[500px] h-[500px] bg-cyan-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
