"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
        title: "Simple is More",
        subtitle: "Redefining elegance with our premium collection for the modern minimalist.",
        cta: "Shop Collection",
        link: "/shop",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
        title: "Summer Essentials",
        subtitle: "Discover the lightweight textures and earth tones defining this season.",
        cta: "View Lookbook",
        link: "/shop?cat=summer",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
        title: "Sustainable Luxe",
        subtitle: "Crafted with care, designed to last. Fashion that feels good.",
        cta: "Learn More",
        link: "/about",
    }
];

export function Hero() {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

    return (
        <section className="relative w-full h-[50vh] overflow-hidden group">
            <div className="h-full w-full" ref={emblaRef}>
                <div className="flex h-full">
                    {slides.map((slide) => (
                        <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 h-full">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover object-center"
                            />
                            {/* Overlay moved inside slide */}
                            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />

                            <div className="select-none absolute inset-0 flex items-center container-width z-20">
                                <div className="max-w-lg space-y-6 animate-enter">
                                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight drop-shadow-md">
                                        {slide.title}
                                    </h1>
                                    <p className="text-base md:text-lg font-medium text-white/90 max-w-md leading-relaxed drop-shadow-sm">
                                        {slide.subtitle}
                                    </p>
                                    <Button asChild size="lg" className="rounded-full px-8 bg-white text-black hover:bg-white/90 border-0 shadow-lg font-semibold transition-transform hover:scale-105">
                                        <Link href={slide.link} className="flex items-center gap-2">
                                            {slide.cta} <ArrowRight className="h-4 w-4" />
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
