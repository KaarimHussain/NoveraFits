"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Customer {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    totalOrders?: number;
    totalSpent?: number;
    createdAt?: string;
}

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                // Fetching from 'users' or 'customers' collection. 
                // Assuming we store customer info when they order or sign up.
                // For now, we'll try 'customers'. If empty, connection is working but no data.
                const querySnapshot = await getDocs(collection(db, "customers"));
                const customerData: Customer[] = [];
                querySnapshot.forEach((doc) => {
                    customerData.push({ id: doc.id, ...doc.data() } as Customer);
                });
                setCustomers(customerData);
            } catch (error) {
                console.error("Error getting customers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    const filteredCustomers = customers.filter(
        (c) =>
            c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>All Customers</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search customers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead className="text-right">Total Spent</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-10">
                                        Loading customers...
                                    </TableCell>
                                </TableRow>
                            ) : filteredCustomers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-10">
                                        No customers found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredCustomers.map((customer) => (
                                    <TableRow key={customer.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>
                                                        {(customer.firstName?.[0] || "") +
                                                            (customer.lastName?.[0] || "U")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span>
                                                    {customer.firstName} {customer.lastName}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{customer.email}</TableCell>
                                        <TableCell>{customer.phone || "N/A"}</TableCell>
                                        <TableCell className="text-right">
                                            Rs. {customer.totalSpent?.toLocaleString() || 0}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
