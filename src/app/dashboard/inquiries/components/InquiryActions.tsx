"use client"

import { useState } from "react"
import { Check, Trash2, Clock, Loader2 } from "lucide-react"
import { updateInquiryStatus, deleteInquiry } from "@/app/actions/inquiries"
import { useRouter } from "next/navigation"

export default function InquiryActions({ id, currentStatus }: { id: string, currentStatus?: string }) {
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()

  const handleStatus = async (status: string) => {
    setLoading(status)
    const res = await updateInquiryStatus(id, status)
    if (res.success) {
      router.refresh()
    } else {
      alert("فشل التحديث: " + (res.error || "خطأ غير معروف"))
    }
    setLoading(null)
  }

  const handleDelete = async () => {
    if (confirm("هل أنت متأكد من حذف هذه الرسالة نهائياً؟")) {
      setLoading('delete')
      const res = await deleteInquiry(id)
      if (res.success) {
        router.refresh()
      } else {
        alert("فشل الحذف: " + (res.error || "خطأ غير معروف"))
      }
      setLoading(null)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {/* Mark as Read */}
      <button 
        onClick={() => handleStatus('read')}
        disabled={loading !== null}
        title="تمت القراءة"
        className={`p-2 rounded-lg transition-all ${currentStatus === 'read' ? 'bg-green-500/10 text-green-500' : 'hover:bg-green-500/10 text-on-surface-variant hover:text-green-500'}`}
      >
        {loading === 'read' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
      </button>

      {/* Mark for Later */}
      <button 
        onClick={() => handleStatus('later')}
        disabled={loading !== null}
        title="لاحقاً"
        className={`p-2 rounded-lg transition-all ${currentStatus === 'later' ? 'bg-amber-500/10 text-amber-500' : 'hover:bg-amber-500/10 text-on-surface-variant hover:text-amber-500'}`}
      >
        {loading === 'later' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Clock className="w-4 h-4" />}
      </button>

      {/* Delete */}
      <button 
        onClick={handleDelete}
        disabled={loading !== null}
        title="حذف"
        className="p-2 rounded-lg hover:bg-red-500/10 text-on-surface-variant hover:text-red-500 transition-all"
      >
        {loading === 'delete' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
      </button>
    </div>
  )
}
