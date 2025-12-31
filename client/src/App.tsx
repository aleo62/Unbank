import { AppRoutes } from "./app/AppRoutes";
import { ThemeProvider } from "./contexts/ThemeContext";

export const App = () => {
    return (
        <ThemeProvider>
            <AppRoutes />
        </ThemeProvider>
    );
};
