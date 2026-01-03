import { ThemeSelector } from "@/components/theme/ThemeSelector";
import { DashboardBreadcrump } from "./DashboardBreadcrump";

export const DashboardHeader = () => {
    return (
        <div className="border-b border-sidebar-border py-5 px-8 flex items-center justify-between">
            <DashboardBreadcrump />
            <ThemeSelector/>
        </div>
    );
};
