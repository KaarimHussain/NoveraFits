"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FilterSidebar() {
    const [priceRange, setPriceRange] = useState([1500, 15000]);

    return (
        <div className="space-y-8 w-full md:w-64 flex-shrink-0">
            {/* Categories */}
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Categories</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                    <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground font-medium">All Clothing</Button></li>
                    <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">Dresses</Button></li>
                    <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">Tops & Blouses</Button></li>
                    <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">Pants & Skirts</Button></li>
                    <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">Activewear</Button></li>
                </ul>
            </div>

            {/* Price Range - Improved Accuracy */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Price</h3>
                </div>
                <Slider
                    defaultValue={[1500, 15000]}
                    max={50000}
                    step={500}
                    min={0}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="py-4"
                />
                <div className="flex items-center gap-4">
                    <div className="grid gap-1.5 flex-1">
                        <span className="text-xs text-muted-foreground">Min (Rs.)</span>
                        <Input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                            className="h-9"
                        />
                    </div>
                    <div className="grid gap-1.5 flex-1">
                        <span className="text-xs text-muted-foreground">Max (Rs.)</span>
                        <Input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                            className="h-9"
                        />
                    </div>
                </div>
            </div>

            {/* Size */}
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Size</h3>
                <div className="grid grid-cols-4 gap-2">
                    {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                        <Button key={size} variant="outline" size="sm" className="h-8 w-full px-0 text-xs text-muted-foreground hover:text-foreground hover:border-primary">
                            {size}
                        </Button>
                    ))}
                </div>
            </div>

            <Button className="w-full md:hidden">Apply Filters</Button>
        </div>
    );
}
