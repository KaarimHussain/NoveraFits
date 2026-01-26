import { Gallery } from "@/components/product/Gallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductTabs } from "@/components/product/ProductTabs";
import { NewArrivals } from "@/components/home/NewArrivals";

// Using NewArrivals as "You might also like" section for now

export default async function ProductPage({ params }: { params: { id: string } }) {
    // Mock images based on the ID or just generic
    const images = [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551488852-080175b21029?q=80&w=1000&auto=format&fit=crop",
    ];

    return (
        <div className="container-width py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                <Gallery images={images} />
                <ProductInfo />
            </div>
            <ProductTabs />

            <div className="mt-20 border-t pt-10">
                <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
                <NewArrivals />
            </div>
        </div>
    );
}
