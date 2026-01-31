"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface CarouselSlide {
    id: string;
    title: string;
    subtitle?: string;
    image: string;
    link?: string;
}

export default function CarouselPage() {
    const [slides, setSlides] = useState<CarouselSlide[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newSlide, setNewSlide] = useState({ title: "", subtitle: "", link: "" });
    const [imageFile, setImageFile] = useState<File | null>(null);

    const fetchSlides = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "carousel")); // order by functionality can be added later
            const querySnapshot = await getDocs(q);
            const data: CarouselSlide[] = [];
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() } as CarouselSlide);
            });
            setSlides(data);
        } catch (error) {
            console.error("Error fetching slides:", error);
            toast.error("Failed to fetch slides");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSlides();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!imageFile) {
            toast.error("An image is required for the carousel");
            return;
        }

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("file", imageFile);
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (!data.success) {
                throw new Error("Image upload failed");
            }

            await addDoc(collection(db, "carousel"), {
                ...newSlide,
                image: data.url,
                createdAt: new Date(),
            });

            toast.success("Slide added successfully");
            setNewSlide({ title: "", subtitle: "", link: "" });
            setImageFile(null);
            setOpen(false);
            fetchSlides();
        } catch (error) {
            console.error("Error adding slide:", error);
            toast.error("Failed to add slide");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this slide?")) return;
        try {
            await deleteDoc(doc(db, "carousel", id));
            toast.success("Slide deleted");
            fetchSlides();
        } catch (error) {
            console.error("Error deleting slide:", error);
            toast.error("Failed to delete slide");
        }
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Carousel Editor</h2>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Slide
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Slide</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="image">Banner Image (Required)</Label>
                                <Input id="image" type="file" onChange={handleFileChange} accept="image/*" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={newSlide.title}
                                    onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                                    placeholder="e.g. Summer Collection"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subtitle">Subtitle</Label>
                                <Input
                                    id="subtitle"
                                    value={newSlide.subtitle}
                                    onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                                    placeholder="e.g. Up to 50% off"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="link">Link (Optional)</Label>
                                <Input
                                    id="link"
                                    value={newSlide.link}
                                    onChange={(e) => setNewSlide({ ...newSlide, link: e.target.value })}
                                    placeholder="/shop/summer"
                                />
                            </div>
                            <Button onClick={handleSubmit} disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    "Create Slide"
                                )}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <div className="flex justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : slides.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-muted/10 border-dashed">
                    <ImageIcon className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No slides found. Add one to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {slides.map((slide) => (
                        <Card key={slide.id} className="overflow-hidden group">
                            <div className="relative aspect-video bg-muted">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                                />
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 p-1 rounded-md">
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => handleDelete(slide.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <CardHeader className="p-4">
                                <CardTitle className="text-lg">{slide.title || "Untitled"}</CardTitle>
                                {slide.subtitle && <p className="text-sm text-muted-foreground">{slide.subtitle}</p>}
                            </CardHeader>
                            {slide.link && <div className="px-4 pb-4 text-xs text-blue-500 truncate">{slide.link}</div>}
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
