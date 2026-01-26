import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const articles = [
    {
        id: 1,
        title: "How to Style Oversized Blazers",
        category: "Style Guide",
        image: "https://images.unsplash.com/photo-1548624149-f80e0319403a?q=80&w=800&auto=format&fit=crop",
        size: "large", // spans 2 cols
    },
    {
        id: 2,
        title: "5 Essentials for your Capsule Wardrobe",
        category: "Trends",
        image: "https://images.unsplash.com/photo-1550614000-4b9519e02d68?q=80&w=800&auto=format&fit=crop",
        size: "small",
    },
    {
        id: 3,
        title: "Sustainable Fashion: Why it Matters",
        category: "Sustainability",
        image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=800&auto=format&fit=crop",
        size: "small",
    },
];

export function EditorialGrid() {
    return (
        <section className="py-16 mb-16 container-width">
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-bold">The Editorial</h2>
                <Link href="/blog" className="text-sm font-medium hover:underline">Read All</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                {articles.map((article, idx) => (
                    <Link
                        key={article.id}
                        href={`/blog/${article.id}`}
                        className={`group relative overflow-hidden rounded-xl ${idx === 0 ? "md:col-span-2 md:row-span-1" : ""}`}
                    >
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white">
                            <span className="text-xs font-semibold uppercase tracking-wider mb-2 block text-white/80">{article.category}</span>
                            <h3 className="text-xl font-bold group-hover:text-secondary transition-colors">{article.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
