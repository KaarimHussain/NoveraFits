import { DollarSign, Package, ShoppingBag, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8 animate-enter">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Overview of your store's performance.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Revenue", value: "Rs. 1,250,500", icon: DollarSign, change: "+12% from last month" },
                    { label: "Active Orders", value: "45", icon: ShoppingBag, change: "+5 since yesterday" },
                    { label: "Products in Stock", value: "124", icon: Package, change: "-2 low stock" },
                    { label: "Active Customers", value: "890", icon: TrendingUp, change: "+24 new users" },
                ].map((stat, i) => (
                    <div key={i} className="p-6 bg-card border rounded-xl shadow-sm space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">{stat.change}</p>
                    </div>
                ))}
            </div>

            {/* Recent Orders Overview */}
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 border rounded-xl bg-card shadow-sm p-6">
                    <h3 className="font-semibold text-lg mb-4">Recent Sales</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between py-3 border-b last:border-0 hover:bg-muted/10 transition-colors cursor-pointer px-2 rounded-md">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 text-xs rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                                        OM
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Omer Khan</p>
                                        <p className="text-xs text-muted-foreground">ordered Classic Striped Shirt</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-sm">Rs. 4,500</p>
                                    <p className="text-xs text-muted-foreground">2 mins ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border rounded-xl bg-card shadow-sm p-6">
                    <h3 className="font-semibold text-lg mb-4">Top Products</h3>
                    <div className="space-y-6">
                        {[
                            { name: "Classic Striped Shirt", sales: "1,200 sold" },
                            { name: "Cotton Blazer", sales: "940 sold" },
                            { name: "Elegance White Dress", sales: "850 sold" },
                            { name: "Summer Floral Top", sales: "600 sold" },
                        ].map((prod, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <span className="text-sm font-medium">{prod.name}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">{prod.sales}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
