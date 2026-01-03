import { Link, useLocation } from "react-router";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DashboardBreadcrumpItems } from "@/constants/dashboard-breadcrump";

export function DashboardBreadcrump() {
    const pathname = useLocation().pathname;

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {DashboardBreadcrumpItems.map(
                    (item, index) =>
                        pathname.includes(item.href) && (
                            <>
                                {index > 0 && <BreadcrumbSeparator />}
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link to={item.href}>{item.label}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </>
                        )
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
