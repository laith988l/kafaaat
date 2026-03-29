import { MotionCard } from "@/components/MotionCard";
import { getSettings } from "@/app/actions/settings";

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <main className="py-20">
      {/* Hero Narrative Section */}
      <section className="relative min-h-[716px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent z-10"></div>
          <img className="w-full h-full object-cover grayscale opacity-40" data-alt="Luxurious dark university library with gold lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZsKXAbkwg9REE36n-aNU1Y-S6SUlb93j4bzGsf3rJ_lPcuB1irwPOcA8EToYB-q9N2vSebmghxxPyDIymtO4KWQYzMjleIM22v9V81Tid6Kmr9Y7TftUcfKqP2Yutpv29a3BqQOLFYB2EaGaULBYf03KB-4Czh6wybgMK0onGmuFOSyUTU5pbFTlcOtJ2Pxz8k8eW_ULqUG_UDoM3VuyPcHc0tXsgvqukIoFAfQWNELXF3xlRZUsinvluIpTT2x3iD2OUYYAoMLsq" />
        </div>
        <div className="w-full mx-auto px-8 relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <span className="inline-block px-4 py-1 rounded-full border border-primary/30 text-primary text-xs font-headline font-bold uppercase tracking-widest bg-primary/5">إرث الأكاديمية</span>
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-on-surface leading-tight -tracking-[0.02em]">
              <span className="text-primary ">كفاءات</span> شريكك نحو إتقان اللغة الألمانية وبناء مستقبلك في ألمانيا
            </h1>
            <p className="text-lg text-on-surface-variant leading-relaxed max-w-xl">
              نسعى في كفاءات إلى تمكين الناطقين بالعربية من إتقان اللغة الألمانية والانطلاق بثقة نحو الدراسة والعمل في ألمانيا، من خلال تجربة تعليمية متكاملة مصممة خصيصًا لتناسب احتياجاتهم.            </p>
          </div>
          <div className="hidden lg:block">
            <div className="glass-card p-2 rounded-[2rem] transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img className="rounded-[1.8rem] w-full aspect-square object-cover shadow-2xl" data-alt="Students collaborating in a high-end modern classroom" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEs2aOCLkehFshhQ69tzSJHTcRCQoajoNEaAt9TKM65Ksl05mHmC9N7778MTVUsmTZoi0KfXOZy7jdpfLr6-DN2hZnrIRdRlSZYE2zTnG4NRIhvdILCdNu-jQ_U-IBY7IAvZGGS6XDr9wjVXKlozCPEgusc4oVQJ2rkcxsoBdyN0zbkSysz2hnLNTPloQ42OoowvNnhHbI9YA4ziFjQPsH3zaY_CB5RyQQ95OaFAYPmdeE_oWzq903vD2MhXBPKP48RnRsUIK6KKIN" />
            </div>
          </div>
        </div>
      </section>
      {/* Mission & Methodology (Bento Grid) */}
      <section className="py-24 bg-surface-container-low">
        <div className="w-full mx-auto px-8">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-headline font-bold text-on-surface mb-6">من نحن</h2>
            <p className="text-on-surface-variant">نقدم برامج تعليمية متميزة تشمل مستويات A1 و A2 و B1، مع تركيز قوي على التطبيق العملي، المحادثة، والاستيعاب الحقيقي للغة، بإشراف نخبة من المدرسين ذوي الخبرة وعلى مستوى المتحدثين الأصليين.</p>
          </div>
          <div className="max-w-5xl mx-auto relative w-full pt-8 pl-4 pr-4 sm:pr-0">
            {/* Timeline Vertical Line (Hidden on tiny screens, shown on sm+) */}
            <div className="absolute right-[22px] md:right-[38px] top-4 bottom-4 w-1 bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10 rounded-full hidden sm:block"></div>

            <div className="flex flex-col gap-6 md:gap-10 relative z-10 w-full">
              {/* Mission */}
              <div className="flex items-center gap-4 md:gap-8 w-full">
                <div className="w-12 md:w-20 shrink-0 hidden sm:flex justify-center z-10">
                  <div className="w-5 h-5 rounded-full bg-primary shadow-[0_0_15px_rgba(242,202,80,0.6)] border-4 border-surface-container-low"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <MotionCard delay={0.1} className="glass-card p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start text-center md:text-right gap-6 md:gap-8 group transition-transform duration-300">
                    <div className="w-20 h-20 shrink-0 rounded-[1.25rem] bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-105 group-hover:bg-primary/20 transition-all duration-300 shadow-inner">
                      <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "\'FILL\' 1" }}>language</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-headline font-bold mb-3 text-on-surface group-hover:text-primary transition-colors">مهمتنا</h3>
                      <p className="text-lg text-on-surface-variant leading-relaxed">
                        {settings.about_mission || 'تمكين جيل جديد من المهندسين، الأطباء، والمبتكرين العرب من خلال منحهم مفاتيح قوة التعليم الألماني. نحن نؤمن بأن اللغة لا ينبغي أن تكون عائقاً أمام العبقرية.'}
                      </p>
                    </div>
                  </MotionCard>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="flex items-center gap-4 md:gap-8 w-full">
                <div className="w-12 md:w-20 shrink-0 hidden sm:flex justify-center z-10">
                  <div className="w-5 h-5 rounded-full bg-primary shadow-[0_0_15px_rgba(242,202,80,0.6)] border-4 border-surface-container-low"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <MotionCard delay={0.2} className="glass-card p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start text-center md:text-right gap-6 md:gap-8 group transition-transform duration-300">
                    <div className="w-20 h-20 shrink-0 rounded-[1.25rem] bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-105 group-hover:bg-primary/20 transition-all duration-300 shadow-inner">
                      <span className="material-symbols-outlined text-primary text-4xl">terminal</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-headline font-bold mb-3 text-on-surface group-hover:text-primary transition-colors">الهندسة اللغوية</h3>
                      <p className="text-lg text-on-surface-variant leading-relaxed">
                        {settings.about_vision || 'نتعامل مع قواعد اللغة الألمانية كبوابات منطقية، مما يجعلها بديهية للعقول التقنية ومحطاتها القادمة في ألمانيا.'}
                      </p>
                    </div>
                  </MotionCard>
                </div>
              </div>

              {/* Arabic Support */}
              <div className="flex items-center gap-4 md:gap-8 w-full">
                <div className="w-12 md:w-20 shrink-0 hidden sm:flex justify-center z-10">
                  <div className="w-5 h-5 rounded-full bg-primary shadow-[0_0_15px_rgba(242,202,80,0.6)] border-4 border-surface-container-low"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <MotionCard delay={0.3} className="glass-card p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start text-center md:text-right gap-6 md:gap-8 group transition-transform duration-300">
                    <div className="w-20 h-20 shrink-0 rounded-[1.25rem] bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-105 group-hover:bg-primary/20 transition-all duration-300 shadow-inner">
                      <span className="material-symbols-outlined text-primary text-4xl">psychology</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-headline font-bold mb-3 text-on-surface group-hover:text-primary transition-colors">الربط المعرفي بالعربية</h3>
                      <p className="text-lg text-on-surface-variant leading-relaxed">
                        {settings.about_values || 'استخدام اللغويات المقارنة لشرح التراكيب الألمانية من خلال أطر مفاهيمية عربية مألوفة، لتسهيل الفهم والممارسة.'}
                      </p>
                    </div>
                  </MotionCard>
                </div>
              </div>

              {/* Fast Track */}
              <div className="flex items-center gap-4 md:gap-8 w-full">
                <div className="w-12 md:w-20 shrink-0 hidden sm:flex justify-center z-10">
                  <div className="w-5 h-5 rounded-full bg-primary shadow-[0_0_15px_rgba(242,202,80,0.6)] border-4 border-surface-container-low"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <MotionCard delay={0.4} className="glass-card p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start text-center md:text-right gap-6 md:gap-8 group transition-transform duration-300">
                    <div className="w-20 h-20 shrink-0 rounded-[1.25rem] bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-105 group-hover:bg-primary/20 transition-all duration-300 shadow-inner">
                      <span className="text-xl font-headline font-extrabold text-primary">60%</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-headline font-bold mb-3 text-on-surface group-hover:text-primary transition-colors">طلاقة سريعة</h3>
                      <p className="text-lg text-on-surface-variant leading-relaxed">
                        تركيزنا الفريد الموجه على الألمانية الأكاديمية والعملية يقلل وقت التعلم بنسبة 60% مقارنة بتطبيقات المحادثة العامة وطرق التدريس التقليدية.
                      </p>
                    </div>
                  </MotionCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Why German? Educational Section */}
      <section className="py-24">
        <div className="w-full mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            <img className="rounded-[2rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" data-alt="Panoramic view of a German university town" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBB18s_tLUEcBMjq3-LgKUiULtXim1FHhN-bd_eSad4AzNnlPFr6n6-lRw7cYdT_FyFUA0xP-MtpQHx2qfVsCu-NsTzJEnqcFuyHXuf9TMlCpmrjzS4Hl5a9LhzOqmGYVmbcyGKOAsD9m5MhLN-fv7aIdFl4NmFq4Vte7zR3R2iwnpZyC7mOrpTc5p8QOYLrDJLailPsJAn6S8jG2_JbrsgzdwQ1_mRCeLRN9O59kYqCvaDDTMBScb-supYbzA9I53IvslbnG8HWnvB" />
            <div className="absolute -bottom-6 -left-6 glass-card p-6 rounded-2xl shadow-xl max-w-xs">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "\'FILL\' 1" }}>verified_user</span>
                <span className="text-sm font-bold">تحضير معتمد لامتحانات اللغة الألمانية</span>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-headline font-bold text-on-surface">لماذا ألمانيا؟</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center font-bold">1</span>
                <div>
                  <h4 className="font-bold text-lg mb-1">تعليم بمستوى عالمي، </h4>
                  <p className="text-on-surface-variant text-sm">الوصول إلى بعض الجامعات الأعلى تصنيفاً في العالم   مقابل رسوم دراسية رمزية.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center font-bold">2</span>
                <div>
                  <h4 className="font-bold text-lg mb-1">   ألمانيا بلد الفرص</h4>
                  <p className="text-on-surface-variant text-sm">تقدم ألمانيا فرص تدريب وعمل لا مثيل لها في مجالات السيارات والتكنولوجيا والطب.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center font-bold">3</span>
                <div>
                  <h4 className="font-bold text-lg mb-1">جودة الحياة والاستقرار</h4>
                  <p className="text-on-surface-variant text-sm">العيش في واحدة من أكثر الدول أماناً واستقراراً اقتصادياً في العالم.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* Instructors Section */}
      <section className="hidden py-24 bg-surface-container-lowest">
        <div className="w-full mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-headline font-bold text-on-surface mb-2">خبراء كفاءات</h2>
              <p className="text-on-surface-variant">بإشراف متحدثين أصليين وخبراء في التبادل الثقافي.</p>
            </div>
            <div className="hidden md:flex gap-4">
              <button className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/5 transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Instructor Role 1 */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" data-alt="Certified German Teachers" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQki9pw9aTlUa4vj1JntlptVU4cYKcmR8EFCENPEsgNdXvetyz1X8ils-wILxSXtDKs1lFr0_D80bPO_R4JYMUo1ELA30pFNGFrqGj5kosw0pNX51f9nMqp6Ezp9EvCdGpKKK3AYN4a8NUt_vR6WVoPpYbWYNQSlIecmBCfJoEx1x_WAdVhBMCIyNnW0k-e8hGWKKe5y11uCyQ52lAtpotbz2E-kEMbH3CgRJCj9yBH1PWBfJiDSykF4kKF6F7NuXjsT0Ck-5g3Jnt" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
              </div>
              <h3 className="text-xl font-headline font-bold text-on-surface">أساتذة معتمدون</h3>
              <p className="text-primary text-xs font-headline font-bold uppercase tracking-wider mb-2">تدريس احترافي</p>
              <p className="text-on-surface-variant text-sm line-clamp-2">مدرسون لغتهم الأم هي الألمانية، يتمتعون بخبرة واسعة ومناهج معتمدة لضمان أفضل تعلم.</p>
            </div>
            {/* Instructor Role 2 */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" data-alt="Academic Advisors" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuY9WrExcHk25LTZ8mes1g14oxm_U9_ObaIq7HDjtrhGYfqf5h472ZbD9zXkbhl-OwLiU-bUwyZ3q8_KnJBMSZwtDf43lAQANCzLrVSwhArXeXExmXyjRE0XeDCaaYTLbEUrVljnqwDvPW62UeR9IjJb8C3N9Vr4a3IYSRTB4rhNQ4v3K4R5vbF1j4LW5kj2ivcfc3vIZe2a2VL2qRr0DOv_ByV5TUZbl07W4Wyz-VgXK9gr83c_nH-1IQ29JSLnpkOf6zq6FhZoBh" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
              </div>
              <h3 className="text-xl font-headline font-bold text-on-surface">مرشدون أكاديميون</h3>
              <p className="text-primary text-xs font-headline font-bold uppercase tracking-wider mb-2">توجيه شامل</p>
              <p className="text-on-surface-variant text-sm line-clamp-2">فريق متخصص لمساعدتك في التخطيط لمسارك التعليمي والمهني خطوة بخطوة في ألمانيا.</p>
            </div>
            {/* Instructor Role 3 */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" data-alt="Exam Preparation Experts" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWwwOyz5qv5dJwK5NfJGoOxbko1DbGFAo9TDdMbfHERX4Cwr-RoiQv7kafnfHta5WGt8DI6OyM-jj-9SIHWAavMjGSQ5ZdQAIwSFhJaXMjM2HotrLvQwHNV4gA0IvRTd_x-aRnsg7_uPk17KxfXFYfs6u0pA6_pv4dxLD_dmp7JGXbvXGnV-tQIk6vIRIZ-PzdoJFPSTQbtNhl2D3YPlkCEXbFK987_MSJXaiiuYGj1qghfJsIpu_mJN_UhjqADdGtGKeizTelD99J" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
              </div>
              <h3 className="text-xl font-headline font-bold text-on-surface">خبراء الامتحانات</h3>
              <p className="text-primary text-xs font-headline font-bold uppercase tracking-wider mb-2">تحضير مكثف</p>
              <p className="text-on-surface-variant text-sm line-clamp-2">نخبة من المتخصصين في إعداد الطلاب لاجتياز امتحانات جوته و TestDaF بنجاح.</p>
            </div>
            {/* Instructor Role 4 */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" data-alt="Cultural Specialists" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgDu-KGky1tTzFf60mLTBZQv5JrNhSCM-wCAxBfzNFEAkfyxycKU2-mWyn71aRhTSIiDCCoE-E2bJpyDCueH6gLindrzkFJwhmoyNTdtd43EQAJR6LE4g5ALE0t9gM2qN90BG08pprOTooadIsJICVmb34EuoXY-SZJ43T8vT2VrNMQSFA2h8f3HCjSF8-cBZQ2uELE4qS4eRWm9Dfp42eoNHmosxti8eiQ1ymOJF_km673rNyCi6rLEt5Fy0xbaJE242eE_HFxVA4" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
              </div>
              <h3 className="text-xl font-headline font-bold text-on-surface">مختصون ثقافيون</h3>
              <p className="text-primary text-xs font-headline font-bold uppercase tracking-wider mb-2">اندماج حقيقي</p>
              <p className="text-on-surface-variant text-sm line-clamp-2">نهتم بدمجك في الثقافة الألمانية من خلال خبراء عاشوا تجربة الانتقال والاندماج بأنفسهم.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 w-full mx-auto px-8">
        <div className="glass-card rounded-[3rem] p-16 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-primary/50 to-transparent"></div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold">جاهز لبدء <br /><span className="text-primary ">رحلتك الألمانية؟</span></h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">انضم إلى صفوف خريجي كفاءات الناجحين الذين يدرسون ويعملون حالياً في ألمانيا.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <button className="px-10 py-4 rounded-full border border-primary text-primary font-headline font-bold text-lg hover:bg-primary/5 transition-colors">احجز استشارة</button>
          </div>
        </div>
      </section>
    </main>
  );
}
