"use client"

import { useState } from "react"
import { login } from "./actions"
import { MotionCard } from "@/components/MotionCard"
import { ArrowRight, Loader2, Lock, Mail } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setError(null)
        setIsLoading(true)

        const result = await login(formData)
        
        if (result?.error) {
            setError(result.error)
            setIsLoading(false)
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-6 relative bg-background overflow-hidden relative" dir="rtl">
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen mix-blend-color-dodge -z-10 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[150px] mix-blend-color-dodge -z-10 animate-pulse"></div>
            
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <h1 className="font-headline font-black text-4xl mb-3 text-on-surface">مرحباً بك مجدداً</h1>
                    <p className="text-on-surface-variant">تسجيل الدخول إلى لوحة تحكم أكاديمية كفاءات</p>
                </div>

                <MotionCard delay={0.1} className="bg-surface-container-low p-8 rounded-3xl border border-white/5 relative overflow-hidden backdrop-blur-xl">
                    <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-primary/50 to-transparent"></div>
                    
                    {error && (
                        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-2xl text-error text-sm text-right">
                            {error}
                        </div>
                    )}

                    <form action={handleSubmit} className="space-y-5 text-right">
                        <div className="space-y-2 relative">
                            <label className="text-sm font-medium text-on-surface-variant mr-1">البريد الإلكتروني</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/3 text-on-surface-variant/50 w-5 h-5" />
                                <input 
                                    name="email" 
                                    className="w-full bg-surface-container-highest border border-transparent rounded-xl py-3 pl-12 pr-4 text-on-surface placeholder:text-outline-variant/30 text-right transition-all focus:ring-1 focus:ring-primary/50" 
                                    placeholder="admin@kafaaat.com" 
                                    type="email" 
                                    required 
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 relative">
                            <label className="text-sm font-medium text-on-surface-variant mr-1">كلمة المرور</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/3 text-on-surface-variant/50 w-5 h-5" />
                                <input 
                                    name="password" 
                                    className="w-full bg-surface-container-highest border border-transparent rounded-xl py-3 pl-12 pr-4 text-on-surface placeholder:text-outline-variant/30 text-right transition-all focus:ring-1 focus:ring-primary/50" 
                                    placeholder="••••••••" 
                                    type="password" 
                                    required 
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-primary text-on-primary py-3.5 px-6 rounded-xl font-bold transition-all hover:bg-primary/90 flex items-center justify-center gap-2 group mt-8 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>تسجيل الدخول</span>
                                    <ArrowRight className="w-5 h-5 -rotate-180 group-hover:-translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <div className="text-center mt-6">
                            <Link href="/" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                                العودة إلى الصفحة الرئيسية
                            </Link>
                        </div>
                    </form>
                </MotionCard>
            </div>
        </main>
    )
}
