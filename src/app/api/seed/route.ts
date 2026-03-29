import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { coursesData } from '@/data/courses';

export async function GET() {
  const coursesToInsert = Object.entries(coursesData).map(([id, data]) => ({
    id,
    level: data.level,
    category: data.category,
    title: data.title,
    short_description: data.shortDescription,
    full_description: data.fullDescription,
    duration: data.duration,
    hours: data.hours,
    price: parseInt(data.price.replace(/\\D/g, '')) || 0,
    featured_image: data.featuredImage,
    outcomes: data.outcomes,
    syllabus: data.syllabus,
  }));

  const { error } = await supabase.from('courses').upsert(coursesToInsert);

  if (error) {
    return NextResponse.json({ success: false, error });
  }

  return NextResponse.json({ success: true, message: 'Data seeded successfully!' });
}
