import { Button } from "@/components/ui/button";
import { useGetMe } from "@/hooks/user/useGetMe";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";

export const BalanceCard = () => {
    const { data: user } = useGetMe();
    return (
        <div className="grid gap-2 bg-linear-to-t from-foreground to-foreground/80 text-background p-7 rounded-2xl w-full max-w-2xl overflow-hidden relative backdrop-blur-3xl shadow-xl">
            <div
                className="absolute inset-0 z-0 opacity-10  "
                style={{
                    background: "#000000",
                    backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px),
        radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)
      `,
                    backgroundSize: "20px 20px, 20px 20px, 20px 20px",
                    backgroundPosition: "0 0, 0 0, 0 0",
                }}
            />

            
            <h3 className="uppercase text-background text-md tracking-wider mb-8 z-1 flex items-center gap-2">
                Meu Saldo
            </h3>

            <div className="flex items-center justify-between">
                <h2 className="text-5xl font-semibold z-1 text-shadow-lg">
                    {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                    }).format(user?.balance || 0)}
                </h2>

                <div className="flex items-center gap-2 z-1">
                    <Button variant={"secondary"} size={"lg"}>
                        <BanknoteArrowUp /> Depositar
                    </Button>
                    <Button variant={"ghost"} size={"lg"}>
                        <BanknoteArrowDown /> Retirar
                    </Button>
                </div>
            </div>
        </div>
    );
};
