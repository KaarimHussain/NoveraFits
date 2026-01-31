"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    images: string[];
    // Add logic for tags if implementing "New Arrival" logic
}

export function NewArrivals() {
    const [emblaRef] = useEmblaCarousel({ align: "start", dragFree: true });
    const { addToCart } = useAddToCart();
    const { toggleFavorite, isFavorite } = useCartStore();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch recent 10 products
                // Note: requires index on 'createdAt' descending usually
                const q = query(collection(db, "products"), limit(10));
                const querySnapshot = await getDocs(q);
                const data: Product[] = [];
                querySnapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() } as Product);
                });
                setProducts(data);
            } catch (error) {
                console.error("Error fetching new arrivals:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-muted/20 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </section>
        );
    }

    if (products.length === 0) return null;

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
                                    <div className="relative aspect-3/4 overflow-hidden bg-gray-100">
                                        <Link href={`/product/${product.id}`}>
                                            <img
                                                src={product.images?.[0] || "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop"}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </Link>

                                        {/* Tag Logic: Just showing New Arrival for now for all fetched here */}
                                        <Badge className="absolute top-3 left-3 bg-white/90 text-black backdrop-blur-sm border-0 font-medium shadow-sm">
                                            New Arrival
                                        </Badge>

                                        {/* Floating Actions */}
                                        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                className={`h-9 w-9 rounded-full transition-colors shadow-sm ${isFavorite(product.id)
                                                    ? "bg-white text-red-500 hover:bg-white hover:text-red-600"
                                                    : "bg-white text-black hover:bg-secondary hover:text-white"
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    toggleFavorite({
                                                        id: product.id,
                                                        name: product.name,
                                                        price: product.price,
                                                        image: product.images?.[0] || "/placeholder.png",
                                                        category: product.category
                                                    });
                                                    toast.success(isFavorite(product.id) ? "Added to favourites" : "Removed from favourites");
                                                }}
                                            >
                                                <Heart className={`h-4 w-4 ${isFavorite(product.id) ? "fill-current" : ""}`} />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-5">
                                        <Link href={`/product/${product.id}`} className="block group-hover:text-secondary transition-colors">
                                            <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                                        </Link>
                                        <div className="flex items-center justify-between mt-2">
                                            <p className="text-sm text-muted-foreground truncate max-w-[120px]">
                                                {/* Requires fetching category name from ID usually, simplifying for speed to just show ID or category string */}
                                                Style
                                            </p>
                                            <span className="font-bold text-lg">Rs. {product.price?.toLocaleString()}</span>
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
