import { ThemeSelector } from "@/components/theme/ThemeSelector";
import logo from "/logo/logo-full-lmode.png"

export const AuthHeader = () => {
    return (
        <header className="py-3  max-w-4xl w-full mx-auto px-4 flex items-center justify-between">
            <h1 >
                <img src={logo} className="w-40" alt="" />
            </h1>

            <ThemeSelector />
        </header>
    );
};
