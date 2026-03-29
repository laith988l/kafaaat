import { MotionCard } from "@/components/MotionCard";
import { BundleCard } from "@/components/BundleCard";
import Link from "next/link";
import { getCourses } from "@/app/actions";

export default async function CoursesPage() {
    const courses = await getCourses();

    // Find the bundle course for the featured section
    const bundleCourse = courses.find((c) => c.id === 'bundle') || courses[0];

    // Filter out the bundle for the grid
    const gridCourses = courses.filter((c) => c.id !== 'bundle');

    return (
        <main className="py-20 px-6">
            {/* Hero Section */}
            <section className="w-full mx-auto mb-20 text-center">
                <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface mb-6">
                    أتقن الألمانية <span className="text-primary">بدقة</span>
                </h1>
                <p className="text-on-surface-variant text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
                    مصمم للتميز. مساراتنا المهيكلة تسد الفجوة بين التعلم المتوسط والطلاقة المهنية.
                </p>
            </section>

            {/* Kafaaat Bundle Featured Course */}
            {bundleCourse && (
                <section className="w-full mx-auto mb-16">
                    <BundleCard course={bundleCourse} />
                </section>
            )}

            {/* Course Grid */}
            <section className="w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 text-right">
                {gridCourses.map((course, idx) => (
                    <MotionCard key={course.id} delay={0.1 * (idx + 1)} className="glass-card rounded-2xl overflow-hidden flex flex-col h-full hover:bg-surface-container-high transition-all duration-500 border border-white/5 hover:border-primary/20 group">

                        {/* Course Image Header */}
                        <div className="w-full aspect-[16/9] overflow-hidden bg-surface-container-highest relative">
                            {course.featured_image ? (
                                <img
                                    src={course.featured_image}
                                    alt={course.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-primary/20">
                                    <span className="material-symbols-outlined text-5xl">language</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high/60 to-transparent"></div>

                            {/* Floating Level Tag */}
                            <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                                <span className="text-primary font-headline text-3xl font-black drop-shadow-lg">{course.level}</span>
                            </div>
                        </div>

                        <div className="p-8 flex flex-col flex-grow">
                            <div className="flex justify-between items-center mb-4">
                                <span className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-lg text-xs font-bold text-primary uppercase tracking-widest">{course.category}</span>
                            </div>
                            <h3 className="font-headline text-2xl font-bold mb-4 text-on-surface">{course.title}</h3>
                            <p className="text-on-surface-variant mb-6 flex-grow leading-relaxed">
                                {course.short_description}
                            </p>

                            <div className="space-y-3 mb-8 border-t border-white/5 pt-6">
                                {(course.outcomes as string[] || []).slice(0, 3).map((feat, i) => (
                                    <div key={i} className="flex items-center gap-3 text-on-surface text-right pr-1">
                                        <span className="material-symbols-outlined text-primary text-xl">verified</span>
                                        <span className="text-sm font-medium">{feat}</span>
                                    </div>
                                ))}
                                <div className="flex items-center gap-3 text-on-surface text-right pr-1">
                                    <span className="material-symbols-outlined text-primary text-xl">schedule</span>
                                    <span className="text-sm font-medium">{course.duration} | {course.hours} ساعة تدريبية</span>
                                </div>
                                <div className="flex items-center gap-4 mt-2 pr-1">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary text-xl">payments</span>
                                        <span className="text-2xl font-black text-on-surface">€{course.price}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Link href="https://wa.me/4917643446439" target="_blank" className="w-full bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border border-[#25D366]/20">
                                    سجل الان
                                </Link>
                                <Link href={`/courses/${course.id}`} className="block text-center w-full py-3 bg-surface-container-highest text-on-surface border border-outline-variant/10 rounded-xl font-bold hover:bg-primary hover:text-on-primary transition-all">
                                    تفاصيل الدورة
                                </Link>
                            </div>
                        </div>
                    </MotionCard>
                ))}
            </section>

            {/* Academy Services */}
            <section className="w-full mx-auto text-right">
                <h2 className="font-headline text-3xl font-bold mb-10 border-r-4 border-primary pr-6">خدمات الأكاديمية</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MotionCard delay={0.1} className="glass-card hover:bg-surface-container-high transition-all duration-300 p-8 rounded-2xl flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-transform">
                            <span className="material-symbols-outlined text-primary text-3xl">description</span>
                        </div>
                        <h4 className="font-headline text-xl font-bold mb-3 group-hover:text-primary transition-colors">التحضير للامتحانات</h4>
                        <p className="text-on-surface-variant text-sm leading-relaxed flex-grow">تدريب مخصص لشهادات غوته، Telc، و TestDaF. محاكاة شاملة لبيئات الامتحان.</p>
                    </MotionCard>
                    <MotionCard delay={0.2} className="glass-card hover:bg-surface-container-high transition-all duration-300 p-8 rounded-2xl flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-transform">
                            <span className="material-symbols-outlined text-primary text-3xl">person</span>
                        </div>
                        <h4 className="font-headline text-xl font-bold mb-3 group-hover:text-primary transition-colors">دروس خصوصية</h4>
                        <p className="text-on-surface-variant text-sm leading-relaxed flex-grow">تدريب فردي مكثف ومخصص بالكامل لتلبية أهدافك التعليمية بوقت قياسي.</p>
                    </MotionCard>
                    <MotionCard delay={0.3} className="glass-card hover:bg-surface-container-high transition-all duration-300 p-8 rounded-2xl flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-transform">
                            <span className="material-symbols-outlined text-primary text-3xl">forum</span>
                        </div>
                        <h4 className="font-headline text-xl font-bold mb-3 group-hover:text-primary transition-colors">محادثة متقدمة</h4>
                        <p className="text-on-surface-variant text-sm leading-relaxed flex-grow">التركيز على الطلاقة في التحدث، النطق السليم، والتفاعل في المواقف اليومية.</p>
                    </MotionCard>
                    <MotionCard delay={0.4} className="glass-card hover:bg-surface-container-high transition-all duration-300 p-8 rounded-2xl flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-transform">
                            <span className="material-symbols-outlined text-primary text-3xl">school</span>
                        </div>
                        <h4 className="font-headline text-xl font-bold mb-3 group-hover:text-primary transition-colors">الدراسة في ألمانيا</h4>
                        <p className="text-on-surface-variant text-sm leading-relaxed flex-grow">استشارات شاملة للتقديم للجامعات الألمانية، واختيار التخصص المناسب لك.</p>
                    </MotionCard>
                </div>
            </section>

            {/* Trust Section */}
            <section className="w-full mx-auto mt-24 py-16 px-8 rounded-[2rem] bg-gradient-to-r from-surface-container-lowest to-surface-container-low flex flex-col md:flex-row items-center justify-between gap-12 text-right">
                <div className="md:w-1/2">
                    <h2 className="font-headline text-3xl font-bold mb-6">لماذا التميز الألماني؟</h2>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-1.5 h-auto bg-primary rounded-full"></div>
                            <p className="text-on-surface-variant"><strong className="text-on-surface block">مدربون معتمدون</strong> متحدثون أصليون وخبراء يتمتعون بسنوات من الخبرة في تدريس الألمانية كلغة أجنبية.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1.5 h-auto bg-primary rounded-full"></div>
                            <p className="text-on-surface-variant"><strong className="text-on-surface block">منهج ذكي</strong>مواد تعليمية رقمية متكاملة تتبع معايير عالمية.</p>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/3 lg:w-1/4 aspect-square bg-surface-container-highest rounded-full flex items-center justify-center border-8 border-surface-container relative">
                    <div className="absolute inset-0 bg-primary opacity-5 blur-3xl rounded-full"></div>
                    <div className="text-center">
                        <div className="text-5xl font-black text-primary font-headline">98%</div>
                        <div className="text-on-surface-variant font-medium tracking-widest uppercase text-xs mt-2">نسبة النجاح</div>
                    </div>
                </div>
            </section>
        </main>
    );
}
