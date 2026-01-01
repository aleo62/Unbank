import { ThemeSelector } from "@/components/theme/ThemeSelector";

export const AuthHeader = () => {
    return (
        <header className="py-3  max-w-4xl w-full mx-auto px-4 flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl  font-medium flex items-center ">
                <span className="bg-amber-500/20 p-2 py-2.5 mr-2 text-amber-500 rounded-xl inset-ring inset-ring-amber-500/20 backdrop-blur-sm ">
                    un
                </span>
                bank.
            </h1>

            <ThemeSelector />
        </header>
    );
};
