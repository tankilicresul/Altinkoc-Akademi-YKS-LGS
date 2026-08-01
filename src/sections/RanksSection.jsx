import React, { useState, useEffect } from 'react';
import GeometricFrame from '../components/GeometricFrame';
import { Trophy, Star, ArrowRight, Sparkles, Filter, Award } from 'lucide-react';
import { INITIAL_SITE_CONTENT } from '../data/siteContent';

export default function RanksSection({ onOpenApplyModal }) {
  const [filter, setFilter] = useState('ALL');

  const [ranksList, setRanksList] = useState(() => {
    const saved = localStorage.getItem('altin_koc_ranks');
    return saved ? JSON.parse(saved) : INITIAL_SITE_CONTENT.ranks;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('altin_koc_ranks');
      if (saved) setRanksList(JSON.parse(saved));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const filteredRanks = filter === 'ALL'
    ? ranksList
    : ranksList.filter((item) => item.category === filter);

  return (
    <section id="dereceler" className="py-24 bg-white relative overflow-hidden">
      {/* Background Soft Gradients */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#F5A623]/5 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#F26422]/5 blur-3xl pointer-events-none rounded-full" />

      <GeometricFrame position="top-right" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black hashtag-badge">
              <Trophy className="w-3.5 h-3.5 text-[#F26422]" />
              <span>Gerçek Başarı Hikayeleri</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Türkiye Derecelerimiz & <span className="text-gradient-brand">Şampiyon Öğrencilerimiz</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg font-medium">
              Altın Koç Akademi derece programı ile Türkiye derecesine imza atmış öğrencilerimizin resmi YKS başarı tablosu.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0">
            {[
              { id: 'ALL', label: 'Tüm Dereceler' },
              { id: 'SAY', label: 'Sayısal' },
              { id: 'EA', label: 'Eşit Ağırlık' },
              { id: 'SOZ', label: 'Sözel' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  filter === tab.id
                    ? 'bg-brand-gradient text-slate-950 shadow-md'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* RANKS CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRanks.map((item) => (
            <div
              key={item.id}
              className="glass-panel-interactive border-2 border-amber-300/80 rounded-3xl p-6 flex flex-col justify-between space-y-4 bg-white shadow-xl hover:border-amber-400"
            >
              <div className="space-y-4">
                {/* Header Badge & Rank */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-amber-100 text-amber-900 font-black text-xs rounded-full border border-amber-300">
                    {item.rank}
                  </span>
                  <span className="text-xs font-extrabold text-slate-500">{item.year}</span>
                </div>

                {/* Name & University */}
                <div>
                  <h3 className="text-xl font-black text-slate-900">{item.name}</h3>
                  <div className="text-xs font-bold text-[#F26422] mt-0.5">{item.university}</div>
                </div>

                {/* Net Breakdown */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-black text-slate-800 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">TYT Neti:</span>
                    <span className="text-[#D97706]">{item.tytNet}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-1">
                    <span className="text-slate-500 font-bold">AYT Neti:</span>
                    <span className="text-[#F26422]">{item.aytNet}</span>
                  </div>
                </div>

                {/* Student Quote */}
                <p className="text-xs text-slate-600 font-semibold italic bg-amber-50/50 p-3 rounded-xl border border-amber-200/50">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenApplyModal}
                  className="w-full text-center text-xs font-black text-slate-900 hover:text-[#F26422] transition py-2 bg-slate-100 rounded-xl border border-slate-200 hover:bg-slate-200"
                >
                  Bu Derece İçin Koçluk Al
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Callout */}
        <div className="mt-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-8 text-slate-950 font-black flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1">
            <h4 className="text-2xl font-black text-slate-950">Sıradaki Türkiye Derecesi Sen Ol!</h4>
            <p className="text-xs sm:text-sm text-slate-900 font-extrabold opacity-90">
              YKS 2026 derece koçluğu kontenjanlarımız sınırlıdır. Hemen ücretsiz ön görüşme planlayın.
            </p>
          </div>
          <button
            onClick={onOpenApplyModal}
            className="px-8 py-4 bg-slate-950 hover:bg-slate-900 text-white font-black rounded-2xl text-sm transition shrink-0 shadow-lg hover:scale-105"
          >
            Ön Görüşme Randevusu Al
          </button>
        </div>

      </div>
    </section>
  );
}
