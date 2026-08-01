import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ApplicationModal from './components/ApplicationModal';
import HeroSection from './sections/HeroSection';
import RanksSection from './sections/RanksSection';
import MentorsSection from './sections/MentorsSection';
import ApplySection from './sections/ApplySection';
import AnalysisSection from './sections/AnalysisSection';
import ContactSection from './sections/ContactSection';
import StudentPortal from './pages/StudentPortal';
import AdminDashboard from './pages/AdminDashboard';
import { Globe, UserCheck, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [portalMode, setPortalMode] = useState('public'); // 'public', 'student', 'admin'
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const handleNavigate = (sectionId) => {
    setPortalMode('public');
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#F5A623] selection:text-slate-950">
      {/* Sticky Header Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        currentPortalMode={portalMode}
        setPortalMode={setPortalMode}
        onOpenApplyModal={() => setIsApplyModalOpen(true)}
      />

      {/* RENDER CURRENT MODE */}
      <main>
        {portalMode === 'public' && (
          <>
            <HeroSection
              onOpenApplyModal={() => setIsApplyModalOpen(true)}
              onNavigate={handleNavigate}
            />
            <RanksSection onOpenApplyModal={() => setIsApplyModalOpen(true)} />
            <MentorsSection onOpenApplyModal={() => setIsApplyModalOpen(true)} />
            <ApplySection onOpenApplyModal={() => setIsApplyModalOpen(true)} />
            <AnalysisSection onOpenApplyModal={() => setIsApplyModalOpen(true)} />
            <ContactSection />
          </>
        )}

        {portalMode === 'student' && <StudentPortal />}

        {portalMode === 'admin' && <AdminDashboard />}
      </main>

      {/* Floating Bottom Quick Mode Switcher Bar */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md border border-amber-400/50 p-2 rounded-full shadow-2xl flex items-center gap-1.5 text-xs font-black">
        <button
          onClick={() => setPortalMode('public')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all ${
            portalMode === 'public'
              ? 'bg-brand-gradient text-slate-950 shadow-md'
              : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Tanıtım Sitesi</span>
        </button>

        <button
          onClick={() => setPortalMode('student')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all ${
            portalMode === 'student'
              ? 'bg-[#F5A623] text-slate-950 shadow-md'
              : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Öğrenci Takip</span>
        </button>

        <button
          onClick={() => setPortalMode('admin')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all ${
            portalMode === 'admin'
              ? 'bg-[#F26422] text-white shadow-md'
              : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Yönetici CMS</span>
        </button>
      </div>

      {/* Footer */}
      <Footer
        setActiveSection={setActiveSection}
        setPortalMode={setPortalMode}
        onOpenApplyModal={() => setIsApplyModalOpen(true)}
      />

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
}
