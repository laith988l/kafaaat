-- 1. Add `is_approved` to `public.testimonials`
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT FALSE;

-- 2. Add `is_approved` to `public.feedback`
ALTER TABLE public.feedback ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT FALSE;
