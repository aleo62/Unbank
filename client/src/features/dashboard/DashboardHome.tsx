import { useGetMe } from "@/hooks/user/useGetMe";
import { BalanceCard } from "./BalanceCard";
import { ClockFading } from "lucide-react";

export const DashboardHome = () => {
    const { data: user } = useGetMe();

    return (
        <section className="p-8 relative ">
            <h2 className="text-3xl mb-4">Olá, {user?.name}! 👋</h2>

            <main className="mt-10 space-y-10">
                <BalanceCard/>

                <div className="ring ring-border w-fit p-5 rounded-2xl shadow-md ">
                    <h3 className="uppercase  text-xl font-medium tracking-wider mb-8 z-1 flex items-center gap-2">
                        <ClockFading /> atividade recente
                    </h3>
                </div>
            </main>
        </section>
    );
};
