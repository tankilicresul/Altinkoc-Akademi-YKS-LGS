import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSiteConfig } from '../context/SiteConfigContext';
import { ShieldCheck, Users, FileText, UserPlus, Trophy, Check, X, Plus, Search, Key, UserCheck, Star, RefreshCw, Edit, Trash2, Save, Sparkles, Building2, Phone, Mail, Image, Type, BarChart2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function AdminDashboard() {
  const { currentUser, registeredUsers, updateUserRole, ADMIN_EMAILS } = useAuth();
  const { siteConfig, updateSiteConfig, resetToDefault } = useSiteConfig();

  const [activeTab, setActiveTab] = useState('applications'); // textEditor, contactEditor, ranks, mentors, users, applications
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Editable local copies of general texts
  const [infoForm, setInfoForm] = useState(siteConfig.info);
  const [ranksForm, setRanksForm] = useState(siteConfig.ranks || []);
  const [mentorsForm, setMentorsForm] = useState(siteConfig.mentors || []);

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    setInfoForm(siteConfig.info);
    setRanksForm(siteConfig.ranks || []);
    setMentorsForm(siteConfig.mentors || []);
  }, [siteConfig]);

  const showNotification = (msg) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  // Save General Text Changes
  const handleSaveInfo = (e) => {
    e.preventDefault();
    updateSiteConfig('info', infoForm);
    showNotification('Tüm Metinler, Başlıklar ve İletişim Bilgileri Web Sitesinde Güncellendi!');
  };

  // Save Ranks Changes
  const handleSaveRanks = () => {
    updateSiteConfig('ranks', ranksForm);
    showNotification('Dereceler Listesi Web Sitesinde Güncellendi!');
  };

  // Save Mentors Changes
  const handleSaveMentors = () => {
    updateSiteConfig('mentors', mentorsForm);
    showNotification('Mentör Kadrosu Web Sitesinde Güncellendi!');
  };

  const handleRankFieldChange = (id, field, value) => {
    setRanksForm(ranksForm.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleMentorFieldChange = (id, field, value) => {
    setMentorsForm(mentorsForm.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleAddBlankRank = () => {
    const newEntry = {
      id: Date.now(),
      name: 'Yeni Öğrenci',
      year: '2024 YKS',
      category: 'SAY',
      rank: 'Türkiye 100.sü',
      university: 'Boğaziçi Bilgisayar',
      tytNet: '110 Net',
      aytNet: '78 Net',
      quote: 'Başarımın sırrı düzenli takip oldu.',
      badge: 'Derece',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    };
    const updated = [newEntry, ...ranksForm];
    setRanksForm(updated);
    updateSiteConfig('ranks', updated);
    showNotification('Yeni Derece Eklendi!');
  };

  const handleDeleteRank = (id) => {
    const updated = ranksForm.filter(r => r.id !== id);
    setRanksForm(updated);
    updateSiteConfig('ranks', updated);
    showNotification('Derece Silindi.');
  };

  const handleAddBlankMentor = () => {
    const newEntry = {
      id: Date.now(),
      name: 'Yeni Mentör',
      isFounder: false,
      roleTitle: 'Derece Mentörü',
      university: 'ODTÜ Mühendislik',
      yksRank: 'YKS Sayısal TR 200.sü',
      field: 'Sayısal',
      experience: '2 Yıl Koçluk',
      specialty: 'Matematik & Strateji',
      bio: 'Öğrencilerle birebir YKS koçluğu yürütmektedir.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    };
    const updated = [newEntry, ...mentorsForm];
    setMentorsForm(updated);
    updateSiteConfig('mentors', updated);
    showNotification('Yeni Mentör Eklendi!');
  };

  const handleDeleteMentor = (id) => {
    const updated = mentorsForm.filter(m => m.id !== id);
    setMentorsForm(updated);
    updateSiteConfig('mentors', updated);
    showNotification('Mentör Silindi.');
  };

  const fetchSupabaseApplications = async () => {
    if (!supabase) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
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
    <div className="pt-24 pb-16 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Master Admin Header */}
        <div className="glass-panel-interactive border-2 border-amber-300 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#F26422] to-[#F5A623] flex items-center justify-center text-white font-black text-xl shadow-md">
              <ShieldCheck className="w-8 h-8 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900">MASTER ADMIN KONTROL MERKEZİ</h1>
                <span className="px-3 py-0.5 rounded-full text-xs font-black bg-orange-100 text-[#F26422] border border-orange-300">
                  Kurucu (Super Admin)
                </span>
              </div>
              <p className="text-xs text-slate-600 font-bold mt-1">
                Hoş geldiniz <strong>{currentUser?.name || 'Kurucumuz'}</strong>! Sitede yalnızca sizin eklediğiniz gerçek veriler görüntülenir.
              </p>
            </div>
          </div>

          <button
            onClick={resetToDefault}
            className="text-xs font-bold text-slate-500 hover:text-slate-900 underline"
          >
            Varsayılan Ayarlara Sıfırla
          </button>
        </div>

        {saveSuccessMsg && (
          <div className="p-4 bg-emerald-50 border-2 border-emerald-300 text-emerald-900 text-sm font-black rounded-2xl shadow-md flex items-center gap-2 animate-fadeIn">
            <Check className="w-5 h-5 text-emerald-600" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* CMS TAB NAVIGATION */}
        <div className="flex flex-wrap bg-white p-2 rounded-2xl border border-slate-300 shadow-xs gap-1">
          {[
            { id: 'applications', label: `📥 Gelen Başvurular (${applications.length})`, icon: FileText },
            { id: 'users', label: `🔑 Kullanıcı Yetkileri (${registeredUsers.length})`, icon: Key },
            { id: 'ranks', label: `🏆 Derecelerimiz (${ranksForm.length})`, icon: Trophy },
            { id: 'mentors', label: `🎓 Mentör Kadrosu (${mentorsForm.length})`, icon: Users },
            { id: 'textEditor', label: '📢 Genel Metinler & Sloganlar', icon: Type },
            { id: 'contactEditor', label: '📱 İletişim & Numaralar', icon: Phone },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2.5 px-4 text-xs font-black rounded-xl transition ${
                  isActive
                    ? 'bg-brand-gradient text-slate-950 shadow-md'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB: GELEN BAŞVURULAR */}
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

            {applications.length > 0 ? (
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
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 space-y-1">
                <p>Henüz gelen canlı başvuru bulunmamaktadır.</p>
                <p className="text-[11px] text-slate-400">Öğrenciler başvuru formunu doldurdukça buraya anında yansıyacaktır.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB: KULLANICI ROLLERİ & YETKİLENDİRME */}
        {activeTab === 'users' && (
          <div className="glass-panel-interactive border border-slate-200 rounded-3xl p-6 space-y-4 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Key className="w-5 h-5 text-[#F5A623]" />
                  <span>Kullanıcı Erişim ve Rol Yetki Yönetimi</span>
                </h3>
                <p className="text-xs text-slate-600 font-bold mt-1">
                  Sisteme kaydolmuş gerçek kişilere Öğrenci Paneli, Mentör Paneli veya Adminlik erişimi verebilirsiniz.
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

        {/* TAB: DERECELERİMİZ DÜZENLEME */}
        {activeTab === 'ranks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h3 className="text-lg font-black text-slate-900">Sitedeki Gerçek YKS Dereceleri</h3>
                <p className="text-xs text-slate-600 font-bold">Yeni eklediğiniz gerçek dereceler anında web sitesine yansır.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddBlankRank}
                  className="flex items-center gap-2 bg-emerald-600 text-white font-black px-4 py-2.5 rounded-xl text-xs shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Yeni Derece Ekle</span>
                </button>
                <button
                  onClick={handleSaveRanks}
                  className="flex items-center gap-2 bg-[#F26422] text-white font-black px-5 py-2.5 rounded-xl text-xs shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Dereceleri Kaydet</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {ranksForm.map((rank) => (
                <div key={rank.id} className="p-5 bg-white rounded-3xl border-2 border-amber-300/80 shadow-md space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <span className="font-black text-slate-900 text-sm flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-500" />
                      <span>{rank.name || 'İsimsiz'} ({rank.rank})</span>
                    </span>
                    <button
                      onClick={() => handleDeleteRank(rank.id)}
                      className="p-1.5 bg-rose-100 text-rose-700 hover:bg-rose-600 hover:text-white rounded-xl transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Öğrenci Adı Soyadı</label>
                      <input
                        type="text"
                        value={rank.name}
                        onChange={(e) => handleRankFieldChange(rank.id, 'name', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Sıralaması / Derecesi</label>
                      <input
                        type="text"
                        value={rank.rank}
                        onChange={(e) => handleRankFieldChange(rank.id, 'rank', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Kazandığı Üniversite</label>
                      <input
                        type="text"
                        value={rank.university}
                        onChange={(e) => handleRankFieldChange(rank.id, 'university', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">TYT Neti</label>
                      <input
                        type="text"
                        value={rank.tytNet}
                        onChange={(e) => handleRankFieldChange(rank.id, 'tytNet', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">AYT Neti</label>
                      <input
                        type="text"
                        value={rank.aytNet}
                        onChange={(e) => handleRankFieldChange(rank.id, 'aytNet', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Fotoğraf URL'si</label>
                      <input
                        type="text"
                        value={rank.avatar || ''}
                        onChange={(e) => handleRankFieldChange(rank.id, 'avatar', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Öğrenci Tavsiyesi / Sözü</label>
                    <input
                      type="text"
                      value={rank.quote}
                      onChange={(e) => handleRankFieldChange(rank.id, 'quote', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSaveRanks}
                className="flex items-center gap-2 bg-[#F26422] text-white font-black px-8 py-3 rounded-xl text-sm shadow-md transition hover:scale-105"
              >
                <Save className="w-4 h-4" />
                <span>Dereceleri Canlıya Kaydet</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB: MENTÖR KADROSU DÜZENLEME */}
        {activeTab === 'mentors' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h3 className="text-lg font-black text-slate-900">Sitedeki Mentör Kadrosu</h3>
                <p className="text-xs text-slate-600 font-bold">Yeni mentör ekleyebilir veya mevcut koçları düzenleyebilirsiniz.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddBlankMentor}
                  className="flex items-center gap-2 bg-blue-600 text-white font-black px-4 py-2.5 rounded-xl text-xs shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Yeni Mentör Ekle</span>
                </button>
                <button
                  onClick={handleSaveMentors}
                  className="flex items-center gap-2 bg-[#F26422] text-white font-black px-5 py-2.5 rounded-xl text-xs shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Mentörleri Kaydet</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {mentorsForm.map((mentor) => (
                <div key={mentor.id} className="p-5 bg-white rounded-3xl border-2 border-blue-200 shadow-md space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <span className="font-black text-slate-900 text-sm flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>{mentor.name || 'İsimsiz'} ({mentor.university})</span>
                    </span>
                    <button
                      onClick={() => handleDeleteMentor(mentor.id)}
                      className="p-1.5 bg-rose-100 text-rose-700 hover:bg-rose-600 hover:text-white rounded-xl transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Mentör İsim Soyisim</label>
                      <input
                        type="text"
                        value={mentor.name}
                        onChange={(e) => handleMentorFieldChange(mentor.id, 'name', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Üniversite & Bölüm</label>
                      <input
                        type="text"
                        value={mentor.university}
                        onChange={(e) => handleMentorFieldChange(mentor.id, 'university', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">YKS Derecesi</label>
                      <input
                        type="text"
                        value={mentor.yksRank}
                        onChange={(e) => handleMentorFieldChange(mentor.id, 'yksRank', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Uzmanlık Alanı</label>
                      <input
                        type="text"
                        value={mentor.specialty}
                        onChange={(e) => handleMentorFieldChange(mentor.id, 'specialty', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Deneyim</label>
                      <input
                        type="text"
                        value={mentor.experience}
                        onChange={(e) => handleMentorFieldChange(mentor.id, 'experience', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Mentör Fotoğraf URL'si</label>
                      <input
                        type="text"
                        value={mentor.avatar || ''}
                        onChange={(e) => handleMentorFieldChange(mentor.id, 'avatar', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Biyografi & Tanıtım Metni</label>
                    <textarea
                      rows="2"
                      value={mentor.bio}
                      onChange={(e) => handleMentorFieldChange(mentor.id, 'bio', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                    ></textarea>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSaveMentors}
                className="flex items-center gap-2 bg-[#F26422] text-white font-black px-8 py-3 rounded-xl text-sm shadow-md transition hover:scale-105"
              >
                <Save className="w-4 h-4" />
                <span>Mentörleri Canlıya Kaydet</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB: GENEL METİNLER */}
        {activeTab === 'textEditor' && (
          <form onSubmit={handleSaveInfo} className="glass-panel-interactive border-2 border-amber-300 rounded-3xl p-6 bg-white space-y-6 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Type className="w-5 h-5 text-[#F26422]" />
                <span>Sitedeki Başlık, Metin ve Sloganları Düzenleyin</span>
              </h3>
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#F26422] text-white font-black px-6 py-2.5 rounded-xl text-xs shadow-md transition hover:scale-105"
              >
                <Save className="w-4 h-4" />
                <span>Değişiklikleri Canlıya Kaydet</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Marka Adı</label>
                <input
                  type="text"
                  value={infoForm.brandName || ''}
                  onChange={(e) => setInfoForm({ ...infoForm, brandName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-black text-slate-900 focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Hashtag (#)</label>
                <input
                  type="text"
                  value={infoForm.hashtag || ''}
                  onChange={(e) => setInfoForm({ ...infoForm, hashtag: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-black text-slate-900 focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Ana Slogan</label>
                <input
                  type="text"
                  value={infoForm.slogan || ''}
                  onChange={(e) => setInfoForm({ ...infoForm, slogan: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-black text-slate-900 focus:outline-none focus:border-[#F5A623]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#F26422] text-white font-black px-8 py-3 rounded-xl text-sm shadow-md transition hover:scale-105"
              >
                <Save className="w-4 h-4" />
                <span>Değişiklikleri Canlıya Kaydet</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB: İLETİŞİM */}
        {activeTab === 'contactEditor' && (
          <form onSubmit={handleSaveInfo} className="glass-panel-interactive border-2 border-amber-300 rounded-3xl p-6 bg-white space-y-6 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#F26422]" />
                <span>Kurucu Telefonları ve WhatsApp İletişim Bilgileri</span>
              </h3>
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#F26422] text-white font-black px-6 py-2.5 rounded-xl text-xs shadow-md transition hover:scale-105"
              >
                <Save className="w-4 h-4" />
                <span>İletişim Bilgilerini Kaydet</span>
              </button>
            </div>

            <div className="space-y-6">
              {infoForm.founders?.map((founder, index) => (
                <div key={index} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="font-black text-slate-900 text-sm flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                    <span>{founder.name} ({founder.title})</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Kurucu İsim Soyisim</label>
                      <input
                        type="text"
                        value={founder.name}
                        onChange={(e) => {
                          const updated = [...infoForm.founders];
                          updated[index].name = e.target.value;
                          setInfoForm({ ...infoForm, founders: updated });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Unvan</label>
                      <input
                        type="text"
                        value={founder.title}
                        onChange={(e) => {
                          const updated = [...infoForm.founders];
                          updated[index].title = e.target.value;
                          setInfoForm({ ...infoForm, founders: updated });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Telefon Numarası</label>
                      <input
                        type="text"
                        value={founder.phone}
                        onChange={(e) => {
                          const updated = [...infoForm.founders];
                          updated[index].phone = e.target.value;
                          setInfoForm({ ...infoForm, founders: updated });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#F26422] text-white font-black px-8 py-3 rounded-xl text-sm shadow-md transition hover:scale-105"
              >
                <Save className="w-4 h-4" />
                <span>İletişim Bilgilerini Kaydet</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
