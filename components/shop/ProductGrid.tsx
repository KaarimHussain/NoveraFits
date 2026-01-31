import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag } from "lucide-react";
import { useAddToCart } from "@/hooks/useAddToCart";

export interface Product {
    id: string;
    name: string;
    price: number;
    category?: string;
    images?: string[];
    stock?: number;
    isNew?: boolean;
}

interface ProductGridProps {
    products: Product[];
}

import { useCartStore } from "@/lib/store";
import { toast } from "sonner";

export function ProductGrid({ products }: ProductGridProps) {
    const { addToCart } = useAddToCart();
    const { toggleFavorite, isFavorite } = useCartStore();

    // Hydration safe check (simple version)
    // In a real app, we might handle hydration better for isFavorite to avoid mismatches
    // For now, let's assume client-side rendering dominates or acceptable mismatch on edge cases

    if (products.length === 0) {
        return (
            <div className="text-center py-20 w-full col-span-full">
                <p className="text-muted-foreground">No products found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {products.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="group block h-full">
                    <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-gray-100 mb-3">
                        <img
                            src={product.images?.[0] || "/placeholder.png"}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {product.isNew && (
                            <Badge className="absolute top-3 left-3 bg-secondary hover:bg-secondary border-none">
                                New Arrival
                            </Badge>
                        )}
                        <Button
                            size="icon"
                            variant="secondary"
                            className={`absolute bottom-3 right-4 h-8 w-8 rounded-full transition-all duration-300 ${isFavorite(product.id)
                                ? "opacity-100 translate-y-0 text-red-500 hover:text-red-600 bg-white"
                                : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
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

                    <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{product.category || "Collection"}</span>
                            {product.stock !== undefined && product.stock < 10 && product.stock > 0 && (
                                <span className="text-destructive font-medium">{product.stock} items left!</span>
                            )}
                            {product.stock === 0 && (
                                <span className="text-muted-foreground font-medium">Out of Stock</span>
                            )}
                        </div>
                        <h3 className="font-medium text-foreground dark:text-gray-100 truncate pr-4">{product.name}</h3>
                        <div className="flex items-center justify-between mt-1">
                            <span className="text-secondary font-bold">Rs. {product.price?.toLocaleString()}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
