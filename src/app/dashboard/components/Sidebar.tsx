"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, MessageSquare, GraduationCap, LogOut, Menu, X, Users, Settings as SettingsIcon, Star, Mail } from "lucide-react"
import { useState } from "react"
import { logout } from "@/app/login/actions"

export function Sidebar({ 
    userEmail,
    unreadInquiriesCount = 0,
    unreadFeedbackCount = 0
}: { 
    userEmail?: string;
    unreadInquiriesCount?: number;
    unreadFeedbackCount?: number;
}) {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const links = [
        { href: "/dashboard", label: "نظرة عامة", icon: LayoutDashboard },
        { href: "/dashboard/settings", label: "إدارة المحتوى", icon: SettingsIcon },
        { href: "/dashboard/testimonials", label: "آراء الطلاب", icon: Star },
        { href: "/dashboard/inquiries", label: "رسائل تواصل معنا", icon: Mail, badge: unreadInquiriesCount },
        { href: "/dashboard/feedback", label: "ردود الأفعال", icon: MessageSquare, badge: unreadFeedbackCount },
        { href: "/dashboard/blog", label: "إدارة المدونة", icon: Users },
        { href: "/dashboard/courses", label: "الدورات", icon: GraduationCap },
    ]

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface-container-low/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 z-50">
                <span className="font-headline font-bold text-xl text-primary">لوحة التحكم</span>
                <button onClick={() => setIsOpen(!isOpen)} className="text-on-surface">
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 right-0 w-64 bg-surface-container-lowest/50 backdrop-blur-2xl border-l border-white/5 
                flex flex-col transition-transform duration-300 z-40
                ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
            `}>
                <div className="p-8 hidden md:block">
                    <span className="font-headline font-black text-2xl text-primary tracking-tight">كفاءات<span className="text-on-surface">.</span></span>
                </div>
                
                <div className="flex-1 py-10 md:py-6 px-4 space-y-2 overflow-y-auto mt-16 md:mt-0">
                    <div className="text-xs font-semibold text-on-surface-variant/50 mb-4 px-4">القائمة الرئيسية</div>
                    {links.map((link) => {
                        const Icon = link.icon
                        const isActive = pathname === link.href

                        return (
                            <Link 
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`
                                    flex items-center justify-between px-4 py-3 rounded-xl transition-all font-medium text-sm
                                    ${isActive 
                                        ? "bg-primary text-on-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]" 
                                        : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
                                    }
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className="w-5 h-5 relative">
                                        {/* Dot indicator on icon instead of full pill if preferred? We use badge */}
                                    </Icon>
                                    {link.label}
                                </div>
                                {link.badge ? (
                                    <span className="flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-error text-white rounded-full">
                                        {link.badge}
                                    </span>
                                ) : null}
                            </Link>
                        )
                    })}
                </div>

                <div className="p-4 border-t border-white/5">
                    <div className="px-4 py-3 mb-2 rounded-xl bg-surface-container-highest/50 flex flex-col items-start overflow-hidden text-right">
                        <span className="text-xs text-on-surface-variant">الحساب الحالي</span>
                        <span className="text-sm font-medium text-on-surface truncate w-full">{userEmail}</span>
                    </div>

                    <form action={logout}>
                        <button 
                            type="submit"
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-error/80 hover:bg-error/10 hover:text-error transition-all font-medium text-sm"
                        >
                            <LogOut className="w-5 h-5" />
                            تسجيل الخروج
                        </button>
                    </form>
                </div>
            </aside>
            
            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    )
}
