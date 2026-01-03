import { Button } from "@/components/ui/button";
import { useGetMe } from "@/hooks/user/useGetMe";
import { BanknoteArrowDown, BanknoteArrowUp, DollarSign, HandCoins } from "lucide-react";

export const BalanceCard = () => {
    const { data: user } = useGetMe();
    return (
        <div className="grid gap-2 bg-foreground/90 text-background p-7 rounded-2xl w-full max-w-2xl overflow-hidden relative backdrop-blur-3xl shadow-xl">
            <div
                className="absolute inset-0 z-0 opacity-20 -right-100"
                style={{
                    backgroundImage: `
          radial-gradient(circle at 50% 100%, rgba(255, 69, 0, 0.6) 0%, transparent 60%),
          radial-gradient(circle at 50% 100%, rgba(255, 140, 0, 0.4) 0%, transparent 70%),
          radial-gradient(circle at 50% 100%, rgba(255, 215, 0, 0.3) 0%, transparent 80%)
        `,
                }}
            />

            <div
                className="absolute inset-0 z-0 opacity-20 -left-100"
                style={{
                    backgroundImage: `
        radial-gradient(ellipse at 20% 30%, rgba(56, 189, 248, 0.4) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 70%),
        radial-gradient(ellipse at 60% 20%, rgba(236, 72, 153, 0.25) 0%, transparent 50%),
        radial-gradient(ellipse at 40% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 65%)
      `,
                }}
            />

            <h3 className="uppercase text-background/50 text-md tracking-wider mb-8 z-1 flex items-center gap-2">
                <HandCoins className="size-8"/> Meu Saldo
            </h3>

            <div className="flex items-center justify-between">
                <h2 className="text-5xl font-semibold z-1 text-shadow-lg">
                    {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                    }).format(user?.balance || 0)}
                </h2>

                <div className="flex items-center gap-2 z-1">
                    <Button size={"lg"}>
                        <BanknoteArrowUp /> Depositar
                    </Button>
                    <Button variant={"secondary"} size={"lg"}>
                        <BanknoteArrowDown /> Retirar
                    </Button>
                </div>
            </div>
        </div>
    );
};
