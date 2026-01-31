"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

export default function PromoPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        isVisible: true,
        title: "Summer Sale",
        highlight: "Up to 40% Off",
        description: "Discover the season's hottest trends at unbeatable prices.",
        buttonText: "Shop Now",
        link: "/shop",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "content", "promo");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFormData(docSnap.data() as any);
                }
            } catch (error) {
                console.error("Error fetching promo settings:", error);
                toast.error("Failed to load settings");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            let imageUrl = formData.image;

            if (imageFile) {
                const data = new FormData();
                data.append("file", imageFile);
                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: data,
                });
                const json = await res.json();
                if (json.success) {
                    imageUrl = json.url;
                } else {
                    throw new Error("Image upload failed");
                }
            }

            const dataToSave = {
                ...formData,
                image: imageUrl,
                updatedAt: new Date(),
            };

            await setDoc(doc(db, "content", "promo"), dataToSave);
            setFormData(dataToSave);
            setImageFile(null);
            toast.success("Promo settings saved");
        } catch (error) {
            console.error("Error saving settings:", error);
            toast.error("Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex-1 p-8 flex justify-center items-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Promo Section</h2>
                <Button onClick={handleSave} disabled={saving}>
                    {saving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                        </>
                    )}
                </Button>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Content Settings</CardTitle>
                        <CardDescription>
                            Manage text and visibility of the homepage promo section.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label className="text-base">Show on Homepage</Label>
                                <div className="text-sm text-muted-foreground">
                                    Toggle to hide or show this section.
                                </div>
                            </div>
                            <Switch
                                checked={formData.isVisible}
                                onCheckedChange={(checked) =>
                                    setFormData({ ...formData, isVisible: checked })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Main Title</Label>
                            <Input
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Highlight Text (Colored)</Label>
                            <Input
                                value={formData.highlight}
                                onChange={(e) =>
                                    setFormData({ ...formData, highlight: e.target.value })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Button Text</Label>
                                <Input
                                    value={formData.buttonText}
                                    onChange={(e) =>
                                        setFormData({ ...formData, buttonText: e.target.value })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Link URL</Label>
                                <Input
                                    value={formData.link}
                                    onChange={(e) =>
                                        setFormData({ ...formData, link: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Image Settings</CardTitle>
                        <CardDescription>
                            Update the promo banner image.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="aspect-video w-full relative bg-muted rounded-lg overflow-hidden border">
                            {formData.image ? (
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                    <ImageIcon className="h-10 w-10" />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Upload New Image</Label>
                            <Input type="file" accept="image/*" onChange={handleFileChange} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
