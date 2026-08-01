-- ========================================================
-- ALTINKOÇ AKADEMİ - SUPABASE VERİTABANI ŞEMASI (SQL)
-- Supabase Dashboard -> SQL Editor kısmında çalıştırabilirsiniz.
-- ========================================================

-- 1. Öğrenci Başvuruları Tablosu (Applications)
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT,
  field TEXT,
  target_rank TEXT,
  grade_status TEXT,
  tyt_net TEXT,
  ayt_net TEXT,
  coach_preference TEXT,
  notes TEXT,
  status TEXT DEFAULT 'Beklemede'
);

-- 2. İletişim Mesajları Tablosu (Contact Messages)
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'Okunmadı'
);

-- 3. Öğrenci Kayıtları & Performans Tablosu (Students)
CREATE TABLE IF NOT EXISTS public.students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  target TEXT,
  field TEXT,
  coach_name TEXT,
  package_type TEXT,
  weekly_goal INTEGER DEFAULT 500,
  completed_goal INTEGER DEFAULT 0,
  tyt_avg NUMERIC DEFAULT 0.0,
  ayt_avg NUMERIC DEFAULT 0.0,
  rank_estimate INTEGER,
  status TEXT DEFAULT 'Aktif'
);

-- RLS (Row Level Security) Politikaları - Güvenlik & Erişim Ayarları
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Başvuru ve İletişim Formu Kaydı İçin İzinler (Public Insert)
DROP POLICY IF EXISTS "Allow public insert to applications" ON public.applications;
CREATE POLICY "Allow public insert to applications" 
  ON public.applications FOR INSERT 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public insert to contact_messages" ON public.contact_messages;
CREATE POLICY "Allow public insert to contact_messages" 
  ON public.contact_messages FOR INSERT 
  WITH CHECK (true);

-- Veri Okuma İzinleri (Select)
DROP POLICY IF EXISTS "Allow select applications" ON public.applications;
CREATE POLICY "Allow select applications" 
  ON public.applications FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Allow select contact_messages" ON public.contact_messages;
CREATE POLICY "Allow select contact_messages" 
  ON public.contact_messages FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Allow select students" ON public.students;
CREATE POLICY "Allow select students" 
  ON public.students FOR SELECT 
  USING (true);

-- ÖRNEK İLK VERİLER (Öğrenciler)
INSERT INTO public.students (full_name, email, phone, target, field, coach_name, package_type, weekly_goal, completed_goal, tyt_avg, ayt_avg, rank_estimate)
VALUES 
  ('Zeynep K.', 'zeynep@example.com', '0555 111 2233', 'Boğaziçi Bilgisayar Müh.', 'Sayısal', 'Selim Y. (İTÜ 412.)', 'Derece Koçluğu', 800, 640, 102.5, 74.0, 350),
  ('Mert A.', 'mert@example.com', '0544 222 3344', 'Hacettepe Tıp', 'Sayısal', 'Elif K. (Hacettepe Tıp 108.)', 'VIP Derece Paket', 750, 710, 108.0, 77.5, 120),
  ('Ayşe B.', 'ayse@example.com', '0533 333 4455', 'Galatasaray Hukuk', 'Eşit Ağırlık', 'Ahmet T. (GSÜ Hukuk 95.)', 'Derece Koçluğu', 600, 480, 94.0, 68.5, 850)
ON CONFLICT DO NOTHING;
