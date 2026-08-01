import React, { useState } from 'react';
import GeometricFrame from '../components/GeometricFrame';
import { Phone, Mail, MapPin, MessageSquare, ChevronDown, ChevronUp, Send, CheckCircle, HelpCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ContactSection() {
  const [openFaq, setOpenFaq] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactData, setContactData] = useState({ name: '', phone: '', email: '', message: '' });

  const faqs = [
    {
      q: 'Altın Koç Akademi Koçluk Sistemi Nasıl İşler?',
      a: 'Kayıt olan öğrencimize ilk olarak 45 dakikalık seviye tespit görüşmesi yapılır. Ardından öğrencinin alanına (SAY, EA, SÖZ, DİL) ve hedeflediği üniversiteye en uygun Türkiye dereceli koç eşleştirilir. Her hafta birebir online analiz toplantısı ve gün aşırı whatsapp takibi yapılır.',
    },
    {
      q: 'Mentörümü Kendim Seçebilir miyim?',
      a: 'Evet! Mentörlerimiz sayfasından dilediğiniz koç profiliyle eşleşme talep edebilirsiniz. Kontenjan durumuna göre aynı gün koçunuzla tanışabilirsiniz.',
    },
    {
      q: 'Hangi Sınıf Düzeyindeki Öğrenciler Katılabilir?',
      a: 'Koçluk programlarımız 12. sınıf YKS öğrencileri, Mezun grubu ve 11. sınıf erken derece hazırlık öğrencilerine özel ayrı müfredatlar şeklinde sunulmaktadır.',
    },
    {
      q: 'Deneme Analizleri Nasıl Yapılmaktadır?',
      a: 'Girdiğiniz kurum ve ev denemelerinin sonuçlarını panelimize girersiniz. Koçunuz netlerinizi ders ve konu bazında grafikleştirerek yapamadığınız soruların konularına yönelik haftalık ödev yüklemesi yapar.',
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (supabase) {
      try {
        await supabase.from('contact_messages').insert([
          {
            name: contactData.name,
            phone: contactData.phone,
            email: contactData.email,
            message: contactData.message,
          },
        ]);
      } catch (err) {
        console.error('Supabase mesaj hatası:', err);
      }
    }
    setIsSubmitting(false);
    setFormSent(true);
  };

  return (
    <section id="iletisim" className="py-24 bg-[#F9FAFB] relative overflow-hidden">
      <GeometricFrame position="bottom-right" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black hashtag-badge">
            <MessageSquare className="w-3.5 h-3.5 text-[#F26422]" />
            <span>7/24 Bize Ulaşın</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Sorularınız İçin <span className="text-gradient-brand">İletişime Geçin</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg font-medium">
            Koçluk programlarımız, kontenjanlarımız ve aklınıza takılan her şey için danışman ekibimiz yanıtlamaya hazır.
          </p>
        </div>

        {/* Grid Contact Form & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">

          {/* Contact Details & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel-interactive border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 bg-white">
              <h3 className="text-2xl font-black text-slate-900">İletişim Bilgileri</h3>

              <div className="space-y-4 text-sm text-slate-700 font-bold">
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <Phone className="w-6 h-6 text-[#F5A623] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-extrabold text-slate-900">Telefon & Danışma Hattı</div>
                    <div className="text-xs text-slate-600 mt-0.5">+90 850 123 45 67</div>
                    <div className="text-xs text-emerald-600 font-extrabold mt-1">Hafta içi & Hafta sonu 09:00 - 21:00</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <Mail className="w-6 h-6 text-[#F26422] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-extrabold text-slate-900">E-posta</div>
                    <div className="text-xs text-slate-600 mt-0.5">iletisim@altinkocakademi.com</div>
                    <div className="text-xs text-slate-600">basvuru@altinkocakademi.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <MapPin className="w-6 h-6 text-[#F5A623] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-extrabold text-slate-900">Genel Merkez & Strateji Ofisi</div>
                    <div className="text-xs text-slate-600 mt-0.5">Maslak Mah. Büyükdere Cad. No:142, Sarıyer / İstanbul</div>
                  </div>
                </div>
              </div>

              {/* Direct Whatsapp button */}
              <a
                href="https://wa.me/905550000000?text=Merhaba,%20Alt%C4%B1n%20Ko%C3%A7%20Akademi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-4 rounded-2xl text-sm transition shadow-md shadow-emerald-600/20"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Anında WhatsApp Danışmanına Bağlan</span>
              </a>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel-interactive border border-amber-300 rounded-3xl p-6 md:p-8 bg-white shadow-xl">
              {!formSent ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-2xl font-black text-slate-900">Mesaj Gönderin</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Adınız Soyadınız *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactData.name}
                        onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                        placeholder="Ahmet Yılmaz"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 font-bold focus:outline-none focus:border-[#F5A623]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Telefon Numarası *
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactData.phone}
                        onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                        placeholder="0555 123 45 67"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 font-bold focus:outline-none focus:border-[#F5A623]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      E-posta Adresi
                    </label>
                    <input
                      type="email"
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      placeholder="ornek@mail.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 font-bold focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Mesajınız / Sormak İstedikleriniz *
                    </label>
                    <textarea
                      rows="4"
                      required
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                      placeholder="Koçluk paketleri ve işleyiş hakkında bilgi almak istiyorum..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 font-bold focus:outline-none focus:border-[#F5A623]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-brand-gradient bg-brand-gradient-hover text-slate-950 font-black px-6 py-4 rounded-2xl text-sm transition shadow-lg shadow-orange-500/20 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span>{isSubmitting ? 'Gönderiliyor...' : 'Mesajı İlet'}</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle className="w-14 h-14 text-[#D97706] mx-auto animate-pulse" />
                  <h4 className="text-2xl font-black text-slate-900">Mesajınız İletildi!</h4>
                  <p className="text-slate-700 text-sm max-w-md mx-auto font-medium">
                    Tarafımıza ulaştı. Eğitim danışmanlarımız en geç 2 saat içerisinde sizinle telefon üzerinden iletişime geçecektir.
                  </p>
                  <button
                    onClick={() => setFormSent(false)}
                    className="px-6 py-2.5 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold hover:bg-slate-200 transition"
                  >
                    Yeni Mesaj Gönder
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#D97706]">
              <HelpCircle className="w-4 h-4" />
              <span>Aklınıza Takılanlar</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Sıkça Sorulan Sorular</h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-slate-900 font-extrabold text-sm md:text-base hover:text-[#D97706] transition"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-[#D97706] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-slate-700 text-sm leading-relaxed border-t border-slate-100 font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
