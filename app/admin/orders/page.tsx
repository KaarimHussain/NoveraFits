"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/orders")
            .then(res => res.json())
            .then(data => {
                setOrders(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-8">Loading orders...</div>;

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold">Orders</h1>

                <div className="space-y-4">
                    {orders.length === 0 ? (
                        <div className="text-muted-foreground">No orders found.</div>
                    ) : (
                        orders.map(order => (
                            <Card key={order.id}>
                                <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <div className="font-bold text-lg flex items-center gap-2">
                                            {order.id}
                                            <span className="text-xs font-normal text-muted-foreground px-2 py-0.5 border rounded-full">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
                                        <div className="text-sm mt-1">
                                            {order.items?.length} items • Sending to {order.shippingAddress?.city}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-xl">${Number(order.total).toFixed(2)}</div>
                                        <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full mt-1 ${order.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                                                order.status === "SHIPPED" ? "bg-blue-100 text-blue-800" :
                                                    "bg-green-100 text-green-800"
                                            }`}>
                                            {order.status || "PENDING"}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
