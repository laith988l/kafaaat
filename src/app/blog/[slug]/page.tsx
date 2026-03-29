import { getBlogBySlug, incrementBlogViews } from "@/app/actions/blog";
import { notFound } from "next/navigation";
import { MotionCard } from "@/components/MotionCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogBySlug(slug);

    if (!post) {
        notFound();
    }

    // Increment views in background (optional, but requested implicitly by 'all features')
    // incrementBlogViews(post.id); 

    return (
        <main className="pt-32 pb-20 px-4 md:px-8">
            {/* Editorial Breadcrumbs */}
            <nav className="max-w-4xl mx-auto mb-12 flex items-center justify-end gap-2 text-sm font-medium text-on-surface-variant/60">
                <Link href="/blog" className="hover:text-primary transition-colors">المدونة</Link>
                <span className="material-symbols-outlined text-xs">chevron_left</span>
                <span className="text-primary/80">{post.category}</span>
                <span className="material-symbols-outlined text-xs">chevron_left</span>
                <span className="text-on-surface-variant truncate max-w-[150px] md:max-w-none">{post.title}</span>
            </nav>

            {/* Premium Blog Header */}
            <article className="max-w-4xl mx-auto space-y-16">
                <header className="text-center space-y-8">
                    <div className="space-y-4">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold tracking-widest uppercase">
                            {post.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-headline font-black text-on-surface leading-[1.2] tracking-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center gap-6 text-on-surface-variant text-sm font-medium border-y border-outline-variant/10 py-6">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm text-primary">calendar_today</span>
                                <span>{new Date(post.created_at).toLocaleDateString('ar-EG')}</span>
                            </div>
                            <div className="w-1.5 h-1.5 rounded-full bg-outline-variant/20"></div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm text-primary">visibility</span>
                                <span>{post.view_count || 0} مشاهدة</span>
                            </div>
                        </div>
                    </div>

                    {/* Featured Image - Premium Presentation */}
                    <div className="relative group rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 aspect-[16/9] md:aspect-[21/9]">
                        <img 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                            alt={post.title} 
                            src={post.featured_image || "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop"} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
                    </div>
                </header>

                {/* Content Area */}
                <section className="prose prose-lg dark:prose-invert max-w-none text-on-surface-variant leading-[1.8] text-right" dir="rtl">
                    <div className="whitespace-pre-wrap font-medium text-lg md:text-xl space-y-8">
                        {post.content}
                    </div>
                </section>

                {/* Author Selection & Share */}
                <footer className="pt-20 border-t border-outline-variant/10">
                    <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-12 bg-surface-container-low/40 p-8 md:p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        
                        <div className="flex items-center gap-6 text-right relative z-10">
                            <div>
                                <h4 className="font-headline font-bold text-xl text-on-surface mb-1">{post.author_name}</h4>
                                <p className="text-on-surface-variant text-sm font-medium">{post.author_role}</p>
                            </div>
                            <img 
                                className="w-20 h-20 rounded-2xl border-2 border-primary/20 rotate-3 shadow-xl" 
                                alt={post.author_name} 
                                src={post.author_image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky"} 
                            />
                        </div>

                        <div className="flex flex-col items-center md:items-end gap-3 relative z-10 w-full md:w-auto">
                            <span className="text-xs font-bold text-on-surface-variant/40 uppercase tracking-widest">مشاركة المقال</span>
                            <div className="flex gap-4">
                                <button className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-all hover:scale-110">
                                    <span className="material-symbols-outlined">share</span>
                                </button>
                                <button className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface hover:bg-[#25D366] hover:text-white transition-all hover:scale-110">
                                    <span className="material-symbols-outlined">chat</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <Link href="/blog" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-surface-container-high text-on-surface font-bold hover:bg-primary hover:text-on-primary transition-all group">
                            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                            العودة إلى المدونة
                        </Link>
                    </div>
                </footer>
            </article>
        </main>
    );
}
