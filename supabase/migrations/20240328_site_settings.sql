-- 1. Create the `site_settings` table
CREATE TABLE IF NOT EXISTS public.site_settings (
    key VARCHAR(255) PRIMARY KEY,
    value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Insert initial data (mirroring the hardcoded site text)
INSERT INTO public.site_settings (key, value, description) VALUES
    ('hero_title', 'أتقن الألمانية بدقة', 'عنوان القسم الرئيسي في الصفحة الأولى'),
    ('hero_subtitle', 'مصمم للتميز. مساراتنا المهيكلة تسد الفجوة بين التعلم المتوسط والطلاقة المهنية.', 'وصف القسم الرئيسي تحت العنوان'),
    ('contact_phone', '+49 123 456 789', 'رقم الهاتف الرئيسي للأكاديمية'),
    ('contact_email', 'info@kafaaat.com', 'البريد الإلكتروني الرئيسي'),
    ('contact_address', 'برلين، ألمانيا', 'عنوان المقر الرئيسي'),
    ('about_mission', 'مهمتنا هي توفير أعلى مستويات التعليم والتدريب لتمكين الطلاب للوصول إلى أهدافهم التعليمية والمهنية بكفاءة.', 'مهمتنا في صفحة من نحن'),
    ('about_vision', 'أن نكون الأكاديمية الرائدة والأولى في تقديم خدمات تعليمية متكاملة تفتح آفاقاً جديدة وتصنع قادة المستقبل.', 'رؤيتنا في صفحة من نحن'),
    ('about_values', 'الاحترافية، الجودة، الشفافية، والالتزام بنجاح المتدربين بغض النظر عن مستوياتهم السابقة.', 'قيمنا في صفحة من نحن')
ON CONFLICT (key) DO UPDATE SET 
    value = EXCLUDED.value, 
    description = EXCLUDED.description;

-- 3. Set up Row Level Security (RLS)
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to settings
CREATE POLICY "Allow public read access to settings" 
    ON public.site_settings FOR SELECT 
    USING (true);

-- Allow authenticated users (admin) to update settings
CREATE POLICY "Allow admin to update settings" 
    ON public.site_settings FOR UPDATE 
    USING (auth.role() = 'authenticated') 
    WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to insert settings (if needed)
CREATE POLICY "Allow admin to insert settings" 
    ON public.site_settings FOR INSERT 
    WITH CHECK (auth.role() = 'authenticated');
