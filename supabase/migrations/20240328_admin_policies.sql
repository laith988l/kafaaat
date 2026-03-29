-- Add admin write policies for courses (the initial migration only had read policy)
-- Run this in Supabase SQL Editor

CREATE POLICY "Allow admin insert courses"
ON public.courses FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow admin update courses"
ON public.courses FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow admin delete courses"
ON public.courses FOR DELETE
USING (auth.role() = 'authenticated');

-- Also add admin read/update policies for feedback and inquiries
CREATE POLICY "Allow admin read feedback"
ON public.feedback FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admin read inquiries"
ON public.inquiries FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admin update inquiries"
ON public.inquiries FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
