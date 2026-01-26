"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from "lucide-react";
import Logo from "@/assets/images/NoveraFits.png";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-neutral-900 relative">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-black border-r hidden md:flex flex-col fixed h-full z-10">
                <div className="h-16 flex items-center px-6 border-b">
                    <img src={Logo.src} alt="NoveraFits Admin" className="h-8 w-auto" />
                    <span className="ml-2 font-bold text-sm tracking-widest uppercase text-muted-foreground">Admin</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link
                        href="/admin/dashboard"
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname === '/admin/dashboard' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/orders"
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname === '/admin/orders' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
                    >
                        <ShoppingCart className="h-4 w-4" />
                        Orders
                    </Link>
                    <Link
                        href="/admin/products"
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname === '/admin/products' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
                    >
                        <Package className="h-4 w-4" />
                        Products
                    </Link>
                    <Link
                        href="/admin/customers"
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname === '/admin/customers' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
                    >
                        <Users className="h-4 w-4" />
                        Customers
                    </Link>
                    <Link
                        href="/admin/settings"
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname === '/admin/settings' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
                    >
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                </nav>

                <div className="p-4 border-t">
                    <Link
                        href="/admin/login"
                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-destructive hover:bg-destructive/10 transition-colors"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
