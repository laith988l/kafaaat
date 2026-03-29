-- 1. Create the `testimonials` table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    quote TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Insert default testimonials (mirroring existing hardcoded ones)
INSERT INTO public.testimonials (name, role, quote, rating) VALUES
    ('أحمد السيد', 'مهندس ميكانيك، هامبورغ', 'غيرت كفاءات حياتي. بدأت من الصفر في الألمانية وخلال 6 أشهر تمكنت من اجتياز امتحان B1 والحصول على وظيفة في هامبورغ.', 5),
    ('ليلى منصور', 'طالبة طب، برلين', 'الجلسات التفاعلية مذهلة. أشعر وكأنني بالفعل في ألمانيا عندما أمارس اللغة مع المرشدين المختصين في كفاءات.', 5),
    ('عمر فاروق', 'مطور برمجيات، ميونخ', 'واضح وموجز واحترافي. النماذج والمناهج ساعدتني في التحضير الجيد والالتحاق ببرنامج جامعي في ألمانيا بسهولة.', 5),
    ('سارة محمود', 'طبيبة أسنان، فرانكفورت', 'تجربة تعليمية استثنائية. الدعم المستمر والتوجيه الشخصي جعلني أتجاوز كل الصعوبات بثقة عالية وبدون أي ضغوط.', 5),
    ('كريم حسن', 'ممرض، شتوتغارت', 'أفضل استثمار في مستقبلي المهني. فريق كفاءات كان معي خطوة بخطوة حتى حققت حلم العمل في ألمانيا.', 5);

-- 3. Enabling RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Allow public to select testimonials
CREATE POLICY "Allow public read access to testimonials" 
    ON public.testimonials FOR SELECT 
    USING (true);

-- Allow admins to insert/update/delete testimonials
CREATE POLICY "Allow admin full access to testimonials" 
    ON public.testimonials FOR ALL
    USING (auth.role() = 'authenticated') 
    WITH CHECK (auth.role() = 'authenticated');
