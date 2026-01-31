"use client";

import { useEffect, useState, use } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Gallery } from "@/components/product/Gallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductTabs } from "@/components/product/ProductTabs";
import { NewArrivals } from "@/components/home/NewArrivals";
import { Loader2 } from "lucide-react";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const docRef = doc(db, "products", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProduct({ id: docSnap.id, ...docSnap.data() });
            }
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Product not found</p>
            </div>
        );
    }

    return (
        <div className="container-width py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                <Gallery images={product.images || []} />
                <ProductInfo product={product} />
            </div>
            <ProductTabs productId={product.id} description={product.description} details={product.details} />

            <div className="mt-20 border-t pt-10">
                <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
                <NewArrivals />
            </div>
        </div>
    );
}
