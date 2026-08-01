import React, { useState, useEffect } from 'react';
import BrandLogo from './BrandLogo';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Sparkles, UserCheck, ShieldCheck, ArrowRight, Calculator, LogIn, LogOut, User } from 'lucide-react';

export default function Navbar({ activeSection, setActiveSection, currentPortalMode, setPortalMode, onOpenApplyModal, onOpenAuthModal }) {
  const { currentUser, isAdmin, isApprovedStudentOrMentor, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Anasayfa' },
    { id: 'dereceler', label: 'Derecelerimiz' },
    { id: 'mentorler', label: 'Mentörler' },
    { id: 'basvuru', label: 'Başvuru' },
    { id: 'analiz', label: 'Analiz & Net', icon: Calculator },
    { id: 'iletisim', label: 'İletişim' },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    if (currentPortalMode !== 'public') {
      setPortalMode('public');
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-2.5'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">

          {/* Logo */}
          <div className="cursor-pointer shrink-0" onClick={() => handleNavClick('home')}>
            <BrandLogo />
          </div>

          {/* Desktop Navigation Links (Center) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200/80">
            {navLinks.map((link) => {
              const isActive = currentPortalMode === 'public' && activeSection === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 text-xs lg:text-sm font-extrabold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-gradient text-slate-950 shadow-sm'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/60'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 text-[#F26422]" />}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden xl:flex items-center gap-3 shrink-0">
            {currentUser ? (
              <div className="flex items-center gap-2 bg-slate-100/90 pl-3 pr-1 py-1 rounded-full border border-slate-200">
                <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#F26422]" />
                  <span className="max-w-[130px] truncate">{currentUser.name}</span>
                </span>

                <button
                  onClick={logout}
                  className="p-1.5 bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-full transition shadow-xs"
                  title="Çıkış Yap"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold px-4 py-2 rounded-xl text-xs border border-slate-200 transition"
              >
                <LogIn className="w-4 h-4 text-[#F26422]" />
                <span>Giriş Yap / Kaydol</span>
              </button>
            )}

            <button
              onClick={onOpenApplyModal}
              className="flex items-center gap-2 bg-brand-gradient bg-brand-gradient-hover text-slate-950 font-black px-5 py-2 rounded-xl text-xs lg:text-sm transition-all duration-200 shadow-md shadow-orange-500/20 hover:scale-105"
            >
              <span>Hemen Başvur</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Right Quick Actions */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            {!currentUser ? (
              <button
                onClick={onOpenAuthModal}
                className="bg-slate-100 text-slate-900 font-bold px-2.5 py-1.5 rounded-lg text-xs border border-slate-200"
              >
                Giriş
              </button>
            ) : null}

            <button
              onClick={onOpenApplyModal}
              className="bg-brand-gradient text-slate-950 font-black px-3 py-1.5 rounded-lg text-xs shadow-xs"
            >
              Başvur
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 bg-slate-100 rounded-xl border border-slate-200 active:scale-95 transition"
              aria-label="Menü"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-white border-2 border-amber-300/80 rounded-2xl shadow-2xl space-y-4 animate-fadeIn">
            {currentUser && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2 text-slate-900">
                  <User className="w-4 h-4 text-[#F26422]" />
                  <span>{currentUser.name}</span>
                </div>
                <button onClick={logout} className="text-rose-600 font-black px-2 py-1 bg-white rounded-lg border border-rose-200">
                  Çıkış
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center gap-2 text-left px-3.5 py-3 rounded-xl font-black text-xs transition-all ${
                      isActive
                        ? 'bg-brand-gradient text-slate-950 shadow-xs'
                        : 'bg-slate-50 text-slate-800 border border-slate-200/80'
                    }`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5 text-[#F26422]" />}
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>

            {!currentUser && (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuthModal(); }}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl text-center text-xs shadow-md"
              >
                Giriş Yap / Hesaba Katıl
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
