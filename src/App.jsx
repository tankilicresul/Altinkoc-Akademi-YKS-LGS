import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SiteConfigProvider } from './context/SiteConfigContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ApplicationModal from './components/ApplicationModal';
import AuthModal from './components/AuthModal';
import HeroSection from './sections/HeroSection';
import RanksSection from './sections/RanksSection';
import MentorsSection from './sections/MentorsSection';
import ApplySection from './sections/ApplySection';
import AnalysisSection from './sections/AnalysisSection';
import ContactSection from './sections/ContactSection';
import StudentPortal from './pages/StudentPortal';
import AdminDashboard from './pages/AdminDashboard';
import { Globe, UserCheck, ShieldCheck, Lock } from 'lucide-react';

function MainApp() {
  const { currentUser, isAdmin, isApprovedStudentOrMentor } = useAuth();
  const [activeSection, setActiveSection] = useState('home');
  const [portalMode, setPortalMode] = useState('public'); // 'public', 'student', 'admin'
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleNavigate = (sectionId) => {
    setPortalMode('public');
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleModeSwitch = (mode) => {
    if (mode === 'public') {
      setPortalMode('public');
      return;
    }

    // Require Auth for student/admin portals
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    if (mode === 'admin') {
      if (isAdmin) {
        setPortalMode('admin');
      } else {
        alert('Bu panele sadece Sistem Yöneticileri (Resul Tankılıç & Miraç Üresin) erişebilir.');
      }
      return;
    }

    if (mode === 'student') {
      if (isApprovedStudentOrMentor) {
        setPortalMode('student');
      } else {
        alert('Hesabınız için henüz Öğrenci/Mentör erişim yetkisi tanımlanmamıştır. Lütfen yöneticinizle iletişime geçin.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#F5A623] selection:text-slate-950">
      {/* Sticky Header Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        currentPortalMode={portalMode}
        setPortalMode={handleModeSwitch}
        onOpenApplyModal={() => setIsApplyModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
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

        {portalMode === 'student' && (
          isApprovedStudentOrMentor ? (
            <StudentPortal />
          ) : (
            <div className="pt-32 pb-24 text-center space-y-4 max-w-md mx-auto">
              <Lock className="w-12 h-12 text-[#F26422] mx-auto" />
              <h2 className="text-2xl font-black text-slate-900">Erişim Yetkisi Bekleniyor</h2>
              <p className="text-sm text-slate-600 font-bold">
                Öğrenci Takip Paneline erişebilmek için hesabınızın yöneticilerimiz (Resul Tankılıç / Miraç Üresin) tarafından onaylanması gerekmektedir.
              </p>
              <button
                onClick={() => setPortalMode('public')}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black"
              >
                Tanıtım Sitesine Dön
              </button>
            </div>
          )
        )}

        {portalMode === 'admin' && (
          isAdmin ? (
            <AdminDashboard />
          ) : (
            <div className="pt-32 pb-24 text-center space-y-4 max-w-md mx-auto">
              <Lock className="w-12 h-12 text-rose-600 mx-auto" />
              <h2 className="text-2xl font-black text-slate-900">Yönetici Yetkisi Gerekli</h2>
              <p className="text-sm text-slate-600 font-bold">
                Bu alana sadece kurucularımız Resul Tankılıç ve Miraç Üresin e-postaları ile giriş yapan yöneticiler erişebilir.
              </p>
              <button
                onClick={() => setPortalMode('public')}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black"
              >
                Tanıtım Sitesine Dön
              </button>
            </div>
          )
        )}
      </main>

      {/* Floating Mode Switcher Bar (visible when logged in as Admin or Student/Mentor) */}
      {currentUser && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md border border-amber-400/50 p-2 rounded-full shadow-2xl flex items-center gap-1.5 text-xs font-black">
          <button
            onClick={() => handleModeSwitch('public')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all ${
              portalMode === 'public'
                ? 'bg-brand-gradient text-slate-950 shadow-md'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Tanıtım Sitesi</span>
          </button>

          {isApprovedStudentOrMentor && (
            <button
              onClick={() => handleModeSwitch('student')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all ${
                portalMode === 'student'
                  ? 'bg-[#F5A623] text-slate-950 shadow-md'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Öğrenci Takip</span>
            </button>
          )}

          {isAdmin && (
            <button
              onClick={() => handleModeSwitch('admin')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all ${
                portalMode === 'admin'
                  ? 'bg-[#F26422] text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Yönetici CMS</span>
            </button>
          )}
        </div>
      )}

      {/* Footer */}
      <Footer
        setActiveSection={setActiveSection}
        setPortalMode={handleModeSwitch}
        onOpenApplyModal={() => setIsApplyModalOpen(true)}
      />

      {/* Modals */}
      <ApplicationModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SiteConfigProvider>
        <MainApp />
      </SiteConfigProvider>
    </AuthProvider>
  );
}
