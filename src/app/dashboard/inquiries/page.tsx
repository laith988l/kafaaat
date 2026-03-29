import { createClient } from "@/utils/supabase/server"
import { MotionCard } from "@/components/MotionCard"
import InquiryActions from "./components/InquiryActions"
import { ExpandableText } from "@/components/ExpandableText"

export const dynamic = "force-dynamic"

export default async function InquiriesPage() {
    const supabase = await createClient()

    const { data: inquiries } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false })

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-8">
                <h1 className="font-headline font-black text-3xl mb-2 text-on-surface">استفسارات الزوار والطلاب</h1>
                <p className="text-on-surface-variant">جميع الرسائل وطلبات التسجيل الواردة عبر الموقع</p>
            </header>

            <div className="grid grid-cols-1 gap-8">
                {inquiries && inquiries.length > 0 ? inquiries.map((inq: any, i: number) => {
                    const effectiveStatus = inq.status || (inq.is_approved ? 'read' : 'new');
                    
                    return (
                        <MotionCard key={inq.id} delay={i * 0.05} className="glass-card p-6 md:p-8 rounded-[2.5rem] border border-white/5 relative group hover:border-primary/20 transition-all flex flex-col h-full shadow-2xl">
                            {/* Decorative Icon based on Status */}
                            <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-2xl flex items-center justify-center pointer-events-none transition-colors duration-500 shadow-lg ${
                                effectiveStatus === 'read' ? 'bg-green-500/10 text-green-500 shadow-green-500/20' :
                                effectiveStatus === 'later' ? 'bg-amber-500/10 text-amber-500 shadow-amber-500/20' :
                                'bg-primary/10 text-primary shadow-primary/20 animate-pulse'
                            }`}>
                                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    {effectiveStatus === 'read' ? 'drafts' : effectiveStatus === 'later' ? 'schedule' : 'mark_email_unread'}
                                </span>
                            </div>

                            <div className="flex justify-between items-start mb-6">
                                <div className="flex-1">
                                    <h3 className="font-headline font-bold text-on-surface text-xl mb-1">{inq.name}</h3>
                                    <p className="text-on-surface-variant text-sm font-mono" dir="ltr">{inq.email}</p>
                                    <p className="text-primary text-sm mt-1" dir="ltr">{inq.phone}</p>
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                {(inq.course_id || inq.course_level) ? (
                                    <div className="inline-block px-3 py-1.5 text-xs font-bold tracking-wider bg-surface-container-highest border border-white/10 rounded-xl text-on-surface-variant">
                                        تفضيل: <span className="text-primary">{inq.course_id || inq.course_level}</span>
                                    </div>
                                ) : (
                                    <div className="inline-block px-3 py-1.5 text-xs font-bold tracking-wider bg-surface-container-highest/50 border border-white/5 rounded-xl text-on-surface-variant/50">
                                        استفسار عام
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 bg-background/50 rounded-2xl p-6 border border-white/5 mb-6 overflow-hidden">
                                <ExpandableText text={inq.message} />
                            </div>

                            <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-4">
                                <div className="flex justify-between items-center text-xs">
                                     <span className="text-on-surface-variant font-medium opacity-60">تاريخ الإرسال</span>
                                    <span className="font-mono text-primary/70">
                                        {new Date(inq.created_at).toLocaleString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
                                    </span>
                                </div>
                                
                                <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border ${
                                            effectiveStatus === 'read' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                            effectiveStatus === 'later' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                            'bg-white/5 text-on-surface border-white/10'
                                        }`}>
                                            {effectiveStatus === 'read' ? 'مقروء' : effectiveStatus === 'later' ? 'مؤجل' : 'جديد'}
                                        </span>
                                    </div>
                                    <InquiryActions id={inq.id} currentStatus={effectiveStatus} />
                                </div>
                            </div>
                        </MotionCard>
                    )
                }) : (
                    <div className="col-span-full py-32 flex flex-col items-center justify-center gap-6 glass-card rounded-[3rem] border-dashed border-white/10 opacity-50">
                        <span className="material-symbols-outlined text-6xl">inbox</span>
                        <p className="text-xl font-headline font-bold">لا توجد رسائل تواصل حالياً</p>
                    </div>
                )}
            </div>
        </div>
    )
}
