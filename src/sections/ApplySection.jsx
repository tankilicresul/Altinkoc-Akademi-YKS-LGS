import React from 'react';
import GeometricFrame from '../components/GeometricFrame';
import { Send, CheckCircle2, ShieldCheck, Sparkles, Clock, FileText } from 'lucide-react';

export default function ApplySection({ onOpenApplyModal }) {
  return (
    <section id="basvuru" className="py-24 bg-[#FFFDF7] relative overflow-hidden">
      <GeometricFrame position="all" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="glass-panel-interactive border border-amber-300 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Info (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black hashtag-badge">
                <Sparkles className="w-3.5 h-3.5 text-[#F26422]" />
                <span>Kontenjan Sınırlı • 2026 Derece Grubu</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Hayalindeki Derece İçin <br />
                <span className="text-gradient-brand">Koçluk Başvurusunu Tamamla</span>
              </h2>

              <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                Her öğrencimize haftada en az 1 saat birebir görüntülü analiz, gün aşırı soru & hedef takibi veriyoruz. Kalitemizi korumak adına her koçumuz maksimum 12 öğrenci kabul etmektedir.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm text-slate-800 font-bold">
                <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#F5A623] shrink-0" />
                  <span>Kişiselleştirilmiş 7 Günlük Ders Programı</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#F26422] shrink-0" />
                  <span>Haftalık Deneme Karnesi & Net Analizleri</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#F5A623] shrink-0" />
                  <span>1.lik Derece Materyalleri & Özet Kartlar</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#F26422] shrink-0" />
                  <span>Koç Rehberliğinde Sınav Psikolojisi</span>
                </div>
              </div>
            </div>

            {/* Right Action Box (5 cols) */}
            <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-amber-300 text-center space-y-6 shadow-xl">
              <div className="w-16 h-16 bg-amber-100 border border-amber-300 rounded-2xl flex items-center justify-center mx-auto text-[#D97706]">
                <FileText className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">3 Adımda Hızlı Başvuru</h3>
                <p className="text-xs text-slate-600 font-semibold mt-1">
                  15 dakikalık ücretsiz tanışma ve seviye tespit randevusu al.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-700 text-left font-bold">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#F5A623]" />
                  <span>Ortalama Başvuru Süresi: <strong>1 Dakika</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>%100 Ücretsiz Ön Görüşme Garantisi</span>
                </div>
              </div>

              <button
                onClick={onOpenApplyModal}
                className="w-full flex items-center justify-center gap-3 bg-brand-gradient bg-brand-gradient-hover text-slate-950 font-black px-6 py-4 rounded-2xl text-base transition-all duration-300 shadow-lg shadow-orange-500/20 hover:scale-105"
              >
                <Send className="w-5 h-5" />
                <span>Formu Başlat & Başvur</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
