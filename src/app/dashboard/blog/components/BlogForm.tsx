"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBlogAction, updateBlogAction } from "@/app/actions/blog"
import { MotionCard } from "@/components/MotionCard"
import { Save, ArrowRight, Image as ImageIcon, User, Type, AlignLeft, Hash, Globe, Loader2, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface BlogFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function BlogForm({ initialData, isEditing = false }: BlogFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        content: initialData?.content || "",
        excerpt: initialData?.excerpt || "",
        category: initialData?.category || "قواعد",
        author_name: initialData?.author_name || "أكاديمية كفاءات",
        author_role: initialData?.author_role || "مستشار أكاديمي",
        author_image: initialData?.author_image || "",
        featured_image: initialData?.featured_image || "",
        is_published: initialData?.is_published ?? false
    })

    // Auto-generate slug from title
    useEffect(() => {
        if (!isEditing && formData.title) {
            const generatedSlug = formData.title
                .trim()
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\u0621-\u064Aa-z0-9-]/g, ''); // Basic regex for Arabic/English slugs
            setFormData(prev => ({ ...prev, slug: generatedSlug }))
        }
    }, [formData.title, isEditing])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as any
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        setFormData(prev => ({ ...prev, [name]: val }))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (isSubmitting) return

        setIsSubmitting(true)
        setSuccessMessage("")

        const res = isEditing 
            ? await updateBlogAction(initialData.id, formData)
            : await createBlogAction(formData)

        setIsSubmitting(false)

        if (res.success) {
            setSuccessMessage("تم حفظ المقال بنجاح! جاري تحويلك...")
            setTimeout(() => {
                router.push("/dashboard/blog")
                router.refresh()
            }, 1500)
        } else {
            alert(res.error || "حدث خطأ ما")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="font-headline font-black text-3xl text-on-surface">
                        {isEditing ? "تعديل مقال" : "كتابة مقال جديد"}
                    </h1>
                    <p className="text-on-surface-variant text-sm mt-1">تأكد من مراجعة المحتوى قبل النشر لضمان الجودة.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/blog" className="px-6 py-3 rounded-xl bg-surface-container-high text-on-surface font-bold hover:bg-surface-container-highest transition-all flex items-center gap-2">
                        <ArrowRight className="w-5 h-5" />
                        رجوع
                    </Link>
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="px-8 py-3 rounded-xl bg-primary text-on-primary font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50"
                    >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {isEditing ? "تحديث التغييرات" : "نشر المقال"}
                    </button>
                </div>
            </div>

            {successMessage && (
                <div className="p-4 bg-success/10 border border-success/20 text-success rounded-xl flex items-center gap-3 animate-in fade-in zoom-in duration-500">
                    <CheckCircle2 className="w-5 h-5" />
                    {successMessage}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Content Area (8 Cols) */}
                <div className="lg:col-span-8 space-y-8">
                    <MotionCard delay={0.1} className="bg-surface-container-low p-8 rounded-[2rem] border border-white/5 shadow-xl">
                        <div className="space-y-8">
                            {/* Title Section */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-on-surface-variant/70 flex items-center gap-2 mr-1">
                                    <Type className="w-4 h-4" /> عنوان المقال
                                </label>
                                <input 
                                    name="title" 
                                    required 
                                    className="w-full bg-surface-container-highest border-transparent rounded-2xl py-5 px-6 text-2xl font-black text-on-surface placeholder:text-outline-variant/30 text-right focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-highest/80 outline-none transition-all" 
                                    placeholder="أدخل عنواناً جذاباً للمقال.." 
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Content Section */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-on-surface-variant/70 flex items-center gap-2 mr-1">
                                    <AlignLeft className="w-4 h-4" /> محتوى المقال
                                </label>
                                <textarea 
                                    name="content" 
                                    required 
                                    rows={18}
                                    className="w-full bg-surface-container-highest border-transparent rounded-2xl py-5 px-6 text-on-surface leading-loose placeholder:text-outline-variant/30 text-right focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-highest/80 outline-none transition-all resize-none no-scrollbar font-medium" 
                                    placeholder="ابدأ الكتابة هنا.. يرجى استخدام لغة عربية فصحى وواضحة." 
                                    value={formData.content}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </MotionCard>
                </div>

                {/* Sidebar Options (4 Cols) */}
                <aside className="lg:col-span-4 space-y-8">
                    {/* Publishing Status */}
                    <MotionCard delay={0.2} className="bg-surface-container-low p-6 rounded-3xl border border-white/5">
                        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                             حالة النشر <Globe className="w-5 h-5 text-primary" />
                        </h3>
                        <label className="flex items-center justify-between cursor-pointer group p-4 rounded-xl bg-surface-container-highest/50 border border-transparent hover:border-primary/20 transition-all">
                            <span className="font-bold text-on-surface group-hover:text-primary transition-colors">نشر المقال (عام)</span>
                            <div className="relative">
                                <input 
                                    type="checkbox" 
                                    name="is_published"
                                    className="peer sr-only" 
                                    checked={formData.is_published}
                                    onChange={handleChange}
                                />
                                <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </div>
                        </label>
                        <p className="mt-4 text-xs text-on-surface-variant/60 leading-relaxed mr-1">عند تفعيل هذا الخيار، سيظهر المقال فوراً لجميع زوار الأكاديمية.</p>
                    </MotionCard>

                    {/* Metadata & Media */}
                    <MotionCard delay={0.3} className="bg-surface-container-low p-8 rounded-[2rem] border border-white/5 shadow-lg space-y-8">
                        <div className="space-y-6">
                            {/* URL Slug */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-on-surface-variant/50 mr-1 flex items-center gap-1">
                                    <Hash className="w-3 h-3" /> الرابط الدائم (Slug)
                                </label>
                                <input 
                                    name="slug" 
                                    required 
                                    className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-sm text-on-surface font-mono placeholder:text-outline-variant/30 text-left focus:ring-1 focus:ring-primary/30 outline-none" 
                                    placeholder="post-url-slug" 
                                    value={formData.slug}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-on-surface-variant/50 mr-1">تصنيف المقال</label>
                                <select 
                                    name="category"
                                    className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-sm text-on-surface font-bold focus:ring-1 focus:ring-primary/30 outline-none"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option>قواعد</option>
                                    <option>مفردات</option>
                                    <option>الدراسة في ألمانيا</option>
                                    <option>تأشيرات وجامعات</option>
                                    <option>ثقافة ومجتمع</option>
                                </select>
                            </div>

                            {/* Featured Image URL */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-on-surface-variant/50 mr-1 flex items-center gap-1">
                                    <ImageIcon className="w-3 h-3" /> رابط صورة الغلاف
                                </label>
                                <input 
                                    name="featured_image" 
                                    className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-sm text-on-surface placeholder:text-outline-variant/30 focus:ring-1 focus:ring-primary/30 outline-none" 
                                    placeholder="https://example.com/image.jpg" 
                                    value={formData.featured_image}
                                    onChange={handleChange}
                                />
                                {formData.featured_image && (
                                    <div className="mt-3 aspect-video rounded-xl overflow-hidden border border-white/5">
                                        <img src={formData.featured_image} className="w-full h-full object-cover" alt="Preview" />
                                    </div>
                                )}
                            </div>

                            {/* Excerpt */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-on-surface-variant/50 mr-1">وصف مصغر (SEO)</label>
                                <textarea 
                                    name="excerpt" 
                                    rows={3}
                                    className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-sm text-on-surface placeholder:text-outline-variant/30 focus:ring-1 focus:ring-primary/30 outline-none resize-none" 
                                    placeholder="اكتب وصفاً قصيراً يظهر في نتائج البحث وفي القائمة الرئيسية.." 
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </MotionCard>

                    {/* Author Section */}
                    <MotionCard delay={0.4} className="bg-surface-container-low p-8 rounded-[2rem] border border-white/5 shadow-lg space-y-6">
                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                            بيانات الكاتب <User className="w-5 h-5 text-secondary" />
                        </h3>
                        <div className="space-y-4 text-right">
                            <div className="space-y-1 text-right">
                                <label className="text-[10px] font-bold text-on-surface-variant/40 mr-1 uppercase">اسم الكاتب</label>
                                <input name="author_name" className="w-full bg-surface-container-highest border-transparent rounded-xl py-2 px-3 text-sm text-on-surface focus:ring-1 focus:ring-primary/30 outline-none text-right" value={formData.author_name} onChange={handleChange} />
                            </div>
                            <div className="space-y-1 text-right">
                                <label className="text-[10px] font-bold text-on-surface-variant/40 mr-1 uppercase">مسمى وظيفي</label>
                                <input name="author_role" className="w-full bg-surface-container-highest border-transparent rounded-xl py-2 px-3 text-sm text-on-surface focus:ring-1 focus:ring-primary/30 outline-none text-right" value={formData.author_role} onChange={handleChange} />
                            </div>
                            <div className="space-y-1 text-right">
                                <label className="text-[10px] font-bold text-on-surface-variant/40 mr-1 uppercase">رابط صورة الكاتب</label>
                                <input name="author_image" className="w-full bg-surface-container-highest border-transparent rounded-xl py-2 px-3 text-sm text-on-surface focus:ring-1 focus:ring-primary/30 outline-none text-right" value={formData.author_image} onChange={handleChange} />
                            </div>
                        </div>
                    </MotionCard>
                </aside>
            </div>
        </form>
    )
}
