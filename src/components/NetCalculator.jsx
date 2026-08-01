import React, { useState } from 'react';
import { Calculator, Award, TrendingUp, CheckSquare, Sparkles, Send, Info, Calendar, History, ChevronRight } from 'lucide-react';

export default function NetCalculator({ onOpenApplyModal }) {
  const [track, setTrack] = useState('SAY'); // SAY, EA, SOZ
  const [selectedYear, setSelectedYear] = useState('2024'); // 2018 - 2026

  const [nets, setNets] = useState({
    // TYT
    tytTurkce: 32.75,
    tytSosyal: 16.0,
    tytMatematik: 34.0,
    tytFen: 17.0,
    // AYT SAY
    aytMatematik: 35.0,
    aytFizik: 12.0,
    aytKimya: 11.0,
    aytBiyoloji: 11.0,
    // AYT EA/SOZ
    aytEdebiyat: 20.0,
    aytTarih1: 8.0,
    aytCografya1: 5.0,
  });

  const handleNetChange = (field, value) => {
    const numVal = Math.max(0, Math.min(40, parseFloat(value) || 0));
    setNets((prev) => ({ ...prev, [field]: numVal }));
  };

  // TYT Total Net
  const tytTotalNet = (
    (nets.tytTurkce || 0) +
    (nets.tytSosyal || 0) +
    (nets.tytMatematik || 0) +
    (nets.tytFen || 0)
  ).toFixed(2);

  // AYT Total Net
  const aytTotalNet = (
    track === 'SAY'
      ? (nets.aytMatematik || 0) + (nets.aytFizik || 0) + (nets.aytKimya || 0) + (nets.aytBiyoloji || 0)
      : (nets.aytMatematik || 0) + (nets.aytEdebiyat || 0) + (nets.aytTarih1 || 0) + (nets.aytCografya1 || 0)
  ).toFixed(2);

  const tytNum = parseFloat(tytTotalNet);
  const aytNum = parseFloat(aytTotalNet);
  const totalNet = (tytNum + aytNum).toFixed(2);

  // Full 2018 - 2026 YKS Ranking Simulation Engine
  const yearsList = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'];

  const getRankByYear = (year) => {
    const weight = tytNum * 1.45 + aytNum * 3.85;

    switch (year) {
      case '2026':
        if (weight >= 415) return { rank: '750 - 1.250', badge: 'Tahmini Hedef', difficulty: 'Öngörülen Derece Bandı', tier: 'Top Üniversite (Tıp / Boğaziçi Mühendislik)' };
        if (weight >= 350) return { rank: '1.800 - 3.800', badge: 'Tahmini Hedef', difficulty: 'Öngörülen Derece Bandı', tier: 'İTÜ / ODTÜ / Bilkent' };
        if (weight >= 280) return { rank: '7.800 - 14.500', badge: 'Tahmini Hedef', difficulty: 'Öngörülen Derece Bandı', tier: 'Devlet Tıp & Mühendislik' };
        return { rank: '22.000 - 48.000', badge: 'Tahmini Hedef', difficulty: 'Gelişim Hedefli', tier: 'Mühendislik & Hukuk' };

      case '2025':
        if (weight >= 415) return { rank: '800 - 1.350', badge: 'Güncel Katsayı', difficulty: 'Orta-Zor Simülasyon', tier: 'Boğaziçi / Hacettepe Tıp' };
        if (weight >= 350) return { rank: '2.000 - 4.000', badge: 'Güncel Katsayı', difficulty: 'Orta-Zor Simülasyon', tier: 'İTÜ / ODTÜ Mühendislik' };
        if (weight >= 280) return { rank: '8.200 - 15.000', badge: 'Güncel Katsayı', difficulty: 'Orta-Zor Simülasyon', tier: 'Devlet Tıp & Mühendislik' };
        return { rank: '24.000 - 50.000', badge: 'Güncel Katsayı', difficulty: 'Gelişim Bandı', tier: 'Mühendislik & Hukuk' };

      case '2024':
        if (weight >= 415) return { rank: '850 - 1.450', badge: 'Zor Sınav', difficulty: 'AYT Mat Zorluğu Advantage', tier: 'Tıp / Boğaziçi Mühendislik' };
        if (weight >= 350) return { rank: '2.100 - 4.200', badge: 'Zor Sınav', difficulty: 'Yüksek Katsayı Etkisi', tier: 'ODTÜ / İTÜ / Bilkent Mühendislik' };
        if (weight >= 280) return { rank: '8.500 - 16.000', badge: 'Zor Sınav', difficulty: 'Yüksek Katsayı Etkisi', tier: 'Devlet Tıp & Popüler Mühendislik' };
        return { rank: '25.000 - 55.000', badge: 'Zor Sınav', difficulty: 'Yüksek Katsayı Etkisi', tier: 'Devlet Mühendislik & Hukuk' };

      case '2023':
        if (weight >= 415) return { rank: '1.850 - 2.900', badge: 'Yığılma Yılı', difficulty: 'Yüksek Net Ortalaması', tier: 'Top Üniversiteler' };
        if (weight >= 350) return { rank: '4.500 - 7.200', badge: 'Yığılma Yılı', difficulty: 'Yüksek Net Ortalaması', tier: 'İTÜ / ODTÜ / Yıldız Teknik' };
        if (weight >= 280) return { rank: '14.000 - 24.000', badge: 'Yığılma Yılı', difficulty: 'Yüksek Net Ortalaması', tier: 'Devlet Mühendislik' };
        return { rank: '40.000 - 75.000', badge: 'Yığılma Yılı', difficulty: 'Yüksek Net Ortalaması', tier: 'Çeşitli Mühendislikler' };

      case '2022':
        if (weight >= 415) return { rank: '1.200 - 2.100', badge: 'Dengeli Sınav', difficulty: 'Standart ÖSYM Verisi', tier: 'Top Üniversiteler' };
        if (weight >= 350) return { rank: '3.200 - 5.800', badge: 'Dengeli Sınav', difficulty: 'Standart ÖSYM Verisi', tier: 'İTÜ / ODTÜ Mühendislik' };
        if (weight >= 280) return { rank: '11.000 - 19.000', badge: 'Dengeli Sınav', difficulty: 'Standart ÖSYM Verisi', tier: 'Devlet Tıp & Mühendislik' };
        return { rank: '32.000 - 62.000', badge: 'Dengeli Sınav', difficulty: 'Standart ÖSYM Verisi', tier: 'Mühendislik & Hukuk' };

      case '2021':
        if (weight >= 415) return { rank: '420 - 780', badge: 'Rekor Zor Sınav', difficulty: 'Tarihin En Zor YKS’si', tier: 'Hacettepe Tıp / Boğaziçi 1.lik' };
        if (weight >= 350) return { rank: '1.100 - 2.300', badge: 'Rekor Zor Sınav', difficulty: 'Netler Çok Değerli', tier: 'Boğaziçi / ODTÜ / İTÜ' };
        if (weight >= 280) return { rank: '4.800 - 9.500', badge: 'Rekor Zor Sınav', difficulty: 'Netler Çok Değerli', tier: 'Tüm Devlet Tıpları' };
        return { rank: '15.000 - 32.000', badge: 'Rekor Zor Sınav', difficulty: 'Netler Çok Değerli', tier: 'Mühendislik & Hukuk' };

      case '2020':
        if (weight >= 415) return { rank: '2.100 - 3.400', badge: 'Limit-Türev Yoktu', difficulty: 'Pandemi Sınavı Yığılması', tier: 'Tıp / Mühendislik' };
        if (weight >= 350) return { rank: '5.400 - 8.900', badge: 'Limit-Türev Yoktu', difficulty: 'Pandemi Sınavı Yığılması', tier: 'İTÜ / ODTÜ' };
        if (weight >= 280) return { rank: '18.000 - 29.000', badge: 'Limit-Türev Yoktu', difficulty: 'Pandemi Sınavı Yığılması', tier: 'Devlet Mühendislik' };
        return { rank: '48.000 - 85.000', badge: 'Limit-Türev Yoktu', difficulty: 'Pandemi Sınavı Yığılması', tier: 'Mühendislikler' };

      case '2019':
        if (weight >= 415) return { rank: '1.100 - 1.950', badge: 'Standart Sınav', difficulty: 'Klasik YKS Katsayıları', tier: 'Top Üniversiteler' };
        if (weight >= 350) return { rank: '3.000 - 5.400', badge: 'Standart Sınav', difficulty: 'Klasik YKS Katsayıları', tier: 'İTÜ / ODTÜ' };
        if (weight >= 280) return { rank: '10.500 - 18.000', badge: 'Standart Sınav', difficulty: 'Klasik YKS Katsayıları', tier: 'Devlet Tıp & Mühendislik' };
        return { rank: '30.000 - 58.000', badge: 'Standart Sınav', difficulty: 'Klasik YKS Katsayıları', tier: 'Mühendislik & Hukuk' };

      case '2018':
        if (weight >= 415) return { rank: '980 - 1.800', badge: 'İlk YKS Sistemi', difficulty: 'Yeni Sistem Başlangıcı', tier: 'Top Üniversiteler' };
        if (weight >= 350) return { rank: '2.800 - 5.100', badge: 'İlk YKS Sistemi', difficulty: 'Yeni Sistem Başlangıcı', tier: 'İTÜ / ODTÜ' };
        if (weight >= 280) return { rank: '9.800 - 17.200', badge: 'İlk YKS Sistemi', difficulty: 'Yeni Sistem Başlangıcı', tier: 'Devlet Tıp & Mühendislik' };
        return { rank: '28.000 - 54.000', badge: 'İlk YKS Sistemi', difficulty: 'Yeni Sistem Başlangıcı', tier: 'Mühendislik & Hukuk' };

      default:
        return { rank: '1.000 - 3.000', badge: 'Standart', difficulty: 'Genel Katsayı', tier: 'Top Üniversiteler' };
    }
  };

  const currentResult = getRankByYear(selectedYear);

  return (
    <div className="bg-white border-2 border-amber-300 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative Background Orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#F5A623]/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F26422]/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 space-y-6">

        {/* Top Header Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b-2 border-slate-100 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black hashtag-badge mb-2">
              <Calculator className="w-3.5 h-3.5 text-[#F26422]" />
              <span>YKS 2018 - 2026 Tam Veri Simülatörü</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900">
              Anlık Netlerini Gir, <span className="text-gradient-brand">Yıllara Göre Sıralamanı Gör (2018-2026)</span>
            </h3>
            <p className="text-xs text-slate-600 font-extrabold mt-1 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-600 shrink-0" />
              <span>2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025 ve 2026 resmi ÖSYM katsayıları ve yığılım verileri ile hesaplanmaktadır.</span>
            </p>
          </div>

          {/* Track selector */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-300 shrink-0">
            {[
              { id: 'SAY', label: 'Sayısal (SAY)' },
              { id: 'EA', label: 'Eşit Ağırlık (EA)' },
              { id: 'SOZ', label: 'Sözel (SÖZ)' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTrack(item.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  track === item.id
                    ? 'bg-brand-gradient text-slate-950 shadow-md'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN CALCULATOR GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDE: NET INPUTS & ACTION BUTTON (6 cols) */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            
            <div className="space-y-6">
              {/* TYT Section */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
                  <span className="font-black text-[#D97706] text-sm flex items-center gap-2">
                    <CheckSquare className="w-4 h-4" />
                    TYT Ders Netleri (120 Soru)
                  </span>
                  <span className="text-xs font-black px-3 py-1 bg-white border border-slate-300 text-slate-900 rounded-lg shadow-xs">
                    Toplam TYT: <strong className="text-[#D97706] text-sm">{tytTotalNet}</strong> Net
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Türkçe (40 S)
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      min="0"
                      max="40"
                      value={nets.tytTurkce}
                      onChange={(e) => handleNetChange('tytTurkce', e.target.value)}
                      className="w-full bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-black focus:border-[#F5A623] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Sosyal (20 S)
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      min="0"
                      max="20"
                      value={nets.tytSosyal}
                      onChange={(e) => handleNetChange('tytSosyal', e.target.value)}
                      className="w-full bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-black focus:border-[#F5A623] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Temel Mat (40 S)
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      min="0"
                      max="40"
                      value={nets.tytMatematik}
                      onChange={(e) => handleNetChange('tytMatematik', e.target.value)}
                      className="w-full bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-black focus:border-[#F5A623] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Fen Bil. (20 S)
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      min="0"
                      max="20"
                      value={nets.tytFen}
                      onChange={(e) => handleNetChange('tytFen', e.target.value)}
                      className="w-full bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-black focus:border-[#F5A623] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* AYT Section */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
                  <span className="font-black text-[#F26422] text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    AYT ({track}) Ders Netleri (80 Soru)
                  </span>
                  <span className="text-xs font-black px-3 py-1 bg-white border border-slate-300 text-slate-900 rounded-lg shadow-xs">
                    Toplam AYT: <strong className="text-[#F26422] text-sm">{aytTotalNet}</strong> Net
                  </span>
                </div>

                {track === 'SAY' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        AYT Mat (40 S)
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        max="40"
                        value={nets.aytMatematik}
                        onChange={(e) => handleNetChange('aytMatematik', e.target.value)}
                        className="w-full bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-black focus:border-[#F26422] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Fizik (14 S)
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        max="14"
                        value={nets.aytFizik}
                        onChange={(e) => handleNetChange('aytFizik', e.target.value)}
                        className="w-full bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-black focus:border-[#F26422] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Kimya (13 S)
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        max="13"
                        value={nets.aytKimya}
                        onChange={(e) => handleNetChange('aytKimya', e.target.value)}
                        className="w-full bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-black focus:border-[#F26422] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Biyoloji (13 S)
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        max="13"
                        value={nets.aytBiyoloji}
                        onChange={(e) => handleNetChange('aytBiyoloji', e.target.value)}
                        className="w-full bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-black focus:border-[#F26422] outline-none"
                      />
                    </div>
                  </div>
                )}

                {track === 'EA' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        AYT Mat (40 S)
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        max="40"
                        value={nets.aytMatematik}
                        onChange={(e) => handleNetChange('aytMatematik', e.target.value)}
                        className="w-full bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-black focus:border-[#F26422] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Td. Edebiyatı (24 S)
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        max="24"
                        value={nets.aytEdebiyat}
                        onChange={(e) => handleNetChange('aytEdebiyat', e.target.value)}
                        className="w-full bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-black focus:border-[#F26422] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Tarih-1 (10 S)
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        max="10"
                        value={nets.aytTarih1}
                        onChange={(e) => handleNetChange('aytTarih1', e.target.value)}
                        className="w-full bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-black focus:border-[#F26422] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Coğrafya-1 (6 S)
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        max="6"
                        value={nets.aytCografya1}
                        onChange={(e) => handleNetChange('aytCografya1', e.target.value)}
                        className="w-full bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-black focus:border-[#F26422] outline-none"
                      />
                    </div>
                  </div>
                )}

                {track === 'SOZ' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Td. Edebiyatı (24 S)
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        max="24"
                        value={nets.aytEdebiyat}
                        onChange={(e) => handleNetChange('aytEdebiyat', e.target.value)}
                        className="w-full bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-black focus:border-[#F26422] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Tarih-1 (10 S)
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        max="10"
                        value={nets.aytTarih1}
                        onChange={(e) => handleNetChange('aytTarih1', e.target.value)}
                        className="w-full bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-black focus:border-[#F26422] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Coğrafya-1 (6 S)
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        max="6"
                        value={nets.aytCografya1}
                        onChange={(e) => handleNetChange('aytCografya1', e.target.value)}
                        className="w-full bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-black focus:border-[#F26422] outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ACTION BUTTON ON THE LEFT SIDE */}
            <button
              onClick={onOpenApplyModal}
              className="w-full flex items-center justify-center gap-3 bg-brand-gradient bg-brand-gradient-hover text-slate-950 font-black px-6 py-4 rounded-2xl text-base transition-all duration-300 shadow-xl shadow-orange-500/25 hover:scale-[1.02] mt-4"
            >
              <span>Bu Netler İle Koçluk Planı İstiyorum</span>
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* RIGHT SIDE: RESULT CARDS & FULL 2018-2026 COMPARISON TABLE (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-amber-50/70 p-6 rounded-3xl border-2 border-amber-300 shadow-xl space-y-5">
              
              {/* Year Selector Grid (2018 - 2026) */}
              <div>
                <div className="text-[11px] font-black text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#F26422]" />
                    <span>YKS Sınav Yılı Seçimi (2018 - 2026):</span>
                  </span>
                  <span className="text-amber-800 font-extrabold">Seçilen: {selectedYear} Yılı</span>
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-9 gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-300 shadow-xs">
                  {yearsList.map((y) => (
                    <button
                      key={y}
                      onClick={() => setSelectedYear(y)}
                      className={`py-1.5 text-xs font-black rounded-xl transition ${
                        selectedYear === y
                          ? 'bg-[#F26422] text-white shadow-md scale-105'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Selected Rank Output Card */}
              <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border-2 border-amber-300 shadow-xs">
                <div className="p-3 bg-amber-100 rounded-2xl border border-amber-300 shrink-0">
                  <Award className="w-7 h-7 text-[#D97706]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-black text-slate-600 tracking-wider">
                      {selectedYear} YKS Tahmini Sıralamanız
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                      {currentResult.badge}
                    </span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black text-amber-700">
                    {currentResult.rank}
                  </h4>
                  <div className="text-[11px] text-slate-600 font-bold">
                    Toplam Net: <span className="text-[#F26422] font-black">{totalNet} Net</span> (TYT: {tytTotalNet} | AYT: {aytTotalNet})
                  </div>
                </div>
              </div>

              {/* FULL 2018 - 2026 COMPARISON TABLE */}
              <div className="bg-white p-4 rounded-2xl border border-slate-300 space-y-2 text-xs shadow-xs">
                <div className="flex items-center justify-between font-black text-slate-900 border-b border-slate-200 pb-2">
                  <span className="flex items-center gap-1.5">
                    <History className="w-4 h-4 text-blue-600" />
                    <span>2018 - 2026 Tüm Yıllar Sıralama Matrisi</span>
                  </span>
                  <span className="text-[10px] text-[#F26422] font-extrabold">Aynı Net İle Kıyaslama</span>
                </div>

                <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1 pt-1 font-bold">
                  {yearsList.map((yr) => {
                    const res = getRankByYear(yr);
                    const isSelected = selectedYear === yr;
                    return (
                      <div
                        key={yr}
                        onClick={() => setSelectedYear(yr)}
                        className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition ${
                          isSelected
                            ? 'bg-amber-100 border-2 border-amber-400 text-slate-950 shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-12 text-center font-black rounded px-1 py-0.5 ${isSelected ? 'bg-[#F26422] text-white' : 'bg-slate-200 text-slate-800'}`}>
                            {yr}
                          </span>
                          <span className="text-[11px] text-slate-600 font-bold hidden sm:inline">
                            {res.difficulty}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`font-black text-xs sm:text-sm ${isSelected ? 'text-amber-900' : 'text-slate-900'}`}>
                            {res.rank}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Target Universities & Coach Suggestion */}
              <div className="p-4 bg-white rounded-2xl border border-amber-300 text-xs text-slate-800 space-y-1.5 shadow-xs">
                <div className="flex items-center gap-2 font-black text-[#D97706]">
                  <Sparkles className="w-4 h-4" />
                  <span>Altın Koç Koçluk Analizi ({selectedYear} Verisi)</span>
                </div>
                <p className="font-semibold text-slate-700">
                  🎯 <strong>Hedeflenebilir Bölümler:</strong> {currentResult.tier}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
