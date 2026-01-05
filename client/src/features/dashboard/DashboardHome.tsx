import { useGetMe } from "@/hooks/user/useGetMe";
import { ClockFading } from "lucide-react";
import { BalanceCard } from "./components/BalanceCard";

export const DashboardHome = () => {
    const { data: user } = useGetMe();

    return (
        <section className="p-8 relative ">
            <div>
                <h2 className="text-5xl mb-4">
                    Olá, {user?.name}. Bom te ver de novo!
                </h2>
                <p className="text-lg text-muted-foreground">Veja suas finanças e faça o seu controle financeiro</p>
            </div>

            <main className="mt-15 space-y-10">
                <BalanceCard />

                <div className="ring ring-border w-fit p-5 rounded-2xl shadow-md ">
                    <h3 className="uppercase  text-xl font-medium tracking-wider mb-8 z-1 flex items-center gap-2">
                        <ClockFading /> atividade recente
                    </h3>
                </div>
            </main>
        </section>
    );
};
