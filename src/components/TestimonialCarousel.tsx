"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";

export interface Testimonial {
  id: number | string;
  quote: string;
  name: string;
  role: string;
  rating: number;
}


export default function TestimonialCarousel({ testimonials = [] }: { testimonials: Testimonial[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isPaused, setIsPaused] = useState(false);
  const AUTO_PLAY_INTERVAL = 5000; // 5 seconds

  const nextTestimonial = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, nextTestimonial, testimonials.length]);

  return (
    <div 
      className="w-full relative flex flex-col items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* Carousel Container */}
      <div className="relative w-full max-w-6xl h-[500px] md:h-[450px] flex justify-center items-center my-8 overflow-hidden md:overflow-visible">

        {/* Navigation Arrows */}
        <button
          onClick={nextTestimonial}
          className="absolute left-2 md:left-4 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-surface-container-high border border-white/20 hover:border-primary/50 hover:bg-primary/20 flex items-center justify-center text-on-surface transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(0,0,0,0.3)] backdrop-blur-md"
          aria-label="Next testimonial"
        >
          <span className="material-symbols-outlined text-xl md:text-2xl">arrow_back</span>
        </button>

        <button
          onClick={prevTestimonial}
          className="absolute right-2 md:right-4 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-surface-container-high border border-white/20 hover:border-primary/50 hover:bg-primary/20 flex items-center justify-center text-on-surface transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(0,0,0,0.3)] backdrop-blur-md"
          aria-label="Previous testimonial"
        >
          <span className="material-symbols-outlined text-xl md:text-2xl">arrow_forward</span>
        </button>

        {/* Cards */}
        {testimonials.map((testimonial, index) => {
          const relativeIndex = (index - currentIndex + testimonials.length) % testimonials.length;

          let positionClass = "opacity-0 pointer-events-none scale-75";
          let zIndex = "z-0";
          // In RTL mode, reading is right-to-left. 
          // Next item -> Visual Left -> -translate-x
          // Prev item -> Visual Right -> translate-x
          let translateClass = "";

          if (index === currentIndex) {
            positionClass = "opacity-100 scale-100";
            zIndex = "z-20";
            translateClass = "translate-x-0";
          } else if (relativeIndex === 1) { // Next Item
            positionClass = "opacity-40 scale-[0.85] cursor-pointer hover:opacity-70 blur-[1px] hover:blur-none";
            zIndex = "z-10";
            translateClass = "-translate-x-[65%] md:-translate-x-[70%] lg:-translate-x-[85%]";
          } else if (relativeIndex === testimonials.length - 1) { // Prev Item
            positionClass = "opacity-40 scale-[0.85] cursor-pointer hover:opacity-70 blur-[1px] hover:blur-none";
            zIndex = "z-10";
            translateClass = "translate-x-[65%] md:translate-x-[70%] lg:translate-x-[85%]";
          }

          return (
            <div
              key={testimonial.id}
              onClick={() => {
                if (relativeIndex === 1) nextTestimonial();
                if (relativeIndex === testimonials.length - 1) prevTestimonial();
              }}
              className={`absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-out w-[85%] md:w-[580px] ${positionClass} ${zIndex} ${translateClass}`}
            >
              <div className="glass-card bg-surface-container-low/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)] flex flex-col h-full pointer-events-auto">
                <span className="material-symbols-outlined text-primary text-6xl opacity-10 mb-6 block drop-shadow-md">format_quote</span>

                <div className="flex-1">
                  <p className="text-xl md:text-2xl italic leading-relaxed md:leading-loose text-white/95 mb-8 font-medium drop-shadow-sm">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6"></div>

                <div className="mt-auto">
                  <div className="flex text-primary mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-sm drop-shadow-md" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <h4 className="font-bold text-white text-xl md:text-2xl drop-shadow-md">{testimonial.name}</h4>
                  <p className="text-primary/90 text-sm md:text-base mt-2 drop-shadow-md">{testimonial.role}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Large Divider before CTA */}
      <div className="w-full max-w-3xl flex items-center justify-center gap-6 mt-6 mb-12 opacity-80">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent flex-1"></div>
        <span className="material-symbols-outlined text-primary text-2xl drop-shadow-md" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent flex-1"></div>
      </div>

      {/* Contact Us CTA */}
      <div className="text-center animate-fade-in-up md:mt-4">
        <p className="text-on-surface-variant mb-6 text-xl">هل أنت مستعد لبدء قصة نجاحك الخاصة؟</p>
        <Link href="/contact" passHref>
          <Button variant="primary" className="text-xl px-12 py-6 min-w-[280px] rounded-full shadow-[0_15px_40px_-10px_rgba(242,202,80,0.5)] hover:scale-105 transition-transform duration-300 inline-flex items-center justify-center m-0">
            تواصل معنا الآن <span className="material-symbols-outlined mr-3 text-2xl">arrow_back</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
