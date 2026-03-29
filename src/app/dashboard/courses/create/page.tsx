import { CourseForm } from "../components/CourseForm"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CreateCoursePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <header className="mb-8 border-b border-white/5 pb-6">
                <Link href="/dashboard/courses" className="text-primary hover:text-primary/80 flex items-center gap-2 mb-4 font-bold transition-colors w-fit">
                    <ArrowRight className="w-4 h-4" /> العودة إلى قائمة الدورات
                </Link>
                <h1 className="font-headline font-black text-4xl mb-3 text-on-surface">إضافة دورة جديدة</h1>
                <p className="text-on-surface-variant text-lg leading-relaxed">قم بإنشاء دورة تدريبية جديدة بالكامل وخصص المنهج والمميزات الخاصة بها.</p>
            </header>

            <CourseForm />
        </div>
    )
}
