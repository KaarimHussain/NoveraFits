import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="bg-background">
            {/* Hero Section */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                <div className="container-width relative z-10">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Redefining <br /> Modern Elegance.
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            NoveraFits was born from a simple idea: fashion should be effortless, sustainable, and empowering.
                            We create timeless pieces for the woman who values quality over quantity.
                        </p>
                        <div className="flex gap-4">
                            <Button asChild size="lg">
                                <Link href="/shop">Explore Our Collection</Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link href="/contact">Get in Touch</Link>
                            </Button>
                        </div>
                    </div>
                </div>
                {/* Abstract background blobs could go here */}
            </section>

            {/* Values Section */}
            <section className="py-20 bg-muted/30">
                <div className="container-width">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold">Sustainable Sourcing</h3>
                            <p className="text-muted-foreground">
                                We prioritize eco-friendly materials and ethical manufacturing processes.
                                Fashion shouldn't cost the earth.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold">Timeless Design</h3>
                            <p className="text-muted-foreground">
                                Our collections are designed to last beyond a single season.
                                Versatile staples that build a cohesive wardrobe.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold">Quality First</h3>
                            <p className="text-muted-foreground">
                                Meticulous attention to detail in every stitch.
                                We believe luxury lies in the durability and feel of the fabric.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team/Story Section */}
            <section className="py-20">
                <div className="container-width grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-square lg:aspect-[4/5] bg-muted rounded-2xl overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop"
                            alt="Our Design Studio"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight">Crafted with Passion.</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Founded in 2024, NoveraFits started as a small studio in <strong>Karachi, Pakistan</strong>.
                            Inspired by the rich textile heritage of the region and modern minimalist aesthetics, our founder sought to create a brand
                            that bridges the gap between tradition and contemporary style.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Today, we are a global community of like-minded individuals who believe
                            that style is a form of self-expression that shouldn't compromise our values.
                        </p>
                        <Link href="/shop" className="inline-flex items-center text-primary font-medium hover:underline">
                            View our latest work <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
