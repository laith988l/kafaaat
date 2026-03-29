"use client";

import { MotionCard } from "./MotionCard";
import Link from "next/link";

interface BundleCardProps {
  course: {
    id: string;
    level: string;
    title: string;
    short_description: string;
    price: number;
    hours: number;
    featured_image?: string;
    outcomes?: string[];
  };
  delay?: number;
}

export function BundleCard({ course, delay = 0.05 }: BundleCardProps) {
  // Use the requested default image from the Home page
  const displayImage = course.featured_image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop";

  return (
    <MotionCard delay={delay} className="glass-card bg-surface hover:bg-surface-container-lowest border-primary/20 rounded-3xl overflow-hidden transition-all duration-500 shadow-[0_0_40px_rgba(242,202,80,0.05)] hover:shadow-[0_0_60px_rgba(242,202,80,0.15)] group flex flex-col">
      
      {/* Full Width Image Header */}
      <div className="w-full h-64 md:h-[400px] relative shrink-0 overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 transition-colors group-hover:bg-transparent duration-500"></div>
        <img src={displayImage} alt={course.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        
        {/* Urgent Sale Tag on Image */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
          <div className="bg-error font-bold text-on-error px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
            <span className="material-symbols-outlined text-base md:text-xl">local_fire_department</span>
            <span className="text-sm md:text-base tracking-wide">تخفيض لفترة محدودة</span>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/20 z-10 pointer-events-none"></div>
      </div>

      {/* Floating Content Section */}
      <div className="px-4 md:px-12 z-20 flex flex-col lg:flex-row justify-between gap-8 md:gap-12 relative -mt-16 md:-mt-32 pb-8 md:pb-12 text-right">

        {/* Info Block */}
        <div className="flex-1 space-y-6 bg-surface-container-low/90 backdrop-blur-2xl p-6 md:p-10 rounded-[2rem] border border-white/10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full pointer-events-none"></div>

          <div className="flex justify-between items-center gap-6 relative z-10">
            <span className="text-primary font-headline text-4xl md:text-5xl font-black drop-shadow-md">{course.level}</span>
            <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-lg text-sm font-bold uppercase tracking-widest border border-primary/30 shadow-sm shadow-primary/10">أفضل قيمة</span>
          </div>

          <h3 className="font-headline text-3xl md:text-4xl font-bold text-on-surface relative z-10">{course.title}</h3>
          <p className="text-on-surface-variant max-w-2xl text-base md:text-lg leading-relaxed relative z-10">
            {course.short_description}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-8 border-t border-white/5 relative z-10 mt-6">
            <div className="flex items-center gap-4 text-on-surface">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform group-hover:rotate-12 group-hover:scale-110 duration-300"><span className="material-symbols-outlined text-xl">school</span></div>
              <span className="font-bold text-sm md:text-base">تغطي مستويات {course.level}</span>
            </div>
            <div className="flex items-center gap-4 text-on-surface">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform group-hover:-rotate-12 group-hover:scale-110 duration-300"><span className="material-symbols-outlined text-xl">schedule</span></div>
              <span className="font-bold text-sm md:text-base">{course.hours} ساعة دراسية مكثفة</span>
            </div>
            <div className="flex items-center gap-4 text-on-surface">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform group-hover:rotate-12 group-hover:scale-110 duration-300"><span className="material-symbols-outlined text-xl">verified</span></div>
              <span className="font-bold text-sm md:text-base">تحضير لامتحانات Goethe / Telc</span>
            </div>
            <div className="flex items-center gap-4 text-on-surface">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform group-hover:-rotate-12 group-hover:scale-110 duration-300"><span className="material-symbols-outlined text-xl">forum</span></div>
              <span className="font-bold text-sm md:text-base">دعم متواصل ومتابعة شخصية</span>
            </div>
          </div>
        </div>

        {/* Price & CTA Block */}
        <div className="lg:w-[380px] bg-background/80 backdrop-blur-2xl rounded-[2rem] p-8 md:p-10 border border-primary/30 flex flex-col justify-center items-center text-center shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden group/pricing mt-6 lg:mt-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary/10 text-primary w-48 h-48 rounded-full flex items-center justify-center blur-3xl pointer-events-none group-hover/pricing:bg-primary/20 transition-colors duration-500"></div>

          <span className="text-sm font-bold text-primary mb-4 uppercase tracking-widest flex items-center gap-2 relative z-10 bg-primary/10 px-4 py-1.5 rounded-full">
            <span className="material-symbols-outlined text-base">sell</span>
            عرض التسجيل المبكر
          </span>

          <div className="flex flex-col items-center mb-6 relative z-10">
            <span className="text-on-surface-variant/40 text-3xl font-bold line-through decoration-error/50 decoration-4 mb-2">€{Math.round(course.price * 1.3)}</span>
            <div className="flex items-end gap-2 text-primary drop-shadow-[0_0_20px_rgba(242,202,80,0.5)] transition-transform duration-300 group-hover/pricing:scale-110">
              <span className="text-7xl font-black tracking-tighter">€{course.price}</span>
            </div>
            <span className="bg-error/10 text-error border border-error/20 px-4 py-1.5 rounded-full text-sm font-black mt-3 shadow-sm inline-block">توفير جداً!</span>
          </div>

          <div className="w-full flex flex-col gap-3 relative z-10 text-on-surface mt-2">
            <Link href="https://wa.me/4917643446439" target="_blank" className="w-full bg-[#25D366]/70 hover:bg-[#25D666] text-white border-white/30 border-2 hover:border-white/50 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
              سجل الان
            </Link>
            <Link href="/contact" className="w-full bg-surface-container hover:bg-surface-container-high text-on-surface p-3.5 rounded-xl font-bold border border-outline-variant/20 transition-colors flex items-center justify-center gap-2">
              <span> تفاصيل الدورة </span>
            </Link>
          </div>
        </div>
      </div>
    </MotionCard>
  );
}
