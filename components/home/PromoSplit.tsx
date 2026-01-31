"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function PromoSplit() {
    const [data, setData] = useState({
        isVisible: true,
        title: "Summer Sale",
        highlight: "Up to 40% Off",
        description: "Discover the season's hottest trends at unbeatable prices. Limited time offer on selected dresses and tops.",
        buttonText: "Shop Now",
        link: "/shop",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPromo = async () => {
            try {
                const docRef = doc(db, "content", "promo");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setData(docSnap.data() as any);
                }
            } catch (error) {
                console.error("Error fetching promo:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPromo();
    }, []);

    if (loading) return null; // Or skeleton
    if (!data.isVisible) return null;

    return (
        <section className="py-16 container-width">
            <div className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-2xl">
                {/* Left: Image */}
                <div className="relative h-[400px]">
                    <img
                        src={data.image}
                        alt={data.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right: Content */}
                <div className="bg-secondary/20 flex flex-col justify-center items-start p-12 space-y-6">
                    <h2 className="text-3xl font-bold md:text-4xl text-foreground">
                        {data.title} <br />
                        <span className="text-secondary">{data.highlight}</span>
                    </h2>
                    <p className="text-muted-foreground max-w-sm">
                        {data.description}
                    </p>
                    <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/80">
                        <Link href={data.link || "/shop"}>
                            {data.buttonText}
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
