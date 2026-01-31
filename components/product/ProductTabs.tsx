"use client";

import { use, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, User, Loader2, Send } from "lucide-react";
import { addDoc, collection, doc, getDocs, orderBy, query, runTransaction, serverTimestamp, where, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface ProductTabsProps {
    productId: string;
    description: string;
    details: string;
}

interface Review {
    id: string;
    userName: string;
    rating: number;
    title: string;
    content: string;
    createdAt: any;
}

export function ProductTabs({ productId, description, details }: ProductTabsProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // New Review Form
    const [newReview, setNewReview] = useState({ name: "", rating: 5, title: "", content: "" });
    const [submitting, setSubmitting] = useState(false);

    const fetchReviews = async () => {
        try {
            const q = query(
                collection(db, "reviews"),
                where("productId", "==", productId),
                orderBy("createdAt", "desc")
            );
            const querySnapshot = await getDocs(q);
            const data: Review[] = [];
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() } as Review);
            });
            setReviews(data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setLoadingReviews(false);
        }
    };

    useEffect(() => {
        if (productId) {
            fetchReviews();
        }
    }, [productId]);

    const handleSubmitReview = async () => {
        if (!newReview.name || !newReview.title || !newReview.content) {
            toast.error("Please fill in all fields");
            return;
        }

        setSubmitting(true);
        try {
            await runTransaction(db, async (transaction) => {
                // 1. Get Product Stats (READ First)
                const productRef = doc(db, "products", productId);
                const productDoc = await transaction.get(productRef);

                // 2. Create Review (WRITE)
                const reviewRef = doc(collection(db, "reviews"));
                transaction.set(reviewRef, {
                    productId,
                    userName: newReview.name,
                    rating: newReview.rating,
                    title: newReview.title,
                    content: newReview.content,
                    createdAt: serverTimestamp(),
                });

                // 3. Update Product Stats (WRITE)
                if (productDoc.exists()) {
                    const productData = productDoc.data();
                    const currentCount = productData.reviewCount || 0;
                    const currentRating = productData.averageRating || 0;

                    const newCount = currentCount + 1;
                    const newRating = ((currentRating * currentCount) + newReview.rating) / newCount;

                    transaction.update(productRef, {
                        reviewCount: newCount,
                        averageRating: newRating
                    });
                }
            });

            toast.success("Review submitted!");
            setNewReview({ name: "", rating: 5, title: "", content: "" });
            setIsDialogOpen(false);
            fetchReviews(); // Refresh list
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Failed to submit review");
        } finally {
            setSubmitting(false);
        }
    };

    // Calculate stats from fetched reviews (or use product stats if passed, but calculating here is real-time for this view)
    const averageRating = reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0;

    const ratingCounts = [5, 4, 3, 2, 1].map(star => reviews.filter(r => r.rating === star).length);

    return (
        <div className="py-12 border-t mt-12 w-full">
            <Tabs defaultValue="description" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-8 mb-8">
                    <TabsTrigger
                        value="description"
                        className="rounded-none border-b-2 border-transparent px-0 pb-3 data-[state=active]:border-primary data-[state=active]:shadow-none bg-transparent"
                    >
                        Description
                    </TabsTrigger>
                    <TabsTrigger
                        value="details"
                        className="rounded-none border-b-2 border-transparent px-0 pb-3 data-[state=active]:border-primary data-[state=active]:shadow-none bg-transparent"
                    >
                        Product Details
                    </TabsTrigger>
                    <TabsTrigger
                        value="reviews"
                        className="rounded-none border-b-2 border-transparent px-0 pb-3 data-[state=active]:border-primary data-[state=active]:shadow-none bg-transparent"
                    >
                        Reviews ({reviews.length})
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
                    <p>{description}</p>
                </TabsContent>
                <TabsContent value="details" className="text-sm text-muted-foreground whitespace-pre-wrap">
                    <p>{details}</p>
                </TabsContent>
                <TabsContent value="reviews">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Summary Section */}
                        <div className="lg:col-span-1 space-y-6">
                            <h3 className="font-bold text-xl">Customer Reviews</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex text-yellow-500">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className={`h-5 w-5 ${star <= Math.round(averageRating) ? "fill-current" : "text-gray-300"}`} />
                                    ))}
                                </div>
                                <span className="font-medium">{averageRating.toFixed(1)} out of 5</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Based on {reviews.length} reviews</p>

                            <div className="space-y-3 pt-4">
                                {[5, 4, 3, 2, 1].map((rating, idx) => {
                                    const count = ratingCounts[idx];
                                    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                                    return (
                                        <div key={rating} className="flex items-center gap-3 text-sm">
                                            <span className="w-3">{rating}</span>
                                            <Star className="h-4 w-4 text-muted-foreground" />
                                            <Progress value={percentage} className="h-2" />
                                            <span className="w-8 text-right text-muted-foreground">{percentage.toFixed(0)}%</span>
                                        </div>
                                    )
                                })}
                            </div>

                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="w-full mt-4">Write a Review</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Write a Review</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <Label>Your Name</Label>
                                            <Input
                                                value={newReview.name}
                                                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Rating</Label>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button key={star} type="button" onClick={() => setNewReview({ ...newReview, rating: star })}>
                                                        <Star className={`h-6 w-6 ${star <= newReview.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Title</Label>
                                            <Input
                                                value={newReview.title}
                                                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                                                placeholder="Great product!"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Review</Label>
                                            <Textarea
                                                value={newReview.content}
                                                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                                                placeholder="Tell us what you liked..."
                                            />
                                        </div>
                                        <Button onClick={handleSubmitReview} disabled={submitting} className="w-full">
                                            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Submit Review
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Review List */}
                        <div className="lg:col-span-2 space-y-8">
                            {loadingReviews ? (
                                <div className="flex justify-center py-12">
                                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                </div>
                            ) : reviews.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    No reviews yet. Be the first to write one!
                                </div>
                            ) : (
                                reviews.map((review) => (
                                    <div key={review.id} className="border-b pb-8 last:border-0 hover:bg-muted/10 p-4 -mx-4 rounded-lg transition-colors">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                                    <User className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-sm">{review.userName}</h4>
                                                    <div className="flex text-yellow-400 text-xs mt-0.5">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-current" : "text-gray-300"}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-xs text-muted-foreground">
                                                {review.createdAt?.seconds ? new Date(review.createdAt.seconds * 1000).toLocaleDateString() : "Just now"}
                                            </span>
                                        </div>
                                        <h5 className="font-medium mb-2">{review.title}</h5>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {review.content}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
