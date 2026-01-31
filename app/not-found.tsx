import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 space-y-6">
            <div className="space-y-2">
                <h1 className="text-8xl font-bold tracking-tighter text-muted-foreground/30">404</h1>
                <h2 className="text-3xl font-bold tracking-tight">Page Not Found</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                    We couldn't find the page you were looking for. It might have been removed, renamed, or doesn't exist.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="rounded-full px-8">
                    <Link href="/">Back to Home</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                    <Link href="/shop">Continue Shopping</Link>
                </Button>
            </div>
        </div>
    );
}
