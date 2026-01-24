"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Package, ShoppingCart, DollarSign, Clock, AlertTriangle, ExternalLink, LogOut } from "lucide-react";

export default function AdminDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/admin/login");
            } else {
                setUserName(user.displayName || user.email?.split("@")[0] || "Admin");
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, [router]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-secondary/20 dark:bg-background">
            {/* Header */}
            <header className="border-b bg-background">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-primary">Admin Dashboard</h1>
                        <p className="text-sm text-muted-foreground">Welcome back, {userName}</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/">
                            <Button variant="outline" size="sm">
                                <ExternalLink className="h-4 w-4 mr-2" /> View Store
                            </Button>
                        </Link>
                        <Button variant="ghost" size="sm" onClick={() => signOut(auth)}>
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="border-0 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                            <DollarSign className="h-5 w-5 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$0.00</div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle>
                            <Clock className="h-5 w-5 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Items</CardTitle>
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions & Recent Orders */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Quick Actions */}
                    <Card className="border-0 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Link href="/admin/products" className="block">
                                <Button variant="secondary" className="w-full justify-start gap-3 h-12">
                                    <Package className="h-5 w-5" />
                                    Manage Products
                                </Button>
                            </Link>
                            <Link href="/admin/orders" className="block">
                                <Button variant="secondary" className="w-full justify-start gap-3 h-12">
                                    <ShoppingCart className="h-5 w-5" />
                                    Manage Orders
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Recent Orders */}
                    <Card className="border-0 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-medium">Recent Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">No orders yet</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
