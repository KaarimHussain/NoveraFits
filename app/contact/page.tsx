"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label"; // Importing Label again to be safe
import { Upload, Star } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container-width py-16 max-w-2xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold mb-4">We value your voice</h1>
                <p className="text-muted-foreground">
                    Please share your feedback or report any issues. We are committed to improving your experience.
                </p>
            </div>

            <div className="space-y-8 bg-card border rounded-xl p-8 shadow-sm">
                <div className="space-y-4">
                    <label className="text-sm font-medium">Reason for contact</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="quality">Product Quality</SelectItem>
                            <SelectItem value="delivery">Delivery Issue</SelectItem>
                            <SelectItem value="website">Website Bug</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-4">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea placeholder="Tell us more about your experience..." className="min-h-[120px]" />
                </div>

                <div className="space-y-4">
                    <label className="text-sm font-medium">Attachments (Optional)</label>
                    <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer">
                        <Upload className="h-8 w-8 mb-2" />
                        <span className="text-sm">Click to upload photos</span>
                        <span className="text-xs text-muted-foreground mt-1">JPG, PNG up to 10MB</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-sm font-medium">Rate your experience</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} className="text-yellow-400 hover:scale-110 transition-transform focus:outline-none">
                                <Star className="h-8 w-8 fill-current" />
                            </button>
                        ))}
                    </div>
                </div>

                <Button size="lg" className="w-full">Submit Feedback</Button>
            </div>
        </div>
    );
}
