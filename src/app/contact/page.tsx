"use client";

import { MotionCard } from "@/components/MotionCard";
import { useState, useEffect } from "react";
import Link from "next/link";
import FeedbackSection from "@/components/FeedbackSection";
import { submitInquiry, getCourses } from "@/app/actions";
import { getSettings } from "@/app/actions/settings";

export default function ContactPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [courses, setCourses] = useState<any[]>([]);
  // Math CAPTCHA states for main contact form
  const [captcha1, setCaptcha1] = useState({ num1: 0, num2: 0, answer: 0 });
  const [userAnswer1, setUserAnswer1] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState("استفسار عام");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return { num1, num2, answer: num1 + num2 };
  };

  // Initialize CAPTCHAs on mount to avoid hydration mismatch
  useEffect(() => {
    const fetchData = async () => {
      const [settingsData, coursesData] = await Promise.all([
        getSettings(),
        getCourses()
      ]);
      setSettings(settingsData);
      setCourses(coursesData);
    };

    setCaptcha1(generateCaptcha());
    fetchData();
  }, []);

  const isCaptcha1Valid = parseInt(userAnswer1) === captcha1.answer && userAnswer1 !== "";

  async function handleAction(formData: FormData) {
    if (!isCaptcha1Valid || !agreedToTerms) return;
    setIsSubmitting(true);
    const res = await submitInquiry(formData);
    setIsSubmitting(false);
    if (res.success) {
      setIsSubmitted(true);
      setAgreedToTerms(false);
    } else {
      alert(res.error || "خطأ");
      setCaptcha1(generateCaptcha());
    }
  }

  return (
    <main className="py-20">
      {/* Hero Section */}
      <header className="w-full mx-auto px-8 mb-16">
        <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface tracking-tight mb-6">
          تواصل مع <span className="text-primary">التميز.</span>
        </h1>
        <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
          سواء كنت تبدأ رحلتك في تعلم الألمانية، أو تطلب التوجيه المهني، أو ترغب في مشاركة رأيك.. فريقنا في أكاديمية كفاءات هنا من أجلك.
        </p>
      </header>

      {/* Main Content Grid */}
      <section className="w-full mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* Contact Form (Bento Style) */}
        <div className="lg:col-span-7 space-y-8">
          <MotionCard delay={0.1} className="glass-card p-8 md:p-12 rounded-xl border border-white/5">
            <h2 className="font-headline text-2xl font-bold mb-8 text-on-surface">أرسل رسالة فورية</h2>
            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined text-4xl font-bold">check_circle</span>
                </div>
                <h3 className="font-headline text-3xl font-bold text-on-surface mb-3">تم الإرسال بنجاح!</h3>
                <p className="text-on-surface-variant text-lg max-w-sm mb-8">نشكرك على تواصلك. سيقوم فريقنا بمراجعة رسالتك والرد عليك في أقرب وقت ممكن.</p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setUserAnswer1("");
                  }}
                  className="text-primary font-bold hover:underline flex items-center gap-2"
                >
                  إرسال رسالة أخرى
                  <span className="material-symbols-outlined text-sm">refresh</span>
                </button>
              </div>
            ) : (
              <form className="space-y-6" action={handleAction}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-on-surface-variant mr-1">الاسم الكامل</label>
                    <input name="name" required className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface placeholder:text-outline-variant/30 transition-all text-right focus:ring-1 focus:ring-primary/50 outline-none" placeholder="مثال: أحمد محمد" type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-on-surface-variant mr-1">البريد الإلكتروني</label>
                    <input name="email" required className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface placeholder:text-outline-variant/30 transition-all text-right focus:ring-1 focus:ring-primary/50 outline-none" placeholder="name@example.com" type="email" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-on-surface-variant mr-1">رقم الهاتف</label>
                    <input name="phone" required className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface placeholder:text-outline-variant/30 transition-all text-right focus:ring-1 focus:ring-primary/50 outline-none" placeholder="+49 176 43446439" type="tel" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-on-surface-variant mr-1">نوع الاستفسار</label>
                    <select 
                      name="inquiry_type" 
                      value={selectedInquiry}
                      onChange={(e) => setSelectedInquiry(e.target.value)}
                      className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface transition-all focus:ring-1 focus:ring-primary/50 outline-none"
                    >
                      <option value="استفسار عام">استفسار عام</option>
                      <option value="تسجيل في دورة الألمانية">تسجيل في دورة الألمانية</option>
                      <option value="استشارة مسار مهني">استشارة مسار مهني</option>
                      <option value="مشاكل تقنية بالموقع">مشاكل تقنية بالموقع</option>
                    </select>
                  </div>
                </div>

                {selectedInquiry === "تسجيل في دورة الألمانية" && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="text-sm font-medium text-on-surface-variant mr-1">الدورة المطلوبة</label>
                    <select name="course_name" required className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface transition-all focus:ring-1 focus:ring-primary/50 outline-none">
                      <option value="" disabled>اختر الدورة...</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.title}>{course.title}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-on-surface-variant mr-1">الرسالة</label>
                  <textarea name="message" required className="w-full bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface placeholder:text-outline-variant/30 transition-all resize-none text-right focus:ring-1 focus:ring-primary/50 outline-none" placeholder="كيف يمكننا مساعدتك في تحقيق أهدافك؟" rows={4}></textarea>
                </div>

                {/* Math Captcha */}
                <div className="bg-surface-container-highest/50 p-4 rounded-xl flex items-center justify-between border border-transparent focus-within:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline-variant text-xl">security</span>
                    <span className="font-bold text-on-surface-variant">كم يساوي {captcha1.num1} + {captcha1.num2}؟</span>
                  </div>
                  <input
                    className="w-20 bg-background rounded-lg py-2 px-3 text-center text-on-surface font-bold outline-none border border-outline-variant/20 focus:border-primary/50 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={userAnswer1}
                    onChange={(e) => setUserAnswer1(e.target.value)}
                    placeholder="?"
                    required
                  />
                </div>

                {/* Terms Agreement */}
                <div className="flex items-center gap-3 px-2">
                  <input 
                    type="checkbox" 
                    id="terms-checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-5 h-5 rounded border-outline-variant/30 text-primary focus:ring-primary bg-surface-container-highest transition-all cursor-pointer"
                    required
                  />
                  <label htmlFor="terms-checkbox" className="text-sm text-on-surface-variant cursor-pointer select-none">
                    أوافق على <Link href="/terms" className="text-primary hover:underline">شروط الاستخدام</Link> وسياسة الخصوصية
                  </label>
                </div>

                <button disabled={!isCaptcha1Valid || !agreedToTerms || isSubmitting} className="w-full disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-headline font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg shadow-primary/20 flex justify-center items-center gap-2 group" type="submit">
                  <span>{isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}</span>
                  <span className={`material-symbols-outlined text-sm transition-transform ${isCaptcha1Valid && agreedToTerms ? 'rotate-180 group-hover:translate-x-1' : ''}`} style={{ fontVariationSettings: "'FILL' 1" }}>{isCaptcha1Valid && agreedToTerms ? 'send' : 'lock'}</span>
                </button>
              </form>
            )}
          </MotionCard>
        </div>

        {/* Contact Info & Quick Links */}
        <div className="lg:col-span-5 space-y-6">
          {/* Info Cards */}
          <div className="grid grid-cols-1 gap-6">

            {/* WhatsApp Priority */}
            <MotionCard delay={0.2} className="bg-surface-container-low p-8 rounded-xl flex items-center justify-between group hover:bg-surface-container transition-colors duration-300 border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                  <span className="material-symbols-outlined">chat</span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface">قسم الاستشارات المباشرة</h3>
                  <p className="text-on-surface-variant text-sm mt-1" dir="ltr">{settings.contact_phone || '+49 176 43446439'}</p>
                </div>
              </div>
              <a className="bg-green-500/10 text-green-500 px-4 py-2 rounded-full text-sm font-bold hover:bg-green-500 hover:text-white transition-all shadow-sm" href={`https://wa.me/4917643446439`} target="_blank" rel="noopener noreferrer">تواصل معنا</a>
            </MotionCard>

            {/* Email */}
            <MotionCard delay={0.3} className="bg-surface-container-low p-8 rounded-xl flex items-center gap-4 hover:bg-surface-container transition-colors duration-300 border border-white/5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div>
                <h3 className="font-bold text-on-surface">التواصل عبر البريد</h3>
                <p className="text-on-surface-variant mb-1 mt-1 font-medium">{settings.contact_email || 'info@kafaaat.academy'}</p>
                <p className="text-on-surface-variant text-sm">استجابة خلال 24 - 48 ساعة</p>
              </div>
            </MotionCard>

            {/* Open Hours */}
            <MotionCard delay={0.4} className="bg-surface-container-low p-8 rounded-xl flex items-center gap-4 hover:bg-surface-container transition-colors duration-300 border border-white/5">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-on-surface">أوقات العمل</h3>
                <div className="flex justify-between items-center mt-2 text-on-surface-variant text-sm border-b border-white/5 pb-2">
                  <span>الإثنين - الجمعة</span>
                  <span className="font-medium">{settings.business_hours_weekdays || '09:00 - 18:00'}</span>
                </div>
                <div className="flex justify-between items-center mt-2 text-on-surface-variant text-sm">
                  <span>السبت - الأحد</span>
                  <span className="font-medium text-primary">{settings.business_hours_weekend || 'مغلق'}</span>
                </div>
              </div>
            </MotionCard>

            {/* Location */}

          </div>
        </div>
      </section>

      <FeedbackSection />

      {/* FAQ Section */}
      <section className="w-full mx-auto px-8 mt-32">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold text-on-surface mb-4">الأسئلة الشائعة</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">احصل على إجابات سريعة للأسئلة الشائعة حول دوراتنا وعملية التسجيل.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Accordion Item 1 */}
          <div className="group bg-surface-container-low rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-white/5">
            <button className="w-full p-6 flex justify-between items-center text-left hover:bg-surface-container transition-colors">
              <span className="font-bold text-on-surface">هل تقدمون دورات عبر الإنترنت بنسبة 100٪؟</span>
              <span className="material-symbols-outlined text-primary group-hover:rotate-180 transition-transform">expand_more</span>
            </button>
            <div className=" px-6 pb-6 text-on-surface-variant text-sm leading-relaxed border-t border-outline-variant/5 pt-4 group-hover:block animate-in slide-in-from-top-2">
              نعم، تتخصص أكاديمية كفاءات في الفصول الافتراضية المتطورة التي تحاكي تجربة المختبر الفعلي، مما يوفر المرونة للطلاب في جميع أنحاء العالم.
            </div>
          </div>
          {/* Accordion Item 2 */}
          <div className="group bg-surface-container-low rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-white/5">
            <button className="w-full p-6 flex justify-between items-center text-left hover:bg-surface-container transition-colors">
              <span className="font-bold text-on-surface">كيفية الدراسة في أكاديمية كفاءات؟</span>
              <span className="material-symbols-outlined text-primary group-hover:rotate-180 transition-transform">expand_more</span>
            </button>
            <div className="hidden px-6 pb-6 text-on-surface-variant text-sm leading-relaxed border-t border-outline-variant/5 pt-4 group-hover:block animate-in slide-in-from-top-2">
              عن طريق غرف خاصة في منصة zoom </div>
          </div>
          {/* Accordion Item 3 */}
          <div className="group bg-surface-container-low rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-white/5">
            <button className="w-full p-6 flex justify-between items-center text-left hover:bg-surface-container transition-colors">
              <span className="font-bold text-on-surface">هل يمكنني مشاهدة الجلسات في أي وقت؟</span>
              <span className="material-symbols-outlined text-primary group-hover:rotate-180 transition-transform">expand_more</span>

            </button>
            <div className="hidden px-6 pb-6 text-on-surface-variant text-sm leading-relaxed border-t border-outline-variant/5 pt-4 group-hover:block animate-in slide-in-from-top-2">
              جميع الجلسات مسجلة ويمكن مشاهدتها في أي وقت عبر منصة youtube </div>
          </div>
          {/* Accordion Item 4 */}
          <div className="group bg-surface-container-low rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-white/5">
            <button className="w-full p-6 flex justify-between items-center text-left hover:bg-surface-container transition-colors">
              <span className="font-bold text-on-surface">ما هي مناهج اللغة الألمانية المعتمدة في أكاديمية كفاءات؟</span>
              <span className="material-symbols-outlined text-primary group-hover:rotate-180 transition-transform">expand_more</span>
            </button>
            <div className="hidden px-6 pb-6 text-on-surface-variant text-sm leading-relaxed border-t border-outline-variant/5 pt-4 group-hover:block animate-in slide-in-from-top-2">
              تعتمد أكاديمية كفاءات على مناهج معتمدة دوليًا مثل منهج “Menschen” و “Schritte International” بالإضافة إلى مواد تدريبية مصممة خصيصًا لتلبية احتياجات الطلاب في مختلف المستويات (A1-B2).
            </div>
          </div>
          {/* Accordion Item 5 */}
          <div className="group bg-surface-container-low rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-white/5">
            <button className="w-full p-6 flex justify-between items-center text-left hover:bg-surface-container transition-colors">
              <span className="font-bold text-on-surface">هل يمكنني التسجيل بشكل منفرد وتدريسي بشكل خاص؟</span>
              <span className="material-symbols-outlined text-primary group-hover:rotate-180 transition-transform">expand_more</span>
            </button>
            <div className="hidden px-6 pb-6 text-on-surface-variant text-sm leading-relaxed border-t border-outline-variant/5 pt-4 group-hover:block animate-in slide-in-from-top-2">
              نعم، يمكنك التسجيل بشكل منفرد في أي دورة من دوراتنا، سواء كانت دورة لغة أو دورة مهارات.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
