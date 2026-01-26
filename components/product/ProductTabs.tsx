import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, User } from "lucide-react";

// Mock Reviews Data
const reviews = [
    {
        id: 1,
        name: "Sarah M.",
        date: "October 12, 2023",
        rating: 5,
        title: "Absolutely love it!",
        content: "The fabric is so soft and breathable. Fits perfectly and looks exactly like the photos. Will definitely be buying in more colors.",
    },
    {
        id: 2,
        name: "Emily R.",
        date: "September 28, 2023",
        rating: 5,
        title: "Perfect staple piece",
        content: "I've been looking for a high-quality striped shirt for ages and this is it. Great quality for the price.",
    },
    {
        id: 3,
        name: "Jessica K.",
        date: "September 15, 2023",
        rating: 4,
        title: "Great quality, runs slightly large",
        content: "The material feels amazing, but I found the fit to be a bit looser than expected. I'd recommend sizing down if you prefer a more fitted look.",
    },
];

export function ProductTabs() {
    return (
        <div className="py-12 border-t mt-12">
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
                        Reviews (120)
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="prose prose-sm max-w-none text-muted-foreground">
                    <p>
                        The Classic Striped Shirt is a wardrobe staple that combines effortless style with premium comfort.
                        Crafted from high-quality, breathable cotton, it features a relaxed fit that drapes beautifully
                        on all body types. The timeless vertical stripes elongate the silhouette, while the structured
                        collar adds a touch of sophistication.
                    </p>
                    <ul className="mt-4 list-disc pl-5 space-y-2">
                        <li>100% Organic Cotton</li>
                        <li>Relaxed fit</li>
                        <li>Machine washable</li>
                        <li>Ethically made in Portugal</li>
                    </ul>
                </TabsContent>
                <TabsContent value="details" className="text-sm text-muted-foreground">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-medium text-foreground mb-2">Material & Care</h4>
                            <p>100% Cotton. Machine wash cold with similar colors. Do not tumble dry. Warm iron if needed.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-foreground mb-2">Measurements</h4>
                            <p>Model is 5&apos;8&quot; is wearing a size S. Length: 26&quot; from shoulder to hem.</p>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="reviews">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Summary Section */}
                        <div className="lg:col-span-1 space-y-6">
                            <h3 className="font-bold text-xl">Customer Reviews</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex text-yellow-500">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className={`h-5 w-5 ${star <= 4.8 ? "fill-current" : "text-gray-300"}`} />
                                    ))}
                                </div>
                                <span className="font-medium">4.8 out of 5</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Based on 120 reviews</p>

                            <div className="space-y-3 pt-4">
                                {[5, 4, 3, 2, 1].map((rating, idx) => (
                                    <div key={rating} className="flex items-center gap-3 text-sm">
                                        <span className="w-3">{rating}</span>
                                        <Star className="h-4 w-4 text-muted-foreground" />
                                        <Progress value={[70, 20, 5, 3, 2][idx]} className="h-2" />
                                        <span className="w-8 text-right text-muted-foreground">{[70, 20, 5, 3, 2][idx]}%</span>
                                    </div>
                                ))}
                            </div>

                            <Button className="w-full mt-4">Write a Review</Button>
                        </div>

                        {/* Review List */}
                        <div className="lg:col-span-2 space-y-8">
                            {reviews.map((review) => (
                                <div key={review.id} className="border-b pb-8 last:border-0 hover:bg-muted/10 p-4 -mx-4 rounded-lg transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                                <User className="h-5 w-5 text-muted-foreground" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm">{review.name}</h4>
                                                <div className="flex text-yellow-400 text-xs mt-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-current" : "text-gray-300"}`} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-muted-foreground">{review.date}</span>
                                    </div>
                                    <h5 className="font-medium mb-2">{review.title}</h5>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {review.content}
                                    </p>
                                </div>
                            ))}

                            <Button variant="outline" className="w-full">Load More Reviews</Button>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
