import TestimonialCarousel from "@/components/TestimonialCarousel";
import { MotionCard } from "@/components/MotionCard";
import { BundleCard } from "@/components/BundleCard";
import FeedbackSection from "@/components/FeedbackSection";
import Link from "next/link";
import { getSettings } from "./actions/settings";
import { getHomeReviews } from "./actions/testimonials";
import { getCourses } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const settings = await getSettings();
  const reviews = await getHomeReviews();
  const courses = await getCourses();

  // Find the bundle course
  const bundleCourse = courses.find((c) => c.id === 'bundle') || courses[0];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex flex-col justify-center items-center py-20 md:py-32 overflow-hidden">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" data-alt="Modern Berlin architecture with dramatic lighting" src="/hero_berlin.png" />
          <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]"></div>

          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
        </div>

        {/* Content Container */}
        <div className="w-full mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center text-center max-w-5xl">
          {/* Text Content */}
          <div className="max-w-4xl mx-auto animate-fade-in-up mb-6 md:mb-8">
            <span className="inline-block py-1.5 px-4 rounded-full bg-surface-container-high/80 backdrop-blur-md text-primary text-sm font-bold tracking-widest uppercase mb-6 border border-primary/20 shadow-[0_0_15px_rgba(242,202,80,0.15)]">تدريب لغوي للنخبة</span>
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-black text-on-surface leading-[1.1] tracking-tight mb-8" dangerouslySetInnerHTML={{ __html: settings.hero_title || 'أتقن الألمانية <className="md:hidden" /><span className="text-primary drop-shadow-[0_0_30px_rgba(242,202,80,0.3)]">بدقة</span>' }} />
            <p className="text-on-surface-variant text-lg md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium opacity-90">
              {settings.hero_subtitle || 'مصمم للتميز. مساراتنا المهيكلة تسد الفجوة بين التعلم المتوسط والطلاقة المهنية.'}
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link href="/courses" className="bg-primary hover:bg-primary/90 text-on-primary px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95">ابدأ التعلم</Link>
              <Link href="/about" className="bg-surface-container-highest/50 backdrop-blur-md hover:bg-surface-container-highest text-on-surface px-10 py-4 rounded-2xl font-bold text-lg transition-all border border-white/5 hover:scale-105 active:scale-95">اكتشف المزيد</Link>
            </div>
          </div>

          {/* Floating Glass Cards moved below text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6 w-full animate-fade-in-up md:max-w-4xl max-w-lg mx-auto" style={{ animationDelay: '0.2s' }}>
            {/* Left Card */}
            <div className="glass-card bg-surface/40 backdrop-blur-xl p-5 md:p-6 rounded-3xl shadow-2xl border border-white/10 flex items-center gap-4 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-primary/20 p-3 md:p-4 rounded-full flex justify-center items-center shrink-0">
                <span className="material-symbols-outlined text-primary text-2xl md:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              </div>
              <div className="text-right">
                <h3 className="text-on-surface font-bold text-base md:text-lg mb-1">تميز معتمد</h3>
                <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed">حقق كفاءة بمستوى معهد غوته من خلال منهجنا المدروس.</p>
              </div>
            </div>

            {/* Right Card */}
            <div className="glass-card bg-surface/40 backdrop-blur-xl p-5 md:p-6 rounded-3xl shadow-2xl border border-white/10 flex items-center gap-4 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-primary/20 p-3 md:p-4 rounded-full flex justify-center items-center shrink-0">
                <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">school</span>
              </div>
              <div className="text-right">
                <h3 className="text-on-surface font-bold text-base md:text-lg mb-1">نخبة المدرسين</h3>
                <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed">إشراف خبراء على مستوى المتحدثين الأصليين.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Student Success Stats */}
      <section className="mt py-24 bg-surface-container-lowest">
        <div className="w-full mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-headline font-extrabold text-primary mb-2 drop-shadow-[0_0_15px_rgba(242,202,80,0.4)]">2.5k+</div>
              <div className="text-on-surface-variant text-sm font-medium tracking-wide uppercase">طالب تخرج</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-headline font-extrabold text-primary mb-2 drop-shadow-[0_0_15px_rgba(242,202,80,0.4)]">%98</div>
              <div className="text-on-surface-variant text-sm font-medium tracking-wide uppercase">نسبة اجتياز الامتحانات</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-headline font-extrabold text-primary mb-2 drop-shadow-[0_0_15px_rgba(242,202,80,0.4)]">+120</div>
              <div className="text-on-surface-variant text-sm font-medium tracking-wide uppercase">مرشد أصلي</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-headline font-extrabold text-primary mb-2 drop-shadow-[0_0_15px_rgba(242,202,80,0.4)]">+15</div>
              <div className="text-on-surface-variant text-sm font-medium tracking-wide uppercase">وحدة تعليمية</div>
            </div>
          </div>
        </div>
      </section>
      {/* Why Learn with Kafaaat (Bento Grid) */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-surface">
        {/* Background decorative elements */}
        <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -left-64 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          {/* Section Header */}
          <div className="mb-20 max-w-3xl mx-auto text-center">
            <span className="inline-block py-1.5 px-4 rounded-full bg-surface-container-high/80 backdrop-blur-md text-primary text-sm font-bold tracking-widest uppercase mb-6 border border-primary/20 shadow-[0_0_15px_rgba(242,202,80,0.15)]">مميزات الأكاديمية</span>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold mb-6 text-on-surface tracking-tight">
              لماذا تختار <span className="text-primary drop-shadow-md">كفاءات؟</span>
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full mb-8 opacity-80"></div>
            <p className="text-lg md:text-xl font-medium text-on-surface-variant leading-relaxed" style={{ wordSpacing: '1px' }}>
              لأن تعلم الألمانية ما لازم يكون صعب أو ممل. في كفاءات صممنا تجربة تعليمية تناسب الناطقين بالعربية، وتساعدك تتقدم بسرعة، بثقة، وبطريقة عملية تناسب أهدافك.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

            {/* Feature 1 */}
            <MotionCard delay={0.1} className="group relative bg-surface-container-low/60 backdrop-blur-xl border border-white/5 hover:border-primary/40 rounded-[2rem] p-8 md:p-10 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div className="w-16 h-16 rounded-2xl bg-surface/80 border border-white/5 shadow-inner flex items-center justify-center mb-8 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                <span className="material-symbols-outlined text-4xl text-primary drop-shadow-md" data-icon="school">school</span>
              </div>
              <h3 className="text-2xl font-headline font-bold text-on-surface mb-4">شرح مخصص للناطقين بالعربية</h3>
              <p className="text-on-surface-variant leading-relaxed text-lg">
                شرح قواعد اللغة الألمانية بطريقة واضحة وقريبة من طريقة تفكير الطالب العربي، حتى تفهم أسرع وتتجنب أكثر الأخطاء شيوعًا.
              </p>
            </MotionCard>

            {/* Feature 2 */}
            <MotionCard delay={0.2} className="group relative bg-surface-container-low/60 backdrop-blur-xl border border-white/5 hover:border-primary/40 rounded-[2rem] p-8 md:p-10 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div className="w-16 h-16 rounded-2xl bg-surface/80 border border-white/5 shadow-inner flex items-center justify-center mb-8 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                <span className="material-symbols-outlined text-4xl text-primary drop-shadow-md" data-icon="video_chat" style={{ fontVariationSettings: "'FILL' 1" }}>video_chat</span>
              </div>
              <h3 className="text-2xl font-headline font-bold text-on-surface mb-4">دروس تفاعلية مباشرة</h3>
              <p className="text-on-surface-variant leading-relaxed text-lg">
                احصل على جلسات حية وتمارين تفاعلية تساعدك على التطبيق الفوري، وطرح الأسئلة، وتصحيح أخطائك أولًا بأول.
              </p>
            </MotionCard>

            {/* Feature 3 */}
            <MotionCard delay={0.3} className="group relative bg-surface-container-low/60 backdrop-blur-xl border border-white/5 hover:border-primary/40 rounded-[2rem] p-8 md:p-10 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div className="w-16 h-16 rounded-2xl bg-surface/80 border border-white/5 shadow-inner flex items-center justify-center mb-8 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                <span className="material-symbols-outlined text-4xl text-primary drop-shadow-md" data-icon="history_edu" style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span>
              </div>
              <h3 className="text-2xl font-headline font-bold text-on-surface mb-4">تعلم عملي وليس نظري فقط</h3>
              <p className="text-on-surface-variant leading-relaxed text-lg">
                نركز على المحادثة، الاستماع، والمواقف اليومية الحقيقية، حتى تستخدم اللغة بثقة في الدراسة، العمل، والحياة في ألمانيا.
              </p>
            </MotionCard>

            {/* Feature 4 */}
            <MotionCard delay={0.4} className="group relative bg-surface-container-low/60 backdrop-blur-xl border border-white/5 hover:border-primary/40 rounded-[2rem] p-8 md:p-10 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div className="w-16 h-16 rounded-2xl bg-surface/80 border border-white/5 shadow-inner flex items-center justify-center mb-8 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                <span className="material-symbols-outlined text-4xl text-primary drop-shadow-md" data-icon="devices">devices</span>
              </div>
              <h3 className="text-2xl font-headline font-bold text-on-surface mb-4">مرونة بالتعلم من أي مكان</h3>
              <p className="text-on-surface-variant leading-relaxed text-lg">
                تعلم عبر الهاتف أو الكمبيوتر، وفي الوقت الذي يناسبك، مع محتوى منظم يسهل عليك الاستمرار بدون ضغط.
              </p>
            </MotionCard>

          </div>
        </div>
      </section>
      {/* Course Levels Preview */}
      <section className="py-32 bg-surface-container-low">
        <div className="w-full mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-headline font-bold mb-4">طريقك نحو الطلاقة</h2>
              <p className="text-on-surface-variant max-w-md">دورات مهيكلة تتبع معايير مصقولة من أجل الدقة والسرعة.</p>
            </div>
            <Link href="/courses" className="text-primary font-bold flex items-center gap-2 hover:-translate-x-2 transition-transform">
              عرض جميع الدورات <span className="material-symbols-outlined rotate-180">arrow_forward</span>
            </Link>
          </div>

          {/* Kafaaat Bundle Featured Course */}
          {bundleCourse && (
            <div className="w-full mb-16">
              <BundleCard course={bundleCourse} />
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8">
            {/* A1 Level */}
            <MotionCard delay={0.1} className="group relative bg-surface rounded-3xl overflow-hidden transition-all duration-500">
              <div className="h-48 overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="German beginners learning in a modern office" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC2fQAatSSY23zzCf_0ZEeTABLM5HW1qERAcA1ZhAYSc0_iqnF0MTHIgb9aDsO2alp1aRzBXVB8_VQWHQMNYRu6x6UV6cxYMAbgkEf8goLquKBwHN89ZU0c5Mkc2bfXY6GIouN2AsucXRZqU6yl_YKbIGf0rCpVKRoyR0jzbLLnRDeaPI0312N0LdBk8HHDFdErYjvBAgJHoz3gb8FtJTbZly4j22kBFKX7OeE8Bxkwh3zvmzPo6tTJLeI-Vq1zGcLrPeGAwT0dCUS" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-black bg-primary/10 text-primary px-3 py-1 rounded-md">المستوى A1</span>
                  <span className="text-on-surface-variant text-sm italic">6 أسابيع</span>
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4">أساسيات الألمانية</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-8">أتقن الأساسيات: التعارف، الروتين اليومي، والقواعد الأساسية للتواصل الفوري.</p>
                <div className="flex flex-col gap-3">
                  <Link href="https://wa.me/4917643446439" target="_blank" className="w-full bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border border-[#25D366]/20">
                    سجل الان
                  </Link>
                  <Link href="/courses/a1" className="block text-center w-full py-3 bg-surface-container-highest text-on-surface border border-outline-variant/10 rounded-xl font-bold hover:bg-primary hover:text-on-primary transition-all">
                    تفاصيل الدورة
                  </Link>
                </div>
              </div>
            </MotionCard>
            {/* A2 Level */}
            <MotionCard delay={0.2} className="group relative bg-surface rounded-3xl overflow-hidden transition-all duration-500 gold-glow">
              <div className="h-48 overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="Classroom discussion in Germany" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVkAPYRJihmUV_QU16FDmkHXG57K5P0iiGrEA45b0vmntR1jb50DSj_USFZbjnBOxnlEuriKtpqpIHKAZS3qhUtwOWw3DNcQQuuQV0yYGdh7aOdYlNTEJvHHmqOO6-ucRVTiyPI-clOo0yvuoGCVZTAo2u-BB4CDEWDNyO3-0R4KqWXDlKrAS41qFQeOazK7tOl_OJj5MNp-xV3gnb-alp3vSzd4IveL_xFTpXwPODX447NHfyTkPiZx_-XOaylsvcCbeIFfz4OLIK" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-black bg-primary/10 text-primary px-3 py-1 rounded-md">المستوى A2</span>
                  <span className="text-on-surface-variant text-sm italic">6 أسابيع</span>
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4">المتوسط اليومي</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-8">وسع مفرداتك لتشمل سيناريوهات بيئة العمل والتعبير الشخصي المعقد.</p>
                <div className="flex flex-col gap-3">
                  <Link href="https://wa.me/4917643446439" target="_blank" className="w-full bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border border-[#25D366]/20">
                    سجل الان
                  </Link>
                  <Link href="/courses/a2" className="block text-center w-full py-3 bg-surface-container-highest text-on-surface border border-outline-variant/10 rounded-xl font-bold hover:bg-primary hover:text-on-primary transition-all">
                    تفاصيل الدورة
                  </Link>
                </div>
              </div>
            </MotionCard>
            {/* B1 Level */}
            <MotionCard delay={0.3} className="group relative bg-surface rounded-3xl overflow-hidden transition-all duration-500">
              <div className="h-48 overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="Advanced students collaborating on a project" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYDYULzNac1nRBeGF2vTha2tVyGX9YdIeGq8gQYRr6gngxCdjZgQ8ZeBEfKA5SgF0fKFR4lB4i2-jCIG7uaHSouRVSwWUaSYaaY984aQjrk9D5BExui-LgRAhVoruQluRv3RLRFk_tS2kVVfYpFnIqWm7IDIbrd8T-yjh9U9hS3TOK_FGuJNDFGiyQ4rw7YoCLKne-5-CbpLmYM6AooeUd3Ync7uzHTpBTl7LjYNzcpdhz1kRI6LgWNTe9lYO5LGc74uwZVrXAPrFw" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-black bg-primary/10 text-primary px-3 py-1 rounded-md">المستوى B1</span>
                  <span className="text-on-surface-variant text-sm italic">6 أسابيع</span>
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4">الكفاءة المستقلة</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-8">التواصل المهني، التعبير عن الآراء، وفهم النصوص الدقيقة.</p>
                <div className="flex flex-col gap-3">
                  <Link href="https://wa.me/4917643446439" target="_blank" className="w-full bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border border-[#25D366]/20">
                    سجل الان
                  </Link>
                  <Link href="/courses/b1" className="block text-center w-full py-3 bg-surface-container-highest text-on-surface border border-outline-variant/10 rounded-xl font-bold hover:bg-primary hover:text-on-primary transition-all">
                    تفاصيل الدورة
                  </Link>
                </div>
              </div>
            </MotionCard>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-24 md:py-20 relative overflow-hidden bg-surface pt-5">
        {/* Background decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <span className="inline-block py-1.5 px-4 rounded-full bg-surface-container-high/80 backdrop-blur-md text-primary text-sm font-bold tracking-widest uppercase mb-6 border border-primary/20 shadow-[0_0_15px_rgba(242,202,80,0.15)]">قصص نجاح</span>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tight mb-6">أصوات <span className="text-primary drop-shadow-md">النجاح</span></h2>
            <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent flex-1 mb-6"></div>
            <p className="text-lg text-on-surface-variant leading-relaxed">تجارب حقيقية لطلابنا الذين حققوا أهدافهم في تعلم اللغة الألمانية معنا.</p>
          </div>

          {/* Carousel */}
          <TestimonialCarousel testimonials={reviews} />
        </div>
      </section>

      {/* Dedicated Feedback Section */}


      {/* Final CTA */}
      <section className="py-24 md:py-10 w-full bg-gradient-to-br from-primary to-primary-container text-center relative overflow-hidden shadow-2xl px-6 md:px-12">
        {/* Germany flag stroke (border) at the top with glowing effect */}
        <div className="absolute top-0 left-0 w-full z-20">
          {/* Main solid line */}
          <div className="w-full flex flex-row h-1 relative z-10">
            <div className="h-full flex-1 bg-[#000000]"></div>
            <div className="h-full flex-1 bg-[#DD0000]"></div>
            <div className="h-full flex-1 bg-[#FFCE00]"></div>
          </div>

          {/* Inner intense glow */}
          <div className="w-full flex flex-row h-1 absolute top-0 left-0 blur-sm opacity-80 pointer-events-none">
            <div className="h-full flex-1 bg-[#000000]"></div>
            <div className="h-full flex-1 bg-[#DD0000]"></div>
            <div className="h-full flex-1 bg-[#FFCE00]"></div>
          </div>

          {/* Outer wide spread glow */}
          <div className="w-full flex flex-row h-2 absolute top-0 left-0 blur-xl opacity-60 pointer-events-none">
            <div className="h-full flex-1 bg-[#000000]"></div>
            <div className="h-full flex-1 bg-[#DD0000]"></div>
            <div className="h-full flex-1 bg-[#FFCE00]"></div>
          </div>
        </div>

        <div className="absolute inset-0 opacity-10">
          <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
            <pattern height="10" id="grid" patternUnits="userSpaceOnUse" width="10">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"></path>
            </pattern>
            <rect fill="url(#grid)" height="100%" width="100%" opacity={0.2}></rect>
          </svg>
        </div>

        {/* Added extra fade out gradients on the edges for a premium look */}
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-primary-container/30 to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-primary/30 to-transparent pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10 w-full py-10 mt-4">
          <h2 className="text-5xl md:text-7xl font-headline font-extrabold text-on-primary-container mb-8 drop-shadow-md">
            ابدأ رحلتك إلى <span className="opacity-80">ألمانيا</span>
          </h2>
          <p className="text-on-primary-container/80 text-xl md:text-2xl max-w-2xl mx-auto mb-12 drop-shadow-sm leading-relaxed">
            انضم إلى المجموعة التالية. مقاعد محدودة متاحة لكافة المسارات. تحدث معنا الآن لتأكيد مكانك.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="https://wa.me/4917643446439" target="_blank" className="bg-[#25D366]/70 hover:bg-[#25D666] text-white border-white/30  border-2 hover:border-white/50 p-5 px-10 rounded-3xl font-black text-xl transition-all border border-[#25D366]/20 flex items-center justify-center gap-2">
              سجل الان
            </Link>
            <Link href="/contact" className="text-white px-10 py-5 rounded-3xl font-bold text-xl border-2 border-white/30 hover:bg-white/30 transition-all">
              أتصل بنا
            </Link>
          </div>
        </div>
      </section>
      {/* Footer */}
    </main>
  );
}
