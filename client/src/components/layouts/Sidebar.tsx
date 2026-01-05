import { ArrowRightLeft, Home, PackageOpen } from "lucide-react";

import {
    Sidebar as AppSidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useGetMe } from "@/hooks/user/useGetMe";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";
import { Link } from "react-router";
import logo from "/logo/logo.png";

const items = [
    {
        title: "Início",
        url: "",
        icon: Home,
    },
    {
        title: "Transações",
        url: "transactions",
        icon: ArrowRightLeft,
    },
    {
        title: "Caixinhas",
        url: "boxes",
        icon: PackageOpen,
    },
];

export function Sidebar() {
    useGetMe();
    const isMobile = useIsMobile();
    const [selected, setSelected] = useState<string>("Início");

    return (
        <AppSidebar
            collapsible={isMobile ? "offcanvas" : "none"}
            className="h-full p-3! py-8! border-r w-fit! bg-sidebar!"
        >
            <SidebarHeader className=" text-xl font-medium flex items-center flex-row text-shadow-sm p-0! justify-center">
                <img
                    src={logo}
                    alt="un"
                    className="w-12.5 drop-shadow-xl drop-shadow-amber-700/20"
                />
            </SidebarHeader>

            <SidebarContent className="items-center pt-8">
                <SidebarGroup className="p-0! w-fit!">
                    <SidebarGroupContent className="">
                        <SidebarMenu className="space-y-2!">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        onClick={() => setSelected(item.title)}
                                        className={`text-md h-fit! p-2! rounded-lg!  ${
                                            selected === item.title
                                                ? "bg-linear-to-t from-foreground/90 to-foreground/70 hover:text-background! text-background shadow-xl"
                                                : "hover:bg-foreground/5 text-muted-foreground"
                                        }`}
                                        asChild
                                    >
                                        <Link to={item.url}>
                                            <item.icon className="size-5.5! " />
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="flex items-center! relative w-full p-0!">
                <Avatar className="items-center! w-full">
                    <AvatarImage
                        className="w-10 rounded-full items-center!  absolute! bottom-0 left-1/2 -translate-x-1/2 shadow-xl"
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </SidebarFooter>
        </AppSidebar>
    );
}
