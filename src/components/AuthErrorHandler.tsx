"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

export default function AuthErrorHandler() {
    const searchParams = useSearchParams()
    
    useEffect(() => {
        const error = searchParams.get("error")
        
        if (error === "unauthorized_access") {
            toast.error("عذراً، ليس لديك صلاحية الوصول إلى هذه الصفحة.", {
                description: "يرجى التأكد من تسجيل الدخول بالحساب الصحيح أو الاتصال بمسؤول الأكاديمية.",
                duration: 6000,
            })
            
            // Clean up the URL to avoid repeating the toast on refresh
            const url = new URL(window.location.href)
            url.searchParams.delete("error")
            window.history.replaceState({}, "", url.toString())
        }
    }, [searchParams])

    return null
}
