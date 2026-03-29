"use server"

import { supabase } from "@/lib/supabase"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function getTestimonials(onlyApproved = false) {
    let query = supabase.from('testimonials').select('*').order('created_at', { ascending: false })
    
    if (onlyApproved) {
        query = query.eq('is_approved', true)
    }

    const { data, error } = await query
    
    if (error) {
        console.error("Failed to fetch testimonials:", error)
        return []
    }
    return data
}

export async function createTestimonial(formData: FormData) {
    const serverSupabase = await createClient()

    const name = formData.get('name') as string
    const role = formData.get('role') as string
    const quote = formData.get('quote') as string
    const rating = parseInt(formData.get('rating') as string) || 5

    const { error } = await serverSupabase
        .from('testimonials')
        .insert({ name, role, quote, rating })

    if (error) {
        console.error("Error creating testimonial:", error)
        return { success: false, error: "فشل إضافة التقييم." }
    }

    revalidatePath("/", "layout")
    return { success: true }
}

export async function updateTestimonial(id: number, formData: FormData) {
    const serverSupabase = await createClient()

    const name = formData.get('name') as string
    const role = formData.get('role') as string
    const quote = formData.get('quote') as string
    const rating = parseInt(formData.get('rating') as string) || 5

    const { error } = await serverSupabase
        .from('testimonials')
        .update({ name, role, quote, rating })
        .eq('id', id)

    if (error) {
        console.error("Error updating testimonial:", error)
        return { success: false, error: "فشل تحديث التقييم." }
    }

    revalidatePath("/", "layout")
    return { success: true }
}

export async function deleteTestimonial(id: number) {
    const serverSupabase = await createClient()

    const { error } = await serverSupabase
        .from('testimonials')
        .delete()
        .eq('id', id)

    if (error) {
        console.error("Error deleting testimonial:", error)
        return { success: false, error: "فشل حذف التقييم." }
    }

    revalidatePath("/", "layout")
    return { success: true }
}

export async function toggleTestimonialApproval(id: number, currentStatus: boolean) {
  const serverSupabase = await createClient()

  const { error } = await serverSupabase
    .from('testimonials')
    .update({ is_approved: !currentStatus })
    .eq('id', id)

  if (error) {
    console.error("Error toggling testimonial approval:", error)
    return { success: false, error: "فشل تحديث حالة التقييم." }
  }

  revalidatePath("/", "layout")
  return { success: true }
}

export async function getHomeReviews() {
    const serverSupabase = await createClient()
    
    // 1. Fetch all testimonials
    const { data: testimonials, error: tError } = await serverSupabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })

    // 2. Fetch all feedback
    const { data: feedback, error: fError } = await serverSupabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false })

    // 3. Normalize into common format and filter for approval
    const normalizedTestimonials = (testimonials || [])
        .filter(t => t.is_approved !== false) // Default to true if null/missing
        .map(t => ({
            id: `t_${t.id}`,
            quote: t.quote,
            name: t.name,
            role: t.role,
            rating: t.rating
        }))

    const normalizedFeedback = (feedback || [])
        .filter(f => f.is_approved === true) // Default to false for raw feedback
        .map(f => ({
            id: `f_${f.id}`,
            quote: f.message,
            name: f.name,
            role: f.category || "طالب كفاءات",
            rating: f.rating
        }))

    // 4. Return combined list
    return [...normalizedTestimonials, ...normalizedFeedback]
}
