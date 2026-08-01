import React, { useState, useEffect } from 'react';
import BrandLogo from './BrandLogo';
import { Menu, X, Sparkles, UserCheck, ShieldCheck, ArrowRight, Calculator } from 'lucide-react';

export default function Navbar({ activeSection, setActiveSection, currentPortalMode, setPortalMode, onOpenApplyModal }) {
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
          {/* Logo & Slogan Badge */}
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

          {/* Portal Switcher & Action Buttons */}
          <div className="hidden xl:flex items-center gap-3">
            {/* Mode Selector */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-300">
              <button
                onClick={() => setPortalMode('public')}
                className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all ${
                  currentPortalMode === 'public'
                    ? 'bg-white text-slate-950 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Tanıtım Sitesi
              </button>
              <button
                onClick={() => setPortalMode('student')}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-black rounded-lg transition-all ${
                  currentPortalMode === 'student'
                    ? 'bg-[#F5A623] text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                Öğrenci Paneli
              </button>
              <button
                onClick={() => setPortalMode('admin')}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-black rounded-lg transition-all ${
                  currentPortalMode === 'admin'
                    ? 'bg-[#F26422] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Yönetici CMS
              </button>
            </div>

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
            <div className="flex items-center justify-between p-2 bg-slate-100 rounded-xl text-xs font-bold border border-slate-300">
              <span className="text-slate-700">Görünüm Modu:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => { setPortalMode('public'); setMobileMenuOpen(false); }}
                  className={`px-2 py-1 rounded ${currentPortalMode === 'public' ? 'bg-[#F5A623] text-slate-950 font-bold' : 'text-slate-700'}`}
                >
                  Site
                </button>
                <button
                  onClick={() => { setPortalMode('student'); setMobileMenuOpen(false); }}
                  className={`px-2 py-1 rounded ${currentPortalMode === 'student' ? 'bg-[#F5A623] text-slate-950 font-bold' : 'text-slate-700'}`}
                >
                  Öğrenci
                </button>
                <button
                  onClick={() => { setPortalMode('admin'); setMobileMenuOpen(false); }}
                  className={`px-2 py-1 rounded ${currentPortalMode === 'admin' ? 'bg-[#F26422] text-white font-bold' : 'text-slate-700'}`}
                >
                  Admin
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
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
          </div>
        )}
      </div>
    </header>
  );
}
