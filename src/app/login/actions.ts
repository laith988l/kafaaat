"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

export async function login(formData: FormData) {
  const supabase = await createClient()

  // Extract from formData
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "يرجى تعبئة كافة الحقول المطلوبة" } // Please fill all required fields
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Basic error handling for auth
    let message = "فشل تسجيل الدخول. يرجى التحقق من بياناتك." // Login failed. Please verify credentials.
    if (error.message.includes("Invalid login credentials")) {
      message = "البريد الإلكتروني أو كلمة المرور غير صحيحة." // Invalid email or password.
    }
    return { error: message }
  }

  const cookieStore = await cookies()
  cookieStore.set("dashboard_access", "true", { 
    maxAge: 3600, // 1 hour
    path: "/", 
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production" 
  })

  revalidatePath("/", "layout")
  redirect("/dashboard")
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/")
}
