import React from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { useAuth } from '../context/AuthContext';
import { Edit3, ShieldCheck, LayoutDashboard } from 'lucide-react';

export default function AdminEditBar({ onOpenDashboard }) {
  const { currentUser, isAdmin } = useAuth();
  const { editMode, setEditMode } = useSiteConfig();

  if (!isAdmin) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-11 bg-slate-950 text-white border-b-2 border-amber-400 px-4 flex items-center justify-between shadow-lg text-xs font-bold">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-gradient-to-r from-[#F5A623] to-[#F26422] text-slate-950 rounded-full font-black text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>KURUCU CANLI EDİTÖR</span>
        </div>

        <span className="hidden md:inline-block text-slate-300 text-[11px]">
          Hoş geldin, <strong className="text-amber-400">{currentUser?.name}</strong>
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* Toggle Live Visual Edit Mode */}
        <button
          onClick={() => setEditMode(!editMode)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-black text-xs transition-all ${
            editMode
              ? 'bg-amber-400 text-slate-950 shadow-sm ring-2 ring-amber-300 animate-pulse'
              : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{editMode ? '✏️ Yerinde Düzenleme: AÇIK' : 'Yerinde Düzenleme Modunu Aç'}</span>
        </button>

        <button
          onClick={onOpenDashboard}
          className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-100 font-extrabold px-2.5 py-1 rounded-lg border border-slate-700 transition text-xs"
        >
          <LayoutDashboard className="w-3.5 h-3.5 text-[#F26422]" />
          <span className="hidden sm:inline">Yönetim Paneli</span>
        </button>
      </div>
    </div>
  );
}
