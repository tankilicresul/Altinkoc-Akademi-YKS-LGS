import React from 'react';
import BrandLogo from './BrandLogo';
import { Phone, Mail, MapPin, Globe, MessageSquare, Send, ArrowUpRight } from 'lucide-react';

export default function Footer({ setActiveSection, setPortalMode, onOpenApplyModal }) {
  const handleNavClick = (id) => {
    setPortalMode('public');
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 relative overflow-hidden pt-16 pb-12">
      {/* Background Accent Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F5A623]/5 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F26422]/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="image" />
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed font-medium">
              Türkiye dereceli koçlarımız ile YKS yolculuğunda hedeflerine adım adım ulaş. Kişiselleştirilmiş takip, haftalık analiz ve özel stratejilerle <strong className="text-slate-900 font-extrabold">Altın Koç Akademi</strong> yanınızda.
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black hashtag-badge shadow-xs">
              <span>#çarealtınkoç</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-black text-sm uppercase tracking-wider">Hızlı Erişim</h4>
            <ul className="space-y-2 text-sm font-bold">
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-[#F26422] transition">Anasayfa</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('dereceler')} className="hover:text-[#F26422] transition">Derecelerimiz</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('mentorler')} className="hover:text-[#F26422] transition">Mentörlerimiz</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('analiz')} className="hover:text-[#F26422] transition">YKS Net Analizi</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('basvuru')} className="hover:text-[#F26422] transition">Koçluk Başvurusu</button>
              </li>
            </ul>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-black text-sm uppercase tracking-wider">Paneller & Portallar</h4>
            <ul className="space-y-2 text-sm font-bold">
              <li>
                <button onClick={() => setPortalMode('student')} className="flex items-center gap-1 hover:text-[#F26422] transition">
                  <span>Öğrenci Takip Paneli</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button onClick={() => setPortalMode('admin')} className="flex items-center gap-1 hover:text-[#F26422] transition">
                  <span>Yönetici & Koç CMS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button onClick={onOpenApplyModal} className="text-[#D97706] font-black hover:underline">
                  Ücretsiz Ön Görüşme Al
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-black text-sm uppercase tracking-wider">İletişim</h4>
            <div className="space-y-2.5 text-sm font-bold">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F26422]" />
                <span>+90 850 123 45 67</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F26422]" />
                <span>iletisim@altinkocakademi.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F26422] shrink-0 mt-0.5" />
                <span>Maslak Mah. Büyükdere Cad. No:142, Sarıyer / İstanbul</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Socials */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold">
          <p>© {new Date().getFullYear()} Altın Koç Akademi. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-4">
            <a href="https://altinkocakademi.com" target="_blank" rel="noreferrer" className="p-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-full transition shadow-xs" title="Web Sitesi">
              <Globe className="w-4 h-4" />
            </a>
            <a href="https://wa.me/905550000000" target="_blank" rel="noreferrer" className="p-2 bg-white border border-slate-200 hover:bg-slate-100 text-emerald-600 rounded-full transition shadow-xs" title="WhatsApp Destek">
              <MessageSquare className="w-4 h-4" />
            </a>
            <a href="https://wa.me/905550000000" target="_blank" rel="noreferrer" className="p-2 bg-white border border-slate-200 hover:bg-slate-100 text-amber-600 rounded-full transition shadow-xs" title="Hızlı İletişim">
              <Send className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
