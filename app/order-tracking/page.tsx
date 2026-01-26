"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Circle, Truck, Package, ShoppingBag } from "lucide-react";

export default function OrderTracking() {
    const [hasSearched, setHasSearched] = useState(false);

    // Mock status
    const steps = [
        { id: 1, name: "Order Placed", date: "Oct 24, 2024", completed: true, icon: ShoppingBag },
        { id: 2, name: "Processing", date: "Oct 25, 2024", completed: true, icon: Package },
        { id: 3, name: "Shipped", date: "Oct 26, 2024", completed: true, icon: Truck },
        { id: 4, name: "Delivered", date: "Estimated Oct 29", completed: false, icon: CheckCircle2 },
    ];

    return (
        <div className="container-width py-16 min-h-[60vh] flex flex-col items-center">
            <div className="max-w-md w-full text-center space-y-6">
                <h1 className="text-3xl font-bold">Track Your Order</h1>
                <p className="text-muted-foreground">Enter your order number to see the current status of your package.</p>

                <div className="flex gap-2">
                    <Input placeholder="Order Number (e.g., #1204)" className="h-11" />
                    <Button size="lg" className="h-11 px-8" onClick={() => setHasSearched(true)}>Track</Button>
                </div>
            </div>

            {hasSearched && (
                <div className="mt-16 w-full max-w-2xl bg-muted/20 p-8 rounded-xl border">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h2 className="font-bold text-lg">Order #1204</h2>
                            <p className="text-sm text-muted-foreground">Placed on October 24, 2024</p>
                        </div>
                        <Button variant="outline" size="sm">View Invoice</Button>
                    </div>

                    <div className="relative">
                        {/* Progress Bar Background */}
                        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-border -translate-y-1/2 -z-10" />

                        {/* Progress Bar Active */}
                        <div
                            className="absolute top-1/2 left-0 h-[2px] bg-primary -translate-y-1/2 -z-10 transition-all duration-1000"
                            style={{ width: '66%' }} // Mock 66% completion
                        />

                        <div className="flex justify-between items-start">
                            {steps.map((step) => {
                                const Icon = step.icon;
                                return (
                                    <div key={step.id} className="flex flex-col items-center text-center gap-3 bg-background px-2">
                                        <div className={`h-12 w-12 rounded-full border-2 flex items-center justify-center transition-colors ${step.completed ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted-foreground/30 text-muted-foreground'}`}>
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div className="space-y-0.5">
                                            <span className={`text-sm font-semibold ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>{step.name}</span>
                                            <p className="text-xs text-muted-foreground">{step.date}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-12 bg-card p-4 rounded-lg border flex items-center gap-4">
                        <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                            <Truck className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="font-medium">On the way to Pickup Station</p>
                            <p className="text-sm text-muted-foreground">Last updated: Today at 09:42 AM</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
