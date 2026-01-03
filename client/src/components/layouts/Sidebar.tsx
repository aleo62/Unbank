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
import { useGetMe } from "@/hooks/user/useGetMe";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";
import { Link } from "react-router";

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
    const { data: user } = useGetMe();
    const [selected, setSelected] = useState<string>("Início");

    return (
        <AppSidebar className="absolute p-5! h-full border-r">
            <SidebarHeader className=" text-xl font-medium flex items-center flex-row text-shadow-sm">
                <span className="bg-amber-500/20 p-2  text-amber-500 rounded-lg inset-ring inset-ring-amber-500/20 backdrop-blur-sm ">
                    un
                </span>
                bank.
            </SidebarHeader>

            <SidebarContent className="mt-4!">
                <SidebarGroup>
                    <SidebarGroupContent className="">
                        <SidebarMenu className="space-y-3!">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        onClick={() => setSelected(item.title)}
                                        className={`text-lg h-fit! px-3! gap-3! ${
                                            selected === item.title
                                                ? "bg-foreground/90 text-background "
                                                : "hover:bg-foreground/5 text-muted-foreground"
                                        }`}
                                        asChild
                                    >
                                        <Link to={item.url}>
                                            <item.icon className="size-5.5! " />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="flex flex-row items-center p-2 hover:bg-foreground/5">
                <Avatar>
                    <AvatarImage
                        className="w-10 rounded-lg"
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                    <h3>{user?.name}</h3>
                    <p className="text-xs text-muted-foreground">
                        {user?.email}
                    </p>
                </div>
            </SidebarFooter>
        </AppSidebar>
    );
}
