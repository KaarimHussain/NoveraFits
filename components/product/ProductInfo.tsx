"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Share2 } from "lucide-react";
import { Plus } from "lucide-react";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";

interface Variant {
    size: string;
    colorName: string;
    colorCode: string;
    stock: number;
}

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    variants: Variant[];
    images: string[];
    averageRating?: number;
    reviewCount?: number;
}

interface ProductInfoProps {
    product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
    const { addToCart } = useAddToCart();
    const { toggleFavorite, isFavorite } = useCartStore();
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    // Derived state
    const availableColors = Array.from(new Set(product.variants?.map(v => v.colorCode))).map(code => {
        const variant = product.variants?.find(v => v.colorCode === code);
        return { code, name: variant?.colorName || "Unknown" };
    });

    const availableSizes = Array.from(new Set(product.variants?.map(v => v.size)));

    // Automatically select first option if available
    useEffect(() => {
        if (availableColors.length > 0 && !selectedColor) setSelectedColor(availableColors[0].code);
        if (availableSizes.length > 0 && !selectedSize) setSelectedSize(availableSizes[0]);
    }, [product]);

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            toast.error("Please select a size and color");
            return;
        }

        const variant = product.variants?.find(v => v.size === selectedSize && v.colorCode === selectedColor);
        if (!variant) {
            toast.error("Selected combination unavailable");
            return;
        }

        if (variant.stock <= 0) {
            toast.error("Out of stock");
            return;
        }

        addToCart(product, {
            size: selectedSize,
            color: selectedColor,
            quantity: 1
        });
    };

    const currentVariant = product.variants?.find(v => v.size === selectedSize && v.colorCode === selectedColor);
    const isOutOfStock = currentVariant && currentVariant.stock <= 0;

    return (
        <div className="space-y-8">
            {/* Title & Price */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">{product.name}</h1>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <Share2 className="h-5 w-5" />
                    </Button>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-secondary">Rs. {product.price?.toLocaleString()}</span>
                    <div className="flex items-center gap-1 text-sm text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-medium text-foreground">{product.averageRating?.toFixed(1) || "0.0"}</span>
                        <span className="text-muted-foreground">({product.reviewCount || 0} reviews)</span>
                    </div>
                </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
                {product.description}
            </p>

            {/* Selectors */}
            <div className="space-y-6">
                {/* Colors */}
                {availableColors.length > 0 && (
                    <div className="space-y-3">
                        <span className="text-sm font-medium">Color: <span className="text-muted-foreground">{availableColors.find(c => c.code === selectedColor)?.name}</span></span>
                        <div className="flex gap-3">
                            {availableColors.map((color) => (
                                <button
                                    key={color.code}
                                    className={`w-8 h-8 rounded-full border-2 focus:outline-none transition-all ${selectedColor === color.code ? "border-foreground ring-2 ring-offset-2 ring-primary/20" : "border-transparent"
                                        }`}
                                    style={{ backgroundColor: color.code }}
                                    onClick={() => setSelectedColor(color.code)}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Sizes */}
                {availableSizes.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Size</span>
                            <button className="text-xs underline text-muted-foreground hover:text-foreground">Size Guide</button>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {availableSizes.map((size) => (
                                <Button
                                    key={size}
                                    variant={selectedSize === size ? "default" : "outline"}
                                    className={`w-12 h-10 ${selectedSize === size ? "bg-primary text-primary-foreground" : ""}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t">
                <Button size="lg" className="flex-1 h-12 text-base rounded-full" onClick={handleAddToCart} disabled={isOutOfStock}>
                    {isOutOfStock ? "Out of Stock" : `Add to Cart - Rs. ${product.price?.toLocaleString()}`}
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    className={`h-12 w-12 rounded-full p-0 shrink-0 ${isFavorite(product.id) ? "text-red-500 border-red-200 bg-red-50 hover:bg-red-100 hover:text-red-600" : ""}`}
                    onClick={() => {
                        toggleFavorite({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.images?.[0] || "/placeholder.png",
                            category: "Product" // Or pass category if available in Product interface
                        });
                        toast.success(isFavorite(product.id) ? "Added to favourites" : "Removed from favourites");
                    }}
                >
                    <Heart className={`h-5 w-5 ${isFavorite(product.id) ? "fill-current" : ""}`} />
                </Button>
            </div>

            {/* Policies */}
            <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground bg-muted/30 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${isOutOfStock ? 'bg-red-500' : 'bg-green-500'}`} />
                    <span>{isOutOfStock ? "Currently Unavailable" : "In Stock & Ready to Ship"}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span>Free Returns within 30 days</span>
                </div>
            </div>
        </div>
    );
}
