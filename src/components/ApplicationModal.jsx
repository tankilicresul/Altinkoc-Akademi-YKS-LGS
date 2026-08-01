import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, ArrowLeft, Sparkles, Send, Phone, Loader2, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ApplicationModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    field: 'Sayısal',
    targetRank: 'İlk 1000',
    gradeStatus: '12. Sınıf',
    tytNet: '75 - 90',
    aytNet: '45 - 60',
    name: '',
    phone: '',
    city: '',
    coachPreference: 'Tıp / Mühendislik Derece Koçu',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectField = (val) => {
    setFormData({ ...formData, field: val });
  };

  const handleSelectTarget = (val) => {
    setFormData({ ...formData, targetRank: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (supabase) {
      try {
        await supabase.from('applications').insert([
          {
            name: formData.name,
            phone: formData.phone,
            city: formData.city,
            field: formData.field,
            target_rank: formData.targetRank,
            grade_status: formData.gradeStatus,
            tyt_net: formData.tytNet,
            ayt_net: formData.aytNet,
            coach_preference: formData.coachPreference,
            notes: formData.notes,
          },
        ]);
      } catch (err) {
        console.error('Supabase başvuru hatası:', err);
      }
    }
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setStep(1);
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border-2 border-amber-300 rounded-3xl shadow-2xl overflow-hidden">
        {/* Top Header Accent */}
        <div className="h-2 bg-brand-gradient" />

        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8">
          {!submitted ? (
            <>
              {/* Header Title */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black hashtag-badge mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>YKS Derece Programı Başvurusu</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                  Hayalindeki Üniversite İçin <span className="text-gradient-brand">İlk Adımı At</span>
                </h3>
                <p className="text-sm text-slate-600 font-semibold mt-1">
                  Adım {step} / 3: {step === 1 ? 'Hedef & Alan Seçimi' : step === 2 ? 'Mevcut Durum' : 'İletişim Bilgileri'}
                </p>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-brand-gradient transition-all duration-300"
                    style={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* STEP 1 */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-3">
                        YKS Çalışma Alanınız
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['Sayısal', 'Eşit Ağırlık', 'Sözel', 'YDT (Dil)'].map((f) => (
                          <button
                            key={f}
                            type="button"
                            onClick={() => handleSelectField(f)}
                            className={`p-3.5 rounded-2xl border text-sm font-black transition-all ${
                              formData.field === f
                                ? 'bg-brand-gradient text-slate-950 border-transparent shadow-md'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-3">
                        Hedef Dereceniz
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['İlk 100', 'İlk 1000', 'İlk 5000', 'İlk 10.000'].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => handleSelectTarget(t)}
                            className={`p-3.5 rounded-2xl border text-sm font-black transition-all ${
                              formData.targetRank === t
                                ? 'bg-[#F5A623] text-slate-950 border-transparent shadow-md'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex items-center gap-2 bg-brand-gradient text-slate-950 font-black px-6 py-3 rounded-xl transition-all shadow-md"
                      >
                        <span>Devam Et</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        Öğrenim Durumunuz
                      </label>
                      <select
                        name="gradeStatus"
                        value={formData.gradeStatus}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-semibold focus:outline-none focus:border-[#F5A623]"
                      >
                        <option value="12. Sınıf">12. Sınıf Öğrencisi</option>
                        <option value="11. Sınıf">11. Sınıf (Erken Derece Hazırlık)</option>
                        <option value="Mezun">Mezun (Yeniden Hazırlanan)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                          Mevcut TYT Net Aralığınız
                        </label>
                        <select
                          name="tytNet"
                          value={formData.tytNet}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-semibold focus:outline-none focus:border-[#F5A623]"
                        >
                          <option value="40 - 60">40 - 60 Net</option>
                          <option value="60 - 75">60 - 75 Net</option>
                          <option value="75 - 90">75 - 90 Net</option>
                          <option value="90 - 105">90 - 105 Net</option>
                          <option value="105+">105+ Net</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                          Mevcut AYT Net Aralığınız
                        </label>
                        <select
                          name="aytNet"
                          value={formData.aytNet}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-semibold focus:outline-none focus:border-[#F5A623]"
                        >
                          <option value="Henüz Başlamadım">Henüz Başlamadım</option>
                          <option value="20 - 40">20 - 40 Net</option>
                          <option value="45 - 60">45 - 60 Net</option>
                          <option value="60 - 75">60 - 75 Net</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        İstediğiniz Mentör/Koç Profili
                      </label>
                      <select
                        name="coachPreference"
                        value={formData.coachPreference}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-semibold focus:outline-none focus:border-[#F5A623]"
                      >
                        <option value="Tıp / Sağlık Derece Koçu">Tıp / Sağlık Derece Koçu (Hacettepe, İTÜ, Çapa)</option>
                        <option value="Mühendislik Derece Koçu">Mühendislik Koçu (Boğaziçi, ODTÜ, İTÜ)</option>
                        <option value="Hukuk / İİBF Koçu">Hukuk / İşletme Koçu (Galatasaray, Bilkent)</option>
                        <option value="Fark etmez, uygun koç eşleştirilsin">Fark Etmez (En Uygun Koç Eşleştirilsin)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex items-center gap-2 text-slate-600 font-bold hover:text-slate-900 px-4 py-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Geri
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="flex items-center gap-2 bg-brand-gradient text-slate-950 font-black px-6 py-3 rounded-xl transition-all shadow-md"
                      >
                        <span>Son Adım</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-1">
                        Adınız Soyadınız *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Örn: Ahmet Yılmaz"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-semibold focus:outline-none focus:border-[#F5A623]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-1">
                          Telefon Numarası *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="0546 895 10 95"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-semibold focus:outline-none focus:border-[#F5A623]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-1">
                          Yaşadığınız Şehir
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Örn: İstanbul / Ankara"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-semibold focus:outline-none focus:border-[#F5A623]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-1">
                        Varsa Ek Notlarınız / Beklentileriniz
                      </label>
                      <textarea
                        name="notes"
                        rows="2"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Örn: Matematikte net artışı hedefliyorum..."
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-semibold focus:outline-none focus:border-[#F5A623]"
                      ></textarea>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex items-center gap-2 text-slate-600 font-bold hover:text-slate-900 px-4 py-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Geri
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 bg-brand-gradient text-slate-950 font-black px-8 py-3.5 rounded-xl transition-all shadow-lg hover:scale-105 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                        <span>{isSubmitting ? 'Gönderiliyor...' : 'Başvuruyu Tamamla'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </>
          ) : (
            /* SUBMITTED CONFIRMATION */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-amber-100 border border-[#F5A623] text-[#D97706] rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>

              <h3 className="text-3xl font-black text-slate-900">
                Başvurunuz Alındı! 🎉
              </h3>

              <p className="text-slate-700 max-w-md mx-auto font-medium">
                Tebrikler <strong className="text-[#D97706]">{formData.name || 'Öğrencimiz'}</strong>! 
                Başvurunuz kaydedildi. Anında iletişim için kurucularımızla WhatsApp üzerinden iletişime geçebilirsiniz.
              </p>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto text-left text-xs text-slate-800 font-semibold space-y-1.5">
                <p>📌 <strong>Alan / Hedef:</strong> {formData.field} - {formData.targetRank}</p>
                <p>📌 <strong>TYT / AYT:</strong> {formData.tytNet} TYT Net | {formData.aytNet} AYT Net</p>
                <p>📌 <strong>Koç Tercihi:</strong> {formData.coachPreference}</p>
              </div>

              <div className="pt-3 space-y-2">
                <div className="text-xs font-black text-slate-700">💬 WhatsApp İle Anında Görüşün:</div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/905468951095?text=Merhaba%20Resul%20Hocam,%20Alt%C4%B1n%20Ko%C3%A7%20Akademi'ye%20ba%C5%9Fvurdum.%20Ad%C4%B1m:%20${encodeURIComponent(formData.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-5 py-3 rounded-xl transition shadow-md text-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Resul Tankılıç (0546 895 10 95)</span>
                  </a>

                  <a
                    href={`https://wa.me/905431085256?text=Merhaba%20Mira%C3%A7%20Hocam,%20Alt%C4%B1n%20Ko%C3%A7%20Akademi'ye%20ba%C5%9Fvurdum.%20Ad%C4%B1m:%20${encodeURIComponent(formData.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-5 py-3 rounded-xl transition shadow-md text-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Miraç Üresin (0543 108 52 56)</span>
                  </a>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="mt-4 bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold px-6 py-2.5 rounded-xl transition text-xs"
              >
                Kapat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
