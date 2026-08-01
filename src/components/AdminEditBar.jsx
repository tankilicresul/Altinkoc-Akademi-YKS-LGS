import React from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { useAuth } from '../context/AuthContext';
import { Edit3, CheckCircle2, ShieldCheck, Sparkles, RefreshCw, LayoutDashboard } from 'lucide-react';

export default function AdminEditBar({ onOpenDashboard }) {
  const { currentUser, isAdmin } = useAuth();
  const { editMode, setEditMode, resetToDefault } = useSiteConfig();

  if (!isAdmin) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-slate-950 text-white border-b-2 border-amber-400 px-4 py-2 flex flex-wrap items-center justify-between gap-3 shadow-2xl text-xs font-bold animate-fadeIn">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#F5A623] to-[#F26422] text-slate-950 rounded-full font-black">
          <ShieldCheck className="w-4 h-4" />
          <span>KURUCU CANLI EDİTÖR</span>
        </div>

        <span className="hidden md:inline-block text-slate-300">
          Hoş geldin, <strong className="text-amber-400">{currentUser?.name}</strong>!
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Toggle Live Visual Edit Mode */}
        <button
          onClick={() => setEditMode(!editMode)}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-black transition-all ${
            editMode
              ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300 animate-pulse'
              : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{editMode ? '✏️ CANLI EDİTÖR: AÇIK (Sayfaya Tıkla Düzenle)' : 'Yerinde Düzenleme Modunu Aç'}</span>
        </button>

        <button
          onClick={onOpenDashboard}
          className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-extrabold px-3 py-1.5 rounded-xl border border-slate-700 transition"
        >
          <LayoutDashboard className="w-3.5 h-3.5 text-[#F26422]" />
          <span>Yönetim Paneli</span>
        </button>
      </div>
    </div>
  );
}
