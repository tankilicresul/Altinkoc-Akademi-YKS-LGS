import React, { useState, useEffect } from 'react';
import { ShieldCheck, Users, FileText, UserPlus, Trophy, Check, X, Plus, Search, RefreshCw } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('applications'); // applications, mentors, ranks
  const [isLoading, setIsLoading] = useState(false);

  const [applications, setApplications] = useState([
    { id: 101, name: 'Zeynep Akın', phone: '0532 987 65 43', field: 'Sayısal', targetRank: 'İlk 1000', tytNet: '82.50', aytNet: '54.00', coachPreference: 'Boğaziçi Mühendislik', status: 'Beklemede', created_at: 'Bugün 10:20' },
    { id: 102, name: 'Murat Arslan', phone: '0544 123 99 88', field: 'Eşit Ağırlık', targetRank: 'İlk 500', tytNet: '76.00', aytNet: '48.50', coachPreference: 'Hukuk Koçu', status: 'Beklemede', created_at: 'Bugün 09:15' },
    { id: 103, name: 'Selin Güneş', phone: '0555 444 33 22', field: 'Sayısal', targetRank: 'İlk 100', tytNet: '98.00', aytNet: '68.00', coachPreference: 'Tıp Koçu', status: 'Onaylandı', created_at: 'Dün 16:40' },
    { id: 104, name: 'Canberk Öz', phone: '0505 111 22 33', field: 'YDT', targetRank: 'İlk 5000', tytNet: '65.00', aytNet: '60.00', coachPreference: 'Dil Koçu', status: 'Görüşüldü', created_at: 'Dün 14:10' },
  ]);

  const fetchSupabaseApplications = async () => {
    if (!supabase) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const formatted = data.map(item => ({
          id: item.id,
          name: item.name,
          phone: item.phone,
          field: item.field || 'Sayısal',
          targetRank: item.target_rank || item.target || 'İlk 1000',
          tytNet: item.tyt_net || '0',
          aytNet: item.ayt_net || '0',
          coachPreference: item.coach_preference || 'Genel',
          status: item.status || 'Beklemede',
          created_at: new Date(item.created_at).toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' }),
        }));
        setApplications(formatted);
      }
    } catch (err) {
      console.error('Supabase fetch error:', err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isSupabaseConfigured) {
      fetchSupabaseApplications();
    }
  }, []);

  const handleApprove = async (id) => {
    setApplications(applications.map(a => a.id === id ? { ...a, status: 'Onaylandı' } : a));
    if (supabase) {
      await supabase.from('applications').update({ status: 'Onaylandı' }).eq('id', id);
    }
  };

  const handleReject = async (id) => {
    setApplications(applications.map(a => a.id === id ? { ...a, status: 'İptal Edildi' } : a));
    if (supabase) {
      await supabase.from('applications').update({ status: 'İptal Edildi' }).eq('id', id);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Admin Header */}
        <div className="glass-panel-interactive border border-amber-300 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#F26422] to-[#F5A623] flex items-center justify-center text-white font-black text-xl shadow-md">
              <ShieldCheck className="w-8 h-8 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900">Yönetici & Koç CMS Paneli</h1>
                <span className="px-3 py-0.5 rounded-full text-xs font-black bg-orange-100 text-[#F26422] border border-orange-300">
                  Canlı Sistem
                </span>
              </div>
              <p className="text-xs text-slate-600 font-bold mt-1">
                Altın Koç Akademi web sitesi içeriklerini, koç atamalarını ve başvuruları anlık yönetin.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-[#F26422] hover:bg-orange-600 text-white font-black px-4 py-2.5 rounded-xl text-xs shadow-md transition">
              <Plus className="w-4 h-4" />
              <span>Yeni Mentör Ekle</span>
            </button>
            <button className="flex items-center gap-2 bg-[#F5A623] hover:bg-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs shadow-md transition">
              <Trophy className="w-4 h-4" />
              <span>Yeni Derece Ekle</span>
            </button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white shadow-xs">
            <div className="text-xs text-slate-500 font-black uppercase mb-1">Bekleyen Başvurular</div>
            <div className="text-3xl font-black text-[#D97706]">12 Yeni</div>
            <div className="text-xs text-slate-600 font-bold mt-1">İncelenmeyi bekliyor</div>
          </div>
          <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white shadow-xs">
            <div className="text-xs text-slate-500 font-black uppercase mb-1">Aktif Öğrenci Sayısı</div>
            <div className="text-3xl font-black text-slate-900">148 Öğrenci</div>
            <div className="text-xs text-emerald-600 font-extrabold mt-1">24 Koç ile eşleşti</div>
          </div>
          <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white shadow-xs">
            <div className="text-xs text-slate-500 font-black uppercase mb-1">Aktif Koç Kadrosu</div>
            <div className="text-3xl font-black text-[#F26422]">24 Mentör</div>
            <div className="text-xs text-slate-600 font-bold mt-1">Boğaziçi, ODTÜ, Tıp</div>
          </div>
          <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white shadow-xs">
            <div className="text-xs text-slate-500 font-black uppercase mb-1">Ortalama Net Artışı</div>
            <div className="text-3xl font-black text-emerald-600">+24.6 Net</div>
            <div className="text-xs text-slate-600 font-bold mt-1">TYT + AYT 3 Aylık Ortalama</div>
          </div>
        </div>

        {/* CMS TAB NAVIGATION */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 max-w-md">
          <button
            onClick={() => setActiveTab('applications')}
            className={`flex-1 py-2.5 text-xs font-black rounded-xl transition ${
              activeTab === 'applications' ? 'bg-[#F26422] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Gelen Başvurular ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('mentors')}
            className={`flex-1 py-2.5 text-xs font-black rounded-xl transition ${
              activeTab === 'mentors' ? 'bg-[#F5A623] text-slate-950 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mentör Yönetimi (24)
          </button>
          <button
            onClick={() => setActiveTab('ranks')}
            className={`flex-1 py-2.5 text-xs font-black rounded-xl transition ${
              activeTab === 'ranks' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Derece Tablosu (6)
          </button>
        </div>

        {/* TAB CONTENT: APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="glass-panel-interactive border border-slate-200 rounded-3xl p-6 space-y-4 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#F26422]" />
                <span>Web Sitesinden Gelen Koçluk Başvuruları</span>
              </h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="İsim veya telefon ara..."
                    className="bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#F5A623]"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-900 uppercase font-black border-b border-slate-200">
                  <tr>
                    <th className="p-3">Ad Soyad</th>
                    <th className="p-3">Telefon</th>
                    <th className="p-3">Alan / Hedef</th>
                    <th className="p-3">TYT / AYT Net</th>
                    <th className="p-3">Koç Tercihi</th>
                    <th className="p-3">Durum</th>
                    <th className="p-3 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-black text-slate-900">{app.name}</td>
                      <td className="p-3 font-bold">{app.phone}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-amber-50 border border-amber-200 rounded text-[11px] font-black text-[#D97706]">
                          {app.field} - {app.target}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-slate-900">
                        {app.tytNet} TYT / {app.aytNet} AYT
                      </td>
                      <td className="p-3 text-slate-600 font-semibold">{app.coachPref}</td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                            app.status === 'Onaylandı'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : app.status === 'İptal Edildi'
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : 'bg-amber-100 text-amber-900 border border-amber-300'
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleApprove(app.id)}
                          className="p-1.5 bg-emerald-100 hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-lg transition"
                          title="Onayla & Koç Atası Yap"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleReject(app.id)}
                          className="p-1.5 bg-rose-100 hover:bg-rose-600 text-rose-700 hover:text-white rounded-lg transition"
                          title="İptal Et"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB CONTENT: MENTORS */}
        {activeTab === 'mentors' && (
          <div className="glass-panel-interactive border border-slate-200 rounded-3xl p-6 space-y-4 text-center text-slate-700 bg-white shadow-sm">
            <h3 className="text-lg font-black text-slate-900 text-left">Mentör Kadrosu Düzenleme</h3>
            <p className="text-xs text-left font-bold">
              Web sitesinde gösterilen mentör kartlarını buradan anlık ekleyebilir veya güncelleyebilirsiniz.
            </p>
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold">
              📌 24 Mentör aktif olarak gösteriliyor. Yeni mentör fotoğrafı ve özgeçmiş bilgisi girmek için <strong>"Yeni Mentör Ekle"</strong> butonunu kullanın.
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
