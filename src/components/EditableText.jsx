import React, { useState } from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { useAuth } from '../context/AuthContext';
import { Edit2, Check, X } from 'lucide-react';

export default function EditableText({ value, configPath, className = '', tag = 'span', placeholder = 'Metin girin...' }) {
  const { editMode, updateConfigValue } = useSiteConfig();
  const { isAdmin } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || '');

  const handleSave = () => {
    updateConfigValue(configPath, tempValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && tag !== 'textarea') {
      handleSave();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setTempValue(value || '');
    }
  };

  if (isAdmin && editMode) {
    if (isEditing) {
      return (
        <span className="inline-flex items-center gap-1.5 p-1 bg-amber-50 border-2 border-amber-400 rounded-xl shadow-md z-30">
          {tag === 'textarea' ? (
            <textarea
              rows="3"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-sm text-slate-900 font-bold outline-none min-w-[240px]"
            />
          ) : (
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-sm text-slate-900 font-black outline-none min-w-[180px]"
            />
          )}
          <button
            onClick={handleSave}
            className="p-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
            title="Kaydet"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setIsEditing(false); setTempValue(value || ''); }}
            className="p-1 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
            title="İptal"
          >
            <X className="w-4 h-4" />
          </button>
        </span>
      );
    }

    return (
      <span
        onClick={() => { setTempValue(value || ''); setIsEditing(true); }}
        className={`relative group cursor-pointer border-2 border-dashed border-amber-400/80 bg-amber-50/40 hover:bg-amber-100/60 p-0.5 rounded transition ${className}`}
        title="Canlı Değiştirmek İçin Tıklayın"
      >
        {value || placeholder}
        <span className="opacity-0 group-hover:opacity-100 absolute -top-3 -right-3 bg-[#F26422] text-white p-1 rounded-full shadow-md text-[10px] font-black transition z-20">
          <Edit2 className="w-3 h-3" />
        </span>
      </span>
    );
  }

  // Normal Visitor Render
  const Component = tag === 'textarea' ? 'span' : tag;
  return <Component className={className}>{value || placeholder}</Component>;
}
