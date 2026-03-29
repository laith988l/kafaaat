import { getBlogs } from "@/app/actions/blog";
import { MotionCard } from "@/components/MotionCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
    const blogs = await getBlogs();

    // Separate the first blog for the featured section if exists
    const featuredBlog = blogs.length > 0 ? blogs[0] : null;
    const feedBlogs = blogs.length > 1 ? blogs.slice(1) : [];

    return (
        <main className="pt-32 pb-20">
            {/* Hero Editorial Section */}
            <section className="w-full mx-auto px-8 mb-20">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-surface-container-low min-h-[400px] flex items-center p-12">
                    <div className="absolute inset-0 z-0 text-right">
                        <img 
                            alt={featuredBlog?.title || "كفاءات"} 
                            className="w-full h-full object-cover opacity-30 mix-blend-overlay" 
                            src={featuredBlog?.featured_image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBD4PkcrTsII4Ct-ytAGcjLijYTC_IYnj5jO5lQyyHUcTX3mqpTTtgkMmeLRP5XKbFiQiwZPxayij_Ecqb7dvGMidNrfJzaPsLe3XGl67uAdzmyW07CxMN9Tt1HVvtdZ40xi0MTThbnqDlceXpmjZqMcJodKi5xrtagyq3ZmGQ55wiJL69_iuNAyywViB12aKEUfrzNBhz-AacrTXLn5prsGSamYOXsvJjpBfolRc-uIQiRfIhPKRU5bqIj6csAsy9-zwy7Xh30o9W0"} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-transparent to-transparent"></div>
                    </div>
                    
                    <div className="relative z-10 max-w-2xl text-right ml-auto">
                        <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-headline text-xs font-bold tracking-widest uppercase mb-6">رؤية مميزة</span>
                        {featuredBlog ? (
                            <>
                                <h1 className="text-5xl md:text-6xl font-headline font-extrabold text-on-surface leading-tight mb-6 tracking-tight">
                                    {featuredBlog.title}
                                </h1>
                                <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
                                    {featuredBlog.excerpt || "اكتشف أحدث المقالات والنصائح من أكاديمية كفاءات للتميز الأكاديمي واللغوي."}
                                </p>
                                <div className="flex items-center gap-4 justify-end">
                                    <div className="text-left">
                                        <p className="font-bold text-on-surface">{featuredBlog.author_name}</p>
                                        <p className="text-sm text-on-surface-variant">{featuredBlog.author_role}</p>
                                    </div>
                                    <img 
                                        className="w-12 h-12 rounded-full border-2 border-primary/30" 
                                        alt={featuredBlog.author_name} 
                                        src={featuredBlog.author_image || "https://lh3.googleusercontent.com/aida-public/AB6AXuCgCIG7i4aD4Jag5cpzTltjCqG2VFVTmh_UW0VB4lY3oAzTxtU2i1eQMN6lUVmROGj4HReyx2ElKz_SBtIrEji5NgVUS1xgq1W-aTiNAgc4R0UXvjTiDJuZtyMkiB646vNhNeSZI8v0XF2bDow-YSQwpk97k47Qu5W1AjuPyeTBKGh26dudddQIb7soiibrjjgp5RZ-sk1_bgvsfnRlywKg4xEgyoi63K45UGJJ4vDxe5hb7AJG0Xq4IvZ9x9jEC15rh-VxdvH65f81"} 
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <h1 className="text-5xl md:text-6xl font-headline font-extrabold text-on-surface leading-tight mb-6 tracking-tight">
                                    مدونة <span className="text-primary">كفاءات</span> التعليمية
                                </h1>
                                <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
                                    نصائح عملية، دروس لغوية، ومعلومات شاملة حول الدراسة والعمل في ألمانيا.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Content Feed */}
            <section className="w-full mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Main Feed */}
                <div className="md:col-span-8 space-y-12">
                    {blogs.length > 0 ? (
                        <>
                            {/* Feed Blogs */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {blogs.map((post, idx) => (
                                    <MotionCard key={post.id} delay={idx * 0.1} className="glass-card rounded-[2rem] p-4 flex flex-col h-full group">
                                        <div className="relative overflow-hidden rounded-[1.5rem] h-56 mb-6">
                                            <img 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                                alt={post.title} 
                                                src={post.featured_image || "https://lh3.googleusercontent.com/aida-public/AB6AXuCFCh44W0Muo1mdGbuGaO9vKS8twf6Cib3yqtCTTa1PNa9CaL9zwrb3wJsH341nZ4tDC6SRp_hwHaI6hifcTtDGx4Jai3ba6a3s7eCJt_mgQBdhGHKTGkbYVKHa-tGV-Byroj6-xrWj5RazpGb3Dlj4F7V-wMLTOQmfgpkplpBPHreaxf0txJMykrw-LOGQayufDA_NCLaA6-Z6P1qOHcb605qlI2N_EdzKneUYBtOTEDnHVTyusS8_Hs8df8Y5BdOfHZbexHhwQSZ4"} 
                                            />
                                            <div className="absolute top-4 right-4 bg-primary/20 backdrop-blur-md rounded-full px-4 py-1 border border-primary/30">
                                                <span className="text-xs font-bold text-primary tracking-widest uppercase">{post.category}</span>
                                            </div>
                                        </div>
                                        <div className="px-4 pb-4 flex flex-col flex-grow text-right">
                                            <div className="text-xs text-on-surface-variant mb-3 flex items-center justify-end gap-2">
                                                <span>{new Date(post.created_at).toLocaleDateString('ar-EG')}</span>
                                                <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                                            </div>
                                            <h3 className="text-2xl font-headline font-bold text-on-surface mb-3 leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
                                            <p className="text-sm text-on-surface-variant mb-6 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                                            <div className="mt-auto">
                                                <Link href={`/blog/${post.slug}`} className="text-sm font-bold text-primary flex items-center justify-end gap-2 group/link">
                                                    اقرأ المزيد 
                                                    <span className="material-symbols-outlined text-sm transition-transform group-hover/link:-translate-x-1">arrow_back</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </MotionCard>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="py-20 text-center glass-card rounded-[2rem]">
                            <span className="material-symbols-outlined text-6xl text-primary/20 mb-4">article</span>
                            <h3 className="text-2xl font-headline font-bold text-on-surface mb-2">لا توجد مقالات حالياً</h3>
                            <p className="text-on-surface-variant">نحن نعمل على تجهيز محتوى قيم لك، انتظرنا قريباً!</p>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="md:col-span-4 space-y-8">
                    {/* Search (Static for now) */}
                    <div className="glass-card rounded-[2rem] p-8 text-right">
                        <h4 className="text-lg font-headline font-bold text-on-surface mb-6">البحث في المدونة</h4>
                        <div className="relative">
                            <input className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary text-right" placeholder="كلمات مفتاحية..." type="text"/>
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">search</span>
                        </div>
                    </div>

                    {/* Newsletter CTA */}
                    <div className="rounded-[2rem] p-8 bg-gradient-to-br from-primary-container to-primary text-on-primary shadow-xl text-right">
                        <span className="material-symbols-outlined text-4xl mb-4" data-weight="fill">mail</span>
                        <h4 className="text-2xl font-headline font-extrabold mb-3 leading-tight">احصل على نصائح أسبوعية</h4>
                        <p className="text-on-primary-container/80 text-sm mb-6 font-medium">انضم إلى أكثر من 2,500 طالب يتلقون أفضل النصائح حول اللغة الألمانية.</p>
                        <form className="space-y-3">
                            <input className="w-full rounded-xl bg-white/20 border-none placeholder:text-on-primary/60 text-white focus:ring-2 focus:ring-white text-right" placeholder="بريدك الإلكتروني" type="email"/>
                            <button className="w-full py-3 bg-on-primary text-primary font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-transform">اشترك الآن</button>
                        </form>
                    </div>
                </aside>
            </section>
        </main>
    );
}
