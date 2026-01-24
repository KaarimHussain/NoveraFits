"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Check, ShoppingBag, Truck, RotateCcw, ShieldCheck, Star, Ruler, Info, ChevronDown, ChevronUp } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";
import { toggleCartDrawer } from "@/components/layout/CartDrawer";

// Size stock interface
interface SizeStock {
    size: string;
    stock: number;
}

// Review interface
interface Review {
    id: string;
    author: string;
    rating: number;
    date: string;
    comment: string;
    helpful: number;
}

export default function ProductDetailsPage() {
    const params = useParams();

    // Mock Product Data
    const product = {
        id: params?.id as string || "1",
        name: "Silk Evening Gown",
        price: 45999,
        description: "An elegant evening gown made from 100% pure silk. Features a flowing silhouette and delicate straps. Perfect for special occasions and evening events.",
        longDescription: "Elevate your evening wardrobe with this stunning silk gown. Crafted from the finest mulberry silk, this dress drapes beautifully and feels incredibly luxurious against the skin. The elegant flowing silhouette flatters every figure, while the delicate straps add a touch of sophistication. Whether you're attending a gala, wedding, or upscale dinner party, this gown will ensure you make a lasting impression.",
        category: "Dresses",
        images: [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1966&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2648&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop"
        ],
        sizes: [
            { size: "XS", stock: 0 },
            { size: "S", stock: 3 },
            { size: "M", stock: 12 },
            { size: "L", stock: 5 },
            { size: "XL", stock: 0 },
        ] as SizeStock[],
        colors: ["Navy Blue", "Burgundy", "Emerald", "Champagne"],
        material: "100% Pure Mulberry Silk",
        care: "Dry clean only",
        fit: "Regular fit, true to size",
        sizeGuide: {
            XS: { bust: "32-33", waist: "24-25", hips: "34-35" },
            S: { bust: "34-35", waist: "26-27", hips: "36-37" },
            M: { bust: "36-37", waist: "28-29", hips: "38-39" },
            L: { bust: "38-39", waist: "30-31", hips: "40-41" },
            XL: { bust: "40-41", waist: "32-33", hips: "42-43" },
        } as Record<string, { bust: string; waist: string; hips: string }>,
        details: [
            "V-neckline with adjustable straps",
            "Side slit for elegant movement",
            "Concealed back zipper closure",
            "Fully lined for comfort",
            "Floor length design",
            "Made in Pakistan"
        ]
    };

    // Mock Reviews Data
    const reviews: Review[] = [
        {
            id: "1",
            author: "Fatima A.",
            rating: 5,
            date: "2 weeks ago",
            comment: "Absolutely stunning dress! The silk quality is exceptional and the fit was perfect. I received so many compliments at my sister's wedding. Worth every rupee!",
            helpful: 24
        },
        {
            id: "2",
            author: "Ayesha K.",
            rating: 4,
            date: "1 month ago",
            comment: "Beautiful gown with excellent craftsmanship. The color is exactly as shown. Only giving 4 stars because delivery took a bit longer than expected.",
            helpful: 18
        },
        {
            id: "3",
            author: "Sara M.",
            rating: 5,
            date: "1 month ago",
            comment: "This is my second purchase from Novera and I'm never disappointed! The attention to detail is amazing. The dress fits like a dream.",
            helpful: 32
        },
        {
            id: "4",
            author: "Zainab R.",
            rating: 5,
            date: "2 months ago",
            comment: "Premium quality at its finest! The silk feels so luxurious. I've worn it twice already and it still looks brand new after dry cleaning.",
            helpful: 15
        }
    ];

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [showDetails, setShowDetails] = useState(true);

    const { addItem } = useCartStore();

    const selectedSizeData = product.sizes.find(s => s.size === selectedSize);
    const isOutOfStock = selectedSizeData ? selectedSizeData.stock === 0 : false;
    const canAddToCart = selectedSize && selectedColor && !isOutOfStock;

    // Format price in PKR
    const formatPrice = (price: number) => {
        return `PKR ${price.toLocaleString('en-PK')}`;
    };

    // Calculate average rating
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    const totalReviews = reviews.length;

    // Handle Add to Cart
    const handleAddToCart = () => {
        if (!canAddToCart) return;

        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            size: selectedSize,
            color: selectedColor,
            quantity: 1
        });

        toast.success("Added to bag!", {
            description: `${product.name} (${selectedSize}, ${selectedColor})`,
        });

        toggleCartDrawer();
    };

    // Render stars
    const renderStars = (rating: number, size: "sm" | "md" = "sm") => {
        const starSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`${starSize} ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Left: Image Gallery */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/20">
                            <Image
                                src={product.images[selectedImage]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={`relative w-20 h-24 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${selectedImage === i
                                        ? "border-primary ring-2 ring-primary/20"
                                        : "border-transparent hover:border-border"
                                        }`}
                                >
                                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="lg:py-4">
                        <div className="space-y-6 max-w-lg">

                            {/* Header */}
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">{product.category}</p>
                                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{product.name}</h1>

                                {/* Rating Summary */}
                                <div className="flex items-center gap-2">
                                    {renderStars(Math.round(averageRating))}
                                    <span className="text-sm text-muted-foreground">
                                        {averageRating.toFixed(1)} ({totalReviews} reviews)
                                    </span>
                                </div>

                                <div className="text-2xl font-semibold text-primary">{formatPrice(product.price)}</div>
                            </div>

                            {/* Description */}
                            <p className="text-muted-foreground leading-relaxed">
                                {product.description}
                            </p>

                            {/* Size Selector */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Select Size</span>
                                    <button
                                        onClick={() => setShowSizeGuide(!showSizeGuide)}
                                        className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
                                    >
                                        <Ruler className="h-3.5 w-3.5" />
                                        Size Guide
                                    </button>
                                </div>

                                {/* Size Guide Dropdown */}
                                {showSizeGuide && (
                                    <div className="p-4 bg-secondary/30 rounded-xl text-sm animate-in fade-in slide-in-from-top-2 duration-200">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="text-muted-foreground">
                                                    <th className="text-left pb-2 font-medium">Size</th>
                                                    <th className="text-center pb-2 font-medium">Bust</th>
                                                    <th className="text-center pb-2 font-medium">Waist</th>
                                                    <th className="text-center pb-2 font-medium">Hips</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.entries(product.sizeGuide).map(([size, measurements]) => (
                                                    <tr key={size} className={selectedSize === size ? "text-primary font-medium" : ""}>
                                                        <td className="py-1.5">{size}</td>
                                                        <td className="text-center py-1.5">{measurements.bust}&quot;</td>
                                                        <td className="text-center py-1.5">{measurements.waist}&quot;</td>
                                                        <td className="text-center py-1.5">{measurements.hips}&quot;</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                <div className="flex gap-2 flex-wrap">
                                    {product.sizes.map((sizeData) => {
                                        const isDisabled = sizeData.stock === 0;
                                        const isSelected = selectedSize === sizeData.size;

                                        return (
                                            <button
                                                key={sizeData.size}
                                                onClick={() => !isDisabled && setSelectedSize(sizeData.size)}
                                                disabled={isDisabled}
                                                className={`w-14 h-12 rounded-lg border text-sm font-medium transition-all ${isDisabled
                                                    ? "bg-secondary/50 text-muted-foreground border-input cursor-not-allowed opacity-50 line-through"
                                                    : isSelected
                                                        ? "bg-primary text-primary-foreground border-primary"
                                                        : "bg-background text-foreground border-input hover:border-primary"
                                                    }`}
                                            >
                                                {sizeData.size}
                                            </button>
                                        );
                                    })}
                                </div>

                                {selectedSize && selectedSizeData && (
                                    <p className={`text-xs font-medium ${selectedSizeData.stock > 0
                                        ? selectedSizeData.stock <= 3 ? "text-orange-500" : "text-green-600"
                                        : "text-red-500"}`}>
                                        {selectedSizeData.stock > 0
                                            ? selectedSizeData.stock <= 3
                                                ? `Only ${selectedSizeData.stock} left in stock!`
                                                : `${selectedSizeData.stock} in stock`
                                            : "Out of stock"}
                                    </p>
                                )}
                            </div>

                            {/* Color Selector */}
                            <div className="space-y-3">
                                <span className="text-sm font-medium">Select Color</span>
                                <div className="flex gap-2 flex-wrap">
                                    {product.colors.map((color) => {
                                        const isSelected = selectedColor === color;
                                        return (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-all ${isSelected
                                                    ? "bg-primary text-primary-foreground border-primary"
                                                    : "bg-background text-foreground border-input hover:border-primary"
                                                    }`}
                                            >
                                                {color}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    size="lg"
                                    className="flex-1 rounded-xl gap-2 h-14 text-base"
                                    disabled={!canAddToCart}
                                    onClick={handleAddToCart}
                                >
                                    <ShoppingBag className="h-5 w-5" />
                                    {!selectedSize ? "Select Size" : !selectedColor ? "Select Color" : isOutOfStock ? "Out of Stock" : "Add to Bag"}
                                </Button>
                                <Button variant="outline" size="lg" className="rounded-xl px-4 h-14">
                                    <Heart className="h-5 w-5" />
                                </Button>
                            </div>

                            {/* Benefits */}
                            <div className="space-y-3 pt-6 border-t">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <Check className="h-4 w-4 text-green-600" />
                                    <span>Free shipping on orders over PKR 5,000</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <RotateCcw className="h-4 w-4 text-green-600" />
                                    <span>Free returns within 30 days</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <ShieldCheck className="h-4 w-4 text-green-600" />
                                    <span>Secure checkout with Cash on Delivery</span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Product Details & Description Section */}
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Product Description */}
                    <div className="space-y-6">
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="flex items-center justify-between w-full text-left"
                        >
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <Info className="h-5 w-5 text-primary" />
                                Product Details
                            </h2>
                            {showDetails ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </button>

                        {showDetails && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">
                                <p className="text-muted-foreground leading-relaxed">
                                    {product.longDescription}
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-secondary/30 rounded-xl">
                                        <p className="text-xs text-muted-foreground mb-1">Material</p>
                                        <p className="text-sm font-medium">{product.material}</p>
                                    </div>
                                    <div className="p-4 bg-secondary/30 rounded-xl">
                                        <p className="text-xs text-muted-foreground mb-1">Care</p>
                                        <p className="text-sm font-medium">{product.care}</p>
                                    </div>
                                    <div className="p-4 bg-secondary/30 rounded-xl col-span-2">
                                        <p className="text-xs text-muted-foreground mb-1">Fit</p>
                                        <p className="text-sm font-medium">{product.fit}</p>
                                    </div>
                                </div>

                                <ul className="space-y-2">
                                    {product.details.map((detail, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Size Guide Section */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Ruler className="h-5 w-5 text-primary" />
                            Size Guide
                        </h2>

                        <div className="p-6 bg-secondary/30 rounded-xl">
                            <p className="text-sm text-muted-foreground mb-4">
                                All measurements are in inches. For the best fit, measure yourself and compare with our size chart.
                            </p>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border/50">
                                        <th className="text-left py-3 font-semibold">Size</th>
                                        <th className="text-center py-3 font-semibold">Bust</th>
                                        <th className="text-center py-3 font-semibold">Waist</th>
                                        <th className="text-center py-3 font-semibold">Hips</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(product.sizeGuide).map(([size, measurements]) => {
                                        const sizeStock = product.sizes.find(s => s.size === size);
                                        const isAvailable = sizeStock && sizeStock.stock > 0;
                                        return (
                                            <tr key={size} className={`border-b border-border/30 last:border-0 ${!isAvailable ? "opacity-50" : ""}`}>
                                                <td className="py-3 font-medium">
                                                    {size}
                                                    {!isAvailable && <span className="text-xs text-red-500 ml-2">(Out)</span>}
                                                </td>
                                                <td className="text-center py-3">{measurements.bust}&quot;</td>
                                                <td className="text-center py-3">{measurements.waist}&quot;</td>
                                                <td className="text-center py-3">{measurements.hips}&quot;</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Reviews & Ratings Section */}
                <div className="mt-16 pt-8 border-t">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h2 className="text-2xl font-semibold">Customer Reviews</h2>
                            <div className="flex items-center gap-3 mt-2">
                                {renderStars(Math.round(averageRating), "md")}
                                <span className="text-lg font-medium">{averageRating.toFixed(1)}</span>
                                <span className="text-muted-foreground">Based on {totalReviews} reviews</span>
                            </div>
                        </div>
                        <Button variant="outline" className="rounded-xl">
                            Write a Review
                        </Button>
                    </div>

                    {/* Rating Breakdown */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        <div className="space-y-3 lg:col-span-1">
                            {[5, 4, 3, 2, 1].map((star) => {
                                const count = reviews.filter(r => r.rating === star).length;
                                const percentage = (count / totalReviews) * 100;
                                return (
                                    <div key={star} className="flex items-center gap-3">
                                        <span className="text-sm w-3">{star}</span>
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-yellow-400 rounded-full transition-all"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                        <span className="text-sm text-muted-foreground w-8">{count}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Reviews List */}
                        <div className="lg:col-span-2 space-y-6">
                            {reviews.map((review) => (
                                <div key={review.id} className="p-6 bg-secondary/30 rounded-xl">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <p className="font-medium">{review.author}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                {renderStars(review.rating)}
                                                <span className="text-xs text-muted-foreground">{review.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {review.comment}
                                    </p>
                                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/30">
                                        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                            Helpful ({review.helpful})
                                        </button>
                                        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                            Report
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
