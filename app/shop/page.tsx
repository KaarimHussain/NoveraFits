"use client";

import { useEffect, useState } from "react";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { ProductGrid, Product } from "@/components/shop/ProductGrid";
import { SortDropdown } from "@/components/shop/SortDropdown";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const data: Product[] = [];
                querySnapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() } as Product);
                });
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Derived state for filtered products
    const filteredProducts = products.filter(product => {
        // Category Filter
        if (selectedCategory && product.category !== selectedCategory) {
            return false;
        }

        // Price Filter
        if (product.price < priceRange[0] || product.price > priceRange[1]) {
            return false;
        }

        return true;
    });

    return (
        <div className="container-width py-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Shop All</h1>
                    <p className="text-sm text-muted-foreground">
                        {loading ? "Loading products..." : `Showing ${filteredProducts.length} result${filteredProducts.length !== 1 ? 's' : ''}`}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {/* Mobile Filter Toggle */}
                    <SortDropdown />
                </div>
            </div>

            <div className="flex gap-10 relative h-full">
                {/* Desktop Sidebar */}
                <div className="hidden md:block sticky top-0 w-64 shrink-0">
                    <FilterSidebar
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                    />
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
                            <FilterSidebar
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                            />
                        </div>
                    </SheetContent>
                </Sheet>

                <div className="flex-1 space-y-12">
                    {loading ? (
                        <div className="flex justify-center items-center h-96">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <>
                            <ProductGrid products={filteredProducts} />

                            {/* Pagination - dynamic hiding */}
                            {filteredProducts.length > 0 && (
                                <div className="flex items-center justify-center gap-2">
                                    <Button variant="outline" className="w-10 h-10 p-0" disabled>1</Button>
                                    <Button variant="ghost" className="w-10 h-10 p-0" disabled>Next</Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
