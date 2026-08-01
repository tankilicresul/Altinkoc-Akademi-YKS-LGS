import React, { useState } from 'react';
import { UserCheck, Calendar, TrendingUp, CheckSquare, MessageSquare, Award, Clock, Plus, Star, FileText } from 'lucide-react';

export default function StudentPortal() {
  const [selectedWeek, setSelectedWeek] = useState('Hafta 18 (22 - 28 Temmuz)');

  const studentData = {
    name: 'Ahmet Yılmaz',
    target: 'Boğaziçi Bilgisayar Mühendisliği (İlk 500)',
    field: 'Sayısal (SAY)',
    coach: 'Kaan Yıldırım (YKS 8.si • Boğaziçi Boun Ceng)',
    completionRate: 85,
    weeklyTargetQuestions: 1400,
    solvedQuestions: 1190,
  };

  const scheduleDays = [
    {
      day: 'Pazartesi',
      tasks: [
        { subject: 'AYT Matematik', topic: 'Türev - Max Min Problemleri', count: '120 Soru', status: 'completed' },
        { subject: 'AYT Fizik', topic: 'Elektriksel Alan & Potansiyel', count: '80 Soru', status: 'completed' },
        { subject: 'TYT Türkçe', topic: 'Paragraf Çözüm Rutini', count: '40 Soru', status: 'completed' },
      ],
    },
    {
      day: 'Salı',
      tasks: [
        { subject: 'AYT Kimya', topic: 'Organik Kimya - Alkenler', count: '90 Soru', status: 'completed' },
        { subject: 'TYT Matematik', topic: 'Problem Kampı (Hız & İşçi)', count: '100 Soru', status: 'completed' },
        { subject: 'AYT Biyoloji', topic: 'Bitki Biyolojisi', count: '75 Soru', status: 'in-progress' },
      ],
    },
    {
      day: 'Çarşamba',
      tasks: [
        { subject: 'TYT Genel Deneme', topic: '3D Yayınları Türkiye Geneli', count: '120 Soru (Deneme)', status: 'completed' },
        { subject: 'Deneme Analizi', topic: 'Yanlış Soruların Koçla İncelemesi', count: '45 Dk Görüşme', status: 'completed' },
      ],
    },
    {
      day: 'Perşembe',
      tasks: [
        { subject: 'AYT Matematik', topic: 'İntegral - Belirli İntegral', count: '140 Soru', status: 'pending' },
        { subject: 'AYT Fizik', topic: 'Manyetizma & İndüksiyon', count: '85 Soru', status: 'pending' },
      ],
    },
    {
      day: 'Cuma',
      tasks: [
        { subject: 'AYT Kimya', topic: 'Kimyasal Denge', count: '90 Soru', status: 'pending' },
        { subject: 'TYT Fen', topic: 'Genel Tekrar Testi', count: '60 Soru', status: 'pending' },
      ],
    },
  ];

  const examProgress = [
    { name: 'Deneme 12', tyt: 88.5, ayt: 52.0, total: 140.5, date: '10 Haziran' },
    { name: 'Deneme 13', tyt: 91.25, ayt: 56.5, total: 147.75, date: '17 Haziran' },
    { name: 'Deneme 14', tyt: 95.0, ayt: 61.0, total: 156.0, date: '24 Haziran' },
    { name: 'Deneme 15', tyt: 98.75, ayt: 65.25, total: 164.0, date: '08 Temmuz' },
    { name: 'Deneme 16 (Son)', tyt: 102.5, ayt: 71.0, total: 173.5, date: '22 Temmuz' },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Student Welcome Header Banner */}
        <div className="glass-panel-interactive border border-amber-300 rounded-3xl p-6 md:p-8 relative overflow-hidden bg-white shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center text-slate-950 font-black text-2xl shadow-md border-2 border-amber-300">
                AY
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900">{studentData.name}</h1>
                  <span className="px-3 py-0.5 rounded-full text-xs font-black hashtag-badge">
                    {studentData.field}
                  </span>
                </div>
                <div className="text-xs text-[#D97706] font-extrabold mt-1">
                  🎯 Hedef: <strong>{studentData.target}</strong>
                </div>
                <div className="text-xs text-slate-600 font-bold mt-0.5 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#F26422]" />
                  <span>Koçunuz: {studentData.coach}</span>
                </div>
              </div>
            </div>

            {/* Quick Action buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 bg-[#F5A623] hover:bg-amber-400 text-slate-950 font-black px-5 py-3 rounded-2xl text-xs shadow-md transition">
                <Plus className="w-4 h-4" />
                <span>Deneme Sonucu Yükle</span>
              </button>
              <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold px-4 py-3 rounded-2xl text-xs border border-slate-300 transition">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Koçuma Soru Sor</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Grid Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white">
            <div className="text-xs text-slate-500 font-black uppercase tracking-wider mb-2">Haftalık Tamamlama</div>
            <div className="text-3xl font-black text-[#D97706]">{studentData.completionRate}%</div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden border border-slate-200">
              <div className="bg-brand-gradient h-full rounded-full" style={{ width: `${studentData.completionRate}%` }} />
            </div>
            <div className="text-[11px] text-slate-600 mt-2 font-bold">Hedeflenen 1400 sorunun 1190'ı bitti.</div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white">
            <div className="text-xs text-slate-500 font-black uppercase tracking-wider mb-2">Son TYT Neti</div>
            <div className="text-3xl font-black text-amber-600">102.50 Net</div>
            <div className="text-xs text-emerald-600 font-extrabold mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Geçen haftaya göre +3.75 artış</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white">
            <div className="text-xs text-slate-500 font-black uppercase tracking-wider mb-2">Son AYT Neti</div>
            <div className="text-3xl font-black text-[#F26422]">71.00 Net</div>
            <div className="text-xs text-emerald-600 font-extrabold mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>AYT Mat 37.50 / Fizik 12.00 Net</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white">
            <div className="text-xs text-slate-500 font-black uppercase tracking-wider mb-2">Gelecek Koç Görüşmesi</div>
            <div className="text-lg font-black text-slate-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#F26422]" />
              <span>Yarın • 20:00</span>
            </div>
            <div className="text-xs text-slate-600 font-bold mt-2">Birebir Zoom Analiz Toplantısı</div>
          </div>

        </div>

        {/* Coach Note Alert */}
        <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-300 flex items-start gap-4 shadow-xs">
          <div className="p-3 bg-amber-100 rounded-xl text-[#D97706] shrink-0 border border-amber-200">
            <Star className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="text-sm font-black text-slate-900 flex items-center gap-2">
              <span>Mentör Koç Notu (Kaan Yıldırım):</span>
              <span className="text-xs text-slate-500 font-normal">Dün 18:45</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-semibold">
              "Ahmet harika bir hafta geçirdin! Son TYT denemesinde Türkçe ve Fen netlerin zirve yaptı. AYT Fizik Manyetizma testlerinde ufak hatalar var, Perşembe günkü ödeve 2 test daha ekledim. Yarın akşamki görüşmemizde Türev sorularını tek tek inceleyeceğiz."
            </p>
          </div>
        </div>

        {/* 2 COLUMNS: PROGRAM & EXAM GRAPH */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* WEEKLY STUDY PROGRAM (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#F26422]" />
                <span>Haftalık Çalışma Programım</span>
              </h3>
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                className="bg-slate-100 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-extrabold outline-none"
              >
                <option value="Hafta 18 (22 - 28 Temmuz)">Hafta 18 (22 - 28 Temmuz)</option>
                <option value="Hafta 17 (15 - 21 Temmuz)">Hafta 17 (15 - 21 Temmuz)</option>
              </select>
            </div>

            <div className="space-y-4">
              {scheduleDays.map((dayItem, dIdx) => (
                <div key={dIdx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="text-sm font-black text-[#D97706] mb-3 border-b border-slate-100 pb-2 flex items-center justify-between">
                    <span>{dayItem.day}</span>
                    <span className="text-xs text-slate-500 font-bold">{dayItem.tasks.length} Görev</span>
                  </div>

                  <div className="space-y-2">
                    {dayItem.tasks.map((task, tIdx) => (
                      <div
                        key={tIdx}
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs border border-slate-100"
                      >
                        <div className="flex items-center gap-3">
                          <CheckSquare
                            className={`w-4 h-4 ${
                              task.status === 'completed'
                                ? 'text-emerald-600'
                                : task.status === 'in-progress'
                                ? 'text-[#F5A623]'
                                : 'text-slate-400'
                            }`}
                          />
                          <div>
                            <span className="font-extrabold text-slate-900 mr-2">{task.subject}:</span>
                            <span className="text-slate-700 font-medium">{task.topic}</span>
                          </div>
                        </div>
                        <span className="font-black text-[#D97706] bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                          {task.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DENEME NET PROGRESS & STATS (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#F26422]" />
                <span>Deneme Net Gelişim Tablosu</span>
              </h3>

              <div className="space-y-4">
                {examProgress.map((ex, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-black text-slate-900">{ex.name}</span>
                      <span className="text-slate-500 font-bold">{ex.date}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                      <div className="bg-white p-2 rounded-xl border border-slate-200">
                        <div className="text-slate-500 text-[10px] font-bold">TYT</div>
                        <div className="font-extrabold text-[#D97706]">{ex.tyt} Net</div>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-slate-200">
                        <div className="text-slate-500 text-[10px] font-bold">AYT</div>
                        <div className="font-extrabold text-[#F26422]">{ex.ayt} Net</div>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-slate-200">
                        <div className="text-slate-500 text-[10px] font-bold">Toplam</div>
                        <div className="font-black text-emerald-600">{ex.total}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold py-3 rounded-xl text-xs transition border border-slate-200">
                <FileText className="w-4 h-4 text-[#F26422]" />
                <span>Tüm Deneme Detaylarını İndir (PDF)</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
