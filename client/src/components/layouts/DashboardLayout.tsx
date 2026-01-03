import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "@/features/dashboard/DashboardHeader";

export const DashboardLayout = () => {
    return (
        <div className="flex h-screen w-full  mx-auto relative bg-sidebar">
            <Sidebar />
            <main className="flex-1 rounded-4xl ">
                <DashboardHeader/>
                <Outlet />
            </main>
        </div>
    );
};
