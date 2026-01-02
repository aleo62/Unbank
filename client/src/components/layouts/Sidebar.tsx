import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/auth/useLogout";
import { ArrowRightLeft, Home, LayoutGrid } from "lucide-react";
import { Link, useLocation } from "react-router";

export const Sidebar = () => {
    const { mutate: logout } = useLogout();
    const location = useLocation();

    const links = [
        { name: "Início", path: "/", icon: Home },
        { name: "Transações", path: "/transactions", icon: ArrowRightLeft },
        { name: "Caixinhas", path: "/boxes", icon: LayoutGrid },
    ];

    return (
        <div className="h-screen w-64 bg-card border-r flex flex-col p-4">
            <div className="mb-8 px-4 py-2">
                <h1 className="text-2xl font-bold text-primary">Unbank</h1>
            </div>

            <nav className="flex-1 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;

                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{link.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
                    onClick={() => logout()}
                >
                    <span className="font-medium">Sair</span>
                </Button>
            </div>
        </div>
    );
};
