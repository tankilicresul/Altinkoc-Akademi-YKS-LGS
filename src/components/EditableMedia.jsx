import React, { useRef, useState } from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { useAuth } from '../context/AuthContext';
import { uploadMediaFile } from '../utils/fileUploader';
import { Upload, Image as ImageIcon, Video, Loader2 } from 'lucide-react';

export default function EditableMedia({ src, alt = 'Media', configPath, className = '', isVideo = false, containerClassName = '' }) {
  const { editMode, updateConfigValue } = useSiteConfig();
  const { isAdmin } = useAuth();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const mediaUrl = await uploadMediaFile(file);
      if (mediaUrl) {
        updateConfigValue(configPath, mediaUrl);
      }
    } catch (err) {
      console.error('Media upload error:', err);
    }
    setUploading(false);
  };

  const isMediaVideo = isVideo || (typeof src === 'string' && (src.endsWith('.mp4') || src.endsWith('.webm') || src.startsWith('data:video')));

  return (
    <div className={`relative group ${containerClassName}`}>
      {isMediaVideo ? (
        <video
          src={src}
          controls
          className={className}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          className={className}
        />
      )}

      {isAdmin && editMode && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-200 rounded-2xl p-2 z-30">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*,video/*"
            className="hidden"
          />

          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-brand-gradient hover:bg-orange-600 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs shadow-xl scale-95 group-hover:scale-100 transition cursor-pointer"
          >
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isMediaVideo ? (
              <Video className="w-4 h-4" />
            ) : (
              <ImageIcon className="w-4 h-4" />
            )}
            <span>{uploading ? 'Yükleniyor...' : '📁 Bilgisayardan Seç'}</span>
          </button>

          <span className="text-[10px] text-white font-bold mt-1.5 drop-shadow">
            Resim veya Video Seçebilirsiniz
          </span>
        </div>
      )}
    </div>
  );
}
