"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function SortDropdown() {
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline-block">Sort by:</span>
            <Select defaultValue="popular">
                <SelectTrigger className="w-[140px] h-9 border-none bg-transparent hover:bg-muted font-medium text-foreground">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent align="end">
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
