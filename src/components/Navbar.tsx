'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { SaleBanner } from './SaleBanner';

export default function Navbar({ bannerConfig, user }: { bannerConfig: any; user?: any }) {
  const pathname = usePathname() || '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'عن الأكاديمية', path: '/about' },
    { name: 'الدورات', path: '/courses' },
    { name: 'المدونة', path: '/blog' },
    { name: 'اتصل بنا', path: '/contact' },
  ];

  const isDashboard = pathname.startsWith('/dashboard') || pathname.startsWith('/login');
  const showBanner = bannerConfig?.isActive && !isDashboard;

  return (
    <div className="sticky top-0 w-full z-50 flex flex-col">
      <SaleBanner
        active={showBanner}
        message={bannerConfig?.message}
        description={bannerConfig?.description}
        discountPercentage={bannerConfig?.discountPercentage}
        buttonLink={bannerConfig?.buttonLink}
      />
      <nav className="relative w-full bg-[#263647]/10 backdrop-blur-md shadow-[0_24px_24px_rgba(233,195,73,0.06)]">
        <div className="w-full mx-auto px-8 flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/logo.png" alt="كفاءات" className="h-10 md:h-30 w-auto object-contain transition-transform group-hover:scale-105" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                className={`font-manrope text-m tracking-wide transition-colors ${pathname === link.path ? 'font-bold text-[#f2ca50] border-b-2 border-[#f2ca50] pb-1' : 'font-medium text-[#d0c5af] hover:text-[#f2ca50]'}`}
                href={link.path}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => window.location.href = '/courses'} className="hidden md:block bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20">
              تعرف على الدورات
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              className="md:hidden text-[#f2ca50] p-2 focus:outline-none transition-colors hover:bg-white/10 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-3xl">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-[#000f1f]/95 backdrop-blur-xl border-t border-white/10 shadow-2xl flex flex-col items-center py-8 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                className={`font-manrope text-lg tracking-wide transition-colors ${pathname === link.path ? 'font-bold text-[#f2ca50]' : 'font-medium text-[#d0c5af] hover:text-[#f2ca50]'}`}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={() => window.location.href = '/courses'}
              className="bg-gradient-to-br from-[#f2ca50] to-[#e6b327] text-[#000f1f] px-8 py-3 rounded-full font-bold text-base shadow-lg shadow-[#f2ca50]/20 w-10/12"
            >
              تعرف على الدورات
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}
