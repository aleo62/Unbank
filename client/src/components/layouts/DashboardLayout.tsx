import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

export const DashboardLayout = () => {
    return (
        <div className="flex h-screen w-full mx-auto relative overflow-hidden">
            <Sidebar />
            <main className="flex-1 rounded-4xl mx-auto h-full overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};
