import { AppProviders } from "./app/AppProviders";
import { AppRoutes } from "./app/AppRoutes";

export const App = () => {
    return (
        <AppProviders>
            <AppRoutes />
        </AppProviders>
    );
};
