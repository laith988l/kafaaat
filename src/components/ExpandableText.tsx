"use client"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function ExpandableText({ text }: { text: string }) {
    const [expanded, setExpanded] = useState(false)
    
    if (!text) return <span className="italic opacity-50">لا توجد رسالة مرفقة...</span>

    const isLongText = text.length > 150

    return (
        <div className="flex flex-col items-end w-full">
            <p className={`text-on-surface-variant text-base md:text-lg leading-relaxed text-right whitespace-pre-wrap break-words transition-all duration-300 w-full ${!expanded && isLongText ? "line-clamp-4" : ""}`}>
                {text}
            </p>
            {isLongText && (
                <button 
                    onClick={() => setExpanded(!expanded)}
                    className="mt-3 text-sm font-bold text-primary hover:text-primary-container transition-colors flex items-center gap-1 py-1"
                >
                    {expanded ? (
                        <>عرض أقل <ChevronUp className="w-4 h-4" /></>
                    ) : (
                        <>قراءة المزيد <ChevronDown className="w-4 h-4" /></>
                    )}
                </button>
            )}
        </div>
    )
}
