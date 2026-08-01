import React from 'react';
import NetCalculator from '../components/NetCalculator';
import GeometricFrame from '../components/GeometricFrame';

export default function AnalysisSection({ onOpenApplyModal }) {
  return (
    <section id="analiz" className="py-24 bg-[#0a0a0e] relative overflow-hidden">
      <GeometricFrame position="top-left" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Performansını Ölç, <span className="text-gradient-brand">Eksiklerini Keşfet</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg">
            TYT ve AYT netlerini girerek hedeflerine ne kadar yakın olduğunu anında öğren. Altın Koç algoritması sana özel sıralama tahmini üretir.
          </p>
        </div>

        {/* Calculator Component */}
        <NetCalculator onOpenApplyModal={onOpenApplyModal} />

      </div>
    </section>
  );
}
