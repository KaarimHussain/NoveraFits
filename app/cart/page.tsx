"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";

export default function CartPage() {
    const [mounted, setMounted] = useState(false);
    const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Format price in PKR
    const formatPrice = (price: number) => {
        return `PKR ${price.toLocaleString('en-PK')}`;
    };

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <div className="min-h-screen bg-secondary/10 py-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
                        <ShoppingBag className="h-8 w-8" /> Shopping Cart
                    </h1>
                    <div className="text-center py-20 bg-background rounded-xl border">
                        <p className="text-xl text-muted-foreground">Loading cart...</p>
                    </div>
                </div>
            </div>
        );
    }

    const subtotal = getTotal();
    const shipping = subtotal >= 5000 ? 0 : 350;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-secondary/10 py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold flex items-center gap-3">
                        <ShoppingBag className="h-8 w-8" /> Shopping Cart
                    </h1>
                    {items.length > 0 && (
                        <Button variant="ghost" size="sm" onClick={clearCart} className="text-red-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" /> Clear Cart
                        </Button>
                    )}
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-20 bg-background rounded-xl border">
                        <ShoppingBag className="h-16 w-16 mx-auto mb-4 opacity-20" />
                        <p className="text-xl text-muted-foreground mb-4">Your cart is empty.</p>
                        <Link href="/shop">
                            <Button size="lg" className="rounded-xl">Continue Shopping</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item, index) => (
                                <Card key={`${item.id}-${item.size}-${item.color}-${index}`} className="overflow-hidden border-0 shadow-sm">
                                    <div className="flex gap-4 p-4">
                                        <div className="relative w-24 h-32 bg-secondary rounded-lg overflow-hidden shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-semibold text-lg">{item.name}</h3>
                                                    <p className="font-bold text-primary">{formatPrice(item.price)}</p>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Size: {item.size} • Color: {item.color}
                                                </p>
                                            </div>
                                            <div className="flex justify-between items-center mt-4">
                                                <div className="flex items-center gap-2 bg-secondary/50 rounded-lg p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                                                        className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-background rounded-md transition-colors"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-background rounded-md transition-colors"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <p className="text-sm font-medium text-muted-foreground">
                                                        Total: {formatPrice(item.price * item.quantity)}
                                                    </p>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeItem(item.id, item.size, item.color)}
                                                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-24 border-0 shadow-lg">
                                <CardContent className="p-6 space-y-6">
                                    <h2 className="text-xl font-bold">Order Summary</h2>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span>{formatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Shipping</span>
                                            <span className={shipping === 0 ? "text-green-600" : ""}>
                                                {shipping === 0 ? "Free" : formatPrice(shipping)}
                                            </span>
                                        </div>
                                        {shipping > 0 && (
                                            <p className="text-xs text-muted-foreground">
                                                Free shipping on orders over PKR 5,000
                                            </p>
                                        )}
                                        <div className="pt-4 border-t flex justify-between font-bold text-lg">
                                            <span>Total</span>
                                            <span className="text-primary">{formatPrice(total)}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Link href="/checkout">
                                            <Button className="w-full rounded-xl" size="lg">
                                                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
                                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or</span></div>
                                        </div>
                                        <Link href="/shop">
                                            <Button variant="outline" className="w-full rounded-xl">Continue Shopping</Button>
                                        </Link>
                                    </div>

                                    {/* Payment Methods */}
                                    <div className="pt-4 border-t">
                                        <p className="text-xs text-muted-foreground text-center mb-2">Secure Payment Methods</p>
                                        <div className="flex justify-center gap-4 text-muted-foreground">
                                            <span className="text-xs font-medium">Cash on Delivery</span>
                                            <span className="text-xs">•</span>
                                            <span className="text-xs font-medium">JazzCash</span>
                                            <span className="text-xs">•</span>
                                            <span className="text-xs font-medium">EasyPaisa</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
