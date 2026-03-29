"use client";

import { useState } from "react";
import { toggleTestimonialApproval } from "@/app/actions/testimonials";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface TestimonialToggleProps {
  id: number;
  isApproved: boolean;
}

export function TestimonialToggle({ id, isApproved }: TestimonialToggleProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(isApproved);

  const handleToggle = async () => {
    setIsLoading(true);
    const res = await toggleTestimonialApproval(id, status);
    setIsLoading(false);

    if (res.success) {
      setStatus(!status);
      toast.success(status ? "تم إخفاء التقييم" : "تمت الموافقة على التقييم");
    } else {
      toast.error(res.error || "حدث خطأ ما");
    }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleToggle();
      }}
      disabled={isLoading}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
        status
          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20"
          : "bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20"
      }`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : status ? (
        <CheckCircle2 className="w-4 h-4" />
      ) : (
        <XCircle className="w-4 h-4" />
      )}
      <span className="text-xs font-bold font-headline">
        {status ? "معروض في الرئيسية" : "مخفي من الرئيسية"}
      </span>
    </button>
  );
}
