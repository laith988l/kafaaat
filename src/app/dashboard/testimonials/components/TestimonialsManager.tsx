"use client"

import { useState } from "react"
import { MotionCard } from "@/components/MotionCard"
import { Edit2, Trash2, Plus, Star, X } from "lucide-react"
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/app/actions/testimonials"
import { TestimonialToggle } from "./TestimonialToggle"

export function TestimonialsManager({ initialData }: { initialData: any[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<any | null>(null)
    const [submitting, setSubmitting] = useState(false)

    // Using server revalidation to automatically refresh data, but we can do optimistic updates if needed
    // For simplicity, we just rely on Next.js Server Actions revalidation (revalidatePath("/", "layout"))

    const openModal = (item?: any) => {
        setEditingItem(item || null)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setEditingItem(null)
        setIsModalOpen(false)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)
        const formData = new FormData(e.currentTarget)
        
        let res;
        if (editingItem) {
            res = await updateTestimonial(editingItem.id, formData)
        } else {
            res = await createTestimonial(formData)
        }

        if (res.success) {
            closeModal()
        } else {
            alert(res.error)
        }
        setSubmitting(false)
    }

    const handleDelete = async (id: number) => {
        if (confirm("هل أنت متأكد من حذف هذا التقييم؟")) {
            await deleteTestimonial(id)
        }
    }

    const getInitials = (name: string) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
    };

    const colors = [
        'bg-blue-500/20 text-blue-400 border-blue-500/30',
        'bg-purple-500/20 text-purple-400 border-purple-500/30',
        'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        'bg-amber-500/20 text-amber-400 border-amber-500/30',
        'bg-rose-500/20 text-rose-400 border-rose-500/30',
    ];

    return (
        <div className="space-y-10">
      <div className="flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center bg-surface-container-low/50 p-6 md:p-8 rounded-[2rem] border border-white/5 backdrop-blur-sm">
        <div className="text-right">
          <h2 className="text-2xl md:text-3xl font-headline font-black text-on-surface mb-1">إدارة آراء العملاء</h2>
          <p className="text-on-surface-variant opacity-70">تحكم بالتقييمات التي تظهر في الواجهة الرئيسية للموقع</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-on-primary px-8 py-4 rounded-2xl font-headline font-black transition-all shadow-xl shadow-primary/20 flex justify-center items-center gap-3 hover:scale-105 active:scale-95 whitespace-nowrap"
        >
          <Plus className="w-6 h-6" /> إضافة تقييم
        </button>
      </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {initialData.map((t, i) => {
                    const colorClass = colors[i % colors.length];
                    return (
                        <MotionCard key={t.id} delay={i * 0.05} className="glass-card p-8 rounded-[2.5rem] border border-white/5 relative group hover:border-primary/20 transition-all flex flex-col h-full shadow-2xl overflow-visible">
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary/40 pointer-events-none group-hover:text-primary transition-colors duration-500">
                                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
                            </div>

                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-headline font-black text-xl border ${colorClass}`}>
                                        {getInitials(t.name)}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, idx) => (
                                                <Star key={idx} className={`w-3 h-3 ${idx < (t.rating || 5) ? "fill-primary text-primary" : "text-white/5"}`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button onClick={() => handleDelete(t.id)} className="bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-on-surface-variant transition-all p-2.5 rounded-xl border border-white/5">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <p className="text-on-surface text-lg font-medium mb-6 leading-relaxed text-right italic opacity-90">
                                    "{t.quote}"
                                </p>
                            </div>
                            
                            <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                                <div>
                                    <h3 className="font-headline font-black text-on-surface text-lg mb-0.5">{t.name}</h3>
                                    <p className="text-sm text-primary/70 font-medium">{t.role}</p>
                                </div>
                                <div className="flex justify-end">
                                    <TestimonialToggle id={t.id} isApproved={t.is_approved !== false} />
                                </div>
                            </div>
                        </MotionCard>
                    )
                })}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-surface-container-highest w-full max-w-lg rounded-3xl border border-white/10 shadow-2xl p-6 relative">
                        <button onClick={closeModal} className="absolute left-6 top-6 text-on-surface-variant hover:text-on-surface">
                            <X className="w-6 h-6" />
                        </button>
                        
                        <h2 className="text-2xl font-bold font-headline mb-6 text-on-surface">إضافة تقييم جديد</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-on-surface-variant">الاسم</label>
                                <input name="name" required defaultValue={editingItem?.name} className="w-full bg-background border border-white/5 rounded-xl px-4 py-3 text-on-surface focus:border-primary/50 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-on-surface-variant">الدور / الوظيفة</label>
                                <input name="role" required defaultValue={editingItem?.role} className="w-full bg-background border border-white/5 rounded-xl px-4 py-3 text-on-surface focus:border-primary/50 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-on-surface-variant">التقييم (1-5)</label>
                                <input name="rating" type="number" min="1" max="5" required defaultValue={editingItem?.rating || 5} className="w-full bg-background border border-white/5 rounded-xl px-4 py-3 text-on-surface focus:border-primary/50 outline-none" dir="ltr" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-on-surface-variant">الرأي</label>
                                <textarea name="quote" rows={4} required defaultValue={editingItem?.quote} className="w-full bg-background border border-white/5 rounded-xl px-4 py-3 text-on-surface focus:border-primary/50 outline-none resize-none" />
                            </div>
                            
                            <button disabled={submitting} className="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-3 rounded-xl transition-all disabled:opacity-50 mt-4">
                                {submitting ? "جاري الإرسال..." : "إضافة التقييم"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
