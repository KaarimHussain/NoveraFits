"use client";

import { useEffect, useState } from "react";
import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store";

// Simple global state for drawer
export const toggleCartDrawer = () => {
    window.dispatchEvent(new Event("toggle-cart-drawer"));
};

export default function CartDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore();

    useEffect(() => {
        setMounted(true);
        const handleToggle = () => setIsOpen((prev) => !prev);
        window.addEventListener("toggle-cart-drawer", handleToggle);
        return () => window.removeEventListener("toggle-cart-drawer", handleToggle);
    }, []);

    // Format price in PKR
    const formatPrice = (price: number) => {
        return `PKR ${price.toLocaleString('en-PK')}`;
    };

    // Prevent hydration mismatch
    if (!mounted) return null;

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Drawer */}
            <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-background shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-4 border-b flex items-center justify-between">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <ShoppingBag className="h-5 w-5" />
                            Cart ({getItemCount()})
                        </h2>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {items.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                                <ShoppingBag className="h-16 w-16 mb-4 opacity-20" />
                                <p className="text-lg font-medium">Your cart is empty</p>
                                <p className="text-sm mt-1">Add some items to get started</p>
                                <Button variant="link" onClick={() => setIsOpen(false)} className="mt-4">
                                    Continue Shopping
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item, index) => (
                                    <div key={`${item.id}-${item.size}-${item.color}-${index}`} className="flex gap-4 p-3 bg-secondary/30 rounded-xl">
                                        {/* Image */}
                                        <div className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-sm truncate">{item.name}</h3>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                {item.size} / {item.color}
                                            </p>
                                            <p className="text-sm font-semibold text-primary mt-1">
                                                {formatPrice(item.price)}
                                            </p>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                                                    className="w-7 h-7 rounded-md bg-background border flex items-center justify-center hover:bg-secondary transition-colors"
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                                                    className="w-7 h-7 rounded-md bg-background border flex items-center justify-center hover:bg-secondary transition-colors"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                                <button
                                                    onClick={() => removeItem(item.id, item.size, item.color)}
                                                    className="ml-auto w-7 h-7 rounded-md bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="p-4 border-t space-y-4 bg-background/80 backdrop-blur-sm">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium">{formatPrice(getTotal())}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total</span>
                                <span className="text-primary">{formatPrice(getTotal())}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <Link href="/cart" onClick={() => setIsOpen(false)}>
                                    <Button variant="outline" className="w-full rounded-xl">
                                        View Cart
                                    </Button>
                                </Link>
                                <Link href="/checkout" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full rounded-xl">
                                        Checkout
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
