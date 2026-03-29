"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function createCourseAction(courseData: any) {
    const supabase = await createClient()

    const dataToInsert = {
        id: courseData.id || courseData.slug,
        level: courseData.level,
        category: courseData.category || '',
        title: courseData.title,
        short_description: courseData.short_description || courseData.description || '',
        full_description: courseData.full_description || courseData.fullDescription || '',
        duration: courseData.duration || '',
        hours: parseInt(courseData.hours) || 0,
        price: parseFloat(courseData.price) || 0,
        featured_image: courseData.featured_image || '',
        outcomes: Array.isArray(courseData.outcomes) ? courseData.outcomes : [],
        syllabus: Array.isArray(courseData.syllabus) ? courseData.syllabus : [],
    }

    const { data, error } = await supabase
        .from('courses')
        .insert(dataToInsert)
        .select()
        .single()

    if (error) {
        console.error("Error creating course:", error)
        return { success: false, error: error.message }
    }

    revalidatePath("/courses")
    revalidatePath("/dashboard/courses")
    revalidatePath("/")
    
    return { success: true, data }
}

export async function updateCourseAction(id: string, courseData: any) {
    const supabase = await createClient()

    const dataToUpdate = {
        level: courseData.level,
        category: courseData.category || '',
        title: courseData.title,
        short_description: courseData.short_description || courseData.description || '',
        full_description: courseData.full_description || courseData.fullDescription || '',
        duration: courseData.duration || '',
        hours: parseInt(courseData.hours) || 0,
        price: parseFloat(courseData.price) || 0,
        featured_image: courseData.featured_image || '',
        outcomes: Array.isArray(courseData.outcomes) ? courseData.outcomes : [],
        syllabus: Array.isArray(courseData.syllabus) ? courseData.syllabus : [],
    }

    const { error } = await supabase
        .from('courses')
        .update(dataToUpdate)
        .eq('id', id)

    if (error) {
        console.error("Error updating course:", error)
        return { success: false, error: error.message }
    }

    revalidatePath("/courses")
    revalidatePath("/dashboard/courses")
    revalidatePath("/")

    return { success: true }
}

export async function deleteCourseAction(id: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id)

    if (error) {
        console.error("Error deleting course:", error)
        return { success: false, error: error.message }
    }

    revalidatePath("/courses")
    revalidatePath("/dashboard/courses")
    revalidatePath("/")

    return { success: true }
}
