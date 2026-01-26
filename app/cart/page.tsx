"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus } from "lucide-react";

const cartItems = [
    {
        id: 1,
        name: "Classic Striped Shirt",
        price: 4500,
        size: "M",
        color: "Blue",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=200&auto=format&fit=crop",
        quantity: 1,
    },
    {
        id: 2,
        name: "Cotton Blazer",
        price: 8500,
        size: "L",
        color: "Beige",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=200&auto=format&fit=crop",
        quantity: 1,
    },
];

export default function CartPage() {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="container-width py-12">
            <h1 className="text-3xl font-bold mb-8">Shopping Bag (2)</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left: Cart Items */}
                <div className="flex-1 space-y-8">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-6">
                            <div className="w-24 h-32 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium text-lg">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">Size: {item.size} | Color: {item.color}</p>
                                    </div>
                                    <p className="font-bold">Rs. {item.price.toLocaleString()}</p>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3 border rounded-md p-1">
                                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-sm">
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-sm">
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right: Summary */}
                <div className="w-full lg:w-96 flex-shrink-0">
                    <div className="bg-muted/30 rounded-xl p-8 space-y-6">
                        <h2 className="text-xl font-bold">Order Summary</h2>

                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>Rs. {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping Estimate</span>
                                <span>Calculate</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Tax Estimate</span>
                                <span>Rs. {(subtotal * 0.05).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex justify-between text-lg font-bold">
                            <span>Order Total</span>
                            <span>Rs. {(subtotal * 1.05).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
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
