"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight } from "lucide-react";

const categories = [
    {
        name: "Dresses",
        href: "/shop?cat=dresses",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
        count: "42 items"
    },
    {
        name: "Tops",
        href: "/shop?cat=tops",
        image: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?q=80&w=800&auto=format&fit=crop",
        count: "36 items"
    },
    {
        name: "Activewear",
        href: "/shop?cat=activewear",
        image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop",
        count: "18 items"
    },
    {
        name: "Shoes",
        href: "/shop?cat=shoes",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop",
        count: "24 items"
    },
    {
        name: "Accessories",
        href: "/shop?cat=accessories",
        image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=800&auto=format&fit=crop",
        count: "50+ items"
    },
];

export function CategoryStrip() {
    const [emblaRef] = useEmblaCarousel({ align: "start", dragFree: true });

    return (
        <section className="py-20 border-b bg-background">
            <div className="container-width">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">Shop by Category</h2>
                        <p className="text-muted-foreground">Essentials for every part of your day.</p>
                    </div>
                    <Link href="/shop" className="hidden md:flex items-center text-sm font-semibold hover:text-secondary transition-colors">
                        View All Categories <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>

                <div className="select-none overflow-hidden p-1 -m-1" ref={emblaRef}>
                    <div className="flex gap-4">
                        {categories.map((cat, index) => (
                            <Link
                                key={cat.name}
                                href={cat.href}
                                className="group relative flex-[0_0_280px] sm:flex-[0_0_320px] aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 min-w-0"
                            >
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-300 group-hover:-translate-y-2">
                                    <h3 className="text-xl font-bold text-white mb-1">{cat.name}</h3>
                                    <p className="text-xs text-white/80 font-medium opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                        {cat.count}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/shop" className="inline-flex items-center text-sm font-semibold hover:text-secondary transition-colors">
                        View All Categories <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
