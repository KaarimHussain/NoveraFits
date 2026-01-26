"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/assets/images/NoveraFits.png";

export function Footer() {
    return (
        <footer className="bg-foreground text-background pt-20 overflow-hidden">
            <div className="container-width">
                {/* Top Section: Links & Newsletter */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">

                    {/* Brand & Newsletter (Col 1-5) */}
                    <div className="md:col-span-5 space-y-8">
                        <Link href="/" className="block w-fit">
                            <img src={Logo.src} alt="NoveraFits" className="h-20 w-auto object-contain invert brightness-0" />
                        </Link>
                        <p className="text-muted text-lg max-w-sm leading-relaxed">
                            Premium women&apos;s wear designed for the modern minimalist. Elevate your everyday style.
                        </p>
                        <div className="space-y-4">
                            <h4 className="font-semibold text-white">Join our newsletter</h4>
                            <form className="flex gap-2 max-w-sm">
                                <Input
                                    placeholder="Enter your email"
                                    type="email"
                                    className="bg-transparent border-white/20 text-white placeholder:text-white/40 focus:border-white rounded-none border-t-0 border-x-0 border-b px-0 h-10 outline-none shadow-none active:border-b active:border-0"
                                />
                                <Button variant="ghost" className="text-white hover:text-white/80 hover:bg-transparent px-0">
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block md:col-span-1" />

                    {/* Links (Col 7-12) */}
                    <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div>
                            <h4 className="font-semibold text-white mb-6">Shop</h4>
                            <ul className="space-y-4 text-sm text-muted">
                                <li><Link href="/shop" className="hover:text-white transition-colors">New Arrivals</Link></li>
                                <li><Link href="/shop?sort=best-sellers" className="hover:text-white transition-colors">Best Sellers</Link></li>
                                <li><Link href="/shop?cat=dresses" className="hover:text-white transition-colors">Dresses</Link></li>
                                <li><Link href="/shop?cat=activewear" className="hover:text-white transition-colors">Activewear</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-6">Support</h4>
                            <ul className="space-y-4 text-sm text-muted">
                                <li><Link href="/order-tracking" className="hover:text-white transition-colors">Track Order</Link></li>
                                <li><Link href="/returns" className="hover:text-white transition-colors">Returns</Link></li>
                                <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-6">Socials</h4>
                            <div className="flex flex-col gap-4 text-sm text-muted">
                                <Link href="#" className="hover:text-white transition-colors flex items-center gap-2">Instagram</Link>
                                <Link href="#" className="hover:text-white transition-colors flex items-center gap-2">Twitter</Link>
                                <Link href="#" className="hover:text-white transition-colors flex items-center gap-2">Facebook</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Copyright & Legal */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted/60 border-t border-white/10 pt-8 pb-32 md:pb-8">
                    <p>&copy; {new Date().getFullYear()} NoveraFits. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>

            {/* BIG TYPE - Parallax/Sticky feel */}
            <div className="w-full border-t border-white/10 mt-8 pt-20">
                <h1 className="text-[14vw] leading-[0.8] font-thin text-center tracking-tighter text-white/20 select-none pb-4 lg:pb-0">
                    NOVERA
                </h1>
            </div>
        </footer>
    );
}
