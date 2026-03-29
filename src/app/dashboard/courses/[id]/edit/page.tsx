import { CourseForm } from "../../components/CourseForm"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    const { data: course } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single()

    if (!course) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <header className="mb-8 border-b border-white/5 pb-6">
                <Link href="/dashboard/courses" className="text-primary hover:text-primary/80 flex items-center gap-2 mb-4 font-bold transition-colors w-fit">
                    <ArrowRight className="w-4 h-4" /> العودة إلى قائمة الدورات
                </Link>
                <h1 className="font-headline font-black text-4xl mb-3 text-on-surface">تعديل الدورة: {course.title}</h1>
                <p className="text-on-surface-variant text-lg leading-relaxed">قم بتحديث المنهج والتفاصيل الخاصة بالدورة من هنا.</p>
            </header>

            <CourseForm defaultData={course} />
        </div>
    )
}
