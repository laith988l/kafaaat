"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { deleteBlogAction } from "@/app/actions/blog"

export function DeleteBlogButton({ id }: { id: string }) {
    const [isDeleting, setIsDeleting] = useState(false)

    async function handleDelete() {
        if (!confirm("هل أنت متأكد من حذف هذا المقال؟ لا يمكن التراجع عن هذه العملية.")) return
        
        setIsDeleting(true)
        const res = await deleteBlogAction(id)
        setIsDeleting(false)

        if (!res.success) {
            alert(res.error || "فشل الحذف")
        }
    }

    return (
        <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-3 rounded-xl bg-surface-container-highest text-error opacity-60 hover:opacity-100 hover:bg-error/10 transition-all border border-transparent hover:border-error/20"
            title="حذف"
        >
            <Trash2 className={`w-5 h-5 ${isDeleting ? "animate-pulse" : ""}`} />
        </button>
    )
}
