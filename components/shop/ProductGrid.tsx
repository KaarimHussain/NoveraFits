import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

const products = Array.from({ length: 9 }).map((_, i) => ({
    id: i + 1,
    title: [
        "Classic Shirt Soft Cotton",
        "Zip Up Neck Shirt",
        "Classic Long Sleeve",
        "Elegant Dinner Dress",
        "Casual Denim Jeans",
        "Summer Beach Hat",
        "Leather Handbag",
        "Running Sneakers",
        "Woolen Scarf"
    ][i],
    price: [4500, 5200, 3800, 12000, 6500, 2500, 15000, 9500, 3200][i],
    category: ["Uniqlo", "Zara", "Gap", "H&M", "Levi's", "Roxy", "Coach", "Nike", "Burberry"][i],
    image: [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542272617-08f083157f5d?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1521335629791-ce4aec6cfaaa?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551488852-080175b21029?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1520975661595-dc998dd24d86?q=80&w=600&auto=format&fit=crop"
    ][i],
    tag: i % 3 === 0 ? "New Arrival" : null,
    stock: i % 4 === 0 ? 3 : 12,
}));

export function ProductGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {products.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="group block h-full">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 mb-3">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {product.tag && (
                            <Badge className="absolute top-3 left-3 bg-secondary hover:bg-secondary border-none">
                                {product.tag}
                            </Badge>
                        )}
                        <Button
                            size="icon"
                            variant="secondary"
                            className="absolute bottom-3 right-4 h-8 w-8 rounded-full opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                        >
                            <Heart className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{product.category}</span>
                            <span className="text-destructive font-medium">{product.stock < 5 ? `${product.stock} items left!` : ''}</span>
                        </div>
                        <h3 className="font-medium text-foreground dark:text-gray-100 truncate pr-4">{product.title}</h3>
                        <div className="flex items-center justify-between mt-1">
                            <span className="text-secondary font-bold">Rs. {product.price.toLocaleString()}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
