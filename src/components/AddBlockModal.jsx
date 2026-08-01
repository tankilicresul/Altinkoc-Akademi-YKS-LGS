import React, { useState, useRef } from 'react';
import { X, Type, Image as ImageIcon, Video, Square, Sparkles, Plus, Loader2 } from 'lucide-react';
import { uploadMediaFile } from '../utils/fileUploader';

export default function AddBlockModal({ isOpen, onClose, onAddBlock }) {
  const [selectedType, setSelectedType] = useState('heading'); // heading, text, image, video, button, badge
  const [content, setContent] = useState('');
  const [link, setLink] = useState('#');
  const [mediaUrl, setMediaUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadMediaFile(file);
      if (url) {
        setMediaUrl(url);
      }
    } catch (err) {
      console.error('File upload error:', err);
    }
    setUploading(false);
  };

  const handleCreate = () => {
    let newBlock = {
      id: 'block-' + Date.now(),
      type: selectedType,
      content: content || (selectedType === 'heading' ? 'Yeni Başlık' : 'Yeni Metin'),
      mediaUrl: mediaUrl || '',
      link: link || '#',
    };

    onAddBlock(newBlock);
    setContent('');
    setMediaUrl('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border-2 border-amber-300 rounded-3xl shadow-2xl overflow-hidden p-6 md:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-slate-900 font-black text-lg">
            <Plus className="w-5 h-5 text-[#F26422]" />
            <span>Sayfaya Yeni Öğe / Blok Ekle</span>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Type Selection Grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'heading', label: 'Başlık', icon: Type },
            { id: 'text', label: 'Paragraf', icon: Type },
            { id: 'image', label: 'Görsel Yükle', icon: ImageIcon },
            { id: 'video', label: 'Video Yükle', icon: Video },
            { id: 'button', label: 'Buton', icon: Square },
            { id: 'badge', label: 'Rozet / İkon', icon: Sparkles },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = selectedType === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedType(item.id)}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-2 text-xs font-black transition ${
                  isSelected
                    ? 'bg-brand-gradient text-slate-950 border-amber-400 shadow-md scale-105'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-5 h-5 text-[#F26422]" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Inputs based on type */}
        <div className="space-y-4">
          {(selectedType === 'heading' || selectedType === 'text' || selectedType === 'button' || selectedType === 'badge') && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Metin / İçerik *</label>
              <textarea
                rows="3"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Metin yazın..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 font-bold focus:outline-none focus:border-[#F5A623]"
              />
            </div>
          )}

          {(selectedType === 'image' || selectedType === 'video') && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">
                Bilgisayardan Dosya Seç ({selectedType === 'image' ? 'Resim .png/.jpg' : 'Video .mp4'})
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept={selectedType === 'video' ? 'video/*' : 'image/*'}
                className="hidden"
              />
              <button
                type="button"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-black py-3 rounded-xl shadow-md text-xs"
              >
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4 text-amber-400" />}
                <span>{uploading ? 'Yükleniyor...' : '📁 Bilgisayardan Dosya Seç'}</span>
              </button>

              {mediaUrl && (
                <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 text-center">
                  ✓ Dosya Yüklendi ve Hazır!
                </div>
              )}
            </div>
          )}

          {selectedType === 'button' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Yönlendirme Linki</label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Örn: https://wa.me/905468951095"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 font-bold focus:outline-none focus:border-[#F5A623]"
              />
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={handleCreate}
          className="w-full bg-[#F26422] hover:bg-orange-600 text-white font-black py-3.5 rounded-xl text-sm transition shadow-md"
        >
          Öğeyi Sayfaya Ekle
        </button>

      </div>
    </div>
  );
}
