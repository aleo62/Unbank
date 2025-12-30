"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { useBoxesByUser } from "@/hooks/boxes/useBoxesByUser";
import { useTransactionsByUser } from "@/hooks/transactions/useTransactionsByUser";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
    const router = useRouter();
    const user = useUserStore((state) => state.user);

    const { data: transactions, isLoading: loadingTransactions } =
        useTransactionsByUser(user?.id || "");

    const { data: boxes, isLoading: loadingBoxes } = useBoxesByUser(
        user?.id || ""
    );

    useEffect(() => {
        if (!user?.isAuthenticated) {
            router.push("/auth/login");
        }
    }, [user, router]);

    if (!user?.isAuthenticated) {
        return null;
    }

    return (
        <div className="flex min-h-screen bg-zinc-100 dark:bg-zinc-950">
            <Sidebar />

            <main className="flex-1 p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold">Dashboard</h1>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                            Bem-vindo, {user.name}!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold">
                                    Caixinhas
                                </h2>
                                <button className="text-sm px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-opacity">
                                    Nova Caixinha
                                </button>
                            </div>

                            {loadingBoxes && (
                                <div className="text-center py-8 text-zinc-500">
                                    Carregando caixinhas...
                                </div>
                            )}

                            {boxes && boxes.length === 0 && (
                                <div className="text-center py-8 text-zinc-500">
                                    Nenhuma caixinha criada
                                </div>
                            )}

                            {boxes && boxes.length > 0 && (
                                <div className="space-y-3">
                                    {boxes.map((box: any) => (
                                        <div
                                            key={box.id}
                                            className="p-4 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg">
                                                        🏦 {box.name}
                                                    </h3>
                                                    {box.goal && (
                                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                                            Meta: R${" "}
                                                            {box.goal.toFixed(
                                                                2
                                                            )}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-xl text-green-600 dark:text-green-400">
                                                        R${" "}
                                                        {box.balance.toFixed(2)}
                                                    </p>
                                                    {box.goal && (
                                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                                            {(
                                                                (box.balance /
                                                                    box.goal) *
                                                                100
                                                            ).toFixed(0)}
                                                            %
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            {box.goal && (
                                                <div className="mt-3 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                                                    <div
                                                        className="bg-green-600 dark:bg-green-400 h-2 rounded-full transition-all"
                                                        style={{
                                                            width: `${Math.min(
                                                                (box.balance /
                                                                    box.goal) *
                                                                    100,
                                                                100
                                                            )}%`
                                                        }}
                                                    ></div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
                            <h2 className="text-2xl font-semibold mb-4">
                                Transações Recentes
                            </h2>

                            {loadingTransactions && (
                                <div className="text-center py-8 text-zinc-500">
                                    Carregando transações...
                                </div>
                            )}

                            {transactions && transactions.length === 0 && (
                                <div className="text-center py-8 text-zinc-500">
                                    Nenhuma transação encontrada
                                </div>
                            )}

                            {transactions && transactions.length > 0 && (
                                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                                    {transactions
                                        .slice(0, 10)
                                        .map((transaction: any) => (
                                            <div
                                                key={transaction.id}
                                                className="flex justify-between items-center p-4 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
                                            >
                                                <div>
                                                    <p className="font-semibold">
                                                        {transaction.type ===
                                                            "DEPOSIT" &&
                                                            "💰 Depósito"}
                                                        {transaction.type ===
                                                            "WITHDRAW" &&
                                                            "💸 Saque"}
                                                        {transaction.type ===
                                                            "TRANSFER" &&
                                                            "🔄 Transferência"}
                                                    </p>
                                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                                        {new Date(
                                                            transaction.createdAt
                                                        ).toLocaleDateString(
                                                            "pt-BR"
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p
                                                        className={`font-bold text-lg ${
                                                            transaction.type ===
                                                            "DEPOSIT"
                                                                ? "text-green-600 dark:text-green-400"
                                                                : "text-red-600 dark:text-red-400"
                                                        }`}
                                                    >
                                                        {transaction.type ===
                                                        "DEPOSIT"
                                                            ? "+"
                                                            : "-"}
                                                        R${" "}
                                                        {transaction.amount.toFixed(
                                                            2
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
