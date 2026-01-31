"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Easypaisa from "@/assets/images/Easypaisa-Logo.png";
import Logo from "@/assets/images/NoveraFits.png";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";
import { collection, addDoc, runTransaction, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [loading, setLoading] = useState(false);

    // Cart Data
    const { items, getTotal, clearCart } = useCartStore();
    const subtotal = getTotal();
    const shipping = subtotal > 5000 ? 0 : 250; // Example logic from settings
    const total = subtotal + shipping;

    // Form State
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        postalCode: "",
        phone: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateStep1 = () => {
        if (!formData.email || !formData.firstName || !formData.lastName || !formData.address || !formData.city || !formData.phone) {
            toast.error("Please fill in all required fields.");
            return false;
        }
        return true;
    };

    const handlePlaceOrder = async () => {
        if (items.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        setLoading(true);
        try {
            // 1. Validate Stock & Deduct Inventory (Atomic Transaction)
            await runTransaction(db, async (transaction) => {
                for (const item of items) {
                    const productRef = doc(db, "products", item.id);
                    const productDoc = await transaction.get(productRef);

                    if (!productDoc.exists()) {
                        throw new Error(`Product "${item.name}" no longer exists.`);
                    }

                    const productData = productDoc.data();
                    // Assuming 'stock' is a simple number on the product for now.
                    // If variants are used, logic would need to access a specific variant field.
                    // Fallback: Check if 'variants' exists, else use 'stock'.

                    let currentStock = productData.stock || 0;

                    // Basic stock check
                    if (currentStock < item.quantity) {
                        throw new Error(`Insufficient stock for "${item.name}". Only ${currentStock} left.`);
                    }

                    // Deduct stock
                    transaction.update(productRef, { stock: currentStock - item.quantity });
                }
            });

            // 2. Create Order
            const orderData = {
                customer: {
                    ...formData,
                    name: `${formData.firstName} ${formData.lastName}`
                },
                items: items,
                financials: {
                    subtotal,
                    shipping,
                    total,
                    currency: "PKR"
                },
                payment: {
                    method: paymentMethod,
                    status: "pending"
                },
                status: "pending",
                createdAt: serverTimestamp(),
            };

            await addDoc(collection(db, "orders"), orderData);

            // 3. Success & Cleanup
            toast.success("Order placed successfully!");
            clearCart();
            router.push("/"); // Or an order success page
        } catch (error: any) {
            console.error("Checkout Error:", error);
            toast.error(error.message || "Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0 && step === 1) {
        // Optional: Redirect if empty, but for now just rendering empty state logic handles it via toast
    }

    return (
        <div className="min-h-screen bg-background flex flex-col lg:flex-row">
            {/* Left: Form Area */}
            <div className="flex-1 p-8 lg:p-12 lg:pr-24">
                <div className="max-w-2xl mx-auto">
                    {/* Logo */}
                    <div className="mb-12">
                        <img src={Logo.src} alt="NoveraFits" className="h-16 w-auto object-contain" />
                    </div>

                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-4 mb-12 text-sm font-medium">
                        <span className={step >= 1 ? "text-primary flex items-center gap-2" : "text-muted-foreground flex items-center gap-2"}>
                            <span className="h-6 w-6 rounded-full border flex items-center justify-center text-xs">1</span>
                            Information
                        </span>
                        <div className="h-px w-8 bg-border" />
                        <span className={step >= 2 ? "text-primary flex items-center gap-2" : "text-muted-foreground flex items-center gap-2"}>
                            <span className="h-6 w-6 rounded-full border flex items-center justify-center text-xs">2</span>
                            Shipping
                        </span>
                        <div className="h-px w-8 bg-border" />
                        <span className={step >= 3 ? "text-primary flex items-center gap-2" : "text-muted-foreground flex items-center gap-2"}>
                            <span className="h-6 w-6 rounded-full border flex items-center justify-center text-xs">3</span>
                            Payment
                        </span>
                    </div>

                    {/* Form Steps */}
                    <div className="space-y-8">
                        {step === 1 && (
                            <div className="space-y-6 animate-enter">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">Contact Information</h2>
                                </div>

                                <div className="space-y-4">
                                    <Input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        type="email"
                                        placeholder="Email address"
                                        className="bg-muted/20"
                                    />
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="news" className="rounded border-gray-300" />
                                        <label htmlFor="news" className="text-sm text-muted-foreground">Email me with news and offers</label>
                                    </div>
                                </div>

                                <h2 className="text-xl font-semibold pt-6">Shipping Address</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" />
                                    <Input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" />
                                    <Input name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" className="col-span-2" />
                                    <Input name="apartment" value={formData.apartment} onChange={handleInputChange} placeholder="Apartment, suite, etc. (optional)" className="col-span-2" />
                                    <Input name="city" value={formData.city} onChange={handleInputChange} placeholder="City" />
                                    <Input name="postalCode" value={formData.postalCode} onChange={handleInputChange} placeholder="Postal Code" />
                                    <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" className="col-span-2" />
                                </div>

                                <div className="flex justify-end pt-6">
                                    <Button size="lg" onClick={() => { if (validateStep1()) setStep(2); }}>Continue to Shipping</Button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-enter">
                                <div className="border rounded-lg p-4 space-y-4 divide-y">
                                    <div className="flex justify-between py-2">
                                        <span className="text-muted-foreground">Contact</span>
                                        <span>{formData.email}</span>
                                        <button className="text-sm underline" onClick={() => setStep(1)}>Change</button>
                                    </div>
                                    <div className="flex justify-between py-2 pt-4">
                                        <span className="text-muted-foreground">Ship to</span>
                                        <span>{formData.address}, {formData.city}</span>
                                        <button className="text-sm underline" onClick={() => setStep(1)}>Change</button>
                                    </div>
                                </div>

                                <h2 className="text-xl font-semibold">Shipping Method</h2>
                                <div className="space-y-4 border rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <input type="radio" checked readOnly className="text-primary" />
                                            <span>Standard Shipping (TCS/Leopard - 2-4 days)</span>
                                        </div>
                                        <span className="font-bold">Rs. {shipping}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between pt-6">
                                    <Button variant="ghost" onClick={() => setStep(1)}>Return to Information</Button>
                                    <Button size="lg" onClick={() => setStep(3)}>Continue to Payment</Button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6 animate-enter">
                                {/* Shipping Review */}
                                <div className="border rounded-lg p-4 space-y-4 divide-y mb-8">
                                    <div className="flex justify-between py-2">
                                        <span className="text-muted-foreground">Method</span>
                                        <span>Standard Shipping</span>
                                        <button className="text-sm underline" onClick={() => setStep(2)}>Change</button>
                                    </div>
                                </div>

                                <h2 className="text-xl font-semibold">Payment Method</h2>
                                <p className="text-sm text-muted-foreground">Select how you want to pay.</p>

                                <div className="space-y-4">
                                    {/* Easypaisa Option */}
                                    <div className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'easypaisa' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:border-primary/50'}`}
                                        onClick={() => setPaymentMethod('easypaisa')}>
                                        <div className="flex items-center gap-3">
                                            <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${paymentMethod === 'easypaisa' ? 'border-primary' : 'border-muted-foreground'}`}>
                                                {paymentMethod === 'easypaisa' && <div className="h-2 w-2 rounded-full bg-primary" />}
                                            </div>
                                            <span className="font-medium">Easypaisa</span>
                                        </div>
                                        <img src={Easypaisa.src} alt="Easypaisa" className="h-8 w-auto object-contain" />
                                    </div>

                                    {/* COD Option */}
                                    <div className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:border-primary/50'}`}
                                        onClick={() => setPaymentMethod('cod')}>
                                        <div className="flex items-center gap-3">
                                            <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-primary' : 'border-muted-foreground'}`}>
                                                {paymentMethod === 'cod' && <div className="h-2 w-2 rounded-full bg-primary" />}
                                            </div>
                                            <span className="font-medium">Cash on Delivery (COD)</span>
                                        </div>
                                        <span className="text-sm text-muted-foreground">Pay when you receive</span>
                                    </div>
                                </div>

                                {paymentMethod === 'easypaisa' && (
                                    <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground">
                                        <p>Please send the total amount to <strong>0300-1234567</strong> (NoveraFits) via Easypaisa.</p>
                                        <p className="mt-2">Use your Order ID as reference.</p>
                                    </div>
                                )}

                                <div className="flex justify-between pt-6">
                                    <Button variant="ghost" onClick={() => setStep(2)}>Return to Shipping</Button>
                                    <Button size="lg" className="w-48 bg-green-600 hover:bg-green-700" onClick={handlePlaceOrder} disabled={loading}>
                                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Pay Now"}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="hidden lg:block w-[450px] bg-muted/30 border-l p-12 sticky top-0 h-screen overflow-y-auto">
                <div className="space-y-6">
                    {items.map((item) => (
                        <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                            <div className="relative h-16 w-16 bg-white rounded-md border overflow-hidden">
                                <img src={item.image} className="object-cover w-full h-full" alt={item.name} />
                                <span className="absolute -top-2 -right-2 bg-gray-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {item.quantity}
                                </span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-sm text-muted-foreground">{item.size} / {item.color}</p>
                            </div>
                            <span className="font-medium">Rs. {Number(item.price).toLocaleString()}</span>
                        </div>
                    ))}

                    <Separator />

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>Rs. {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Shipping</span>
                            <span>Rs. {shipping}</span>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-2xl font-bold tracking-tight">
                            <span className="text-sm font-normal text-muted-foreground mr-2">PKR</span>
                            Rs. {total.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
