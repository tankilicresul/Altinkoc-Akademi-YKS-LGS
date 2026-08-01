import React, { useState } from 'react';
import GeometricFrame from '../components/GeometricFrame';
import { UserCheck, GraduationCap, Star, ArrowRight, Award, BookOpen, Check } from 'lucide-react';

export default function MentorsSection({ onOpenApplyModal }) {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const mentors = [
    {
      id: 1,
      name: 'Kaan Yıldırım',
      rank: 'YKS 2024 Türkiye 8.si',
      category: 'ENG',
      university: 'Boğaziçi Üniversitesi',
      department: 'Bilgisayar Mühendisliği',
      experience: '3 Yıl Koçluk Tecrübesi • 48 Derece Öğrencisi',
      specialties: ['AYT Matematik 40/40 Stratejileri', 'Soru Bankası ve Deneme Analizi', 'Süre Yönetimi & Turlama'],
      avatarBg: 'from-amber-400 to-orange-500',
    },
    {
      id: 2,
      name: 'Dr. Ayşe Nur Çelik',
      rank: 'YKS 2023 Türkiye 19.su',
      category: 'MED',
      university: 'Hacettepe Üniversitesi',
      department: 'Tıp Fakültesi (İngilizce)',
      categoryLabel: 'Tıp & Sağlık',
      experience: '4 Yıl Koçluk Tecrübesi • 62 Derece Öğrencisi',
      specialties: ['AYT Fen (Fizik/Kimya/Biyoloji) Derece Kampı', 'Haftalık Soru Takibi', 'Sınav Stresi ve Motivasyon'],
      avatarBg: 'from-orange-400 to-red-500',
    },
    {
      id: 3,
      name: 'Burak Serdar',
      rank: 'YKS 2024 Türkiye 31.si',
      category: 'ENG',
      university: 'ODTÜ',
      department: 'Elektrik-Elektronik Mühendisliği',
      experience: '2 Yıl Koçluk Tecrübesi • 35 Derece Öğrencisi',
      specialties: ['Problem Çözme Hızlandırma', 'Geometri Pratik Teknikleri', 'Mezun Öğrenci Stratejisi'],
      avatarBg: 'from-yellow-400 to-amber-500',
    },
    {
      id: 4,
      name: 'Buse Öztürk',
      rank: 'YKS 2023 Türkiye 45.si',
      category: 'LAW',
      university: 'Galatasaray Üniversitesi',
      department: 'Hukuk Fakültesi',
      categoryLabel: 'Hukuk & İİBF',
      experience: '3 Yıl Koçluk Tecrübesi • 40 Derece Öğrencisi',
      specialties: ['Eşit Ağırlık YKS 1.lik Programı', 'Edebiyat Ezber Kartları', 'TYT Türkçe Net Arttırma'],
      avatarBg: 'from-[#F5A623] to-amber-600',
    },
    {
      id: 5,
      name: 'Deniz Arda',
      rank: 'YKS 2024 Türkiye 72.si',
      category: 'ENG',
      university: 'İTÜ',
      department: 'Yapay Zeka Mühendisliği',
      experience: '2 Yıl Koçluk Tecrübesi • 29 Derece Öğrencisi',
      specialties: ['Matematik Mantık Anlama', 'Deneme Çözüm Rutinleri', 'Son 3 Ay Kamp Stratejisi'],
      avatarBg: 'from-[#F26422] to-orange-600',
    },
    {
      id: 6,
      name: 'Melis Vural',
      rank: 'YKS 2023 Türkiye 112.si',
      category: 'LANG',
      university: 'Boğaziçi Üniversitesi',
      department: 'İngiliz Dili ve Edebiyatı',
      categoryLabel: 'Dil & Sözel',
      experience: '3 Yıl Koçluk Tecrübesi • 33 Derece Öğrencisi',
      specialties: ['YDT Grammar & Kelime Kampı', 'TYT Genel Hızlandırma', 'Paragraf Çözüm Yöntemleri'],
      avatarBg: 'from-amber-500 to-yellow-600',
    },
  ];

  const filteredMentors =
    activeCategory === 'ALL' ? mentors : mentors.filter((m) => m.category === activeCategory);

  return (
    <section id="mentorler" className="py-24 bg-white relative overflow-hidden">
      <GeometricFrame position="bottom-right" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black hashtag-badge">
            <UserCheck className="w-3.5 h-3.5 text-[#F26422]" />
            <span>Türkiye Dereceli Uzman Kadro</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Sınavı Yaşamış ve Derece Yapmış <br />
            <span className="text-gradient-brand">Mentörlerimiz İle Tanış</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg font-medium">
            Altın Koç Akademi koçlarının tamamı YKS’de ilk 500 derecesi elde etmiş Boğaziçi, ODTÜ, İTÜ ve Hacettepe Tıp öğrencilerinden oluşur.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'ALL', label: 'Tüm Mentörler' },
              { id: 'ENG', label: 'Mühendislik Koçları' },
              { id: 'MED', label: 'Tıp & Sağlık Koçları' },
              { id: 'LAW', label: 'Hukuk & İİBF Koçları' },
              { id: 'LANG', label: 'Dil & Sözel Koçları' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                  activeCategory === tab.id
                    ? 'bg-brand-gradient text-slate-950 shadow-md shadow-orange-500/20'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMentors.map((m) => (
            <div
              key={m.id}
              className="glass-card glass-card-hover rounded-3xl p-6 relative flex flex-col justify-between overflow-hidden border border-slate-200 bg-white shadow-sm"
            >
              {/* Header Avatar & Rank */}
              <div className="flex items-center gap-4 mb-5">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${m.avatarBg} flex items-center justify-center text-slate-950 font-black text-2xl shadow-md shrink-0 border-2 border-white`}
                >
                  {m.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">{m.name}</h3>
                  <div className="inline-flex items-center gap-1 text-xs font-black text-[#D97706] mt-0.5">
                    <Award className="w-3.5 h-3.5 text-[#F5A623]" />
                    <span>{m.rank}</span>
                  </div>
                  <div className="text-xs text-slate-600 font-bold mt-0.5 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                    <span>{m.university}</span>
                  </div>
                </div>
              </div>

              {/* Department & Experience */}
              <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="text-xs font-extrabold text-slate-900">
                  📚 {m.department}
                </div>
                <div className="text-xs font-bold text-slate-600">
                  ⚡ {m.experience}
                </div>

                {/* Specialties */}
                <div className="pt-2 border-t border-slate-200 space-y-1.5">
                  <div className="text-[11px] uppercase font-black text-[#F26422]">Uzmanlık Stratejileri:</div>
                  {m.specialties.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onOpenApplyModal}
                className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-brand-gradient text-slate-800 hover:text-slate-950 font-black py-3 px-4 rounded-2xl text-xs transition-all duration-200 border border-slate-200 group"
              >
                <span>Bu Mentörle Eşleş</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
