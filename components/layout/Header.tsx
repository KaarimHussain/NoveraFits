"use client";

import Link from "next/link";
import { ShoppingBag, User, Package, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Logo from "@/assets/images/NoveraFits.png";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
            {/* Notification Strip */}
            <div className="w-full bg-primary text-primary-foreground text-xs py-2 text-center font-medium tracking-wide">
                Free Shipping on all orders over Rs. 5,000
            </div>

            <div className="container-width flex h-20 items-center justify-between gap-4">

                {/* Logo */}
                <Link href="/" className="block flex-shrink-0">
                    <img src={Logo.src} alt="NoveraFits" className="h-16 w-auto object-contain" />
                </Link>

                {/* Desktop Navigation (Center) */}
                <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
                    <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
                    <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                </nav>

                {/* Right: User Actions */}
                <div className="flex items-center gap-2">
                    {/* Order Tracking */}
                    <Link href="/order-tracking" title="Track Order" className="hidden sm:flex">
                        <Button variant="ghost" size="icon" aria-label="Track Order">
                            <Package className="h-5 w-5" />
                        </Button>
                    </Link>

                    {/* Cart */}
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
                            <ShoppingBag className="h-5 w-5" />
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-secondary text-secondary-foreground hover:bg-secondary">
                                2
                            </Badge>
                        </Button>
                    </Link>

                    {/* Mobile Menu Trigger */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader className="mb-8">
                                <SheetTitle className="text-left">Menu</SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-4">
                                <Link href="/" className="text-lg font-medium hover:text-primary">Home</Link>
                                <Link href="/shop" className="text-lg font-medium hover:text-primary">Shop</Link>
                                <Link href="/categories" className="text-lg font-medium hover:text-primary">Categories</Link>
                                <Link href="/about" className="text-lg font-medium hover:text-primary">About</Link>
                                <Link href="/order-tracking" className="text-lg font-medium hover:text-primary pt-4 border-t mt-2">Track Order</Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
