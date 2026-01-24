"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useCartStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { items, getTotal, clearCart } = useCartStore();
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
        paymentMethod: "cod"
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    // Format price in PKR
    const formatPrice = (price: number) => {
        return `PKR ${price.toLocaleString('en-PK')}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const subtotal = getTotal();
        const shipping = subtotal >= 5000 ? 0 : 350;
        const total = subtotal + shipping;

        try {
            const orderData = {
                customerEmail: formData.email,
                customerName: formData.name,
                customerPhone: formData.phone,
                shippingAddress: {
                    street: formData.address,
                    city: formData.city,
                    zip: formData.zip,
                    country: "Pakistan"
                },
                items: items.map(item => ({
                    productId: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    size: item.size,
                    color: item.color
                })),
                subtotal,
                shipping,
                total,
                paymentMethod: formData.paymentMethod
            };

            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData)
            });

            if (!res.ok) throw new Error("Order failed");

            const data = await res.json();
            const orderId = data.orderId;

            // Clear cart after successful order
            clearCart();

            // Show success toast
            toast.success("Order placed successfully!", {
                description: `Order ID: ${orderId}`,
            });

            // Redirect to tracking page
            router.push(`/tracking?new_order=${orderId}`);

        } catch (err) {
            console.error(err);
            toast.error("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <div className="min-h-screen bg-secondary/10 py-12 px-4">
                <div className="max-w-4xl mx-auto text-center py-20">
                    <p className="text-muted-foreground">Loading checkout...</p>
                </div>
            </div>
        );
    }

    // Redirect if cart is empty
    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-secondary/10 py-12 px-4">
                <div className="max-w-4xl mx-auto text-center py-20">
                    <p className="text-xl text-muted-foreground mb-4">Your cart is empty</p>
                    <Link href="/shop">
                        <Button size="lg" className="rounded-xl">Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const subtotal = getTotal();
    const shipping = subtotal >= 5000 ? 0 : 350;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-secondary/10 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Back to Cart */}
                <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back to Cart
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Input name="email" placeholder="Email Address" type="email" required onChange={handleChange} />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input name="name" placeholder="Full Name" required onChange={handleChange} />
                                    <Input name="phone" placeholder="Phone Number" type="tel" required onChange={handleChange} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Shipping Address</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Input name="address" placeholder="Street Address" required onChange={handleChange} />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input name="city" placeholder="City" required onChange={handleChange} />
                                    <Input name="zip" placeholder="Postal Code" required onChange={handleChange} />
                                </div>
                                <Input value="Pakistan" disabled className="bg-secondary/50" />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Method</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={formData.paymentMethod === "cod"}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-primary"
                                        />
                                        <div>
                                            <p className="font-medium">Cash on Delivery</p>
                                            <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="jazzcash"
                                            checked={formData.paymentMethod === "jazzcash"}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-primary"
                                        />
                                        <div>
                                            <p className="font-medium">JazzCash</p>
                                            <p className="text-sm text-muted-foreground">Pay via JazzCash mobile wallet</p>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="easypaisa"
                                            checked={formData.paymentMethod === "easypaisa"}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-primary"
                                        />
                                        <div>
                                            <p className="font-medium">EasyPaisa</p>
                                            <p className="text-sm text-muted-foreground">Pay via EasyPaisa mobile wallet</p>
                                        </div>
                                    </label>
                                </div>
                                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-200 text-sm rounded-xl">
                                    This is a demo store. No real payment will be processed.
                                </div>
                            </CardContent>
                        </Card>

                        <Button size="lg" className="w-full rounded-xl h-14 text-base" type="submit" disabled={loading}>
                            {loading ? "Processing..." : `Place Order - ${formatPrice(total)}`}
                        </Button>
                    </form>

                    {/* Summary */}
                    <div className="md:col-span-1">
                        <Card className="sticky top-20">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Cart Items */}
                                <div className="space-y-3 max-h-60 overflow-y-auto">
                                    {items.map((item, index) => (
                                        <div key={`${item.id}-${item.size}-${item.color}-${index}`} className="flex gap-3">
                                            <div className="relative w-16 h-20 rounded-lg overflow-hidden shrink-0 bg-secondary">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm truncate">{item.name}</p>
                                                <p className="text-xs text-muted-foreground">{item.size} / {item.color}</p>
                                                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-sm font-medium shrink-0">{formatPrice(item.price * item.quantity)}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Subtotal</span>
                                        <span>{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Shipping</span>
                                        <span className={shipping === 0 ? "text-green-600" : ""}>
                                            {shipping === 0 ? "Free" : formatPrice(shipping)}
                                        </span>
                                    </div>
                                    {shipping > 0 && (
                                        <p className="text-xs text-muted-foreground">
                                            Free shipping on orders over PKR 5,000
                                        </p>
                                    )}
                                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                                        <span>Total</span>
                                        <span className="text-primary">{formatPrice(total)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}
