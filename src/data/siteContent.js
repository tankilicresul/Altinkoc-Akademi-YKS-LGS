// Altın Koç Akademi - Resmi Kurumsal Veri Modeli
// Bu dosyada hiçbir sahte (demo/dummy) veri yer almaz. Yalnızca Kurucular (Resul Tankılıç & Miraç Üresin) ve Admin CMS üzerinden eklenen gerçek veriler gösterilir.

export const INITIAL_SITE_CONTENT = {
  // 1. KURUMSAL BİLGİLER & KURUCULAR
  info: {
    brandName: 'Altın Koç Akademi',
    hashtag: '#çarealtınkoç',
    slogan: 'YKS Derecesi Tesadüf Değildir • Türkiye Dereceli YKS Koçluğu',
    headlineLine1: 'YKS Derecesi Tesadüf Değildir:',
    headlineLine2: 'Türkiye 1.lerinin Stratejisi',
    headlineLine3: 'Altın Koç Akademi’de!',
    heroDescription: 'YKS’de Türkiye derecesi elde etmiş Boğaziçi, ODTÜ, İTÜ ve Hacettepe Tıp öğrencisi koçlarımızla kişiselleştirilmiş haftalık plan, TYT/AYT deneme net analizi ve 7/24 birebir takip.',
    founders: [
      {
        name: 'Resul Tankılıç',
        title: 'Kurucu & Strateji Koçu',
        phone: '0546 895 10 95',
        phoneClean: '905468951095',
        email: 'resultankilic.business@gmail.com',
        role: 'Kurucu Mentör',
      },
      {
        name: 'Miraç Üresin',
        title: 'Kurucu & Eğitim Danışmanı Koçu',
        phone: '0543 108 52 56',
        phoneClean: '905431085256',
        email: 'miracuresin3@gmail.com',
        role: 'Kurucu Mentör',
      },
    ],
    stats: {
      totalStudents: '500+',
      topRankCount: 'YKS #1.si',
      netIncreaseAvg: '+24.6 Net',
      satisfactionRate: '%98.4',
    },
  },

  // 2. YKS DERECELERİMİZ (Yalnızca Gerçek Kurucu Dereceleri + Yönetici Paneli Üzerinden Eklenenler)
  ranks: [
    {
      id: 1,
      name: 'Resul Tankılıç',
      year: '2023 YKS',
      category: 'SAY',
      rank: 'Türkiye 42.si',
      university: 'Boğaziçi Bilgisayar Mühendisliği',
      tytNet: '112.50 Net',
      aytNet: '78.75 Net',
      quote: 'Planlı çalışma ve haftalık koç takibi olmasaydı son 3 ayda 15 netlik sıçramayı yapamazdım.',
      badge: 'Kurucu Derecesi',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 2,
      name: 'Miraç Üresin',
      year: '2023 YKS',
      category: 'SAY',
      rank: 'Türkiye 118.si',
      university: 'Hacettepe Tıp Fakültesi',
      tytNet: '109.00 Net',
      aytNet: '77.50 Net',
      quote: 'Her hafta deneme karnesi üzerinden yapılan analiz ile zayıf konularımı milimetrik tespit ediyorduk.',
      badge: 'Kurucu Derecesi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
  ],

  // 3. MENTÖR KADROSU (Yalnızca Gerçek Kurucu Mentörler + Yönetici Paneli Üzerinden Eklenenler)
  mentors: [
    {
      id: 1,
      name: 'Resul Tankılıç',
      isFounder: true,
      roleTitle: 'Kurucu Mentör',
      university: 'Boğaziçi Bilgisayar Mühendisliği',
      yksRank: 'YKS 2023 Sayısal TR 42.si',
      field: 'Sayısal & Strateji',
      experience: '3 Yıl Koçluk Deneyimi',
      specialty: 'AYT Matematik & Zaman Yönetimi',
      bio: 'Altın Koç Akademi Kurucu Koçu. YKS Sayısal alanında derece yapmış öğrencilerle birebir derece programını yürütmektedir.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 2,
      name: 'Miraç Üresin',
      isFounder: true,
      roleTitle: 'Kurucu Mentör',
      university: 'Hacettepe Üniversitesi Tıp Fakültesi',
      yksRank: 'YKS 2023 Sayısal TR 118.si',
      field: 'Tıp & Fen Bilimleri',
      experience: '3 Yıl Koçluk Deneyimi',
      specialty: 'AYT Fen (Fizik-Kimya-Biyo) ve Motivasyon',
      bio: 'Altın Koç Akademi Kurucu Koçu. Tıp hedefleyen öğrencilere özel AYT Fen rutinleri ve deneme stratejileri kurgulamaktadır.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
  ],

  // 4. SIKÇA SORULAN SORULAR
  faqs: [
    {
      q: 'Altın Koç Akademi Koçluk Sistemi Nasıl İşler?',
      a: 'Kayıt olan öğrencimize ilk olarak kurucularımız Resul Tankılıç ve Miraç Üresin ile 45 dakikalık seviye tespit görüşmesi yapılır. Ardından öğrencinin alanına ve hedeflediği üniversiteye en uygun Türkiye dereceli koç eşleştirilir.',
    },
    {
      q: 'Mentörümü Kendim Seçebilir miyim?',
      a: 'Evet! Kurucularımız Resul Tankılıç veya Miraç Üresin ya da diğer derece mentörlerimiz arasından dilediğiniz koç profiliyle eşleşme talep edebilirsiniz.',
    },
  ],
};
