import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, Phone, ShieldCheck, Sparkles, UserCheck, ArrowRight, KeyRound } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, defaultTab = 'login', onAuthSuccess }) {
  const { login, register, ADMIN_EMAIL } = useAuth();
  const [tab, setTab] = useState(defaultTab); // 'login' or 'signup'
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', phone: '', password: '', rolePreference: 'student' });

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      const res = await login(loginData.email, loginData.password);
      if (res.success) {
        if (onAuthSuccess) onAuthSuccess(res.user);
        onClose();
      } else {
        setErrorMsg('Giriş başarısız. Lütfen e-posta adresinizi kontrol edin.');
      }
    } catch (err) {
      setErrorMsg('Giriş yaparken bir hata oluştu.');
    }
    setLoading(false);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      const res = await register(signupData);
      if (res.success) {
        if (onAuthSuccess) onAuthSuccess(res.user);
        onClose();
      }
    } catch (err) {
      setErrorMsg('Kayıt oluşturulurken bir hata oluştu.');
    }
    setLoading(false);
  };

  const handleQuickLogin = async (email, password = '123') => {
    setLoading(true);
    const res = await login(email, password);
    if (res.success) {
      if (onAuthSuccess) onAuthSuccess(res.user);
      onClose();
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white border-2 border-amber-300 rounded-3xl shadow-2xl overflow-hidden">
        {/* Top Gradient */}
        <div className="h-2 bg-brand-gradient" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="w-12 h-12 bg-amber-100 border border-amber-300 rounded-2xl flex items-center justify-center mx-auto text-[#D97706]">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Altın Koç Akademi <span className="text-gradient-brand">Portalı</span>
            </h3>
            <p className="text-xs text-slate-600 font-bold">
              {tab === 'login' ? 'Erişim sağlamak için giriş yapın' : 'Yeni bir kullanıcı hesabı oluşturun'}
            </p>

            {/* Tab Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 mt-4">
              <button
                type="button"
                onClick={() => { setTab('login'); setErrorMsg(''); }}
                className={`flex-1 py-2 text-xs font-black rounded-xl transition ${
                  tab === 'login' ? 'bg-white text-slate-950 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Giriş Yap
              </button>
              <button
                type="button"
                onClick={() => { setTab('signup'); setErrorMsg(''); }}
                className={`flex-1 py-2 text-xs font-black rounded-xl transition ${
                  tab === 'signup' ? 'bg-white text-slate-950 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Kayıt Ol
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl text-center">
              {errorMsg}
            </div>
          )}

          {/* TAB 1: LOGIN */}
          {tab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  E-posta Adresi
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="ornek@mail.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-3 text-sm text-slate-900 font-bold focus:outline-none focus:border-[#F5A623]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Şifre
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="password"
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-3 text-sm text-slate-900 font-bold focus:outline-none focus:border-[#F5A623]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-brand-gradient bg-brand-gradient-hover text-slate-950 font-black py-3.5 rounded-xl text-sm transition shadow-md shadow-orange-500/20"
              >
                <span>{loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB 2: SIGNUP */}
          {tab === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Adınız Soyadınız *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    placeholder="Ahmet Yılmaz"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-3 text-sm text-slate-900 font-bold focus:outline-none focus:border-[#F5A623]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  E-posta Adresi *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    placeholder="ornek@mail.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-3 text-sm text-slate-900 font-bold focus:outline-none focus:border-[#F5A623]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Telefon Numarası *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={signupData.phone}
                    onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                    placeholder="0555 123 45 67"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-3 text-sm text-slate-900 font-bold focus:outline-none focus:border-[#F5A623]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hesap Türü Tercihi
                </label>
                <select
                  value={signupData.rolePreference}
                  onChange={(e) => setSignupData({ ...signupData, rolePreference: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 font-bold focus:outline-none focus:border-[#F5A623]"
                >
                  <option value="student">Öğrenci Hesabı</option>
                  <option value="mentor">Mentör / Koç Hesabı</option>
                  <option value="parent">Veli Hesabı</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-brand-gradient bg-brand-gradient-hover text-slate-950 font-black py-3.5 rounded-xl text-sm transition shadow-md shadow-orange-500/20"
              >
                <span>{loading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol & Giriş Yap'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* DEMO / QUICK LOGIN OPTIONS */}
          <div className="mt-6 pt-5 border-t border-slate-200 space-y-2">
            <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider text-center mb-2">
              ⚡ Hızlı Test Hesapları İle Giriş Yapın:
            </div>

            <button
              type="button"
              onClick={() => handleQuickLogin(ADMIN_EMAIL)}
              className="w-full flex items-center justify-between p-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl text-xs font-black text-amber-900 transition"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F26422]" />
                <span>Super Admin ({ADMIN_EMAIL})</span>
              </span>
              <span className="text-[10px] bg-[#F26422] text-white px-2 py-0.5 rounded font-bold">Tam Yetki</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('ahmet@example.com')}
              className="w-full flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 transition"
            >
              <span className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>Onaylı Öğrenci (Ahmet Yılmaz)</span>
              </span>
              <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold">Öğrenci Paneli</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('kaan@example.com')}
              className="w-full flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 transition"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F5A623]" />
                <span>Onaylı Mentör (Kaan Yıldırım)</span>
              </span>
              <span className="text-[10px] bg-[#F5A623] text-slate-950 px-2 py-0.5 rounded font-bold">Mentör Paneli</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
