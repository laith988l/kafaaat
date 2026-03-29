import { createClient } from "@/utils/supabase/server"
import { MotionCard } from "@/components/MotionCard"
import { BookOpen, Plus } from "lucide-react"
import Link from "next/link"
import { CourseActions } from "./components/CourseActions"

export default async function CoursesPage() {
    const supabase = await createClient()

    const { data: courses } = await supabase
        .from("courses")
        .select("*")
        .order("level", { ascending: true })

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
                <div>
                    <h1 className="font-headline font-black text-4xl mb-3 text-on-surface">إدارة الدورات</h1>
                    <p className="text-on-surface-variant text-lg leading-relaxed">جميع الدورات المتاحة للتسجيل عبر الأكاديمية</p>
                </div>
                <Link href="/dashboard/courses/create" className="bg-primary hover:bg-primary/90 text-on-primary px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(242,202,80,0.2)] flex items-center justify-center gap-2 w-fit">
                    <Plus className="w-5 h-5" /> إضافة دورة جديدة
                </Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses && courses.length > 0 ? courses.map((c: any, i: number) => (
                    <MotionCard key={c.id} delay={i * 0.1} className="bg-surface-container-low p-6 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
                        <CourseActions id={c.id} />
                        <div className="flex items-center gap-4 mb-6 mt-4">
                            <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                                <span className="font-headline font-black text-2xl text-primary">{c.level}</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-on-surface">{c.title}</h3>
                                <p className="text-on-surface-variant text-sm flex items-center gap-2">
                                    <BookOpen className="w-4 h-4" />
                                    {c.duration} - {c.hours} ساعة
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm py-2 border-b border-white/5 text-right w-full">
                                <span className="text-on-surface font-medium">€{c.price}</span>
                                <span className="text-on-surface-variant">سعر الدورة</span>
                            </div>
                            <div className="flex justify-between text-sm py-2 border-b border-white/5 text-right w-full">
                                <span className="text-primary font-medium">{c.category}</span>
                                <span className="text-on-surface-variant">التصنيف</span>
                            </div>
                        </div>

                        
                        {c.featured && (
                            <div className="text-center pt-2">
                                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">دورة مميزة</span>
                            </div>
                        )}
                    </MotionCard>
                )) : (
                    <div className="col-span-full py-20 text-center text-on-surface-variant/50">
                        لا توجد دورات حالياً
                    </div>
                )}
            </div>
        </div>
    )
}
