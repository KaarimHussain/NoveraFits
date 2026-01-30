"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export function FilterSidebar() {
    const [priceRange, setPriceRange] = useState([1500, 15000]);

    return (
        <div className="space-y-8 w-full md:w-64 shrink-0">
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

            {/* Price Range - Simplified */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Price</h3>
                    <p className="text-sm font-medium text-muted-foreground">
                        Rs. {priceRange[0].toLocaleString()} - Rs. {priceRange[1].toLocaleString()}
                    </p>
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
            </div>

            <Button className="w-full md:hidden">Apply Filters</Button>
        </div>
    );
}
