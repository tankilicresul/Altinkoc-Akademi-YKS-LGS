import React from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';
import EditableText from './EditableText';
import EditableMedia from './EditableMedia';

export default function BrandLogo({ className = '' }) {
  const { siteConfig } = useSiteConfig();
  const logoUrl = siteConfig?.info?.logoUrl || '/images/logo/logo-clean-1.png';
  const brandName = siteConfig?.info?.brandName || 'Altın Koç Akademi';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-xs max-h-12 flex items-center justify-center overflow-hidden">
        <EditableMedia
          src={logoUrl}
          alt={brandName}
          configPath="info.logoUrl"
          className="h-9 sm:h-10 w-auto object-contain"
        />
      </div>

      <div className="flex flex-col text-left">
        <span className="text-base sm:text-lg font-black text-slate-900 leading-tight">
          <EditableText value={brandName} configPath="info.brandName" />
        </span>
        <span className="text-[10px] font-black text-[#F26422] uppercase tracking-wider">
          <EditableText value={siteConfig?.info?.hashtag || '#çarealtınkoç'} configPath="info.hashtag" />
        </span>
      </div>
    </div>
  );
}
