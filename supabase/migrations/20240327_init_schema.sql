-- 1. Create Courses Table (Optional/Future)
CREATE TABLE IF NOT EXISTS public.courses (
    id TEXT PRIMARY KEY,
    level TEXT NOT NULL,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    duration TEXT NOT NULL,
    hours INTEGER NOT NULL,
    price NUMERIC NOT NULL,
    featured_image TEXT NOT NULL,
    outcomes TEXT[] NOT NULL DEFAULT '{}',
    syllabus JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create Feedback Table
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    category TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    course_id TEXT REFERENCES public.courses(id),
    inquiry_type TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Policies for public.courses
CREATE POLICY "Allow public read access to courses"
ON public.courses FOR SELECT
USING (true);

-- Policies for public.feedback
CREATE POLICY "Allow public insert to feedback"
ON public.feedback FOR INSERT
WITH CHECK (true);

-- Policies for public.inquiries
CREATE POLICY "Allow public insert to inquiries"
ON public.inquiries FOR INSERT
WITH CHECK (true);

-- Add sample data for courses (A1-B1 + Bundle)
INSERT INTO public.courses (id, level, category, title, short_description, full_description, duration, hours, price, featured_image, outcomes, syllabus)
VALUES 
('a1', 'A1', 'مبتدئ', 'أساسيات الألمانية', 'ابنِ أساساً متيناً في قواعد اللغة الألمانية ومفردات الحياة اليومية.', 'هذه الدورة مصممة للمبتدئين الذين ليس لديهم معرفة سابقة بالألمانية.', '6 أسابيع', 60, 300.00, 'https://example.com/a1.jpg', ARRAY['التعريف بنفسك', 'طلب الطعام'], '[{"title": "الوحدة 1", "desc": "الأبجدية"}]'::jsonb),
('a2', 'A2', 'متوسط', 'دورة تأسيسية في الألمانية', 'وسع آفاقك. تواصل في مواضيع مألوفة بفروق دقيقة أكبر.', 'بعد إتقان الأساسيات في A1، تأخذك دورة A2 نحو تواصل أكثر تفصيلاً ودقة.', '6 أسابيع', 60, 300.00, 'https://example.com/a2.jpg', ARRAY['سرد القصص', 'التواصل في العمل'], '[{"title": "الوحدة 1", "desc": "الزمن الماضي"}]'::jsonb),
('b1', 'B1', 'متقدم', 'الاستقلالية في الألمانية', 'جسر نحو الاستقلال. تعامل بحياتك في ألمانيا بثقة.', 'دورة B1 هي البوابة الرئيسية للحياة المهنية والأكاديمية في ألمانيا.', '8 أسابيع', 80, 350.00, 'https://example.com/b1.jpg', ARRAY['المشاركة في نقاشات معقدة', 'فهم الأخبار'], '[{"title": "الوحدة 1", "desc": "السياسة والمجتمع"}]'::jsonb),
('bundle', 'A1-B1', 'الباقة الكاملة', 'باقة كفاءات الشاملة', 'رحلة متكاملة من الصفر وحتى إتقان اللغة الألمانية بسعر استثنائي.', 'هذه الباقة تتضمن مساراً تعليمياً متسلسلاً ومكثفاً يبدأ معك من الحروف ويمتد حتى B1.', '20 أسبوعاً', 200, 800.00, 'https://example.com/bundle.jpg', ARRAY['إتقان شامل لـ A1, A2, B1', 'توفير كبير في التكلفة'], '[{"title": "المرحلة الأولى", "desc": "الأساسيات (A1)"}]'::jsonb)
ON CONFLICT (id) DO NOTHING;
