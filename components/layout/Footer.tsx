import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full border-t bg-secondary/30 dark:bg-secondary/10 mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col items-center text-center gap-6">
                    {/* Logo */}
                    <div>
                        <h2 className="text-xl font-semibold">
                            <span className="text-primary">Novera</span>
                            <span className="text-foreground">Fits</span>
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Premium women's fashion
                        </p>
                    </div>

                    {/* Links */}
                    <nav className="flex gap-8 text-sm font-medium text-muted-foreground">
                        <Link href="/shop" className="hover:text-foreground transition-colors">
                            Shop
                        </Link>
                        <Link href="/tracking" className="hover:text-foreground transition-colors">
                            Track Order
                        </Link>
                        <Link href="#" className="hover:text-foreground transition-colors">
                            Contact
                        </Link>
                    </nav>

                    {/* Copyright */}
                    <div className="text-xs text-muted-foreground pt-4 border-t border-border/50 w-full max-w-xs">
                        &copy; {new Date().getFullYear()} NoveraFits. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
