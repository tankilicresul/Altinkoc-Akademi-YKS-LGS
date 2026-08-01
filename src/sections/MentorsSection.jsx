import React, { useState, useEffect } from 'react';
import GeometricFrame from '../components/GeometricFrame';
import { GraduationCap, Award, Star, MessageSquare, CheckCircle, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';
import { INITIAL_SITE_CONTENT } from '../data/siteContent';

export default function MentorsSection({ onOpenApplyModal }) {
  const [mentorsList, setMentorsList] = useState(() => {
    const saved = localStorage.getItem('altin_koc_mentors');
    return saved ? JSON.parse(saved) : INITIAL_SITE_CONTENT.mentors;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('altin_koc_mentors');
      if (saved) setMentorsList(JSON.parse(saved));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <section id="mentorler" className="py-24 bg-[#f8fafc] relative overflow-hidden">
      <GeometricFrame position="bottom-left" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black hashtag-badge">
            <GraduationCap className="w-3.5 h-3.5 text-[#F26422]" />
            <span>Kurucularımız & Türkiye Dereceli Mentör Kadromuz</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Sadece Derece Yapmış <span className="text-gradient-brand">Koçlarla Çalışın</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg font-medium">
            Kurucularımız Resul Tankılıç, Miraç Üresin ve Türkiye dereceli koçlarımız kendi 1.lik stratejilerini birebir haftalık programlarla öğrencilere aktarır.
          </p>
        </div>

        {/* MENTORS CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mentorsList.map((mentor) => {
            const isFounder = mentor.isFounder || mentor.name.includes('Resul') || mentor.name.includes('Miraç');
            return (
              <div
                key={mentor.id}
                className={`glass-panel-interactive border-2 ${
                  isFounder ? 'border-[#F26422] shadow-2xl bg-amber-50/20' : 'border-amber-300 bg-white'
                } rounded-3xl p-6 md:p-8 shadow-xl space-y-5 flex flex-col justify-between relative overflow-hidden`}
              >
                {/* Founder Badge Banner */}
                {isFounder && (
                  <div className="absolute top-0 right-0 bg-brand-gradient text-slate-950 px-4 py-1 rounded-bl-2xl text-[10px] font-black tracking-wider uppercase flex items-center gap-1 shadow-sm">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Kurucu Mentör</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Header Badge */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="px-3 py-1 bg-amber-100 text-amber-900 font-black text-xs rounded-full border border-amber-300 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>{mentor.yksRank}</span>
                    </span>
                  </div>

                  {/* Avatar & Name */}
                  <div className="flex items-center gap-4 pt-2">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-300 shadow-md"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xl font-black text-slate-900">{mentor.name}</h3>
                      </div>
                      <div className="text-xs font-bold text-[#F26422]">{mentor.university}</div>
                      <div className="text-[11px] text-slate-500 font-bold mt-0.5">{mentor.experience}</div>
                    </div>
                  </div>

                  {/* Specialty Box */}
                  <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-xs font-extrabold text-slate-800 space-y-1 shadow-xs">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-black">Uzmanlık Alanı:</div>
                    <div className="text-slate-900 font-black">{mentor.specialty}</div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                    {mentor.bio}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenApplyModal}
                    className="w-full flex items-center justify-center gap-2 bg-brand-gradient bg-brand-gradient-hover text-slate-950 font-black py-3 rounded-2xl text-xs transition shadow-md shadow-orange-500/20 hover:scale-105"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>{mentor.name} İle Eşleş</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
