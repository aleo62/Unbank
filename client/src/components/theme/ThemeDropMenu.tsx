"use client";

import {
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeDropMenu() {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Tema</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
                checked={darkMode}
                onCheckedChange={toggleTheme}
            >
                Dark Mode
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
                checked={!darkMode}
                onCheckedChange={toggleTheme}
                disabled
            >
                Light Mode
            </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
    );
}
