import { createContext, useContext, type ReactNode } from "react";

const ThemeContext = createContext<{
    toggleTheme: () => void;
    darkMode: boolean;
}>({} as any);

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const verifyDarkMode = () => {
        return (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        );
    };

    const toggleTheme = () => {
        document.documentElement.classList.toggle("dark");
        if (verifyDarkMode()) localStorage.theme = "light";
        else localStorage.theme = "dark";
    };

    const darkMode = verifyDarkMode();

    return (
        <ThemeContext.Provider
            value={{ toggleTheme, darkMode }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
