"use client";

import { useCartStore } from "@/lib/store";
import { ProductGrid } from "@/components/shop/ProductGrid";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

export default function FavouritesPage() {
    const { favorites } = useCartStore();

    // Hydration fix
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="container-width py-12">
            <div className="flex flex-col items-center justify-center mb-12 text-center">
                <h1 className="text-3xl font-bold mb-4">Your Favourites</h1>
                <p className="text-muted-foreground max-w-lg">
                    Saved items that you want to keep an eye on.
                </p>
            </div>

            {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-2xl">
                    <div className="bg-background p-4 rounded-full shadow-sm mb-4">
                        <Heart className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No favourites yet</h2>
                    <p className="text-muted-foreground mb-6">Start saving the things you love.</p>
                    <Button asChild>
                        <Link href="/shop">Explore Collection</Link>
                    </Button>
                </div>
            ) : (
                <ProductGrid
                    products={favorites.map(f => ({
                        id: f.id,
                        name: f.name,
                        price: f.price,
                        category: f.category || "Favourite",
                        images: [f.image],
                        isNew: false
                    }))}
                />
            )}
        </div>
    );
}
