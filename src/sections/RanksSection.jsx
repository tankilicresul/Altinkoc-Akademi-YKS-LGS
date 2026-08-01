import React, { useState } from 'react';
import GeometricFrame from '../components/GeometricFrame';
import { Award, Trophy, Star, ArrowUpRight, CheckCircle } from 'lucide-react';

export default function RanksSection({ onOpenApplyModal }) {
  const [filter, setFilter] = useState('ALL');

  const rankStudents = [
    {
      id: 1,
      name: 'Eren Yılmaz',
      rank: 'Türkiye 1.si',
      field: 'SAY',
      university: 'Boğaziçi Üniversitesi',
      department: 'Bilgisayar Mühendisliği',
      quote: 'Altın Koç’un deneme analizleri ve haftalık soru hedeflemesi olmasaydı YKS 1.liği hayal kalırdı. Tam bir sistem işi!',
      tag: 'TYT: 118.75 | AYT: 80.00',
    },
    {
      id: 2,
      name: 'Zeynep Kaya',
      rank: 'Türkiye 14.sü',
      field: 'SAY',
      university: 'Hacettepe Üniversitesi',
      department: 'Tıp Fakültesi (İngilizce)',
      quote: 'AYT Matematik netlerim 25 seviyesindeyken koçumla yaptığımız doğru turlama stratejisiyle 39.25 nete yükselttim.',
      tag: 'TYT: 112.50 | AYT: 78.75',
    },
    {
      id: 3,
      name: 'Mert Aksoy',
      rank: 'Türkiye 42.si',
      field: 'EA',
      university: 'Galatasaray Üniversitesi',
      department: 'Hukuk Fakültesi',
      quote: 'Eşit ağırlıkta Edebiyat ezberi ile Matematik pratik dengesini kuran koçuma sonsuz teşekkürler. #çarealtınkoç!',
      tag: 'TYT: 108.00 | AYT: 74.50',
    },
    {
      id: 4,
      name: 'Elif Demir',
      rank: 'Türkiye 89.su',
      field: 'SAY',
      university: 'ODTÜ',
      department: 'Endüstri Mühendisliği',
      quote: 'Son 3 ay kriz anlarımı ve deneme düşüşlerimi psikolojik koçluk desteğiyle aştım. Yol haritam hep netti.',
      tag: 'TYT: 110.00 | AYT: 77.50',
    },
    {
      id: 5,
      name: 'Caner Şahin',
      rank: 'Türkiye 145.si',
      field: 'SAY',
      university: 'İTÜ',
      department: 'Yapay Zeka ve Veri Mühendisliği',
      quote: 'Yanlış yaptığım her soruyu koçumla beraber analiz edip haftalık tekrar listeme koyduk. Başarının sırrı bu.',
      tag: 'TYT: 106.25 | AYT: 76.25',
    },
    {
      id: 6,
      name: 'Selin Arslan',
      rank: 'Türkiye 210.su',
      field: 'SOZ',
      university: 'Bilkent Üniversitesi',
      department: 'İletişim ve Tasarım (Burslu)',
      quote: 'Düzenli takip sistemi olmasaydı erteleme hastalığına yenik düşerdim. Disiplini Altın Koç ile kazandım.',
      tag: 'TYT: 98.75 | AYT: 71.00',
    },
  ];

  const filtered = filter === 'ALL' ? rankStudents : rankStudents.filter((s) => s.field === filter);

  return (
    <section id="dereceler" className="py-24 bg-[#F9FAFB] relative overflow-hidden">
      {/* Corner Frame Motif */}
      <GeometricFrame position="top-left" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black hashtag-badge">
            <Trophy className="w-3.5 h-3.5 text-[#F26422]" />
            <span>Gurur Tablomuz • YKS Dereceleri</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Şans Değil, <span className="text-gradient-brand">Sistemli Çalışma:</span> Derecelerimiz
          </h2>
          <p className="text-slate-600 text-base md:text-lg font-medium">
            Altın Koç Akademi koçluk sistemiyle YKS'de Türkiye ilk 100 ve ilk 1000'e giren derece öğrencilerimizin başarı hikayeleri.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'ALL', label: 'Tüm Dereceler (500+)' },
              { id: 'SAY', label: 'Sayısal (SAY)' },
              { id: 'EA', label: 'Eşit Ağırlık (EA)' },
              { id: 'SOZ', label: 'Sözel (SÖZ)' },
            ].map((b) => (
              <button
                key={b.id}
                onClick={() => setFilter(b.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                  filter === b.id
                    ? 'bg-brand-gradient text-slate-950 shadow-md shadow-orange-500/20'
                    : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-200'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rank Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((student) => (
            <div
              key={student.id}
              className="glass-card glass-card-hover rounded-3xl p-6 relative flex flex-col justify-between overflow-hidden group bg-white border border-slate-200/80 shadow-sm"
            >
              {/* Badge ranking */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 font-black text-sm flex items-center gap-1.5 shadow-xs">
                  <Award className="w-4 h-4 text-[#F5A623]" />
                  {student.rank}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg border border-slate-200">
                  {student.field}
                </span>
              </div>

              {/* Student details */}
              <div className="space-y-3">
                <h3 className="text-xl font-black text-slate-900 group-hover:text-[#F26422] transition">
                  {student.name}
                </h3>
                <div className="text-sm font-bold text-amber-700">
                  {student.university}
                </div>
                <div className="text-xs text-slate-600 font-semibold">
                  {student.department}
                </div>

                <blockquote className="text-xs text-slate-700 italic bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200/60 relative">
                  "{student.quote}"
                </blockquote>
              </div>

              {/* Tag / Net Breakdown */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-bold">
                <span>{student.tag}</span>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="mt-12 p-8 glass-panel-interactive border border-amber-400/40 rounded-3xl text-center space-y-4 max-w-4xl mx-auto bg-white shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
            Sıradaki Derece Hikayesi <span className="text-gradient-brand">Senin Olabilir!</span>
          </h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto font-medium">
            Hemen kayıt olarak Türkiye dercelerine rehberlik etmiş koçlarımızdan biriyle 15 dakikalık ücretsiz strateji görüşmesi planla.
          </p>
          <button
            onClick={onOpenApplyModal}
            className="inline-flex items-center gap-2 bg-brand-gradient text-slate-950 font-black px-8 py-3.5 rounded-2xl text-sm transition-all shadow-md shadow-orange-500/20 hover:scale-105"
          >
            <span>Derece Programına Başvur</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
