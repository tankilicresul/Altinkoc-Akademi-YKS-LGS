import React, { useState, useEffect } from 'react';
import BrandLogo from './BrandLogo';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Sparkles, UserCheck, ShieldCheck, ArrowRight, Calculator, LogIn, LogOut, User } from 'lucide-react';

export default function Navbar({ activeSection, setActiveSection, currentPortalMode, setPortalMode, onOpenApplyModal, onOpenAuthModal }) {
  const { currentUser, isAdmin, isApprovedStudentOrMentor, logout, ADMIN_EMAIL } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
          ? 'bg-white/98 backdrop-blur-md border-b-2 border-slate-200 shadow-md py-2.5'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-200 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Hashtag */}
          <div className="flex items-center gap-3">
            <div onClick={() => handleNavClick('home')}>
              <BrandLogo />
            </div>

            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black hashtag-badge shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#F26422]" />
              <span>#çarealtınkoç</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1.5 rounded-full border border-slate-300">
            {navLinks.map((link) => {
              const isActive = currentPortalMode === 'public' && activeSection === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 text-xs lg:text-sm font-extrabold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-gradient text-slate-950 shadow-md shadow-orange-500/20'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/80'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 text-[#F26422]" />}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* USER AUTHENTICATION & ROLE ACCESS CONTROL AREA */}
          <div className="hidden xl:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-300">
                {/* Active Panel Switcher based on role */}
                {isAdmin ? (
                  <button
                    onClick={() => setPortalMode('admin')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black rounded-xl transition ${
                      currentPortalMode === 'admin'
                        ? 'bg-[#F26422] text-white shadow-sm'
                        : 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-[#F5A623]" />
                    <span>Yönetici CMS</span>
                  </button>
                ) : isApprovedStudentOrMentor ? (
                  <button
                    onClick={() => setPortalMode('student')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black rounded-xl transition ${
                      currentPortalMode === 'student'
                        ? 'bg-[#F5A623] text-slate-950 shadow-sm'
                        : 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <span>Öğrenci Paneli</span>
                  </button>
                ) : (
                  <span className="px-3 py-1.5 text-xs font-bold text-amber-800 bg-amber-50 rounded-xl border border-amber-200">
                    Onay Bekliyor
                  </span>
                )}

                {/* User Info Badge */}
                <div className="px-3 py-1 text-xs font-black text-slate-800 flex items-center gap-1.5 border-l border-slate-300">
                  <User className="w-3.5 h-3.5 text-[#F26422]" />
                  <span className="max-w-[120px] truncate">{currentUser.name}</span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="p-1.5 bg-slate-200 hover:bg-rose-100 text-slate-700 hover:text-rose-700 rounded-xl transition"
                  title="Çıkış Yap"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Anonymous Visitor: Show Login & Register Button */
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold px-4 py-2 rounded-xl text-xs border border-slate-300 transition shadow-xs"
              >
                <LogIn className="w-4 h-4 text-[#F26422]" />
                <span>Giriş Yap / Kaydol</span>
              </button>
            )}

            <button
              onClick={onOpenApplyModal}
              className="flex items-center gap-2 bg-brand-gradient bg-brand-gradient-hover text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs lg:text-sm transition-all duration-200 shadow-md shadow-orange-500/20 hover:shadow-orange-500/35 hover:scale-105"
            >
              <span>Hemen Başvur</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            {!currentUser && (
              <button
                onClick={onOpenAuthModal}
                className="bg-slate-100 text-slate-900 font-bold px-2.5 py-1.5 rounded-lg text-xs border border-slate-300"
              >
                Giriş
              </button>
            )}
            <button
              onClick={onOpenApplyModal}
              className="bg-brand-gradient text-slate-950 font-black px-3 py-1.5 rounded-lg text-xs"
            >
              Başvur
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-950 bg-slate-100 rounded-xl border border-slate-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-white border-2 border-slate-300 rounded-2xl shadow-2xl space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-4 py-3 rounded-xl font-black text-sm transition-all ${
                    activeSection === link.id
                      ? 'bg-brand-gradient text-slate-950 shadow-sm'
                      : 'bg-slate-50 text-slate-900 border border-slate-200'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {currentUser ? (
              <div className="p-3 bg-slate-100 rounded-xl flex items-center justify-between text-xs font-bold">
                <span>{currentUser.name} ({currentUser.role})</span>
                <button onClick={logout} className="text-rose-600 font-black">Çıkış Yap</button>
              </div>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuthModal(); }}
                className="w-full py-3 bg-[#F5A623] text-slate-950 font-black rounded-xl text-center text-sm"
              >
                Giriş Yap / Kaydol
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
