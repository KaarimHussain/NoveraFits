"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TrackingPage() {
    const [orderId, setOrderId] = useState("");
    const [orderData, setOrderData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderId) return;

        setLoading(true);
        setError("");
        setOrderData(null);

        try {
            const res = await fetch(`/api/orders/${orderId}`);
            if (!res.ok) {
                if (res.status === 404) throw new Error("Order not found");
                throw new Error("Failed to fetch order");
            }
            const data = await res.json();
            setOrderData(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Track Your Order</h1>
                    <p className="text-muted-foreground">
                        Enter your Order ID to see the current status.
                    </p>
                </div>

                <form onSubmit={handleTrack} className="flex gap-2">
                    <Input
                        placeholder="e.g. 7A2B9C..."
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="flex-1"
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? "Tracking..." : "Track"}
                    </Button>
                </form>

                {error && (
                    <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm text-center">
                        {error}
                    </div>
                )}

                {orderData && (
                    <Card className="animate-in fade-in slide-in-from-bottom-4">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex justify-between items-center">
                                <span>Order Details</span>
                                <span className="text-sm px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                                    {orderData.status || "PROCESSING"}
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="text-muted-foreground">Order ID</div>
                                    <div className="font-mono">{orderData.id}</div>
                                </div>
                                <div>
                                    <div className="text-muted-foreground">Date</div>
                                    <div>{new Date(orderData.createdAt).toLocaleDateString()}</div>
                                </div>
                                <div>
                                    <div className="text-muted-foreground">Total</div>
                                    <div>${orderData.total?.toFixed(2)}</div>
                                </div>
                            </div>

                            {orderData.shippingAddress && (
                                <div className="pt-4 border-t text-sm">
                                    <div className="font-medium mb-1">Shipping To</div>
                                    <div className="text-muted-foreground">
                                        {orderData.shippingAddress.city}, {orderData.shippingAddress.country}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
