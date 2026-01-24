"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Need to create Table component or use simple divs
import { Plus, Edit, Trash } from "lucide-react";

// Simplified Table for speed if Shadcn Table not present, but I'll assume standard HTML table with Tailwind classes
// Actually sticking to standard HTML table with Tailwind classes for "Speed" unless I want to generate 'ui/table.tsx'

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/products")
            .then(res => res.json())
            .then(data => setProducts(Array.isArray(data) ? data : []))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Products</h1>
                    <Link href="/admin/products/new">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Product
                        </Button>
                    </Link>
                </div>

                <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-secondary text-secondary-foreground font-medium uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Image</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Price</th>
                                <th className="px-6 py-3">Stock</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {products.map((p) => (
                                <tr key={p.id} className="bg-background hover:bg-secondary/10 transition-colors">
                                    <td className="px-6 py-4">
                                        {p.images?.[0] ? (
                                            <img src={p.images[0]} alt={p.name} className="h-10 w-10 object-cover rounded-md" />
                                        ) : (
                                            <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center text-xs">No Img</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-medium">{p.name}</td>
                                    <td className="px-6 py-4">{p.category}</td>
                                    <td className="px-6 py-4">${p.price}</td>
                                    <td className="px-6 py-4">{p.stock}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Button size="icon" variant="ghost">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        {/* Implement Delete later */}
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                                        No products found. create one!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
