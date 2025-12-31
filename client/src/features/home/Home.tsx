import { useTheme } from "@/contexts/ThemeContext";

export const Home = () => {
    const { toggleTheme } = useTheme();
    return <button onClick={toggleTheme}>Mudar</button>;
};
