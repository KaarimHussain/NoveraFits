import { useCartStore } from "@/lib/store";
import { toast } from "sonner";

interface Product {
    id: string;
    name: string;
    price: number;
    images?: string[]; // Optional because some sources might call it 'image' or 'images'
    image?: string;    // Fallback
}

interface AddToCartOptions {
    size?: string;
    color?: string;
    quantity?: number;
    showToast?: boolean;
}

export function useAddToCart() {
    const { addItem } = useCartStore();

    const addToCart = (product: Product, options: AddToCartOptions = {}) => {
        const {
            size = "One Size",
            color = "Default",
            quantity = 1,
            showToast = true
        } = options;

        try {
            const imageUrl = product.images?.[0] || product.image || "/placeholder.png";

            addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: imageUrl,
                size,
                color,
                quantity
            });

            if (showToast) {
                toast.success(`Added ${product.name} to cart`);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            if (showToast) {
                toast.error("Failed to add to cart");
            }
        }
    };

    return { addToCart };
}
