-- Dashboard Security Reinforcement: Restricting all administrative actions to a specific email whitelist
-- This migration ensures that even if a user is "authenticated", they cannot access
-- sensitive tables unless their email matches the authorized administrators.

-- 1. Courses Security
DROP POLICY IF EXISTS "Allow admin insert courses" ON public.courses;
DROP POLICY IF EXISTS "Allow admin update courses" ON public.courses;
DROP POLICY IF EXISTS "Allow admin delete courses" ON public.courses;
DROP POLICY IF EXISTS "Allow authorized admin full access to courses" ON public.courses;

CREATE POLICY "Allow authorized admin full access to courses"
ON public.courses FOR ALL
TO authenticated
USING (auth.jwt() ->> 'email' IN ('ghyathalali33@gmail.com', 'laith.alali33@gmail.com', 'info@kafaaat.academy'))
WITH CHECK (auth.jwt() ->> 'email' IN ('ghyathalali33@gmail.com', 'laith.alali33@gmail.com', 'info@kafaaat.academy'));

-- 2. Feedback Security
DROP POLICY IF EXISTS "Allow admin read feedback" ON public.feedback;
DROP POLICY IF EXISTS "Allow admin full access to feedback" ON public.feedback;
DROP POLICY IF EXISTS "Allow authorized admin full access to feedback" ON public.feedback;

CREATE POLICY "Allow authorized admin full access to feedback"
ON public.feedback FOR ALL
TO authenticated
USING (auth.jwt() ->> 'email' IN ('ghyathalali33@gmail.com', 'laith.alali33@gmail.com', 'info@kafaaat.academy'))
WITH CHECK (auth.jwt() ->> 'email' IN ('ghyathalali33@gmail.com', 'laith.alali33@gmail.com', 'info@kafaaat.academy'));

-- 3. Inquiries Security
DROP POLICY IF EXISTS "Allow admin read inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow admin update inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow authorized admin full access to inquiries" ON public.inquiries;

CREATE POLICY "Allow authorized admin full access to inquiries"
ON public.inquiries FOR ALL
TO authenticated
USING (auth.jwt() ->> 'email' IN ('ghyathalali33@gmail.com', 'laith.alali33@gmail.com', 'info@kafaaat.academy'))
WITH CHECK (auth.jwt() ->> 'email' IN ('ghyathalali33@gmail.com', 'laith.alali33@gmail.com', 'info@kafaaat.academy'));

-- 4. Testimonials Security
DROP POLICY IF EXISTS "Allow admin full access to testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow authorized admin full access to testimonials" ON public.testimonials;

CREATE POLICY "Allow authorized admin full access to testimonials"
ON public.testimonials FOR ALL
TO authenticated
USING (auth.jwt() ->> 'email' IN ('ghyathalali33@gmail.com', 'laith.alali33@gmail.com', 'info@kafaaat.academy'))
WITH CHECK (auth.jwt() ->> 'email' IN ('ghyathalali33@gmail.com', 'laith.alali33@gmail.com', 'info@kafaaat.academy'));

-- 5. Site Settings Security
DROP POLICY IF EXISTS "Allow admin update site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow authorized admin full access to site_settings" ON public.site_settings;

CREATE POLICY "Allow authorized admin full access to site_settings"
ON public.site_settings FOR ALL
TO authenticated
USING (auth.jwt() ->> 'email' IN ('ghyathalali33@gmail.com', 'laith.alali33@gmail.com', 'info@kafaaat.academy'))
WITH CHECK (auth.jwt() ->> 'email' IN ('ghyathalali33@gmail.com', 'laith.alali33@gmail.com', 'info@kafaaat.academy'));

-- 6. Blogs Security
DROP POLICY IF EXISTS "Allow admin full access to blogs" ON public.blogs;
DROP POLICY IF EXISTS "Allow authorized admin full access to blogs" ON public.blogs;

CREATE POLICY "Allow authorized admin full access to blogs"
ON public.blogs FOR ALL
TO authenticated
USING (auth.jwt() ->> 'email' IN ('ghyathalali33@gmail.com', 'laith.alali33@gmail.com', 'info@kafaaat.academy'))
WITH CHECK (auth.jwt() ->> 'email' IN ('ghyathalali33@gmail.com', 'laith.alali33@gmail.com', 'info@kafaaat.academy'));
