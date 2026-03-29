'use server';

import { supabase } from '@/lib/supabase';
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// ── Contact Form / Inquiry Submission ──────────────────────────────
export async function submitInquiry(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const inquiry_type = formData.get('inquiry_type') as string;
  const message = formData.get('message') as string;
  const course_id = (formData.get('course_id') as string) || null;

  if (!name || !email || !phone || !inquiry_type) {
    return { success: false, error: 'يرجى ملء جميع الحقول المطلوبة.' };
  }

  const serverSupabase = await createClient();

  // 1. Try to insert with both columns (to check which one exists)
  // We specify only the ones we're sure about first
  const baseData = { name, email, phone, inquiry_type, message: message || null };
  
  // Try inserting with course_id first
  const { error: e1 } = await serverSupabase.from('inquiries').insert({ ...baseData, course_id });

  if (e1) {
    console.error("Submission try 1 (course_id) failed:", e1.message);
    // If it failed because column doesn't exist, try course_level
    const { error: e2 } = await serverSupabase.from('inquiries').insert({ ...baseData, course_level: course_id });
    
    if (e2) {
      console.error("Submission try 2 (course_level) failed:", e2.message);
      // Final fallback: try inserting without any course column at all
      const { error: e3 } = await serverSupabase.from('inquiries').insert(baseData);
      
      if (e3) {
        return { success: false, error: "فشل الإرسال: " + e3.message };
      }
    }
  }

  revalidatePath('/dashboard/inquiries');
  return { success: true };
}

// ── Feedback Submission ────────────────────────────────────────────
export async function submitFeedback(formData: FormData) {
  const name = (formData.get('name') as string) || null;
  const rating = parseInt(formData.get('rating') as string);
  const category = (formData.get('category') as string) || null;
  const message = formData.get('message') as string;

  if (!message || !rating || rating < 1 || rating > 5) {
    return { success: false, error: 'يرجى إضافة تقييم ورسالة.' };
  }

  const serverSupabase = await createClient();
  const { error } = await serverSupabase.from('feedback').insert({
    name,
    rating,
    category,
    message,
  });

  if (error) {
    console.error('Feedback submission error:', error);
    return { success: false, error: 'حدث خطأ أثناء إرسال الملاحظة. يرجى المحاولة لاحقاً.' };
  }

  revalidatePath("/", "layout");
  revalidatePath("/dashboard/feedback");
  return { success: true };
}

export async function toggleFeedbackApproval(id: string, currentStatus: boolean) {
  const serverSupabase = await createClient();

  // If we are approving (!currentStatus is true), we MOVE it to testimonials
  if (!currentStatus) {
    // 1. Fetch the feedback data
    const { data: feedbackItem, error: fetchError } = await serverSupabase
      .from('feedback')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !feedbackItem) {
      console.error("Error fetching feedback for move:", fetchError);
      return { success: false, error: "فشل الحصول على بيانات الملاحظة لنقلها." };
    }

    // 2. Insert into testimonials
    const { error: insertError } = await serverSupabase
      .from('testimonials')
      .insert({
        name: feedbackItem.name || "مجهول",
        role: feedbackItem.category || "طالب كفاءات",
        quote: feedbackItem.message,
        rating: feedbackItem.rating || 5,
        is_approved: true
      });

    if (insertError) {
      console.error("Error inserting into testimonials:", insertError);
      return { success: false, error: "فشل إضافة الملاحظة كشهادة طالب." };
    }

    // 3. Delete from feedback
    const { error: deleteError } = await serverSupabase
      .from('feedback')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error("Error deleting feedback after move:", deleteError);
      // We don't return failure here because it's already added to testimonials, 
      // but it might cause duplicates if not deleted.
    }

    revalidatePath("/", "layout");
    revalidatePath("/dashboard/feedback");
    revalidatePath("/dashboard/testimonials");
    return { success: true, message: "تم نقل الملاحظة إلى قسم آراء الطلاب بنجاح." };
  } else {
    // If we are un-approving (though it's already moved, 
    // this branch might be for existing approved feedback), we just flip status.
    const { error } = await serverSupabase
      .from('feedback')
      .update({ is_approved: false })
      .eq('id', id);

    if (error) {
      console.error("Error hiding feedback:", error);
      return { success: false, error: "فشل تحديث حالة الملاحظة." };
    }

    revalidatePath("/", "layout");
    return { success: true };
  }
}

export async function deleteFeedback(id: string) {
  const serverSupabase = await createClient();

  const { error } = await serverSupabase
    .from('feedback')
    .delete()
    .eq('id', id);

  if (error) {
    console.error("Error deleting feedback:", error);
    return { success: false, error: "فشل حذف الملاحظة." };
  }

  revalidatePath("/", "layout");
  revalidatePath("/dashboard/feedback");
  return { success: true };
}

// ── Course Inquiry (from course detail page) ───────────────────────
export async function submitCourseInquiry(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const course_id = formData.get('course_id') as string;

  if (!name || !email || !phone || !course_id) {
    return { success: false, error: 'يرجى ملء جميع الحقول المطلوبة.' };
  }

  const serverSupabase = await createClient();
  const { error } = await serverSupabase.from('inquiries').insert({
    name,
    email,
    phone,
    inquiry_type: 'تسجيل في دورة الألمانية',
    course_id,
    message: `طلب تسجيل في دورة ${course_id}`,
  });

  if (error) {
    console.error('Course inquiry error:', error);
    return { success: false, error: 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة لاحقاً.' };
  }

  revalidatePath("/dashboard/inquiries");
  return { success: true };
}

export async function getCourses() { const { data } = await supabase.from('courses').select('*').neq('id', '_banner_config_').order('level', { ascending: true }); return data || []; }
export async function getCourseByLevel(level: string) { const { data } = await supabase.from('courses').select('*').eq('id', level).single(); return data; }

// ── Settings ───────────────────────────────────────────────────────
export async function getBannerSettings() {
  const serverSupabase = await createClient();
  const { data, error } = await serverSupabase.from('courses').select('*').eq('id', '_banner_config_').single();
  
  if (error || !data) {
    return { 
      isActive: false, 
      message: 'خصم لفترة محدودة على جميع دوراتنا!',
      description: 'اغتنم الفرصة وسجل الآن في أفضل دورات اللغة الألمانية',
      discountPercentage: '%50',
      buttonLink: '/courses/bundle'
    };
  }

  return {
    isActive: data.price === 1,
    message: data.title,
    description: data.short_description,
    discountPercentage: data.featured_image,
    buttonLink: data.duration
  };
}

export async function updateSaleBanner(isActive: boolean, message: string, description: string, discountPercentage: string, buttonLink: string) {
  const serverSupabase = await createClient();

  // Re-using 'courses' table to store config to avoid DDL/create table requirements
  const { error } = await serverSupabase
    .from('courses')
    .upsert({ 
        id: '_banner_config_', 
        level: 'zz_CONFIG',
        category: 'CONFIG',
        title: message, 
        short_description: description,
        full_description: 'Banner Configuration Data',
        duration: buttonLink,
        hours: 0,
        price: isActive ? 1 : 0,
        featured_image: discountPercentage,
        outcomes: [],
        syllabus: []
    });

  if (error) {
    console.error("Error toggling sale banner:", error);
    return { success: false, error: "فشل تحديث حالة الإعلان." };
  }

  revalidatePath("/", "layout");
  return { success: true };
}
