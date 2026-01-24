"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
// import { auth } from "@/lib/firebase"; // For token if needed

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: ""
    });

    useEffect(() => {
        if (!id) return;
        // Fetch product details (using the Admin Products API - need to verify if GET /api/products returns individual or just list)
        // Wait, GET /api/products returns list. I should add GET /api/products/[id] ideally.
        // For MVP speed, I'll just fetch all and find it, OR quick implement GET /api/products/[id]
        // Let's implement GET /api/products/[id] quickly in next step.
        // For now, I'll Assume I can fetch list and filter.
        fetch("/api/products")
            .then(res => res.json())
            .then((data: any[]) => {
                const product = data.find(p => p.id === id);
                if (product) {
                    setFormData({
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        category: product.category,
                        stock: product.stock
                    });
                    setImages(product.images || []);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const data = new FormData();
            data.append("file", file);

            try {
                const res = await fetch("/api/upload", { method: "POST", body: data });
                if (!res.ok) throw new Error("Upload failed");
                const json = await res.json();
                setImages(prev => [...prev, json.url]);
            } catch (err) {
                console.error(err);
                alert("Image upload failed");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        // Note: I haven't implemented PUT /api/products/[id] yet. I will need to do that.
        // I'll add the task to do that next. 
        // For now, just logging.
        console.log("Saving...", { ...formData, images });

        // MVP: we need the API to update.
        // I will implement PUT /api/products/[id] in the next steps.
        try {
            // Mock success
            alert("Update feature pending implementation of PUT API");
            // router.push("/admin/products");
            setSaving(false);
        } catch (e) {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-2xl mx-auto space-y-6">
                <Link href="/admin/products" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
                </Link>

                <Card>
                    <CardHeader>
                        <CardTitle>Edit Product</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                placeholder="Product Name"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                            <textarea
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Description"
                                required
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    type="number"
                                    placeholder="Price"
                                    required
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                />
                                <Input
                                    type="number"
                                    placeholder="Stock Count"
                                    required
                                    value={formData.stock}
                                    onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                />
                            </div>
                            <Input
                                placeholder="Category (e.g. Dresses)"
                                required
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            />

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Images</label>
                                <div className="grid grid-cols-4 gap-4">
                                    {images.map((img, i) => (
                                        <div key={i} className="relative aspect-square rounded-lg overflow-hidden border">
                                            <img src={img} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                    <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg aspect-square cursor-pointer hover:bg-secondary/50 transition-colors">
                                        <Upload className="h-6 w-6 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground mt-1">Upload</span>
                                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                    </label>
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={saving}>
                                {saving ? "Saving..." : "Save Changes"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
