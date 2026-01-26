"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Circle } from "lucide-react";
import Easypaisa from "@/assets/images/Easypaisa-Logo.png";

import Logo from "@/assets/images/NoveraFits.png";

export default function CheckoutPage() {
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("cod");

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
                                    <span className="text-sm text-muted-foreground">Have an account? <a href="#" className="underline">Log in</a></span>
                                </div>

                                <div className="space-y-4">
                                    <Input type="email" placeholder="Email address" className="bg-muted/20" />
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="news" className="rounded border-gray-300" />
                                        <label htmlFor="news" className="text-sm text-muted-foreground">Email me with news and offers</label>
                                    </div>
                                </div>

                                <h2 className="text-xl font-semibold pt-6">Shipping Address</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input placeholder="First Name" />
                                    <Input placeholder="Last Name" />
                                    <Input placeholder="Address" className="col-span-2" />
                                    <Input placeholder="Apartment, suite, etc. (optional)" className="col-span-2" />
                                    <Input placeholder="City" />
                                    <Input placeholder="Postal Code" />
                                    <Input placeholder="Phone (optional)" className="col-span-2" />
                                </div>

                                <div className="flex justify-end pt-6">
                                    <Button size="lg" onClick={() => setStep(2)}>Continue to Shipping</Button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-enter">
                                <div className="border rounded-lg p-4 space-y-4 divide-y">
                                    <div className="flex justify-between py-2">
                                        <span className="text-muted-foreground">Contact</span>
                                        <span>user@example.com</span>
                                        <button className="text-sm underline" onClick={() => setStep(1)}>Change</button>
                                    </div>
                                    <div className="flex justify-between py-2 pt-4">
                                        <span className="text-muted-foreground">Ship to</span>
                                        <span>House 123, Street 4, DHA Phase 5, Lahore</span>
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
                                        <span className="font-bold">Rs. 250</span>
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
                                    <Button size="lg" className="w-48 bg-green-600 hover:bg-green-700">Pay Now</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="hidden lg:block w-[450px] bg-muted/30 border-l p-12 sticky top-0 h-screen">
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="relative h-16 w-16 bg-white rounded-md border overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=200" className="object-cover w-full h-full" />
                            <span className="absolute -top-2 -right-2 bg-gray-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium">Classic Striped Shirt</h3>
                            <p className="text-sm text-muted-foreground">M / Blue</p>
                        </div>
                        <span className="font-medium">Rs. 4,500</span>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative h-16 w-16 bg-white rounded-md border overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=200" className="object-cover w-full h-full" />
                            <span className="absolute -top-2 -right-2 bg-gray-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium">Cotton Blazer</h3>
                            <p className="text-sm text-muted-foreground">L / Beige</p>
                        </div>
                        <span className="font-medium">Rs. 8,500</span>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>Rs. 13,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Shipping</span>
                            <span>Rs. 250</span>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-2xl font-bold tracking-tight">
                            <span className="text-sm font-normal text-muted-foreground mr-2">PKR</span>
                            Rs. 13,250
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
