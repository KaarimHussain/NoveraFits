"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Category {
    id: string;
    name: string;
    description: string;
    image: string;
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const q = query(collection(db, "categories"), orderBy("name"));
                const querySnapshot = await getDocs(q);
                const data: Category[] = [];
                querySnapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() } as Category);
                });
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="container-width py-20 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="container-width py-16">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Shop by Category</h1>
                <p className="text-muted-foreground text-lg">
                    Curated collections designed to help you build a timeless and versatile wardrobe.
                </p>
            </div>

            {categories.length === 0 ? (
                <div className="text-center text-muted-foreground">
                    No categories found.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href="/shop"
                            className="group relative overflow-hidden rounded-2xl aspect-4/5 bg-gray-100"
                        >
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                                <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                                <p className="text-white/90 mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    {cat.description}
                                </p>

                                <div className="flex items-center text-sm font-semibold">
                                    View Collection <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
