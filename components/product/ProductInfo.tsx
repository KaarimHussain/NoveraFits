"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Share2 } from "lucide-react";

export function ProductInfo() {
    const [selectedSize, setSelectedSize] = useState("M");
    const [selectedColor, setSelectedColor] = useState("#D4A3A3");

    return (
        <div className="space-y-8">
            {/* Title & Price */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Classic Striped Shirt</h1>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <Share2 className="h-5 w-5" />
                    </Button>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-secondary">Rs. 8,900</span>
                    <div className="flex items-center gap-1 text-sm text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-medium text-foreground">4.8</span>
                        <span className="text-muted-foreground">(120 reviews)</span>
                    </div>
                </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
                Elevate your wardrobe with this timeless classic. Made from 100% premium organic cotton,
                this shirt offers breathable comfort and effortless style for any occasion.
            </p>

            {/* Selectors */}
            <div className="space-y-6">
                {/* Colors */}
                <div className="space-y-3">
                    <span className="text-sm font-medium">Color: <span className="text-muted-foreground">Dusty Rose</span></span>
                    <div className="flex gap-3">
                        {["#D4A3A3", "#E8DCCA", "#333333"].map((color) => (
                            <button
                                key={color}
                                className={`w-8 h-8 rounded-full border-2 focus:outline-none transition-all ${selectedColor === color ? "border-foreground ring-2 ring-offset-2 ring-primary/20" : "border-transparent"
                                    }`}
                                style={{ backgroundColor: color }}
                                onClick={() => setSelectedColor(color)}
                            />
                        ))}
                    </div>
                </div>

                {/* Sizes */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Size</span>
                        <button className="text-xs underline text-muted-foreground hover:text-foreground">Size Guide</button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {["XS", "S", "M", "L", "XL"].map((size) => (
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
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t">
                <Button size="lg" className="flex-1 h-12 text-base rounded-full">
                    Add to Cart - Rs. 8,900
                </Button>
                <Button size="lg" variant="outline" className="h-12 w-12 rounded-full p-0 flex-shrink-0">
                    <Heart className="h-5 w-5" />
                </Button>
            </div>

            {/* Policies */}
            <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground bg-muted/30 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>In Stock & Ready to Ship</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span>Free Returns within 30 days</span>
                </div>
            </div>
        </div>
    );
}
