import { getAllBlogsAction } from "@/app/actions/blog"
import { MotionCard } from "@/components/MotionCard"
import { Plus, Edit, Trash2, Eye, FileText, CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"
import { DeleteBlogButton } from "./DeleteBlogButton"

export const dynamic = "force-dynamic"

export default async function DashboardBlogPage() {
    const blogs = await getAllBlogsAction()

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="font-headline font-black text-3xl mb-2 text-on-surface">إدارة المدونة</h1>
                    <p className="text-on-surface-variant text-sm">أنشئ وقم بتحرير مقالات المدونة ورؤى الأكاديمية</p>
                </div>
                <Link 
                    href="/dashboard/blog/new" 
                    className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    مقال جديد
                </Link>
            </header>

            <div className="grid grid-cols-1 gap-6">
                {blogs.length > 0 ? (
                    blogs.map((blog, i) => (
                        <MotionCard key={blog.id} delay={i * 0.05} className="bg-surface-container-low border border-white/5 rounded-2xl overflow-hidden group hover:border-primary/20 transition-all">
                            <div className="p-5 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-5 w-full md:w-auto">
                                    <div className="w-20 h-20 rounded-xl bg-surface-container-highest overflow-hidden shrink-0 border border-white/5">
                                        <img 
                                            src={blog.featured_image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"} 
                                            alt={blog.title} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 text-right">
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors">{blog.title}</h3>
                                            {blog.is_published ? (
                                                <span className="flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase py-0.5 px-2 bg-success/10 text-success border border-success/20 rounded-full">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    منشور
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase py-0.5 px-2 bg-warning/10 text-warning border border-warning/20 rounded-full">
                                                    <Clock className="w-3 h-3" />                                                    مسودة
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-on-surface-variant/60">
                                            <span className="flex items-center gap-1">
                                                <FileText className="w-3 h-3" />
                                                {blog.category}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Eye className="w-3 h-3" />
                                                {blog.view_count || 0} مشاهدة
                                            </span>
                                            <span>{new Date(blog.created_at).toLocaleDateString('ar-EG')}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                                    <Link 
                                        href={`/blog/${blog.slug}`} 
                                        target="_blank"
                                        className="p-3 rounded-xl bg-surface-container-highest text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20"
                                        title="معاينة"
                                    >
                                        <Eye className="w-5 h-5" />
                                    </Link>
                                    <Link 
                                        href={`/dashboard/blog/edit/${blog.id}`}
                                        className="p-3 rounded-xl bg-surface-container-highest text-on-surface-variant hover:text-secondary hover:bg-secondary/10 transition-all border border-transparent hover:border-secondary/20"
                                        title="تعديل"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </Link>
                                    <DeleteBlogButton id={blog.id} />
                                </div>
                            </div>
                        </MotionCard>
                    ))
                ) : (
                    <div className="py-20 text-center flex flex-col items-center justify-center text-on-surface-variant/40 bg-surface-container-low rounded-3xl border border-dashed border-white/10">
                        <FileText className="w-16 h-16 mb-4 opacity-10" />
                        <h3 className="text-xl font-headline font-bold mb-2">لا توجد مقالات</h3>
                        <p className="max-w-xs mx-auto">ابدأ بكتابة أول مقال تعليمي للأكاديمية لمشاركته مع الطلاب.</p>
                        <Link 
                            href="/dashboard/blog/new" 
                            className="mt-6 text-primary hover:underline font-bold"
                        >
                            أنشئ أول مقال الآن
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
