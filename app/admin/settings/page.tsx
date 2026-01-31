"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        storeName: "Novera Fits",
        storeEmail: "contact@noverafits.com",
        storePhone: "",
        currency: "PKR",
        shippingRate: 250,
        freeShippingThreshold: 5000,
    });

    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, "settings", "general");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setSettings({ ...settings, ...docSnap.data() });
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, "settings", "general"), settings);
            toast.success("Settings saved successfully");
        } catch (error) {
            console.error("Error saving settings:", error);
            toast.error("Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full pt-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Store Settings</h2>
            </div>

            <div className="grid gap-4 max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>General Information</CardTitle>
                        <CardDescription>
                            Configure your store's basic details and shipping preferences.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-1">
                            <Label htmlFor="storeName">Store Name</Label>
                            <Input
                                id="storeName"
                                value={settings.storeName}
                                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="storeEmail">Contact Email</Label>
                                <Input
                                    id="storeEmail"
                                    value={settings.storeEmail}
                                    onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="storePhone">Contact Phone</Label>
                                <Input
                                    id="storePhone"
                                    value={settings.storePhone}
                                    onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
                                />
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-1">
                            <Label htmlFor="currency">Currency</Label>
                            <Input
                                id="currency"
                                value={settings.currency}
                                disabled
                                className="bg-muted"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="shippingRate">Standard Shipping Rate</Label>
                                <Input
                                    id="shippingRate"
                                    type="number"
                                    value={settings.shippingRate}
                                    onChange={(e) => setSettings({ ...settings, shippingRate: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="freeShipping">Free Shipping Threshold</Label>
                                <Input
                                    id="freeShipping"
                                    type="number"
                                    value={settings.freeShippingThreshold}
                                    onChange={(e) => setSettings({ ...settings, freeShippingThreshold: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                        </div>

                        <Button onClick={handleSave} disabled={saving} className="w-full">
                            {saving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
