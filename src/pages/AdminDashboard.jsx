import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Users, FileText, UserPlus, Trophy, Check, X, Plus, Search, Key, UserCheck, Star, RefreshCw, Edit, Trash2, Save, Sparkles, Building2 } from 'lucide-react';
import { INITIAL_SITE_CONTENT } from '../data/siteContent';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function AdminDashboard() {
  const { currentUser, registeredUsers, updateUserRole, ADMIN_EMAILS } = useAuth();
  const [activeTab, setActiveTab] = useState('applications'); // applications, users, ranks, mentors, content
  const [isLoading, setIsLoading] = useState(false);

  // Dynamic Content States (loaded from localStorage or INITIAL_SITE_CONTENT)
  const [siteRanks, setSiteRanks] = useState(() => {
    const saved = localStorage.getItem('altin_koc_ranks');
    return saved ? JSON.parse(saved) : INITIAL_SITE_CONTENT.ranks;
  });

  const [siteMentors, setSiteMentors] = useState(() => {
    const saved = localStorage.getItem('altin_koc_mentors');
    return saved ? JSON.parse(saved) : INITIAL_SITE_CONTENT.mentors;
  });

  // Modal / Form state for adding new Rank
  const [newRankForm, setNewRankForm] = useState({
    name: '',
    year: '2024 YKS',
    category: 'SAY',
    rank: 'Türkiye 1.si',
    university: 'Boğaziçi Bilgisayar',
    tytNet: '110 Net',
    aytNet: '78 Net',
    quote: 'Disiplin ve doğru rehberlikle başardım.',
    badge: 'Derece',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  });

  // Modal / Form state for adding new Mentor
  const [newMentorForm, setNewMentorForm] = useState({
    name: '',
    university: 'Boğaziçi Bilgisayar Mühendisliği',
    yksRank: 'YKS Sayısal TR 50.si',
    field: 'Sayısal',
    experience: '2 Yıl Koçluk',
    specialty: 'Matematik & Strateji',
    bio: 'Birebir derece öğrencisi koçluğu vermektedir.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  });

  const [applications, setApplications] = useState([
    { id: 101, name: 'Zeynep Akın', phone: '0532 987 65 43', field: 'Sayısal', targetRank: 'İlk 1000', tytNet: '82.50', aytNet: '54.00', coachPreference: 'Boğaziçi Mühendislik', status: 'Beklemede', created_at: 'Bugün 10:20' },
    { id: 102, name: 'Murat Arslan', phone: '0544 123 99 88', field: 'Eşit Ağırlık', targetRank: 'İlk 500', tytNet: '76.00', aytNet: '48.50', coachPreference: 'Hukuk Koçu', status: 'Beklemede', created_at: 'Bugün 09:15' },
    { id: 103, name: 'Selin Güneş', phone: '0555 444 33 22', field: 'Sayısal', targetRank: 'İlk 100', tytNet: '98.00', aytNet: '68.00', coachPreference: 'Tıp Koçu', status: 'Onaylandı', created_at: 'Dün 16:40' },
  ]);

  useEffect(() => {
    localStorage.setItem('altin_koc_ranks', JSON.stringify(siteRanks));
  }, [siteRanks]);

  useEffect(() => {
    localStorage.setItem('altin_koc_mentors', JSON.stringify(siteMentors));
  }, [siteMentors]);

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

  // Rank Management Actions
  const handleAddRank = (e) => {
    e.preventDefault();
    if (!newRankForm.name) return;
    const newEntry = { ...newRankForm, id: Date.now() };
    setSiteRanks([newEntry, ...siteRanks]);
    setNewRankForm({
      name: '',
      year: '2024 YKS',
      category: 'SAY',
      rank: 'Türkiye 1.si',
      university: 'Boğaziçi Bilgisayar',
      tytNet: '110 Net',
      aytNet: '78 Net',
      quote: '',
      badge: 'Derece',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    });
    alert('Yeni YKS Derece Başarısı Web Sitesine Eklendi!');
  };

  const handleDeleteRank = (id) => {
    setSiteRanks(siteRanks.filter(r => r.id !== id));
  };

  // Mentor Management Actions
  const handleAddMentor = (e) => {
    e.preventDefault();
    if (!newMentorForm.name) return;
    const newEntry = { ...newMentorForm, id: Date.now() };
    setSiteMentors([newEntry, ...siteMentors]);
    setNewMentorForm({
      name: '',
      university: 'Boğaziçi Bilgisayar Mühendisliği',
      yksRank: 'YKS Sayısal TR 50.si',
      field: 'Sayısal',
      experience: '2 Yıl Koçluk',
      specialty: 'Matematik & Strateji',
      bio: '',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    });
    alert('Yeni Mentör Kadroya Eklendi!');
  };

  const handleDeleteMentor = (id) => {
    setSiteMentors(siteMentors.filter(m => m.id !== id));
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Admin Header */}
        <div className="glass-panel-interactive border-2 border-amber-300 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#F26422] to-[#F5A623] flex items-center justify-center text-white font-black text-xl shadow-md">
              <ShieldCheck className="w-8 h-8 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900">Kurucu & Yönetici CMS Paneli</h1>
                <span className="px-3 py-0.5 rounded-full text-xs font-black bg-orange-100 text-[#F26422] border border-orange-300">
                  Kurucu (Super Admin)
                </span>
              </div>
              <p className="text-xs text-slate-600 font-bold mt-1">
                Hoş geldiniz <strong>{currentUser?.name || 'Kurucumuz'}</strong>! Sitedeki tüm gerçek dereceleri, mentör kadrosunu ve gelen başvuruları anlık olarak güncelleyebilirsiniz.
              </p>
            </div>
          </div>
        </div>

        {/* CMS TAB NAVIGATION */}
        <div className="flex flex-wrap bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('applications')}
            className={`flex-1 min-w-[130px] py-2.5 px-3 text-xs font-black rounded-xl transition ${
              activeTab === 'applications' ? 'bg-[#F26422] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Gelen Başvurular ({applications.length})
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 min-w-[130px] py-2.5 px-3 text-xs font-black rounded-xl transition ${
              activeTab === 'users' ? 'bg-[#F5A623] text-slate-950 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kullanıcı Yetkileri ({registeredUsers.length})
          </button>

          <button
            onClick={() => setActiveTab('ranks')}
            className={`flex-1 min-w-[130px] py-2.5 px-3 text-xs font-black rounded-xl transition ${
              activeTab === 'ranks' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Derecelerimizi Yönet ({siteRanks.length})
          </button>

          <button
            onClick={() => setActiveTab('mentors')}
            className={`flex-1 min-w-[130px] py-2.5 px-3 text-xs font-black rounded-xl transition ${
              activeTab === 'mentors' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mentör Kadrosunu Yönet ({siteMentors.length})
          </button>
        </div>

        {/* TAB 1: APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="glass-panel-interactive border border-slate-200 rounded-3xl p-6 space-y-4 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#F26422]" />
                <span>Web Sitesinden Gelen Canlı Başvurular</span>
              </h3>
              <button
                onClick={fetchSupabaseApplications}
                className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Yenile</span>
              </button>
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
                <tbody className="divide-y divide-slate-200 font-bold">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-black text-slate-900">{app.name}</td>
                      <td className="p-3">{app.phone}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-amber-50 border border-amber-200 rounded text-[11px] font-black text-[#D97706]">
                          {app.field} - {app.targetRank}
                        </span>
                      </td>
                      <td className="p-3 font-black text-slate-900">
                        {app.tytNet} TYT / {app.aytNet} AYT
                      </td>
                      <td className="p-3 text-slate-600 font-semibold">{app.coachPreference}</td>
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
                          title="Onayla & Öğrenci Yap"
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

        {/* TAB 2: USER & ROLE MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="glass-panel-interactive border border-slate-200 rounded-3xl p-6 space-y-4 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Key className="w-5 h-5 text-[#F5A623]" />
                  <span>Kullanıcı Erişim ve Rol Yetki Yönetimi</span>
                </h3>
                <p className="text-xs text-slate-600 font-bold mt-1">
                  Sisteme kaydolmuş kişilere Öğrenci Paneli, Mentör Paneli veya Adminlik erişimi verebilirsiniz.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-900 uppercase font-black border-b border-slate-200">
                  <tr>
                    <th className="p-3">Kullanıcı Adı</th>
                    <th className="p-3">E-posta</th>
                    <th className="p-3">Telefon</th>
                    <th className="p-3">Mevcut Rolü</th>
                    <th className="p-3">Erişim Durumu</th>
                    <th className="p-3 text-right">Rol Değiştir & Yetkilendir</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-bold">
                  {registeredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-black text-slate-900 flex items-center gap-2">
                        {ADMIN_EMAILS.includes(u.email) && <Star className="w-4 h-4 text-amber-500 fill-amber-400" />}
                        <span>{u.name}</span>
                      </td>
                      <td className="p-3 font-semibold text-slate-800">{u.email}</td>
                      <td className="p-3">{u.phone || '-'}</td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                            u.role === 'admin'
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : u.role === 'mentor'
                              ? 'bg-purple-100 text-purple-800 border border-purple-300'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          }`}
                        >
                          {u.role === 'admin' ? '🛡️ Kurucu / Yönetici' : u.role === 'mentor' ? '🎓 Mentör / Koç' : '👤 Öğrenci'}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-300 text-[10px]">
                          {u.status || 'Approved'}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-1">
                        <button
                          onClick={() => updateUserRole(u.id, 'student', 'Approved')}
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-lg border border-emerald-300 text-[11px] font-black transition"
                        >
                          + Öğrenci Yap
                        </button>
                        <button
                          onClick={() => updateUserRole(u.id, 'mentor', 'Approved')}
                          className="px-2.5 py-1 bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white rounded-lg border border-purple-300 text-[11px] font-black transition"
                        >
                          + Mentör Yap
                        </button>
                        <button
                          onClick={() => updateUserRole(u.id, 'admin', 'Approved')}
                          className="px-2.5 py-1 bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white rounded-lg border border-rose-300 text-[11px] font-black transition"
                        >
                          + Admin Yap
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: GERÇEK DERECELERİMİZİ YÖNET */}
        {activeTab === 'ranks' && (
          <div className="space-y-6">
            {/* Add New Rank Form */}
            <form onSubmit={handleAddRank} className="glass-panel-interactive border-2 border-amber-300 rounded-3xl p-6 bg-white space-y-4 shadow-md">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#F5A623]" />
                <span>Yeni Gerçek YKS Derecesi Ekle</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Öğrenci Adı Soyadı *</label>
                  <input
                    type="text"
                    required
                    value={newRankForm.name}
                    onChange={(e) => setNewRankForm({ ...newRankForm, name: e.target.value })}
                    placeholder="Örn: Resul Tankılıç"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Derece & Sıralama *</label>
                  <input
                    type="text"
                    required
                    value={newRankForm.rank}
                    onChange={(e) => setNewRankForm({ ...newRankForm, rank: e.target.value })}
                    placeholder="Örn: Türkiye 42.si"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kazandığı Üniversite & Bölüm *</label>
                  <input
                    type="text"
                    required
                    value={newRankForm.university}
                    onChange={(e) => setNewRankForm({ ...newRankForm, university: e.target.value })}
                    placeholder="Örn: Boğaziçi Bilgisayar Mühendisliği"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">TYT Net</label>
                  <input
                    type="text"
                    value={newRankForm.tytNet}
                    onChange={(e) => setNewRankForm({ ...newRankForm, tytNet: e.target.value })}
                    placeholder="Örn: 112.50 Net"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">AYT Net</label>
                  <input
                    type="text"
                    value={newRankForm.aytNet}
                    onChange={(e) => setNewRankForm({ ...newRankForm, aytNet: e.target.value })}
                    placeholder="Örn: 78.75 Net"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori (SAY, EA, SÖZ)</label>
                  <select
                    value={newRankForm.category}
                    onChange={(e) => setNewRankForm({ ...newRankForm, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#F5A623]"
                  >
                    <option value="SAY">Sayısal (SAY)</option>
                    <option value="EA">Eşit Ağırlık (EA)</option>
                    <option value="SOZ">Sözel (SÖZ)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Öğrencinin Tavsiyesi / Sözü</label>
                <input
                  type="text"
                  value={newRankForm.quote}
                  onChange={(e) => setNewRankForm({ ...newRankForm, quote: e.target.value })}
                  placeholder="Örn: Haftalık koç takibi olmasaydı bu dereceyi başaramazdım."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 bg-[#F26422] text-white font-black px-6 py-2.5 rounded-xl text-xs shadow-md transition hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Web Sitesine Derece Ekle</span>
              </button>
            </form>

            {/* List of Existing Ranks */}
            <div className="glass-panel-interactive border border-slate-200 rounded-3xl p-6 bg-white space-y-4 shadow-sm">
              <h3 className="text-lg font-black text-slate-900">Sitede Yayında Olan Gerçek Derecelerimiz</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {siteRanks.map((r) => (
                  <div key={r.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 text-sm">{r.name}</span>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-extrabold text-[10px] rounded border border-amber-300">
                          {r.rank}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 font-bold mt-1">{r.university}</div>
                      <div className="text-[11px] text-slate-500 font-semibold mt-0.5">
                        {r.tytNet} | {r.aytNet} ({r.category})
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteRank(r.id)}
                      className="p-2 bg-rose-100 hover:bg-rose-600 text-rose-700 hover:text-white rounded-xl transition"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MENTÖR KADROSUNU YÖNET */}
        {activeTab === 'mentors' && (
          <div className="space-y-6">
            {/* Add New Mentor Form */}
            <form onSubmit={handleAddMentor} className="glass-panel-interactive border-2 border-amber-300 rounded-3xl p-6 bg-white space-y-4 shadow-md">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Yeni Mentör / Derece Koçu Ekle</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mentör Adı Soyadı *</label>
                  <input
                    type="text"
                    required
                    value={newMentorForm.name}
                    onChange={(e) => setNewMentorForm({ ...newMentorForm, name: e.target.value })}
                    placeholder="Örn: Miraç Üresin"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Okuduğu Üniversite & Bölüm *</label>
                  <input
                    type="text"
                    required
                    value={newMentorForm.university}
                    onChange={(e) => setNewMentorForm({ ...newMentorForm, university: e.target.value })}
                    placeholder="Örn: Hacettepe Üniversitesi Tıp Fakültesi"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">YKS Derecesi *</label>
                  <input
                    type="text"
                    required
                    value={newMentorForm.yksRank}
                    onChange={(e) => setNewMentorForm({ ...newMentorForm, yksRank: e.target.value })}
                    placeholder="Örn: YKS 2023 Sayısal TR 118.si"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Uzmanlık Alanı</label>
                  <input
                    type="text"
                    value={newMentorForm.specialty}
                    onChange={(e) => setNewMentorForm({ ...newMentorForm, specialty: e.target.value })}
                    placeholder="Örn: AYT Fen & Tıp Stratejisi"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Koçluk Deneyimi</label>
                  <input
                    type="text"
                    value={newMentorForm.experience}
                    onChange={(e) => setNewMentorForm({ ...newMentorForm, experience: e.target.value })}
                    placeholder="Örn: 3 Yıl Koçluk Deneyimi"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Alan (SAY, EA, SOZ)</label>
                  <select
                    value={newMentorForm.field}
                    onChange={(e) => setNewMentorForm({ ...newMentorForm, field: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#F5A623]"
                  >
                    <option value="Sayısal">Sayısal</option>
                    <option value="Eşit Ağırlık">Eşit Ağırlık</option>
                    <option value="Sözel">Sözel</option>
                    <option value="YDT (Dil)">YDT (Dil)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 bg-[#F26422] text-white font-black px-6 py-2.5 rounded-xl text-xs shadow-md transition hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Web Sitesine Mentör Ekle</span>
              </button>
            </form>

            {/* List of Existing Mentors */}
            <div className="glass-panel-interactive border border-slate-200 rounded-3xl p-6 bg-white space-y-4 shadow-sm">
              <h3 className="text-lg font-black text-slate-900">Sitede Yayında Olan Mentör Kadrosu</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {siteMentors.map((m) => (
                  <div key={m.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 text-sm">{m.name}</span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-900 font-extrabold text-[10px] rounded border border-blue-300">
                          {m.yksRank}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 font-bold mt-1">{m.university}</div>
                      <div className="text-[11px] text-slate-500 font-semibold mt-0.5">
                        Uzmanlık: {m.specialty}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteMentor(m.id)}
                      className="p-2 bg-rose-100 hover:bg-rose-600 text-rose-700 hover:text-white rounded-xl transition"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
