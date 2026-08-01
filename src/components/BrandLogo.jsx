import React from 'react';

export default function BrandLogo({ variant = 'image', className = '' }) {
  return (
    <div className={`flex items-center gap-3 select-none cursor-pointer ${className}`}>
      <div className="bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center">
        <img
          src="/images/logo/logo-clean-1.png"
          alt="Altın Koç Akademi"
          className="h-9 md:h-11 w-auto object-contain"
        />
      </div>
      <div className="hidden sm:flex flex-col text-left leading-none">
        <span className="text-base font-black text-slate-900 tracking-tight flex items-center gap-1">
          <span className="text-[#F5A623]">Altın</span>
          <span className="text-[#F26422]">Koç</span>
        </span>
        <span className="text-[11px] font-extrabold text-slate-500 tracking-widest uppercase">
          Akademi
        </span>
      </div>
    </div>
  );
}
