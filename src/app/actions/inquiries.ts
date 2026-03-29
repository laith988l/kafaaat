"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateInquiryStatus(id: string, status: string) {
  console.log(`[SERVER-ACTION] Updating inquiry ${id} to status: ${status}`)
  const serverSupabase = await createClient()

  const { error } = await serverSupabase
    .from('inquiries')
    .update({ status: status })
    .eq('id', id)

  if (error) {
    console.error("Database update error:", error.message)
    return { success: false, error: "الرجاء التأكد من وجود عمود status في قاعدة البيانات. (خطأ: " + error.message + ")" }
  }

  revalidatePath("/dashboard/inquiries")
  return { success: true }
}

export async function deleteInquiry(id: string) {
  const serverSupabase = await createClient()

  const { error } = await serverSupabase
    .from('inquiries')
    .delete()
    .eq('id', id)

  if (error) {
    console.error("Error deleting inquiry:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard/inquiries")
  return { success: true }
}
