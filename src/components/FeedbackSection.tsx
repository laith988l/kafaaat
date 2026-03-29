"use client";

import { useState, useEffect } from "react";
import { MotionCard } from "./MotionCard";
import { submitFeedback } from "@/app/actions";

export default function FeedbackSection() {
  const [rating, setRating] = useState(0);
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: 0 });
  const [userAnswer, setUserAnswer] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ num1, num2, answer: num1 + num2 });
  };


  useEffect(() => {
    generateCaptcha();
  }, []);

  const isCaptchaValid = parseInt(userAnswer) === captcha.answer && userAnswer !== "";

  async function handleAction(formData: FormData) {
    if (!isCaptchaValid || rating === 0 || !agreedToTerms) return;
    setIsSubmitting(true);
    formData.append('rating', rating.toString());
    const res = await submitFeedback(formData);
    setIsSubmitting(false);
    if (res.success) {
      setIsSubmitted(true);
      setRating(0);
      setUserAnswer("");
      setAgreedToTerms(false);
    } else {
      alert(res.error || "خطأ");
      generateCaptcha(); // Refresh captcha on error
    }
  }

  return (
    <section className="w-full bg-surface-container-low/30 py-24 border-y border-outline-variant/10 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="w-full max-w-5xl mx-auto px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6 shadow-lg shadow-primary/5">
            <span className="material-symbols-outlined text-3xl">rate_review</span>
          </div>
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-on-surface mb-6 tracking-tight">شاركنا <span className="text-primary text-shadow-glow">رأيك</span></h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto leading-relaxed">في أكاديمية كفاءات، نحن نتوق دائماً للتطور والتحسين المستمر. رأيك، سواء كان إشادة أو نقداً، هو أساس نجاحنا.</p>
        </div>

        <MotionCard delay={0.1} className="glass-card p-8 md:p-12 rounded-xl border border-white/5 shadow-2xl">
          {isSubmitted ? (
            <div className="py-20 flex flex-col items-center text-center animate-in fade-in zoom-in duration-700">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-8 shadow-xl shadow-primary/10">
                <span className="material-symbols-outlined text-5xl font-bold">favorite</span>
              </div>
              <h3 className="font-headline text-4xl font-bold text-on-surface mb-4">شكراً لك!</h3>
              <p className="text-on-surface-variant text-xl max-w-lg leading-relaxed">
                ملاحظاتك تعني الكثير لنا. نحن نقدر الوقت الذي خصصته لمشاركتنا رأيك، وسنعمل جاهدين لنكون عند حسن ظنك دائماً.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  generateCaptcha();
                }}
                className="mt-10 px-8 py-3 bg-surface-container-highest text-on-surface rounded-xl font-bold hover:bg-primary hover:text-on-primary transition-all flex items-center gap-2 group"
              >
                إرسال رأي آخر
                <span className="material-symbols-outlined text-sm group-hover:rotate-180 transition-transform">refresh</span>
              </button>
            </div>
          ) : (
            <form className="space-y-10" action={handleAction}>
              {/* Star Rating system - Integrated into Card */}
              <div className="text-center">
                <label className="block text-xl font-bold font-headline text-on-surface mb-6 relative z-10">كيف تقيم تجربتك معنا بشكل عام؟</label>
                <div className="flex justify-center gap-5 flex-row-reverse relative z-10">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`material-symbols-outlined text-5xl transition-all duration-500 hover:scale-125 ${rating >= star ? 'text-primary drop-shadow-[0_0_15px_rgba(242,202,80,0.6)]' : 'text-outline-variant/20 hover:text-primary/40'}`}
                      style={{ fontVariationSettings: rating >= star ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      star
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-500">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                      شكراً لتقييمك ({rating} نجوم)
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant mr-1">الاسم</label>
                    <input name="name" className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface placeholder:text-outline-variant/30 transition-all text-right focus:ring-1 focus:ring-primary/50 focus:bg-surface-container-highest/80 outline-none" placeholder="مثال: أحمد محمد" type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant mr-1">نوع الملاحظة</label>
                    <select name="category" className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface transition-all focus:ring-1 focus:ring-primary/50 outline-none cursor-pointer appearance-none">
                      <option>ملاحظات عامة</option>
                      <option>اقتراح تطويري</option>
                      <option>تقييم دورة</option>
                      <option>شكوى أو مشكلة</option>
                    </select>
                  </div>

                  {/* Math Captcha - Compact Styling from Contact Form */}
                    <div className="bg-surface-container-highest/50 p-4 rounded-xl flex items-center justify-between border border-transparent focus-within:border-primary/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-outline-variant text-xl">security</span>
                        <span className="font-bold text-on-surface-variant text-sm">كم يساوي {captcha.num1} + {captcha.num2}؟</span>
                      </div>
                      <input
                        className="w-20 bg-background rounded-lg py-2 px-3 text-center text-on-surface font-bold outline-none border border-outline-variant/20 focus:border-primary/50 transition-colors"
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="؟"
                        required
                      />
                    </div>
                </div>

                <div className="space-y-2 flex flex-col">
                  <label className="text-sm font-bold text-on-surface-variant mr-1">ملاحظاتك بالتفصيل</label>
                  <textarea name="message" required className="flex-1 w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface placeholder:text-outline-variant/30 transition-all resize-none text-right focus:ring-1 focus:ring-primary/50 focus:bg-surface-container-highest/80 outline-none min-h-[180px]" placeholder="أخبرنا بالمزيد.. نحن نقرأ كل كلمة بعناية." rows={5}></textarea>
                </div>
              </div>

              <div className="text-center">
              <div className="space-y-6">
                <label className="flex items-center gap-3 cursor-pointer group select-none">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      required 
                      className="peer sr-only" 
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                    />
                    <div className="w-6 h-6 rounded-lg border-2 border-outline-variant/30 bg-surface-container-highest transition-all peer-checked:bg-primary peer-checked:border-primary group-hover:border-primary/50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-primary text-lg scale-0 transition-transform peer-checked:scale-100 font-bold">check</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-on-surface-variant group-hover:text-on-surface transition-colors">أنا أوافق على شروط الاستخدام ومعالجة بياناتي.</span>
                </label>

                <button 
                  disabled={!isCaptchaValid || rating === 0 || !agreedToTerms || isSubmitting} 
                  className="w-full disabled:opacity-50 disabled:grayscale-50 disabled:cursor-not-allowed bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-headline font-black text-xl py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg shadow-primary/20 flex justify-center items-center gap-4 group" 
                  type="submit"
                >
                  <span>{isSubmitting ? 'جاري الإرسال...' : 'إرسال رأيك'}</span>
                  <span className={`material-symbols-outlined text-2xl transition-transform ${isCaptchaValid && agreedToTerms ? 'rotate-180 group-hover:translate-x-1' : ''}`} style={{ fontVariationSettings: (isCaptchaValid && agreedToTerms) ? "'FILL' 1" : "'FILL' 0" }}>{(isCaptchaValid && agreedToTerms) ? 'send' : 'lock'}</span>
                </button>
              </div>
                <p className="mt-6 text-on-surface-variant text-xs opacity-60">شكراً لمساهمتك في جعل أكاديمية كفاءات أفضل للجميع.</p>
              </div>
            </form>
          )}
        </MotionCard>
      </div>
    </section>
  );
}
