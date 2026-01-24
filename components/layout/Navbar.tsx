"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, ShoppingBag, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Navbar() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="text-xl font-semibold tracking-tight shrink-0">
                    <span className="text-primary">Novera</span>
                    <span className="text-foreground">Fits</span>
                </Link>

                {/* Search Bar - Desktop */}
                <div className="hidden md:flex flex-1 max-w-md mx-auto">
                    <form onSubmit={handleSearch} className="relative w-full group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for clothing..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 rounded-full border border-input bg-secondary/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </form>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                    <Link href="/shop" className="hidden sm:block">
                        <Button variant="ghost" size="sm">
                            Shop
                        </Button>
                    </Link>
                    <Link href="/tracking" className="hidden sm:block">
                        <Button variant="ghost" size="sm">
                            Track Order
                        </Button>
                    </Link>

                    <ThemeToggle />

                    <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                        <span className="sr-only">Account</span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative"
                        onClick={() => typeof window !== "undefined" && window.dispatchEvent(new Event("toggle-cart-drawer"))}
                    >
                        <ShoppingBag className="h-5 w-5" />
                        <span className="sr-only">Cart</span>
                    </Button>

                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t bg-background p-4 animate-in slide-in-from-top-2 duration-200">
                    <form onSubmit={handleSearch} className="mb-4 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-secondary/50 text-sm"
                        />
                    </form>
                    <nav className="flex flex-col gap-1">
                        <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2.5 hover:bg-secondary rounded-lg transition-colors font-medium">
                            Shop All
                        </Link>
                        <Link href="/tracking" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2.5 hover:bg-secondary rounded-lg transition-colors font-medium">
                            Track Order
                        </Link>
                        <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2.5 hover:bg-secondary rounded-lg transition-colors font-medium">
                            View Cart
                        </Link>
                    </nav>
                </div>
            )}
        </nav>
    );
}
