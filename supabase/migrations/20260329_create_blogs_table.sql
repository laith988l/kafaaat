-- Create blogs table for the academy CMS
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT DEFAULT 'قواعد',
  author_name TEXT DEFAULT 'أكاديمية كفاءات',
  author_role TEXT DEFAULT 'مستشار أكاديمي',
  author_image TEXT,
  featured_image TEXT,
  is_published BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0
);

-- Basic RLS Policies (Assuming dashboard uses authenticated role)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published blogs
CREATE POLICY "Allow public read access to published blogs" 
ON blogs FOR SELECT 
USING (is_published = true);

-- Allow authenticated users (admins) all access
CREATE POLICY "Allow authenticated users full access" 
ON blogs FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Function to handle updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for update_updated_at_column
DROP TRIGGER IF EXISTS update_blogs_updated_at ON blogs;
CREATE TRIGGER update_blogs_updated_at
BEFORE UPDATE ON blogs
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();
