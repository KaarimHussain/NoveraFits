"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    images: string[];
}

export function ProductCard({ product }: { product: Product }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    return (
        <Link href={`/shop/${product.id}`}>
            <Card className="group border-0 shadow-none hover:shadow-lg transition-all duration-300 overflow-hidden rounded-2xl">
                <CardContent className="p-0 relative aspect-3/4 bg-secondary/10">
                    {product.images.length > 0 ? (
                        <Image
                            src={product.images[currentImageIndex]}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-secondary">
                            No Image
                        </div>
                    )}

                    {/* Carousel Arrows (Visible on Hover) */}
                    {product.images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </>
                    )}

                    {/* Quick Add Button (Visible on Hover? or just icon) */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                        <Button size="icon" className="rounded-full shadow-md bg-white text-black hover:bg-primary hover:text-white border-0">
                            <ShoppingBag className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start p-4 gap-1">
                    <div className="flex justify-between w-full items-start">
                        <h3 className="font-medium text-base truncate pr-2">{product.name}</h3>
                        <span className="font-semibold whitespace-nowrap text-primary">PKR {product.price.toLocaleString('en-PK')}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{product.category}</p>
                </CardFooter>
            </Card>
        </Link>
    );
}
