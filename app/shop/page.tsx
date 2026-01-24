"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock Data for Shop (prices in PKR)
const PRODUCTS = [
    { id: "1", name: "Silk Evening Gown", price: 45999, category: "Dresses", images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1966&auto=format&fit=crop"] },
    { id: "2", name: "Cashmere Sweater", price: 22999, category: "Tops", images: ["https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2005&auto=format&fit=crop"] },
    { id: "3", name: "Pleated Midi Skirt", price: 18499, category: "Bottoms", images: ["https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1974&auto=format&fit=crop"] },
    { id: "4", name: "Leather Tote Bag", price: 52999, category: "Accessories", images: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2138&auto=format&fit=crop"] },
    { id: "5", name: "Linen Blazer", price: 27499, category: "Outerwear", images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop"] },
    { id: "6", name: "Velvet Heels", price: 14499, category: "Shoes", images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2080&auto=format&fit=crop"] },
];

const CATEGORIES = ["All Categories", "Dresses", "Tops", "Bottoms", "Outerwear", "Shoes", "Accessories"];
const PRICE_RANGES = ["All Prices", "Under PKR 15,000", "PKR 15,000 - 30,000", "PKR 30,000 - 50,000", "Over PKR 50,000"];
const SORT_OPTIONS = ["Newest", "Price: Low to High", "Price: High to Low", "Popular"];

export default function ShopPage() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "All Categories";

    const [categoryFilter, setCategoryFilter] = useState(initialCategory);
    const [priceFilter, setPriceFilter] = useState("All Prices");
    const [sortBy, setSortBy] = useState("Newest");

    // Filter products
    const filteredProducts = PRODUCTS.filter(p => {
        if (categoryFilter !== "All Categories" && p.category !== categoryFilter) return false;

        if (priceFilter !== "All Prices") {
            if (priceFilter === "Under PKR 15,000" && p.price >= 15000) return false;
            if (priceFilter === "PKR 15,000 - 30,000" && (p.price < 15000 || p.price > 30000)) return false;
            if (priceFilter === "PKR 30,000 - 50,000" && (p.price < 30000 || p.price > 50000)) return false;
            if (priceFilter === "Over PKR 50,000" && p.price <= 50000) return false;
        }

        return true;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === "Price: Low to High") return a.price - b.price;
        if (sortBy === "Price: High to Low") return b.price - a.price;
        return 0; // Default: Newest (no sort for mock)
    });

    return (
        <div className="min-h-screen bg-background">
            {/* Filter Bar */}
            <div className="sticky top-16 z-40 bg-background border-b">
                <div className="container mx-auto px-4 py-3 flex items-center gap-4 overflow-x-auto scrollbar-hide">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground shrink-0">
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                    </div>

                    {/* Category Filter */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="rounded-lg gap-2 shrink-0">
                                {categoryFilter} <ChevronDown className="h-3 w-3" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {CATEGORIES.map(cat => (
                                <DropdownMenuItem key={cat} onClick={() => setCategoryFilter(cat)}>
                                    {cat}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Price Filter */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="rounded-lg gap-2 shrink-0">
                                {priceFilter} <ChevronDown className="h-3 w-3" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {PRICE_RANGES.map(range => (
                                <DropdownMenuItem key={range} onClick={() => setPriceFilter(range)}>
                                    {range}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Sort */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="rounded-lg gap-2 shrink-0">
                                {sortBy} <ChevronDown className="h-3 w-3" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {SORT_OPTIONS.map(option => (
                                <DropdownMenuItem key={option} onClick={() => setSortBy(option)}>
                                    {option}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Product Grid */}
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-semibold text-primary">
                        {categoryFilter === "All Categories" ? "All Products" : categoryFilter}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                    {sortedProducts.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                    {sortedProducts.length === 0 && (
                        <div className="col-span-full text-center py-20 text-muted-foreground">
                            No products found matching your filters.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
