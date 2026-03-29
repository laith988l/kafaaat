import { notFound } from "next/navigation";
import { MotionCard } from "@/components/MotionCard";
import Link from "next/link";
import { getCourses, getCourseByLevel } from "@/app/actions";
import CourseInquiryForm from "@/components/CourseInquiryForm";
export async function generateStaticParams() {
    const courses = await getCourses();
    return courses.map((c) => ({ level: c.level.toLowerCase() }));
}

export default async function CourseDetailPage({ params }: { params: Promise<{ level: string }> }) {
    const resolvedParams = await params;
    const dbCourse = await getCourseByLevel(resolvedParams.level);
    
    if (!dbCourse) {
        notFound();
    }
    
    // Map db schema to component schema
    const course = {
        ...dbCourse,
        shortDescription: dbCourse.short_description,
        fullDescription: dbCourse.full_description,
        featuredImage: dbCourse.featured_image,
        outcomes: dbCourse.outcomes as string[],
        syllabus: dbCourse.syllabus as { title: string; desc: string }[],
    };

    // Validation handled by !dbCourse

    return (
        <main className="pt-24 pb-20 px-6">
            {/* Hero Section */}
            <section className="relative w-full mx-auto max-w-7xl rounded-[3rem] overflow-hidden mb-16 min-h-[500px] flex items-center">
                <div className="absolute inset-0 z-0 bg-surface-container-lowest">
                    {course.featuredImage ? (
                        <img 
                            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" 
                            alt={course.title} 
                            src={course.featuredImage} 
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10"></div>
                </div>
                <div className="relative z-20 px-10 md:px-20 w-full max-w-4xl">
                    <span className="inline-block bg-primary/20 text-primary border border-primary/30 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
                        {course.category}
                    </span>
                    <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface mb-6 drop-shadow-md">
                        {course.title} <span className="text-primary">{course.level}</span>
                    </h1>
                    <p className="text-on-surface-variant text-xl leading-relaxed max-w-2xl font-medium">
                        {course.shortDescription}
                    </p>
                </div>
            </section>

            {/* Main Content Grid */}
            <section className="w-full mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left Column: Details */}
                <div className="lg:col-span-8 space-y-12">
                    
                    {/* Course Overview */}
                    <MotionCard delay={0.1} className="glass-card p-10 md:p-14 rounded-3xl">
                        <h2 className="font-headline text-3xl font-bold mb-6 text-on-surface border-r-4 border-primary pr-4">نظرة عامة على الدورة</h2>
                        <p className="text-on-surface-variant text-lg leading-relaxed">
                            {course.fullDescription}
                        </p>
                    </MotionCard>

                    {/* What you'll learn */}
                    <div className="space-y-6">
                        <h2 className="font-headline text-3xl font-bold mb-6 text-on-surface border-r-4 border-primary pr-4">ماذا ستتعلم؟</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {course.outcomes.map((outcome: any, idx: number) => (
                                <MotionCard key={idx} delay={0.1 + (idx * 0.1)} className="bg-surface-container-low p-6 rounded-2xl flex items-start gap-4 hover:bg-surface-container transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                                        <span className="material-symbols-outlined text-sm font-bold">check</span>
                                    </div>
                                    <p className="text-on-surface-variant italic font-medium pt-1">{outcome}</p>
                                </MotionCard>
                            ))}
                        </div>
                    </div>

                    {/* Syllabus */}
                    <div className="space-y-6">
                        <h2 className="font-headline text-3xl font-bold mb-6 text-on-surface border-r-4 border-primary pr-4">منهج الدورة</h2>
                        <div className="space-y-4">
                            {course.syllabus.map((item: any, idx: number) => (
                                <MotionCard key={idx} delay={0.2 + (idx * 0.1)} className="glass-card p-6 md:p-8 rounded-2xl flex flex-col md:flex-row gap-6 items-start">
                                    <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0 border border-outline-variant/10 text-xl font-bold font-headline text-primary shadow-inner">
                                        0{idx + 1}
                                    </div>
                                    <div className="pt-1">
                                        <h3 className="font-headline text-xl font-bold text-on-surface mb-2">{item.title}</h3>
                                        <p className="text-on-surface-variant leading-relaxed">{item.desc}</p>
                                    </div>
                                </MotionCard>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Registration & Metadata */}
                <div className="lg:col-span-4 space-y-8 sticky top-32">
                    
                    {/* Course Metadata Card */}
                    <MotionCard delay={0.2} className="glass-card p-8 rounded-3xl pb-10">
                        <div className="text-center mb-8">
                            <span className="text-on-surface-variant block mb-2 text-sm uppercase tracking-widest font-bold">رسوم الدورة</span>
                            <div className="text-5xl font-headline font-black text-primary drop-shadow-md">{course.price}</div>
                        </div>
                        
                        <div className="space-y-6 border-t border-outline-variant/10 pt-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-on-surface-variant">
                                    <span className="material-symbols-outlined text-primary">schedule</span>
                                    <span>المدة الزمنية</span>
                                </div>
                                <span className="font-bold text-on-surface">{course.duration}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-on-surface-variant">
                                    <span className="material-symbols-outlined text-primary">hourglass_empty</span>
                                    <span>الجلسات</span>
                                </div>
                                <span className="font-bold text-on-surface">{course.hours} ساعة تدريبية</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-on-surface-variant">
                                    <span className="material-symbols-outlined text-primary">group</span>
                                    <span>الحجم المتوقع</span>
                                </div>
                                <span className="font-bold text-on-surface">مجموعة صغيرة (8-12)</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-on-surface-variant">
                                    <span className="material-symbols-outlined text-primary">verified</span>
                                    <span>تتضمن</span>
                                </div>
                                <span className="font-bold text-on-surface">شهادة إتمام</span>
                            </div>
                        </div>
                    </MotionCard>

                    {/* Registration / Inquiry Section */}
                    <div className="space-y-6">
                        <Link href="https://wa.me/4917643446439" target="_blank" className="w-full bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white py-4 rounded-3xl font-black text-xl transition-all duration-300 flex items-center justify-center gap-2 border border-[#25D366]/20">
                            سجل الان
                        </Link>

                        {/* Registration Form */}
                        <MotionCard delay={0.3} className="bg-surface-container-low p-8 rounded-3xl border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-primary/50 to-transparent"></div>
                            <CourseInquiryForm courseName={`${course.title} (${course.level})`} />
                            <p className="text-center text-xs text-on-surface-variant opacity-70 mt-6 leading-relaxed">سيقوم فريقنا بالتواصل معك لتأكيد التفاصيل.</p>
                        </MotionCard>
                    </div>
                </div>

            </section>
        </main>
    )
}
