import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

export const SidebarLayout = () => {
    return (
        <div className="flex h-screen w-full bg-background">
            <Sidebar />
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};
