import { Sidebar } from "./components/Sidebar"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Dashboard - Kafaaat Academy",
  description: "Secure management dashboard",
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { isAuthorizedAdmin } = await import("@/lib/security")
  const isLocalhost = process.env.NODE_ENV === "development"
  
  if (!isAuthorizedAdmin(user.email) && !isLocalhost) {
    // Force logout or just redirect to home
    redirect("/")
  }

  const { count: unreadInquiriesCount } = await supabase
    .from("inquiries")
    .select("*", { count: "exact", head: true })
    .or("status.eq.new,status.eq.pending")

  const { count: unreadFeedbackCount } = await supabase
    .from("feedback")
    .select("*", { count: "exact", head: true })
    .eq("status", "new")

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col md:flex-row relative overflow-hidden" dir="rtl">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none -z-10"></div>
      
      <Sidebar 
        userEmail={user.email} 
        unreadInquiriesCount={unreadInquiriesCount || 0} 
        unreadFeedbackCount={unreadFeedbackCount || 0} 
      />
      
      <main className="flex-1 overflow-y-auto no-scrollbar relative z-10 w-full mt-16 md:mt-0 p-6 md:p-10 pb-32 md:pb-10">
        {children}
      </main>
    </div>
  )
}
