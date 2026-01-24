"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
    const [theme, setTheme] = React.useState<"light" | "dark" | "system">("light");

    React.useEffect(() => {
        const stored = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
        if (stored) {
            setTheme(stored);
            applyTheme(stored);
        } else {
            // Default to system preference
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setTheme("system");
            applyTheme(prefersDark ? "dark" : "light");
        }
    }, []);

    const applyTheme = (newTheme: string) => {
        const root = document.documentElement;
        if (newTheme === "dark") {
            root.classList.add("dark");
        } else if (newTheme === "light") {
            root.classList.remove("dark");
        } else {
            // System
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (prefersDark) {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
        }
    };

    const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleThemeChange("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
