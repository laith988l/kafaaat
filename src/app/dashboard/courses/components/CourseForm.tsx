"use client"

import { useState } from "react"
import { MotionCard } from "@/components/MotionCard"
import { Trash2, Plus, Save, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { createCourseAction, updateCourseAction } from "@/app/actions/courses"

export function CourseForm({ defaultData = null }: { defaultData?: any }) {
    const router = useRouter()
    const isEdit = !!defaultData
    const [submitting, setSubmitting] = useState(false)

    const [basicInfo, setBasicInfo] = useState({
        id: defaultData?.id || "",
        title: defaultData?.title || "",
        level: defaultData?.level || "",
        category: defaultData?.category || "",
        duration: defaultData?.duration || "",
        hours: defaultData?.hours || 0,
        price: defaultData?.price || 0,
        featured_image: defaultData?.featured_image || "",
        short_description: defaultData?.short_description || "",
        full_description: defaultData?.full_description || "",
    })

    const [features, setFeatures] = useState<string[]>(defaultData?.outcomes || ["", "", ""])
    const [syllabus, setSyllabus] = useState<{ title: string; desc: string }[]>(
        defaultData?.syllabus || [{ title: "", desc: "" }]
    )

    const handleBasicChange = (e: any) => {
        const { name, value } = e.target
        setBasicInfo(prev => ({ ...prev, [name]: value }))
    }

    const handleArrayChange = (setter: any, index: number, value: string) => {
        setter((prev: string[]) => {
            const next = [...prev]
            next[index] = value
            return next
        })
    }

    const handleSyllabusChange = (index: number, key: string, value: string) => {
        setSyllabus(prev => {
            const next = [...prev]
            next[index] = { ...next[index], [key]: value }
            return next
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        
        const courseData = {
            ...basicInfo,
            outcomes: features.filter(f => f.trim() !== ""),
            syllabus: syllabus.filter(s => s.title.trim() !== "")
        }

        let res;
        if (isEdit) {
            res = await updateCourseAction(defaultData.id, courseData)
        } else {
            res = await createCourseAction(courseData)
        }

        if (res.success) {
            router.push("/dashboard/courses")
        } else {
            alert(res.error)
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-12">
            {/* Basic Info */}
            <section className="space-y-6">
                <h2 className="font-headline font-bold text-2xl text-on-surface">المعلومات الأساسية</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <MotionCard className="bg-surface-container-low p-6 rounded-3xl border border-white/5 space-y-2 focus-within:border-primary/50 transition-colors">
                        <label className="text-sm text-on-surface-variant mb-1 ml-2 font-medium">عنوان الدورة</label>
                        <input name="title" required value={basicInfo.title} onChange={handleBasicChange} className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface focus:ring-1 focus:ring-primary/50 outline-none" placeholder="مثال: أساسيات الألمانية" />
                    </MotionCard>
                    {!isEdit && (
                        <MotionCard className="bg-surface-container-low p-6 rounded-3xl border border-white/5 space-y-2 focus-within:border-primary/50 transition-colors">
                            <label className="text-sm text-on-surface-variant mb-1 ml-2 font-medium">معرّف الدورة (ID)</label>
                            <input name="id" required value={basicInfo.id} onChange={handleBasicChange} dir="ltr" className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface focus:ring-1 focus:ring-primary/50 outline-none" placeholder="مثال: a1" />
                        </MotionCard>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MotionCard className="bg-surface-container-low p-6 rounded-3xl border border-white/5 space-y-2 focus-within:border-primary/50 transition-colors">
                        <label className="text-sm text-on-surface-variant mb-1 ml-2 font-medium">المستوى</label>
                        <input name="level" required value={basicInfo.level} onChange={handleBasicChange} className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface focus:ring-1 focus:ring-primary/50 outline-none" placeholder="A1, A2, B1.." />
                    </MotionCard>
                    <MotionCard className="bg-surface-container-low p-6 rounded-3xl border border-white/5 space-y-2 focus-within:border-primary/50 transition-colors">
                        <label className="text-sm text-on-surface-variant mb-1 ml-2 font-medium">التصنيف</label>
                        <input name="category" value={basicInfo.category} onChange={handleBasicChange} className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface focus:ring-1 focus:ring-primary/50 outline-none" placeholder="مبتدئ، متوسط..." />
                    </MotionCard>
                    <MotionCard className="bg-surface-container-low p-6 rounded-3xl border border-white/5 space-y-2 focus-within:border-primary/50 transition-colors">
                        <label className="text-sm text-on-surface-variant mb-1 ml-2 font-medium">السعر (يورو)</label>
                        <input name="price" type="number" required value={basicInfo.price} onChange={handleBasicChange} dir="ltr" className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface focus:ring-1 focus:ring-primary/50 outline-none" />
                    </MotionCard>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <MotionCard className="bg-surface-container-low p-6 rounded-3xl border border-white/5 space-y-2 focus-within:border-primary/50 transition-colors">
                        <label className="text-sm text-on-surface-variant mb-1 ml-2 font-medium">المدة الزمنية</label>
                        <input name="duration" value={basicInfo.duration} onChange={handleBasicChange} className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface focus:ring-1 focus:ring-primary/50 outline-none" placeholder="8 أسابيع" />
                    </MotionCard>
                    <MotionCard className="bg-surface-container-low p-6 rounded-3xl border border-white/5 space-y-2 focus-within:border-primary/50 transition-colors">
                        <label className="text-sm text-on-surface-variant mb-1 ml-2 font-medium">عدد الساعات</label>
                        <input name="hours" type="number" value={basicInfo.hours} onChange={handleBasicChange} dir="ltr" className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface focus:ring-1 focus:ring-primary/50 outline-none" />
                    </MotionCard>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-2">
                        <MotionCard className="bg-surface-container-low p-6 rounded-3xl border border-white/5 space-y-2 focus-within:border-primary/50 transition-colors h-full">
                            <label className="text-sm text-on-surface-variant mb-1 ml-2 font-medium flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">image</span>
                                رابط صورة الدورة
                            </label>
                            <input 
                                name="featured_image" 
                                value={basicInfo.featured_image} 
                                onChange={handleBasicChange} 
                                dir="ltr" 
                                className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface focus:ring-1 focus:ring-primary/50 outline-none" 
                                placeholder="https://..." 
                            />
                            <p className="text-[10px] text-on-surface-variant/60 mt-2 text-left">أدخل رابط مباشر للصورة (Unsplash, Google Drive, etc.)</p>
                        </MotionCard>
                    </div>
                    <div className="lg:col-span-1">
                        <MotionCard className="bg-surface-container-low p-2 rounded-3xl border border-white/5 overflow-hidden aspect-video flex items-center justify-center relative group">
                            {basicInfo.featured_image ? (
                                <>
                                    <img 
                                        src={basicInfo.featured_image} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover rounded-2xl transition-transform group-hover:scale-105" 
                                        onError={(e) => (e.currentTarget.src = "https://placehold.co/600x400/1e293b/f2ca50?text=رابط+غير+صحيح")}
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                        <span className="text-white text-xs font-bold">معاينة الصورة</span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-on-surface-variant/30 flex flex-col items-center gap-2">
                                    <span className="material-symbols-outlined text-4xl">hide_image</span>
                                    <span className="text-xs">لا يوجد صورة</span>
                                </div>
                            )}
                        </MotionCard>
                    </div>
                </div>
            </section>

            {/* Course Descriptions */}
            <hr className="border-white/5" />
            <section className="space-y-6">
                <h2 className="font-headline font-bold text-2xl text-on-surface">وصف الدورة (Info)</h2>
                <div className="grid grid-cols-1 gap-6">
                    <MotionCard className="bg-surface-container-low p-6 rounded-3xl border border-white/5 space-y-2 focus-within:border-primary/50 transition-colors">
                        <label className="text-sm text-on-surface-variant mb-1 ml-2 font-medium">وصف مختصر (يظهر في القائمة)</label>
                        <textarea name="short_description" value={basicInfo.short_description} onChange={handleBasicChange} rows={2} className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface focus:ring-1 focus:ring-primary/50 outline-none resize-none" placeholder="اكتب وصفاً جذاباً لمشاهدته في صفحة الدورات..." />
                    </MotionCard>
                    <MotionCard className="bg-surface-container-low p-6 rounded-3xl border border-white/5 space-y-2 focus-within:border-primary/50 transition-colors">
                        <label className="text-sm text-on-surface-variant mb-1 ml-2 font-medium">وصف تفصيلي كامل (يظهر في صفحة التفاصيل)</label>
                        <textarea name="full_description" value={basicInfo.full_description} onChange={handleBasicChange} rows={8} className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface focus:ring-1 focus:ring-primary/50 outline-none resize-none" placeholder="اكتب تفاصيل الدورة كاملة..." />
                    </MotionCard>
                </div>
            </section>

            {/* Outcomes */}
            <hr className="border-white/5" />
            <section className="space-y-6">
                <h2 className="font-headline font-bold text-2xl text-on-surface flex items-center justify-between">
                    مخرجات التعلم
                    <button type="button" onClick={() => setFeatures([...features, ""])} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-1 hover:bg-primary/20 transition-colors"><Plus className="w-4 h-4"/> إضافة</button>
                </h2>
                <div className="space-y-3">
                    {features.map((f, i) => (
                        <div key={i} className="flex gap-2 items-center">
                            <input value={f} onChange={(e) => handleArrayChange(setFeatures, i, e.target.value)} className="flex-1 bg-surface-container-highest border border-transparent rounded-xl py-3 px-4 text-on-surface focus:border-primary/50 outline-none" placeholder={`مخرج ${i + 1}`} />
                            <button type="button" onClick={() => setFeatures(features.filter((_, idx) => idx !== i))} className="p-3 text-on-surface-variant hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors shrink-0"><Trash2 className="w-5 h-5"/></button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Syllabus */}
            <hr className="border-white/5" />
            <section className="space-y-6">
                <h2 className="font-headline font-bold text-2xl text-on-surface flex items-center justify-between">
                    المنهج الدراسي (Syllabus)
                    <button type="button" onClick={() => setSyllabus([...syllabus, {title:"", desc:""}])} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-1 hover:bg-primary/20 transition-colors"><Plus className="w-4 h-4"/> إضافة وحدة</button>
                </h2>
                <div className="space-y-6">
                    {syllabus.map((s, i) => (
                        <div key={i} className="relative bg-surface-container-lowest p-6 rounded-2xl border border-white/5 flex flex-col gap-4">
                            <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center font-headline shadow-lg">{i+1}</span>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs text-on-surface-variant">عنوان الوحدة</label>
                                <input value={s.title} onChange={(e) => handleSyllabusChange(i, 'title', e.target.value)} className="w-full bg-surface-container border border-transparent rounded-xl py-3 px-4 font-bold text-on-surface focus:border-primary/50 outline-none" placeholder="مثال: الوحدة 1: القواعد الأساسية" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs text-on-surface-variant">وصف الوحدة</label>
                                <textarea value={s.desc} rows={2} onChange={(e) => handleSyllabusChange(i, 'desc', e.target.value)} className="w-full bg-surface-container border border-transparent rounded-xl py-3 px-4 text-on-surface focus:border-primary/50 outline-none resize-none" placeholder="تفاصيل..." />
                            </div>
                            <button type="button" onClick={() => setSyllabus(syllabus.filter((_, idx) => idx !== i))} className="text-error text-sm self-end hover:underline">إزالة</button>
                        </div>
                    ))}
                </div>
            </section>

            <div className="flex gap-4 pt-8 border-t border-white/10 sticky bottom-8 p-4 bg-surface-container/90 backdrop-blur-xl rounded-3xl shadow-2xl z-50">
                <button type="button" onClick={() => router.push("/dashboard/courses")} className="flex-1 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold py-4 rounded-xl transition-all">إلغاء</button>
                <button type="submit" disabled={submitting} className="flex-[3] bg-gradient-to-br from-primary to-[#e6b327] hover:scale-[1.01] active:scale-95 text-[#000f1f] shadow-[0_0_20px_rgba(242,202,80,0.3)] font-black text-lg py-4 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                    {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                    {isEdit ? "حفظ التعديلات" : "إنشاء الدورة"}
                </button>
            </div>
        </form>
    )
}
