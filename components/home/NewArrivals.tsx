"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag } from "lucide-react";

const products = [
    {
        id: 1,
        title: "Classic Striped Shirt",
        price: 4500,
        category: "Uniqlo",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
        tag: "New Arrival",
    },
    {
        id: 2,
        title: "Elegance White Dress",
        price: 6500,
        category: "Zara",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop",
        tag: "Best Seller",
    },
    {
        id: 3,
        title: "Cotton Blazer",
        price: 8500,
        category: "H&M",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
        tag: null,
    },
    {
        id: 4,
        title: "Varsity Jacket",
        price: 7200,
        category: "Nike",
        image: "https://images.unsplash.com/photo-1551488852-080175b21029?q=80&w=1000&auto=format&fit=crop",
        tag: "Trending",
    },
    {
        id: 5,
        title: "Summer Floral Top",
        price: 3500,
        category: "Mango",
        image: "https://images.unsplash.com/photo-1589810635657-23294847e93d?q=80&w=1000&auto=format&fit=crop",
        tag: "New Arrival",
    },
];

export function NewArrivals() {
    const [emblaRef] = useEmblaCarousel({ align: "start", dragFree: true });

    return (
        <section className="py-20 bg-muted/20">
            <div className="container-width">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">New Arrivals</h2>
                        <p className="text-muted-foreground">Fresh styles just for you.</p>
                    </div>
                    <Button variant="link" asChild className="text-secondary hover:text-secondary/80 font-semibold hidden sm:flex">
                        <Link href="/shop">View All Collections</Link>
                    </Button>
                </div>

                <div className="overflow-hidden p-1" ref={emblaRef}>
                    <div className="flex gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="flex-[0_0_280px] min-w-0 md:flex-[0_0_320px]">
                                <div className="group relative bg-card rounded-2xl overflow-hidden border hover:shadow-lg transition-all duration-300">
                                    {/* Image Area */}
                                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                                        <Link href={`/product/${product.id}`}>
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </Link>

                                        {product.tag && (
                                            <Badge className="absolute top-3 left-3 bg-white/90 text-black backdrop-blur-sm border-0 font-medium shadow-sm">
                                                {product.tag}
                                            </Badge>
                                        )}

                                        {/* Floating Actions */}
                                        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                            <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full bg-white text-black hover:bg-secondary hover:text-white shadow-sm transition-colors">
                                                <Heart className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <div className="absolute bottom-4 left-0 right-0 px-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            <Button className="w-full rounded-full bg-white/90 text-black hover:bg-white shadow-lg backdrop-blur-sm">
                                                <ShoppingBag className="mr-2 h-4 w-4" /> Quick Add
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-5">
                                        <Link href={`/product/${product.id}`} className="block group-hover:text-secondary transition-colors">
                                            <h3 className="font-semibold text-lg truncate">{product.title}</h3>
                                        </Link>
                                        <div className="flex items-center justify-between mt-2">
                                            <p className="text-sm text-muted-foreground">{product.category}</p>
                                            <span className="font-bold text-lg">Rs. {product.price.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <Button variant="outline" asChild className="w-full">
                        <Link href="/shop">View All Collections</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
