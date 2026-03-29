"use client";

import { useState, useEffect } from "react";
import { submitCourseInquiry } from "@/app/actions";
import Link from "next/link";

interface CourseInquiryFormProps {
    courseName: string;
}

export default function CourseInquiryForm({ courseName }: CourseInquiryFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: 0 });
    const [userAnswer, setUserAnswer] = useState("");
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        return { num1, num2, answer: num1 + num2 };
    };

    useEffect(() => {
        setCaptcha(generateCaptcha());
    }, []);

    const isCaptchaValid = parseInt(userAnswer) === captcha.answer && userAnswer !== "";

    async function handleAction(formData: FormData) {
        if (!isCaptchaValid || !agreedToTerms) return;
        setIsSubmitting(true);
        try {
            const res = await submitCourseInquiry(formData as any);
            if (res.success) {
                setIsSubmitted(true);
                setAgreedToTerms(false);
            } else {
                alert(res.error || "خطأ في الإرسال");
                setCaptcha(generateCaptcha());
            }
        } catch (error) {
            alert("حدث خطأ غير متوقع");
            setCaptcha(generateCaptcha());
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isSubmitted) {
        return (
            <div className="py-12 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6">
                    <span className="material-symbols-outlined text-3xl font-bold">check_circle</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">تم الإرسال بنجاح!</h3>
                <p className="text-on-surface-variant text-sm max-w-[250px]">نشكرك على اهتمامك بـ {courseName}. سنقوم بالتواصل معك قريباً.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-primary text-sm font-bold hover:underline flex items-center gap-2"
                >
                  إرسال استفسار آخر
                  <span className="material-symbols-outlined text-xs">refresh</span>
                </button>
            </div>
        );
    }

    return (
        <form className="space-y-5 text-right" action={handleAction}>
            <div className="space-y-2">
                <label className="text-sm font-medium text-on-surface-variant mr-1">الاسم الكامل</label>
                <input name="name" className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface placeholder:text-outline-variant/30 text-right transition-all focus:ring-1 focus:ring-primary/50" placeholder="الاسم الكامل" type="text" required />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-on-surface-variant mr-1">البريد الإلكتروني</label>
                <input name="email" className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface placeholder:text-outline-variant/30 text-right transition-all focus:ring-1 focus:ring-primary/50" placeholder="البريد الإلكتروني" type="email" required />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-on-surface-variant mr-1">رقم الهاتف</label>
                <input name="phone" className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface placeholder:text-outline-variant/30 text-right transition-all focus:ring-1 focus:ring-primary/50" placeholder="+49 176 43446439" type="tel" required />
            </div>
            {/* Hidden field that implicitly links form submission to the course */}
            <div className="space-y-2 opacity-50 relative group text-right">
                <div className="absolute inset-0 z-10 cursor-not-allowed"></div>
                <label className="text-sm font-medium text-on-surface-variant mr-1">الدورة المختارة</label>
                <input name="course_id" type="text" value={courseName} readOnly className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface text-right" />
            </div>

            {/* Math Captcha */}
            <div className="bg-surface-container-highest/50 p-4 rounded-xl flex items-center justify-between border border-transparent focus-within:border-primary/50 transition-colors">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline-variant text-base">security</span>
                    <span className="font-bold text-on-surface-variant text-sm">كم يساوي {captcha.num1} + {captcha.num2}؟</span>
                </div>
                <input
                    className="w-16 bg-background rounded-lg py-1.5 px-2 text-center text-on-surface font-bold outline-none border border-outline-variant/20 focus:border-primary/50 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="?"
                    required
                />
            </div>

            {/* Terms Agreement */}
            <div className="flex items-center gap-3 px-1">
                <input 
                    type="checkbox" 
                    id="terms-checkbox-inquiry"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 rounded border-outline-variant/30 text-primary focus:ring-primary bg-surface-container-highest transition-all cursor-pointer"
                    required
                />
                <label htmlFor="terms-checkbox-inquiry" className="text-xs text-on-surface-variant cursor-pointer select-none">
                    أوافق على <Link href="/terms" className="text-primary hover:underline">شروط الاستخدام</Link>
                </label>
            </div>

            <button 
              disabled={!isCaptchaValid || !agreedToTerms || isSubmitting}
              className="w-full mt-2 bg-surface-container-highest hover:bg-surface-container-high text-on-surface font-headline font-bold py-4 rounded-xl transition-all duration-300 border border-outline-variant/10 flex justify-center items-center gap-2 group disabled:opacity-50" 
              type="submit"
            >
                <span>{isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}</span>
                <span className="material-symbols-outlined rotate-180 text-sm group-hover:translate-x-1 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>{isCaptchaValid && agreedToTerms ? 'send' : 'lock'}</span>
            </button>
        </form>
    );
}
