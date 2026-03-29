"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function getBlogs() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })

    if (error) {
        console.error("Error fetching blogs:", error)
        return []
    }
    return data || []
}

export async function getAllBlogsAction() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error("Error fetching all blogs:", error)
        return []
    }
    return data || []
}

export async function getBlogBySlug(slug: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error) {
        console.error("Error fetching blog by slug:", error)
        return null
    }
    return data
}

export async function getBlogById(id: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error("Error fetching blog by ID:", error)
        return null
    }
    return data
}

export async function createBlogAction(blogData: any) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('blogs')
        .insert({
            title: blogData.title,
            slug: blogData.slug,
            content: blogData.content,
            excerpt: blogData.excerpt || '',
            category: blogData.category || 'قواعد',
            author_name: blogData.author_name || 'أكاديمية كفاءات',
            author_role: blogData.author_role || 'مستشار أكاديمي',
            author_image: blogData.author_image || '',
            featured_image: blogData.featured_image || '',
            is_published: blogData.is_published ?? false
        })
        .select()
        .single()

    if (error) {
        console.error("Error creating blog:", error)
        return { success: false, error: error.message }
    }

    revalidatePath("/blog")
    revalidatePath("/dashboard/blog")
    revalidatePath("/")
    
    return { success: true, data }
}

export async function updateBlogAction(id: string, blogData: any) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('blogs')
        .update({
            title: blogData.title,
            slug: blogData.slug,
            content: blogData.content,
            excerpt: blogData.excerpt || '',
            category: blogData.category || 'قواعد',
            author_name: blogData.author_name || 'أكاديمية كفاءات',
            author_role: blogData.author_role || 'مستشار أكاديمي',
            author_image: blogData.author_image || '',
            featured_image: blogData.featured_image || '',
            is_published: blogData.is_published ?? false
        })
        .eq('id', id)

    if (error) {
        console.error("Error updating blog:", error)
        return { success: false, error: error.message }
    }

    revalidatePath("/blog")
    revalidatePath(`/blog/${blogData.slug}`)
    revalidatePath("/dashboard/blog")
    revalidatePath("/")

    return { success: true }
}

export async function deleteBlogAction(id: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id)

    if (error) {
        console.error("Error deleting blog:", error)
        return { success: false, error: error.message }
    }

    revalidatePath("/blog")
    revalidatePath("/dashboard/blog")
    revalidatePath("/")

    return { success: true }
}

export async function incrementBlogViews(id: string) {
    const supabase = await createClient()
    // Using simple update since view_count increments usually happen via RPC or raw SQL triggers if performance is key
    // But for simplicity:
    const { data } = await supabase.from('blogs').select('view_count').eq('id', id).single();
    const newCount = (data?.view_count || 0) + 1;
    
    await supabase.from('blogs').update({ view_count: newCount }).eq('id', id);
}
