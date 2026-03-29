import Link from 'next/link';
import { getSettings } from '@/app/actions/settings';

export default function Footer({ courses = [] }: { courses?: any[] }) {
  // Helper to get friendly name for level
  const getLevelName = (id: string, title: string) => {
    if (id === 'bundle') return 'عرض كفاءات';
    if (id === 'a1') return 'A1 مبتدئ';
    if (id === 'a2') return 'A2 أساسي';
    if (id === 'b1') return 'B1 متوسط';
    return title;
  };
  return (
    <footer className="relative mt-20 overflow-hidden rounded-t-[2rem] bg-[#000f1f]">
      {/* Background image layer */}
      <div
        className="absolute inset-0 z-0 opacity-20 "
        style={{
          backgroundImage: "url('/footer-bg.png')",
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'top center',
          backgroundSize: 'auto 130%',
        }}

      />

      {/* Dark overlay */}
      <div className="absolute inset-0 z-0 bg-[#000f1f]/60" />



      {/* Content */}
      <div className="relative z-10 w-full px-8 py-16 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-6">
            <Link href="/" className="mb-1 block w-fit group">
              <img src="/logo.png" alt="أكاديمية كفاءات" className="h-30 w-auto object-contain transition-transform group-hover:scale-105" />
            </Link>

            <p className="font-be-vietnam text-base leading-relaxed text-[#d0c5af]">
              دورات لغة ألمانية متميزة مصممة خصيصاً للناطقين بالعربية.
              <br />
              أتقن مستويات A1 و A2 و B1
              <br />
              بإشراف خبراء على مستوى المتحدثين الأصليين
            </p>

            <div className="flex gap-4">
              <span className="material-symbols-outlined cursor-pointer text-[#f2ca50] transition-transform hover:scale-110">
                public
              </span>
              <span className="material-symbols-outlined cursor-pointer text-[#f2ca50] transition-transform hover:scale-110">
                alternate_email
              </span>
              <span className="material-symbols-outlined cursor-pointer text-[#f2ca50] transition-transform hover:scale-110">
                group
              </span>
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-xl font-bold text-white">روابط سريعة</h4>
            <ul className="space-y-4 font-be-vietnam text-base text-[#d0c5af]">
              <li>
                <Link className="transition-all hover:text-[#f2ca50]" href="/">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link className="transition-all hover:text-[#f2ca50]" href="/about">
                  عن الأكاديمية
                </Link>
              </li>
              <li>
                <Link className="transition-all hover:text-[#f2ca50]" href="/courses">
                  الدورات
                </Link>
              </li>
              <li>
                <Link className="transition-all hover:text-[#f2ca50]" href="/blog">
                  المدونة
                </Link>
              </li>
              <li>
                <Link className="transition-all hover:text-[#f2ca50]" href="/contact">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-xl font-bold text-white">المسارات التعليمية</h4>
            <ul className="space-y-4 font-be-vietnam text-base text-[#d0c5af]">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <li key={course.id}>
                    <Link className="transition-all hover:text-[#f2ca50]" href={`/courses/${course.id}`}>
                      {getLevelName(course.id, course.title)}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li><Link className="transition-all hover:text-[#f2ca50]" href="/courses/a1">A1 مبتدئ</Link></li>
                  <li><Link className="transition-all hover:text-[#f2ca50]" href="/courses/a2">A2 أساسي</Link></li>
                  <li><Link className="transition-all hover:text-[#f2ca50]" href="/courses/b1">B1 متوسط</Link></li>
                  <li><Link className="transition-all hover:text-[#f2ca50]" href="/courses/bundle">عرض كفاءات</Link></li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-xl font-bold text-white">تواصل معنا</h4>
            <p className="mb-4 font-be-vietnam text-base text-[#d0c5af]">
              احصل على استشارة مجانية.
            </p>

            <button className="flex w-fit items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#f2ca50] to-[#e6b327] px-6 py-3 text-base font-bold text-[#000f1f] shadow-lg shadow-[#f2ca50]/20 transition-all duration-300 hover:scale-105">
              <Link href="/contact">احجز استشارتك الآن</Link>-
              <span className="material-symbols-outlined text-lg">
                calendar_month
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}