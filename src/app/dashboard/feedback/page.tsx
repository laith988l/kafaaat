import { createClient } from "@/utils/supabase/server"
export const dynamic = "force-dynamic"
import { MotionCard } from "@/components/MotionCard"
import { Star } from "lucide-react"
import { FeedbackToggle } from "./components/FeedbackToggle"
import { ExpandableText } from "@/components/ExpandableText"

export default async function FeedbackPage() {
    const supabase = await createClient()

    const { data: feedbackList } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false })

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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-12">
                <h1 className="font-headline font-black text-4xl mb-3 text-on-surface tracking-tight">تقييمات المتدربين</h1>
                <p className="text-on-surface-variant text-lg opacity-80">الآراء والتقييمات التي تم إرسالها عبر الصفحة الرئيسية</p>
            </header>

            <div className="grid grid-cols-1 gap-8">
                {feedbackList && feedbackList.length > 0 ? feedbackList.map((f: any, i: number) => {
                    const colorClass = colors[i % colors.length];
                    return (
                        <MotionCard key={f.id} delay={i * 0.05} className="glass-card p-8 rounded-[2.5rem] border border-white/5 relative group hover:border-primary/20 transition-all flex flex-col h-full shadow-2xl">
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary/40 pointer-events-none group-hover:text-primary transition-colors duration-500">
                                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-headline font-black text-xl border ${colorClass}`}>
                                    {getInitials(f.name)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-headline font-bold text-on-surface text-lg truncate mb-1">
                                        {f.name || 'مجهول'}
                                    </h3>
                                    <div className="flex gap-0.5">
                                        {Array.from({ length: 5 }).map((_, idx) => (
                                            <Star 
                                                key={idx} 
                                                className={`w-3.5 h-3.5 ${idx < f.rating ? "fill-primary text-primary drop-shadow-[0_0_8px_rgba(242,202,80,0.5)]" : "text-white/5"}`} 
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 mb-6 overflow-hidden w-full">
                                <ExpandableText text={f.message} />
                            </div>

                            <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-2">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-on-surface-variant font-medium opacity-60">تاريخ الإرسال</span>
                                    <span className="font-mono text-primary/70">
                                        {new Date(f.created_at).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-xs overflow-hidden">
                                     <span className="text-on-surface-variant font-medium opacity-60">البريد الإلكتروني</span>
                                    <span className="truncate max-w-[150px] text-on-surface opacity-80" title={f.email}>
                                        {f.email || '—'}
                                     </span>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <FeedbackToggle id={f.id} isApproved={f.is_approved === true} />
                                </div>
                            </div>
                        </MotionCard>
                    )
                }) : (
                    <div className="col-span-full py-32 flex flex-col items-center justify-center gap-6 glass-card rounded-[3rem] border-dashed border-white/10 opacity-50">
                        <span className="material-symbols-outlined text-6xl">cloud_off</span>
                        <p className="text-xl font-headline font-bold">لا توجد تقييمات حالياً</p>
                    </div>
                )}
            </div>
        </div>
    )
}
