"use client"

import { Edit2, Trash2 } from "lucide-react"
import Link from "next/link"
import { deleteCourseAction } from "@/app/actions/courses"
import { useState } from "react"

export function CourseActions({ id }: { id: string }) {
    const [submitting, setSubmitting] = useState(false)

    const handleDelete = async () => {
        if (!confirm("هل أنت متأكد من حذف هذه الدورة؟ (لا يمكن التراجع عن هذا الإجراء)")) return
        setSubmitting(true)
        const res = await deleteCourseAction(id)
        if (!res.success) {
            alert(res.error)
            setSubmitting(false)
        }
    }

    return (
        <div className="absolute top-4 left-4 flex gap-2 z-20">
            <Link href={`/dashboard/courses/${id}/edit`} className="bg-surface-container-high hover:bg-white/10 text-on-surface p-2 rounded-full backdrop-blur-md border border-white/5 transition-colors shadow-lg">
                <Edit2 className="w-4 h-4" />
            </Link>
            <button onClick={handleDelete} disabled={submitting} className="bg-error/10 hover:bg-error/20 text-error p-2 rounded-full backdrop-blur-md border border-error/10 transition-colors shadow-lg disabled:opacity-50">
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    )
}
