"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit, Loader2, X, Upload } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Types
interface Variant {
    size: string;
    colorName: string;
    colorCode: string;
    stock: number;
}

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    details: string; // Rich details text
    category: string;
    images: string[];
    variants: Variant[];
    status: "Active" | "Draft" | "Archived";
    createdAt?: any;
}

interface Category {
    id: string;
    name: string;
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false); // Controls Dialog
    const [submitting, setSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState<Partial<Product>>({
        name: "",
        price: 0,
        description: "",
        details: "",
        category: "",
        status: "Active",
        images: [],
        variants: [],
    });

    // Temporary state for new variant entry
    const [newVariant, setNewVariant] = useState<Variant>({
        size: "",
        colorName: "",
        colorCode: "#000000",
        stock: 0,
    });

    // Temporary state for file uploads
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Products
            const productsSnap = await getDocs(collection(db, "products"));
            const productsData: Product[] = [];
            productsSnap.forEach((doc) => {
                productsData.push({ id: doc.id, ...doc.data() } as Product);
            });
            setProducts(productsData);

            // Fetch Categories
            const catsSnap = await getDocs(collection(db, "categories"));
            const catsData: Category[] = [];
            catsSnap.forEach((doc) => {
                catsData.push({ id: doc.id, ...doc.data() } as Category);
            });
            setCategories(catsData);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            price: 0,
            description: "",
            details: "",
            category: "",
            status: "Active",
            images: [],
            variants: [],
        });
        setEditingId(null);
        setNewVariant({ size: "", colorName: "", colorCode: "#000000", stock: 0 });
    };

    const handleEdit = (product: Product) => {
        setFormData(product);
        setEditingId(product.id);
        setOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            await deleteDoc(doc(db, "products", id));
            toast.success("Product deleted");
            fetchData();
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Failed to delete product");
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        setUploading(true);
        const files = Array.from(e.target.files);

        try {
            const uploadedUrls: string[] = [];
            for (const file of files) {
                const data = new FormData();
                data.append("file", file);
                const res = await fetch("/api/upload", { method: "POST", body: data });
                const json = await res.json();
                if (json.success) uploadedUrls.push(json.url);
            }
            setFormData(prev => ({ ...prev, images: [...(prev.images || []), ...uploadedUrls] }));
        } catch (error) {
            console.error("Upload error", error);
            toast.error("Image upload failed");
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images?.filter((_, i) => i !== index)
        }));
    };

    const addVariant = () => {
        if (!newVariant.size || !newVariant.colorName || newVariant.stock < 0) {
            toast.error("Please fill valid variant details");
            return;
        }
        setFormData(prev => ({
            ...prev,
            variants: [...(prev.variants || []), newVariant]
        }));
        setNewVariant({ size: "", colorName: "", colorCode: "#000000", stock: 0 });
    };

    const removeVariant = (index: number) => {
        setFormData(prev => ({
            ...prev,
            variants: prev.variants?.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.price || !formData.category) {
            toast.error("Please fill core product info");
            return;
        }

        setSubmitting(true);
        try {
            const payload = {
                ...formData,
                updatedAt: new Date(),
            };

            if (editingId) {
                await updateDoc(doc(db, "products", editingId), payload);
                toast.success("Product updated");
            } else {
                await addDoc(collection(db, "products"), {
                    ...payload,
                    createdAt: new Date()
                });
                toast.success("Product created");
            }
            setOpen(false);
            resetForm();
            fetchData();
        } catch (error) {
            console.error("Error saving product:", error);
            toast.error("Failed to save product");
        } finally {
            setSubmitting(false);
        }
    };

    // Helper to calculate total stock
    const getTotalStock = (variants?: Variant[]) => {
        return variants?.reduce((acc, curr) => acc + (curr.stock || 0), 0) || 0;
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                <Button onClick={() => { resetForm(); setOpen(true); }}>
                    <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
            </div>

            {/* Product List */}
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Total Stock</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-10">
                                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                                    </TableCell>
                                </TableRow>
                            ) : products.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-10">
                                        No products found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <div className="h-12 w-12 rounded-md border overflow-hidden bg-muted">
                                                {product.images?.[0] && <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell>{categories.find(c => c.id === product.category)?.name || "Unknown"}</TableCell>
                                        <TableCell>Rs. {product.price?.toLocaleString()}</TableCell>
                                        <TableCell>{getTotalStock(product.variants)}</TableCell>
                                        <TableCell>
                                            <Badge variant={product.status === 'Active' ? 'default' : 'secondary'}>
                                                {product.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(product.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Create/Edit Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingId ? "Edit Product" : "Create New Product"}</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                        {/* General Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Product Name</Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Classic T-Shirt"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(val) => setFormData({ ...formData, category: val })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(c => (
                                            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Price (PKR)</Label>
                                <Input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(val: any) => setFormData({ ...formData, status: val })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Draft">Draft</SelectItem>
                                        <SelectItem value="Archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label>Short Description</Label>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Brief summary..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Full Details</Label>
                            <Textarea
                                className="min-h-[100px]"
                                value={formData.details}
                                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                placeholder="Material materials, care instructions, etc..."
                            />
                        </div>

                        {/* Images */}
                        <div className="space-y-2">
                            <Label>Images</Label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                {formData.images?.map((url, i) => (
                                    <div key={i} className="relative h-24 w-24 border rounded-md overflow-hidden group">
                                        <img src={url} className="h-full w-full object-cover" />
                                        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-full p-1 cursor-pointer"
                                            onClick={() => removeImage(i)}
                                        >
                                            <X className="h-3 w-3 text-white" />
                                        </div>
                                    </div>
                                ))}
                                <label className="h-24 w-24 border border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                                    {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Upload className="h-6 w-6 text-muted-foreground" />}
                                    <span className="text-xs text-muted-foreground mt-1">Upload</span>
                                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                                </label>
                            </div>
                        </div>

                        {/* Variants */}
                        <div className="space-y-4 border rounded-lg p-4 bg-muted/10">
                            <h3 className="font-semibold text-sm">Variants (Size & Color)</h3>

                            <div className="grid grid-cols-5 gap-2 items-end">
                                <div className="space-y-1 col-span-1">
                                    <Label className="text-xs">Size</Label>
                                    <Input
                                        placeholder="S, M, L"
                                        value={newVariant.size}
                                        onChange={(e) => setNewVariant({ ...newVariant, size: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1 col-span-1">
                                    <Label className="text-xs">Color Name</Label>
                                    <Input
                                        placeholder="Red"
                                        value={newVariant.colorName}
                                        onChange={(e) => setNewVariant({ ...newVariant, colorName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1 col-span-1">
                                    <Label className="text-xs">Color Code</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="color"
                                            className="w-10 p-0 overflow-hidden"
                                            value={newVariant.colorCode}
                                            onChange={(e) => setNewVariant({ ...newVariant, colorCode: e.target.value })}
                                        />
                                        <Input
                                            value={newVariant.colorCode}
                                            onChange={(e) => setNewVariant({ ...newVariant, colorCode: e.target.value })}
                                            className="flex-1"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1 col-span-1">
                                    <Label className="text-xs">Stock</Label>
                                    <Input
                                        type="number"
                                        value={newVariant.stock}
                                        onChange={(e) => setNewVariant({ ...newVariant, stock: parseInt(e.target.value) })}
                                    />
                                </div>
                                <Button size="sm" onClick={addVariant} type="button">Add</Button>
                            </div>

                            {/* Variants List */}
                            {formData.variants && formData.variants.length > 0 && (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="py-2">Size</TableHead>
                                            <TableHead className="py-2">Color</TableHead>
                                            <TableHead className="py-2">Stock</TableHead>
                                            <TableHead className="py-2 text-right"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {formData.variants.map((v, i) => (
                                            <TableRow key={i}>
                                                <TableCell className="py-2 font-medium">{v.size}</TableCell>
                                                <TableCell className="py-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: v.colorCode }} />
                                                        {v.colorName}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-2">{v.stock}</TableCell>
                                                <TableCell className="py-2 text-right">
                                                    <X className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-destructive" onClick={() => removeVariant(i)} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </div>

                        <Button size="lg" className="w-full" onClick={handleSubmit} disabled={submitting}>
                            {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            {editingId ? "Update Product" : "Create Product"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
