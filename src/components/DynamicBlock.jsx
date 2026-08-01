import React, { useRef, useState } from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { useAuth } from '../context/AuthContext';
import { uploadMediaFile } from '../utils/fileUploader';
import { ArrowUp, ArrowDown, Trash2, Edit3, Image as ImageIcon, Video, Type, Check, X, Sparkles, ExternalLink, Plus } from 'lucide-react';

export default function DynamicBlock({ block, onUpdate, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) {
  const { editMode } = useSiteConfig();
  const { isAdmin } = useAuth();
  const fileInputRef = useRef(null);

  const [isEditingProps, setIsEditingProps] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editForm, setEditForm] = useState(block);

  const handleSaveProps = () => {
    onUpdate(editForm);
    setIsEditingProps(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const mediaUrl = await uploadMediaFile(file);
      if (mediaUrl) {
        const updated = { ...editForm, mediaUrl };
        setEditForm(updated);
        onUpdate(updated);
      }
    } catch (err) {
      console.error('File upload error:', err);
    }
    setUploading(false);
  };

  // Render for normal visitors
  const renderVisitorContent = () => {
    switch (block.type) {
      case 'heading':
        return (
          <h2 className={block.className || 'text-3xl font-black text-slate-900'}>
            {block.content}
          </h2>
        );

      case 'text':
        return (
          <p className={block.className || 'text-base text-slate-700 font-medium leading-relaxed'}>
            {block.content}
          </p>
        );

      case 'image':
        return (
          <img
            src={block.mediaUrl || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'}
            alt={block.caption || 'Görsel'}
            className={block.className || 'w-full rounded-2xl shadow-md border border-slate-200 object-cover'}
          />
        );

      case 'video':
        return (
          <video
            src={block.mediaUrl}
            controls
            className={block.className || 'w-full rounded-2xl shadow-md border border-slate-200'}
          />
        );

      case 'button':
        return (
          <a
            href={block.link || '#'}
            target={block.isExternal ? '_blank' : '_self'}
            rel="noreferrer"
            className={block.className || 'inline-flex items-center gap-2 bg-brand-gradient text-slate-950 font-black px-6 py-3.5 rounded-xl text-sm shadow-md hover:scale-105 transition'}
          >
            <span>{block.content || 'Buton'}</span>
            {block.isExternal && <ExternalLink className="w-4 h-4" />}
          </a>
        );

      case 'badge':
        return (
          <div className={block.className || 'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black hashtag-badge'}>
            <Sparkles className="w-3.5 h-3.5 text-[#F26422]" />
            <span>{block.content}</span>
          </div>
        );

      default:
        return <div>{block.content}</div>;
    }
  };

  // If not admin or editMode OFF, return plain visitor content
  if (!isAdmin || !editMode) {
    return <div className="my-2">{renderVisitorContent()}</div>;
  }

  // ADMIN EDIT MODE OVERLAY CONTROL
  return (
    <div className="relative group border-2 border-dashed border-amber-400 bg-amber-50/30 hover:bg-amber-100/50 p-3 rounded-2xl transition my-3">
      {/* Element Type Badge & Controls */}
      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-amber-200 text-xs font-bold">
        <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 rounded-full font-black text-[10px] uppercase flex items-center gap-1">
          {block.type === 'image' && <ImageIcon className="w-3 h-3" />}
          {block.type === 'video' && <Video className="w-3 h-3" />}
          {block.type === 'heading' && <Type className="w-3 h-3" />}
          <span>{block.type} BLOKU</span>
        </span>

        <div className="flex items-center gap-1">
          {!isFirst && (
            <button
              onClick={onMoveUp}
              className="p-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg transition"
              title="Yukarı Taşı"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          )}

          {!isLast && (
            <button
              onClick={onMoveDown}
              className="p-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg transition"
              title="Aşağı Taşı"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => setIsEditingProps(!isEditingProps)}
            className="p-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            title="Özellikleri Düzenle"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onDelete}
            className="p-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition"
            title="Bloku Sil"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Render Current Content */}
      <div className="py-1">{renderVisitorContent()}</div>

      {/* Property Editor Modal / Bar */}
      {isEditingProps && (
        <div className="mt-3 p-4 bg-white border-2 border-amber-400 rounded-2xl shadow-xl space-y-3 text-xs font-bold">
          <div className="flex items-center justify-between text-slate-900 font-black border-b border-slate-200 pb-2">
            <span>Öğe Özelliklerini Düzenleyin</span>
            <button onClick={() => setIsEditingProps(false)} className="text-slate-400 hover:text-slate-900">
              <X className="w-4 h-4" />
            </button>
          </div>

          {(block.type === 'heading' || block.type === 'text' || block.type === 'button' || block.type === 'badge') && (
            <div>
              <label className="block text-slate-700 mb-1">Metin / İçerik</label>
              <textarea
                rows="2"
                value={editForm.content || ''}
                onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
              />
            </div>
          )}

          {(block.type === 'image' || block.type === 'video') && (
            <div className="space-y-2">
              <label className="block text-slate-700">Bilgisayardan Dosya Yükle ({block.type === 'image' ? 'Resim' : 'Video'})</label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept={block.type === 'video' ? 'video/*' : 'image/*'}
                className="hidden"
              />
              <button
                type="button"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 bg-brand-gradient text-slate-950 font-black py-2.5 rounded-xl shadow-xs"
              >
                <span>{uploading ? 'Yükleniyor...' : '📁 Bilgisayardan Dosya Seç'}</span>
              </button>
            </div>
          )}

          {block.type === 'button' && (
            <div>
              <label className="block text-slate-700 mb-1">Buton Yönlendirme Linki</label>
              <input
                type="text"
                value={editForm.link || ''}
                onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setIsEditingProps(false)}
              className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-xl font-bold"
            >
              İptal
            </button>
            <button
              onClick={handleSaveProps}
              className="px-4 py-1.5 bg-[#F26422] text-white rounded-xl font-black shadow-sm"
            >
              Kaydet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
