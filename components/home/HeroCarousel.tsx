"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const HERO_SLIDES = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
        title: "Elegance, Simplified.",
        subtitle: "The new collection of premium essentials is here.",
        cta: "Shop Collection",
        link: "/shop"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
        title: "Modern Aesthetics",
        subtitle: "Curated styles for the contemporary woman.",
        cta: "New Arrivals",
        link: "/shop?sort=newest"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
        title: "Luxury Defined",
        subtitle: "Experience the touch of pure quality.",
        cta: "View Accessories",
        link: "/shop?category=Accessories"
    }
];

export default function HeroCarousel() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    return (
        <section className="relative w-full h-[85vh] bg-black overflow-hidden">
            <Carousel
                plugins={[plugin.current]}
                opts={{ loop: true }}
                className="h-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent className="h-full -ml-0">
                    {HERO_SLIDES.map((slide, index) => (
                        <CarouselItem key={slide.id} className="h-full pl-0">
                            <div className="relative w-full h-[85vh]">
                                {/* Background Image */}
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    priority={index === 0}
                                    className="object-cover will-change-transform"
                                    sizes="100vw"
                                />
                                <div className="absolute inset-0 bg-black/30" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

                                {/* Content */}
                                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 space-y-6">
                                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter drop-shadow-2xl">
                                        {slide.title}
                                    </h1>
                                    <p className="text-white/90 text-lg md:text-2xl font-light max-w-2xl drop-shadow-lg">
                                        {slide.subtitle}
                                    </p>
                                    <div className="pt-4">
                                        <Link href={slide.link}>
                                            <Button size="xl" className="rounded-full h-14 px-10 text-lg bg-white text-black hover:bg-white/90 border-0 shadow-xl transition-transform hover:scale-105">
                                                {slide.cta}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation - positioned inside the carousel */}
                <CarouselPrevious className="left-4 bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-md" />
                <CarouselNext className="right-4 bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-md" />
            </Carousel>
        </section>
    );
}
