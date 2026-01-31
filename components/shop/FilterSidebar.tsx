"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, X } from "lucide-react";

interface FilterSidebarProps {
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
}

interface Category {
    id: string;
    name: string;
    image: string;
}

export function FilterSidebar({ selectedCategory, setSelectedCategory, priceRange, setPriceRange }: FilterSidebarProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [localMinPrice, setLocalMinPrice] = useState(priceRange[0].toString());
    const [localMaxPrice, setLocalMaxPrice] = useState(priceRange[1].toString());

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const q = query(collection(db, "categories"), orderBy("name"));
                const querySnapshot = await getDocs(q);
                const data: Category[] = [];
                querySnapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() } as Category);
                });
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    // Update local inputs when prop changes (e.g. reset)
    useEffect(() => {
        setLocalMinPrice(priceRange[0].toString());
        setLocalMaxPrice(priceRange[1].toString());
    }, [priceRange]);

    const handlePriceApply = () => {
        const min = parseInt(localMinPrice) || 0;
        const max = parseInt(localMaxPrice) || 1000000;
        setPriceRange([min, max]);
    };

    return (
        <div className="space-y-8 w-full md:w-64 shrink-0">
            {/* Header with Reset */}
            <div className="flex items-center justify-between md:hidden">
                <h2 className="font-semibold text-xl">Filters</h2>
                <Button variant="ghost" size="sm" onClick={() => {
                    setSelectedCategory(null);
                    setPriceRange([0, 50000]);
                }}>
                    Reset
                </Button>
            </div>

            {/* Categories */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Categories</h3>
                    {selectedCategory && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setSelectedCategory(null)}
                            title="Clear category"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
                {loadingCategories ? (
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                ) : (
                    <ul className="space-y-2">
                        <li>
                            <Button
                                variant={selectedCategory === null ? "secondary" : "ghost"}
                                className={`w-full justify-start font-normal ${selectedCategory === null ? "font-medium" : "text-muted-foreground"}`}
                                onClick={() => setSelectedCategory(null)}
                            >
                                All Clothing
                            </Button>
                        </li>
                        {categories.map((category) => (
                            <li key={category.id}>
                                <Button
                                    variant={selectedCategory === category.name ? "secondary" : "ghost"}
                                    className={`w-full justify-start font-normal ${selectedCategory === category.name ? "font-medium" : "text-muted-foreground"}`}
                                    onClick={() => setSelectedCategory(category.name)}
                                >
                                    {category.name}
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Price Range */}
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Price Range</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="min-price" className="text-xs">Min Price</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-xs font-medium text-muted-foreground">Rs.</span>
                            <Input
                                id="min-price"
                                type="number"
                                className="pl-9 h-9"
                                value={localMinPrice}
                                onChange={(e) => setLocalMinPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="max-price" className="text-xs">Max Price</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-xs font-medium text-muted-foreground">Rs.</span>
                            <Input
                                id="max-price"
                                type="number"
                                className="pl-9 h-9"
                                value={localMaxPrice}
                                onChange={(e) => setLocalMaxPrice(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <Button
                    className="w-full"
                    size="sm"
                    onClick={handlePriceApply}
                >
                    Apply Price
                </Button>
            </div>

            <Button
                variant="outline"
                className="w-full hidden md:flex"
                onClick={() => {
                    setSelectedCategory(null);
                    setPriceRange([0, 50000]);
                }}
            >
                Reset Filters
            </Button>
        </div>
    );
}
