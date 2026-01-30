import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { SortDropdown } from "@/components/shop/SortDropdown";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

export default function ShopPage() {
    return (
        <div className="container-width py-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Clothes</h1>
                    <p className="text-sm text-muted-foreground">Showing 1-9 of 64 results</p>
                </div>
                <div className="flex items-center gap-2">
                    {/* Mobile Filter Toggle (would go here) */}
                    <SortDropdown />
                </div>
            </div>

            <div className="flex gap-10 relative h-full">
                {/* Desktop Sidebar */}
                <div className="hidden md:block sticky top-0 w-64 shrink-0">
                    <FilterSidebar />
                </div>

                {/* Mobile Filter Trigger (FAB) */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            className="md:hidden fixed bottom-6 right-6 z-50 rounded-full h-14 w-14 shadow-xl bg-primary text-primary-foreground"
                            size="icon"
                        >
                            <SlidersHorizontal className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>Filters</SheetTitle>
                        </SheetHeader>
                        <div className="mt-8">
                            <FilterSidebar />
                        </div>
                    </SheetContent>
                </Sheet>

                <div className="flex-1 space-y-12">
                    <ProductGrid />

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-2">
                        <Button variant="outline" className="w-10 h-10 p-0" disabled>1</Button>
                        <Button variant="ghost" className="w-10 h-10 p-0">2</Button>
                        <Button variant="ghost" className="w-10 h-10 p-0">3</Button>
                        <span className="text-muted-foreground">...</span>
                        <Button variant="ghost" className="w-10 h-10 p-0">Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
