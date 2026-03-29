import { getTestimonials } from "@/app/actions/testimonials"
export const dynamic = "force-dynamic"
import { TestimonialsManager } from "./components/TestimonialsManager"

export default async function TestimonialsPage() {
    const defaultData = await getTestimonials()

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <header className="mb-8 border-b border-white/5 pb-6">
                <h1 className="font-headline font-black text-4xl mb-3 text-on-surface">إدارة التقييمات</h1>
                <p className="text-on-surface-variant text-lg leading-relaxed">أضف، عدل، أو احذف آراء المتدربين التي تظهر في الصفحة الرئيسية.</p>
            </header>

            <TestimonialsManager initialData={defaultData} />
        </div>
    )
}
