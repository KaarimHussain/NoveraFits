import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PromoSplit() {
    return (
        <section className="py-16 container-width">
            <div className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-2xl">
                {/* Left: Image */}
                <div className="relative h-[400px]">
                    <img
                        src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop"
                        alt="Summer Sale Collection"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right: Content */}
                <div className="bg-secondary/20 flex flex-col justify-center items-start p-12 space-y-6">
                    <h2 className="text-3xl font-bold md:text-4xl text-foreground">
                        Summer Sale <br />
                        <span className="text-secondary">Up to 40% Off</span>
                    </h2>
                    <p className="text-muted-foreground max-w-sm">
                        Discover the season&apos;s hottest trends at unbeatable prices.
                        Limited time offer on selected dresses and tops.
                    </p>
                    <Button size="lg" className="bg-foreground text-background hover:bg-foreground/80">
                        Shop Now
                    </Button>
                </div>
            </div>
        </section>
    );
}
