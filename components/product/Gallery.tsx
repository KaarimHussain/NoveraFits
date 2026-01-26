"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface GalleryProps {
    images: string[];
}

export function Gallery({ images }: GalleryProps) {
    const [activeImage, setActiveImage] = useState(images[0]);

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        className={cn(
                            "relative w-20 h-24 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all",
                            activeImage === img ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                        )}
                        onClick={() => setActiveImage(img)}
                    >
                        <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 rounded-xl overflow-hidden bg-muted aspect-[3/4] md:aspect-auto md:h-[600px]">
                <img
                    src={activeImage}
                    alt="Product Detail"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}
