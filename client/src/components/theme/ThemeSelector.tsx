import { useTheme } from "@/contexts/ThemeContext";
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { ThemeDropMenu } from "./ThemeDropMenu";

export const ThemeSelector = () => {
    const { darkMode } = useTheme();
    const [isDropOpen, setIsDropOpen] = useState(false);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                asChild
                onClick={() => setIsDropOpen(!isDropOpen)}
            >
                <div className="cursor-pointer flex items-center gap-1 text-muted-foreground">
                    {darkMode ? (
                        <>
                            <Moon /> Dark
                        </>
                    ) : (
                        <>
                            <Sun /> Light
                        </>
                    )}
                    <ChevronDown className="size-4 ml-3" />
                </div>
            </DropdownMenuTrigger>
            <ThemeDropMenu />
        </DropdownMenu>
    );
};
