-- ==========================================
-- Supabase Schema Setup for Portfolio & Admin Dashboard
-- Copy and paste this script into your Supabase SQL Editor!
-- ==========================================

-- 1. Create Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    icon TEXT NOT NULL, -- Image URL
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    tags JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of objects: {name, color}
    image TEXT NOT NULL, -- Image URL
    source_code_link TEXT,
    sort_order INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create Experiences Table
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    company_name TEXT NOT NULL,
    icon TEXT NOT NULL, -- Image URL
    icon_bg TEXT DEFAULT '#1d1836',
    date TEXT NOT NULL,
    points JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of strings
    sort_order INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

-- 5. RLS Select Policies (Publicly Readable)
CREATE POLICY "Allow public read-only access to skills" 
    ON public.skills FOR SELECT USING (true);

CREATE POLICY "Allow public read-only access to projects" 
    ON public.projects FOR SELECT USING (true);

CREATE POLICY "Allow public read-only access to experiences" 
    ON public.experiences FOR SELECT USING (true);

-- 6. RLS Write Policies (Only Authenticated Users)
CREATE POLICY "Allow authenticated insert on skills" 
    ON public.skills FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update on skills" 
    ON public.skills FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated delete on skills" 
    ON public.skills FOR DELETE TO authenticated USING (true);


CREATE POLICY "Allow authenticated insert on projects" 
    ON public.projects FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update on projects" 
    ON public.projects FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated delete on projects" 
    ON public.projects FOR DELETE TO authenticated USING (true);


CREATE POLICY "Allow authenticated insert on experiences" 
    ON public.experiences FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update on experiences" 
    ON public.experiences FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated delete on experiences" 
    ON public.experiences FOR DELETE TO authenticated USING (true);

-- ==========================================
-- 7. Initialize Public Storage Bucket for Images
-- ==========================================
-- Note: You can also create this manually in Supabase Storage Dashboard 
-- with name 'portfolio-images' and set it to Public!

INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for storage bucket to allow anyone to view images
CREATE POLICY "Allow public view on portfolio-images bucket"
    ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-images');

-- RLS policies for storage bucket to allow authenticated uploads/updates/deletes
CREATE POLICY "Allow authenticated uploads to portfolio-images bucket"
    ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-images');

CREATE POLICY "Allow authenticated updates on portfolio-images bucket"
    ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-images');

CREATE POLICY "Allow authenticated deletes on portfolio-images bucket"
    ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio-images');
