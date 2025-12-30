"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/auth/useLogout";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const logoutMutation = useLogout();

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                router.push("/auth/login");
            }
        });
    };

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: "📊" },
        { name: "Transações", href: "/dashboard/transactions", icon: "💸" },
        { name: "Caixinhas", href: "/dashboard/boxes", icon: "🏦" },
        { name: "Perfil", href: "/dashboard/profile", icon: "👤" }
    ];

    return (
        <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                <h1 className="text-2xl font-bold">Unbank</h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            pathname === item.href
                                ? "bg-zinc-100 dark:bg-zinc-800 font-semibold"
                                : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                        }`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                >
                    {logoutMutation.isPending ? "Saindo..." : "Sair"}
                </Button>
            </div>
        </aside>
    );
}
