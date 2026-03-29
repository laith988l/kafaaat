import { createClient } from "@/utils/supabase/server"
import { MotionCard } from "@/components/MotionCard"
import { ArrowLeft, Clock, MessageSquare, ShieldAlert, Star, Users } from "lucide-react"
import Link from "next/link"
import BannerToggle from "@/components/BannerToggle"
import { getBannerSettings } from "../actions"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
    const supabase = await createClient()

    // Aggregate Data
    const [{ count: inquiriesCount }, { count: feedbackCount }, { data: recentInquiries }, bannerConfig] = await Promise.all([
        supabase.from("inquiries").select("*", { count: "exact" }),
        supabase.from("feedback").select("*", { count: "exact" }),
        supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(5),
        getBannerSettings()
    ])

    const stats = [
        { title: "إجمالي الاستفسارات", value: inquiriesCount || 0, icon: Users, color: "text-primary", bg: "bg-primary/10" },
        { title: "التقييمات المستلمة", value: feedbackCount || 0, icon: Star, color: "text-secondary", bg: "bg-secondary/10" },
        { title: "الاستفسارات الجديدة", value: (recentInquiries?.length || 0), icon: MessageSquare, color: "text-tertiary", bg: "bg-tertiary/10" },
    ]


    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-8">
                <h1 className="font-headline font-black text-3xl mb-2 text-on-surface">نظرة عامة</h1>
                <p className="text-on-surface-variant">مرحباً بك في لوحة تحكم أكاديمية كفاءات</p>
            </header>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((s, i) => (
                    <MotionCard key={i} delay={i * 0.1} className="bg-surface-container-low p-6 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
                        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-[40px] mix-blend-screen opacity-50 transition-transform group-hover:scale-150 ${s.bg}`}></div>
                        
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className={`p-3 rounded-xl ${s.bg} border border-white/10`}>
                                <s.icon className={`w-6 h-6 ${s.color}`} />
                            </div>
                        </div>
                        
                        <div className="relative z-10 text-right">
                            <h3 className="text-on-surface-variant font-medium text-sm mb-1">{s.title}</h3>
                            <p className="text-4xl font-headline font-black text-on-surface">{s.value}</p>
                        </div>
                    </MotionCard>
                ))}
            </div>

            {/* Recent Activity */}
            <h2 className="font-headline font-bold text-xl mt-10 mb-4 text-on-surface flex items-center gap-2">
                <Clock className="w-5 h-5 text-on-surface-variant" />
                أحدث الاستفسارات
            </h2>

            <div className="bg-surface-container-low border border-white/5 rounded-3xl overflow-hidden relative">
                {recentInquiries && recentInquiries.length > 0 ? (
                    <div className="divide-y divide-white/5">
                        {recentInquiries.map((inq: any) => (
                            <div key={inq.id} className="p-5 hover:bg-white/5 transition-colors flex items-center justify-between group">
                                <div className="flex flex-col gap-1 items-start text-right">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-on-surface">{inq.name}</span>
                                        {inq.course_level && (
                                            <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-primary/20 text-primary border border-primary/30 rounded-full">
                                                {inq.course_level}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-sm text-on-surface-variant/80 max-w-xl truncate">
                                        {inq.message || `تفاصيل التواصل: ${inq.phone || inq.email}`}
                                    </span>
                                </div>
                                
                                <span className="text-xs text-on-surface-variant opacity-50 font-mono">
                                    {new Date(inq.created_at).toLocaleDateString('ar-EG')}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-10 text-center flex flex-col items-center justify-center text-on-surface-variant opacity-50">
                        <ShieldAlert className="w-10 h-10 mb-3 opacity-20" />
                        لا توجد استفسارات حالياً
                    </div>
                )}
                
                
                <div className="p-4 border-t border-white/5 bg-surface-container-highest/20 text-center">
                    <Link href="/dashboard/inquiries" className="text-sm text-primary hover:text-primary-container transition-colors inline-flex items-center justify-center gap-2 group font-medium">
                        عرض كافة الاستفسارات
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Settings */}
            <h2 className="font-headline font-bold text-xl mt-12 mb-4 text-on-surface flex items-center gap-2">
                إعدادات الموقع
            </h2>
            <div className="mb-10">
                <BannerToggle initialConfig={bannerConfig} />
            </div>
        </div>
    )
}

