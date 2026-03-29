-- Add DELETE policies for inquiries and feedback
-- Run this in Supabase SQL Editor if you haven't applied migrations recently

CREATE POLICY "Allow admin delete inquiries"
ON public.inquiries FOR DELETE
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admin delete feedback"
ON public.feedback FOR DELETE
USING (auth.role() = 'authenticated');
