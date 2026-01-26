"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/assets/images/NoveraFits.png";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Mock authentication
        setTimeout(() => {
            router.push("/admin/dashboard");
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-950">
            <div className="w-full max-w-sm p-8 space-y-8 bg-white dark:bg-black border rounded-2xl shadow-sm">
                <div className="text-center space-y-2">
                    <img src={Logo.src} alt="NoveraFits" className="h-12 w-auto mx-auto mb-6" />
                    <h1 className="text-2xl font-semibold tracking-tight">Admin Login</h1>
                    <p className="text-sm text-muted-foreground">Enter your credentials to access the panel.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            type="email"
                            placeholder="admin@noverafits.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"} <Lock className="ml-2 h-4 w-4" />
                    </Button>
                </form>

                <div className="text-center text-xs text-muted-foreground">
                    <p>Protected System. Unauthorized access is prohibited.</p>
                </div>
            </div>
        </div>
    );
}
