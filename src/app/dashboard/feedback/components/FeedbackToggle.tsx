"use client";

import { useState } from "react";
import { toggleFeedbackApproval, deleteFeedback } from "@/app/actions";
import { CheckCircle2, XCircle, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface FeedbackToggleProps {
  id: string;
  isApproved: boolean;
}

export function FeedbackToggle({ id, isApproved }: FeedbackToggleProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleApprove = async () => {
    setIsLoading(true);
    const res = await toggleFeedbackApproval(id, isApproved);
    setIsLoading(false);

    if (res.success) {
      toast.success(res.message || "تمت الموافقة ونقل التقييم بنجاح");
    } else {
      toast.error(res.error || "حدث خطأ ما");
    }
  };

  const handleReject = async () => {
    if (!confirm("هل أنت متأكد من رفض وحذف هذا التقييم؟")) return;
    
    setIsDeleting(true);
    const res = await deleteFeedback(id);
    setIsDeleting(false);

    if (res.success) {
      toast.success("تم رفض وحذف التقييم");
    } else {
      toast.error(res.error || "حدث خطأ ما");
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Reject Button */}
      <button
        onClick={handleReject}
        disabled={isLoading || isDeleting}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-error/20 bg-error/5 text-error hover:bg-error/10 transition-all duration-300 disabled:opacity-50"
        title="رفض وحذف التقييم"
      >
        {isDeleting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
        <span className="text-xs font-bold font-headline">رفض</span>
      </button>

      {/* Approve Button */}
      <button
        onClick={handleApprove}
        disabled={isLoading || isDeleting}
        className="flex items-center gap-2 px-6 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-emerald-500/5 group"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <CheckCircle2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
        )}
        <span className="text-xs font-bold font-headline">الموافقة</span>
      </button>
    </div>
  );
}
