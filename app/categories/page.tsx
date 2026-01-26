import Link from "next/link";
import { ArrowRight } from "lucide-react";

const allCategories = [
    {
        name: "Dresses",
        description: "Effortless elegance for every occasion.",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
        href: "/shop?cat=dresses",
        count: 42
    },
    {
        name: "Tops & Blouses",
        description: "Versatile staples for your daily rotation.",
        image: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?q=80&w=800&auto=format&fit=crop",
        href: "/shop?cat=tops",
        count: 36
    },
    {
        name: "Activewear",
        description: "Performance meets style.",
        image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop",
        href: "/shop?cat=activewear",
        count: 18
    },
    {
        name: "Skirts",
        description: "Flowy silhouettes and structured cuts.",
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop",
        href: "/shop?cat=skirts",
        count: 24
    },
    {
        name: "Pants & Trousers",
        description: "Tailored fits for the modern professional.",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop",
        href: "/shop?cat=pants",
        count: 29
    },
    {
        name: "Accessories",
        description: "The finishing touches that matter.",
        image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=800&auto=format&fit=crop",
        href: "/shop?cat=accessories",
        count: 50
    },
];

export default function CategoriesPage() {
    return (
        <div className="container-width py-16">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Shop by Category</h1>
                <p className="text-muted-foreground text-lg">
                    Curated collections designed to help you build a timeless and versatile wardrobe.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allCategories.map((cat) => (
                    <Link
                        key={cat.name}
                        href={cat.href}
                        className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-gray-100"
                    >
                        <img
                            src={cat.image}
                            alt={cat.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                            <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                            <p className="text-white/90 mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                {cat.description}
                            </p>

                            <div className="flex items-center text-sm font-semibold">
                                View Collection <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
