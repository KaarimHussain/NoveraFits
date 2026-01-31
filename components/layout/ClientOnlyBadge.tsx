"use client";

import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";

export function ClientOnlyBadge() {
    const { getItemCount } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const count = getItemCount();

    if (count === 0) return null;

    return (
        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-secondary text-secondary-foreground hover:bg-secondary">
            {count}
        </Badge>
    );
}
