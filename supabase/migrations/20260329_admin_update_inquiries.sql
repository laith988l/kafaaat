-- Add UPDATE policies for inquiries and feedback
-- Run this in Supabase SQL Editor to allow status updates

CREATE POLICY "Allow admin update inquiries"
ON public.inquiries FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow admin update feedback"
ON public.feedback FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
