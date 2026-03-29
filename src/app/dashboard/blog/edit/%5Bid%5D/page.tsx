import { getBlogById } from "@/app/actions/blog"
import BlogForm from "../../components/BlogForm"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await getBlogById(id)

    if (!blog) {
        notFound()
    }

    return (
        <div className="max-w-6xl mx-auto">
            <BlogForm initialData={blog} isEditing />
        </div>
    )
}
