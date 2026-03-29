"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server"

export async function getSettings() {
    // Standard Supabase client for reading data (publicly available via RLS)
    const { data, error } = await supabase.from('site_settings').select('*')
    if (error) {
        console.error("Failed to fetch settings:", error)
        return {}
    }
    
    // Map array of {key, value} to a single object Record<string, string>
    const settingsMap = data.reduce((acc, curr) => {
        acc[curr.key] = curr.value
        return acc
    }, {} as Record<string, string>)
    
    return settingsMap
}

export async function updateSetting(key: string, value: string) {
    // Requires authenticated client
    const serverSupabase = await createClient()

    const { error } = await serverSupabase
        .from('site_settings')
        .update({ value, updated_at: new Date().toISOString() })
        .eq('key', key)

    if (error) {
        console.error(`Failed to update setting ${key}:`, error)
        return { success: false, error: 'حدث خطأ أثناء الحفظ.' }
    }

    revalidatePath("/", "layout")
    return { success: true }
}
