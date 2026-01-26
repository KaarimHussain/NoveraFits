import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle2, Clock, Truck } from "lucide-react";

export default function AdminOrdersPage() {
    const orders = [
        { id: "#ORD-7829", customer: "Omer Khan", date: "Jan 26, 2026", total: 4500, status: "Pending", items: 1 },
        { id: "#ORD-7828", customer: "Ayesha Malik", date: "Jan 25, 2026", total: 12500, status: "Shipped", items: 3 },
        { id: "#ORD-7827", customer: "Bilal Ahmed", date: "Jan 25, 2026", total: 8900, status: "Delivered", items: 2 },
        { id: "#ORD-7826", customer: "Zoya Ali", date: "Jan 24, 2026", total: 3200, status: "Processing", items: 1 },
        { id: "#ORD-7825", customer: "Fatima Noor", date: "Jan 24, 2026", total: 15600, status: "Cancelled", items: 4 },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Pending": return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="mr-1 h-3 w-3" /> Pending</Badge>;
            case "Processing": return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Truck className="mr-1 h-3 w-3" /> Processing</Badge>;
            case "Shipped": return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200"><Truck className="mr-1 h-3 w-3" /> Shipped</Badge>;
            case "Delivered": return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CheckCircle2 className="mr-1 h-3 w-3" /> Delivered</Badge>;
            case "Cancelled": return <Badge variant="destructive">Cancelled</Badge>;
            default: return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-8 animate-enter">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                    <p className="text-muted-foreground">Manage and track customer orders.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Export History</Button>
                </div>
            </div>

            <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                        <tr>
                            <th className="px-6 py-4">Order ID</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Items</th>
                            <th className="px-6 py-4">Total</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-muted/5 transition-colors">
                                <td className="px-6 py-4 font-medium">{order.id}</td>
                                <td className="px-6 py-4">{order.customer}</td>
                                <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                                <td className="px-6 py-4">{order.items} items</td>
                                <td className="px-6 py-4 font-bold">Rs. {order.total.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    {getStatusBadge(order.status)}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Button variant="ghost" size="sm">
                                        <Eye className="mr-2 h-4 w-4" /> View
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
