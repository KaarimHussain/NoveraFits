"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";

export default function CartPage() {
    const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore();

    // Hydration fix for Persist middleware
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // or a loading skeleton
    }

    const subtotal = getTotal();
    const itemCount = getItemCount();

    if (items.length === 0) {
        return (
            <div className="container-width py-20 flex flex-col items-center justify-center text-center space-y-6">
                <div className="bg-muted/30 p-6 rounded-full">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">Your cart is empty</h1>
                    <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                </div>
                <Button asChild size="lg" className="rounded-full px-8">
                    <Link href="/shop">Start Shopping</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container-width py-12">
            <h1 className="text-3xl font-bold mb-8">Shopping Bag ({itemCount})</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left: Cart Items */}
                <div className="flex-1 space-y-8">
                    {items.map((item) => (
                        <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-6 border-b pb-8 last:border-0 last:pb-0">
                            <div className="w-24 h-32 bg-gray-100 rounded-md shrink-0 overflow-hidden relative">
                                <img
                                    src={item.image || "/placeholder.png"}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <h3 className="font-medium text-lg leading-tight">{item.name}</h3>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            {item.size && <span>Size: {item.size}</span>}
                                            {item.size && item.color && <span>|</span>}
                                            {item.color && <span>Color: {item.color}</span>}
                                        </div>
                                    </div>
                                    <p className="font-bold">Rs. {item.price?.toLocaleString()}</p>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center gap-3 border rounded-md p-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 rounded-sm"
                                            onClick={() => updateQuantity(item.id, item.size, item.color, Math.max(0, item.quantity - 1))}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 rounded-sm"
                                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10 -mr-2"
                                        onClick={() => removeItem(item.id, item.size, item.color)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right: Summary */}
                <div className="w-full lg:w-96 shrink-0">
                    <div className="bg-muted/30 rounded-xl p-8 space-y-6 sticky top-24">
                        <h2 className="text-xl font-bold">Order Summary</h2>

                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>Rs. {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping Estimate</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Tax</span>
                                <span>Calculated at checkout</span>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex justify-between text-lg font-bold">
                            <span>Order Total</span>
                            <span>Rs. {subtotal.toLocaleString()}</span>
                        </div>

                        <Button size="lg" className="w-full" asChild>
                            <Link href="/checkout">Proceed to Checkout</Link>
                        </Button>

                        <p className="text-xs text-center text-muted-foreground mt-4">
                            Secure Checkout - SSL Encrypted
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
