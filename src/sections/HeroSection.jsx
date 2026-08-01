import React from 'react';
import GeometricFrame from '../components/GeometricFrame';
import { ArrowRight, Trophy, Users, CheckCircle2, Calculator, Sparkles, Star, Building2 } from 'lucide-react';

export default function HeroSection({ onOpenApplyModal, onNavigate }) {
  const universityTags = [
    { name: 'Boğaziçi Üniv.', bg: 'bg-amber-50 text-amber-900 border-amber-300' },
    { name: 'ODTÜ', bg: 'bg-orange-50 text-orange-900 border-orange-300' },
    { name: 'İTÜ', bg: 'bg-yellow-50 text-yellow-900 border-yellow-300' },
    { name: 'Hacettepe Tıp', bg: 'bg-rose-50 text-rose-900 border-rose-300' },
    { name: 'Galatasaray Hukuk', bg: 'bg-amber-100 text-amber-950 border-amber-400' },
    { name: 'Bilkent', bg: 'bg-slate-100 text-slate-900 border-slate-300' },
  ];

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 bg-[#f8fafc] overflow-hidden">
      {/* Background Soft Gold Radial Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#F5A623]/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#F26422]/10 blur-3xl pointer-events-none rounded-full" />

      {/* Signature Corner Framing */}
      <GeometricFrame position="all" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT CONTENT (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Hashtag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-black hashtag-badge shadow-xs">
              <Sparkles className="w-4 h-4 text-[#F26422]" />
              <span>YKS 2026 Derece Programı • #çarealtınkoç</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              YKS Derecesi Tesadüf Değildir: <br />
              <span className="text-gradient-brand">Türkiye 1.lerinin Stratejisi</span> <br />
              Altın Koç Akademi’de!
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-slate-700 max-w-2xl font-semibold leading-relaxed">
              YKS’de Türkiye derecesi elde etmiş Boğaziçi, ODTÜ, İTÜ ve Hacettepe Tıp öğrencisi koçlarımızla kişiselleştirilmiş haftalık plan, TYT/AYT deneme net analizi ve 7/24 birebir takip.
            </p>

            {/* University Mentor Tags */}
            <div className="space-y-2 pt-1">
              <div className="text-xs uppercase font-black text-slate-500 tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#F26422]" />
                <span>Derece Koçlarımızın Üniversiteleri:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {universityTags.map((tag, idx) => (
                  <span key={idx} className={`px-3 py-1 rounded-lg text-xs font-extrabold border ${tag.bg} shadow-xs`}>
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onOpenApplyModal}
                className="flex items-center gap-3 bg-brand-gradient bg-brand-gradient-hover text-slate-950 font-black px-8 py-4 rounded-2xl text-base transition-all duration-300 shadow-xl shadow-orange-500/25 hover:scale-105"
              >
                <span>Ücretsiz Ön Görüşme Al</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => onNavigate('analiz')}
                className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 font-black px-6 py-4 rounded-2xl text-base border-2 border-slate-200 transition duration-200 shadow-md"
              >
                <Calculator className="w-5 h-5 text-[#F26422]" />
                <span>YKS Net Analizi Yap</span>
              </button>
            </div>

            {/* Feature Bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t-2 border-slate-200 text-xs sm:text-sm text-slate-800 font-extrabold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5A623]" />
                <span>%100 Birebir Derece Takibi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F26422]" />
                <span>7/24 Soru & Strateji Desteği</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5A623]" />
                <span>Haftalık Deneme Karnesi</span>
              </div>
            </div>
          </div>

          {/* RIGHT CARD / LOGO DISPLAY (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white border-2 border-amber-300 rounded-3xl p-6 md:p-8 shadow-2xl relative">
              {/* Corner accent strokes */}
              <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-[#F5A623] rounded-tr-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-[#F26422] rounded-bl-3xl pointer-events-none" />

              {/* Logo Display Container */}
              <div className="text-center space-y-4 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <img
                  src="/images/logo/logo-clean-1.png"
                  alt="Altın Koç Akademi"
                  className="w-full max-h-36 object-contain"
                />
                <div className="flex items-center justify-center gap-1 text-amber-500 pt-2 border-t border-slate-200">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-extrabold text-slate-800 ml-2">4.9 / 5.0 (500+ Derece Öğrencisi)</span>
                </div>
              </div>

              {/* Live Statistics Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
                  <Trophy className="w-6 h-6 text-[#F5A623] mx-auto mb-1" />
                  <div className="text-2xl font-black text-slate-900">YKS #1.si</div>
                  <div className="text-xs text-slate-600 font-extrabold">Türkiye Derecesi</div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
                  <Users className="w-6 h-6 text-[#F26422] mx-auto mb-1" />
                  <div className="text-2xl font-black text-slate-900">500+</div>
                  <div className="text-xs text-slate-600 font-extrabold">İlk 1000 Öğrencisi</div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
                  <div className="text-2xl font-black text-emerald-600">%96.4</div>
                  <div className="text-xs text-slate-600 font-extrabold">Hedef Üniversite Oranı</div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
                  <div className="text-2xl font-black text-amber-600">7/24</div>
                  <div className="text-xs text-slate-600 font-extrabold">Anlık Koç & Soru Desteği</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
