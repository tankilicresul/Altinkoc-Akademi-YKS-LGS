import React from 'react';
import GeometricFrame from '../components/GeometricFrame';
import { ArrowRight, Trophy, Users, CheckCircle2, Calculator, Sparkles, Star, Building2 } from 'lucide-react';

export default function HeroSection({ onOpenApplyModal, onNavigate }) {
  const universityTags = [
    { name: 'Boğaziçi', bg: 'bg-amber-50 text-amber-900 border-amber-200' },
    { name: 'ODTÜ', bg: 'bg-orange-50 text-orange-900 border-orange-200' },
    { name: 'İTÜ', bg: 'bg-yellow-50 text-yellow-900 border-yellow-200' },
    { name: 'Hacettepe Tıp', bg: 'bg-rose-50 text-rose-900 border-rose-200' },
    { name: 'Galatasaray Hukuk', bg: 'bg-amber-100/60 text-amber-950 border-amber-300' },
    { name: 'Bilkent', bg: 'bg-slate-100 text-slate-800 border-slate-200' },
  ];

  return (
    <section id="home" className="relative min-h-[88vh] flex items-center justify-center pt-28 pb-14 bg-[#f8fafc] overflow-hidden">
      {/* Soft Background Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#F5A623]/8 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#F26422]/8 blur-3xl pointer-events-none rounded-full" />

      {/* Signature Corner Framing */}
      <GeometricFrame position="all" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* LEFT CONTENT (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Clean Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black hashtag-badge shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#F26422]" />
              <span>YKS 2026 Derece Programı • #çarealtınkoç</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              YKS Derecesi Tesadüf Değildir: <br />
              <span className="text-gradient-brand">Türkiye 1.lerinin Stratejisi</span> <br />
              Altın Koç Akademi’de!
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-700 max-w-2xl font-medium leading-relaxed">
              YKS’de Türkiye derecesi elde etmiş Boğaziçi, ODTÜ, İTÜ ve Hacettepe Tıp öğrencisi koçlarımızla kişiselleştirilmiş haftalık plan, TYT/AYT deneme net analizi ve 7/24 birebir takip.
            </p>

            {/* University Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-bold text-slate-500 mr-1">Derece Koçlarımızın Üniversiteleri:</span>
              {universityTags.map((tag, idx) => (
                <span key={idx} className={`px-2.5 py-1 rounded-lg text-xs font-extrabold border ${tag.bg}`}>
                  {tag.name}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onOpenApplyModal}
                className="flex items-center gap-2.5 bg-brand-gradient bg-brand-gradient-hover text-slate-950 font-black px-7 py-3.5 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-orange-500/20 hover:scale-105"
              >
                <span>Ücretsiz Ön Görüşme Al</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('analiz')}
                className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 font-extrabold px-6 py-3.5 rounded-xl text-sm border border-slate-300 transition shadow-xs"
              >
                <Calculator className="w-4 h-4 text-[#F26422]" />
                <span>YKS Net Analizi Yap</span>
              </button>
            </div>
          </div>

          {/* RIGHT CARD / BRAND DISPLAY (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white border-2 border-amber-300/80 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
              
              {/* Logo Box */}
              <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <img
                  src="/images/logo/logo-clean-1.png"
                  alt="Altın Koç Akademi"
                  className="w-full max-h-32 object-contain mx-auto"
                />
                <div className="flex items-center justify-center gap-1 text-amber-500 text-xs font-bold pt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-slate-700 ml-1">4.9 / 5.0 (500+ Derece Öğrencisi)</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 text-center">
                  <Trophy className="w-5 h-5 text-[#D97706] mx-auto mb-1" />
                  <div className="text-xl font-black text-slate-900">YKS #1.si</div>
                  <div className="text-[11px] text-slate-600 font-bold">Türkiye Derecesi</div>
                </div>

                <div className="bg-orange-50/60 p-4 rounded-2xl border border-orange-200 text-center">
                  <Users className="w-5 h-5 text-[#F26422] mx-auto mb-1" />
                  <div className="text-xl font-black text-slate-900">500+</div>
                  <div className="text-[11px] text-slate-600 font-bold">İlk 1000 Öğrencisi</div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                  <div className="text-xl font-black text-emerald-600">%98.4</div>
                  <div className="text-[11px] text-slate-600 font-bold">Hedef Üniversite Oranı</div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                  <div className="text-xl font-black text-amber-600">7/24</div>
                  <div className="text-[11px] text-slate-600 font-bold">Anlık Koç Desteği</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
