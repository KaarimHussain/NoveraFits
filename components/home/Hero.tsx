"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Slide {
    id: string;
    image: string;
    title: string;
    subtitle?: string;
    link?: string;
}

export function Hero() {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
    const [slides, setSlides] = useState<Slide[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                // Fetch slides. You might want to sort them if you add an order field.
                const q = query(collection(db, "carousel"));
                const querySnapshot = await getDocs(q);
                const data: Slide[] = [];
                querySnapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() } as Slide);
                });
                setSlides(data);
            } catch (error) {
                console.error("Error fetching carousel:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSlides();
    }, []);

    if (loading) {
        return (
            <section className="relative w-full h-[50vh] flex items-center justify-center bg-muted/20">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </section>
        );
    }

    if (slides.length === 0) {
        return null; // Or a default placeholder
    }

    return (
        <section className="relative w-full h-[70vh] overflow-hidden group">
            <div className="h-full w-full" ref={emblaRef}>
                <div className="flex h-full">
                    {slides.map((slide) => (
                        <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 h-full">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover object-top"
                            />
                            {/* Overlay moved inside slide */}
                            <div className="absolute inset-0 z-10 bg-linear-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />

                            <div className="select-none absolute inset-0 flex items-center container-width z-20">
                                <div className="max-w-lg space-y-6 animate-enter">
                                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight drop-shadow-md">
                                        {slide.title}
                                    </h1>
                                    <p className="text-base md:text-lg font-medium text-white/90 max-w-md leading-relaxed drop-shadow-sm">
                                        {slide.subtitle}
                                    </p>
                                    <Button asChild size="lg" className="rounded-full px-8 bg-white text-black hover:bg-white/90 border-0 shadow-lg font-semibold transition-transform hover:scale-105">
                                        <Link href={slide.link || "/shop"} className="flex items-center gap-2">
                                            Shop Now <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
