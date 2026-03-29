import Link from 'next/link';

interface SaleBannerProps {
  active: boolean;
  message?: string;
  description?: string;
  discountPercentage?: string;
  buttonLink?: string;
}

export function SaleBanner({ active, message, description, discountPercentage, buttonLink }: SaleBannerProps) {
  if (!active) return null;

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#e6b327] via-[#f2ca50] to-[#ff8c00] text-[#000f1f] shadow-[0_10px_40px_rgba(233,195,73,0.4)] z-[100] border-b border-white/20">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 -translate-y-10 translate-x-20 w-64 h-64 bg-white/40 blur-[60px] rounded-full pointer-events-none opacity-50"></div>
      <div className="absolute bottom-0 left-0 translate-y-10 -translate-x-20 w-80 h-80 bg-[#ff5500]/30 blur-[80px] rounded-full pointer-events-none opacity-50"></div>

      <div className="w-full mx-auto px-6 md:px-12 py-4 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10 transition-all">
        
        {/* Right Section (Text & Icon) */}
        <div className="flex items-center gap-4 md:gap-8 text-center sm:text-right">
          <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-full bg-white/40 shadow-xl border-2 border-white/60 shrink-0 relative">
             <div className="absolute inset-0 rounded-full bg-white/60 animate-ping opacity-40"></div>
             <span className="material-symbols-outlined text-3xl text-[#b82a00] drop-shadow-md">redeem</span>
          </div>
          <div className="flex flex-col">
            <h3 className="font-headline font-black text-xl sm:text-3xl tracking-tight drop-shadow-md flex items-center justify-center sm:justify-start gap-2 leading-tight">
              {message || 'خصم لفترة محدودة على جميع دوراتنا!'}
              <span className="material-symbols-outlined text-[24px] sm:text-[32px] animate-bounce text-[#b82a00]">local_fire_department</span>
            </h3>
            {description && (
              <p className="text-base sm:text-lg font-bold text-[#000f1f]/90 mt-1 max-w-full md:max-w-2xl lg:max-w-4xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Left Section (Badge & CTA) */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0 mt-2 md:mt-0">
          {discountPercentage && (
            <div className="bg-[#cc2b2b] text-white px-5 sm:px-8 py-2 sm:py-3 rounded-2xl shadow-[0_8px_25px_rgba(204,43,43,0.5)] border-2 border-white/30 transform -rotate-2 hover:rotate-2 hover:scale-110 transition-all duration-300 group cursor-default">
              <span className="font-black text-xl sm:text-3xl tracking-tighter leading-none drop-shadow-lg">{discountPercentage}</span>
            </div>
          )}
          
          <Link 
            href={buttonLink || "/courses"} 
            className="group relative flex items-center justify-center gap-3 bg-[#000f1f] hover:bg-[#00172e] text-[#f2ca50] hover:text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-[#f2ca50]/30 overflow-hidden"
          >
            <span className="relative z-10 transition-colors duration-300">الاستفادة من العرض</span>
            <span className="material-symbols-outlined text-[20px] sm:text-[24px] relative z-10 group-hover:-translate-x-2 transition-transform duration-300">arrow_back</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
