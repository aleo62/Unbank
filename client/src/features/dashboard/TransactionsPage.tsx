import { Transaction, TransactionType } from "@/api/Server";
import { Button } from "@/components/ui/button";
import { TransactionDialog } from "@/features/transactions/TransactionDialog";
import { useGetTransactions } from "@/hooks/transactions/useGetTransactions";
import { useGetMe } from "@/hooks/user/useGetMe";
import { useState } from "react";
import { TransactionsGroup } from "./components/TransactionsGroup";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const TransactionsPage = () => {
    const { data: user } = useGetMe();
    const { data: transactions, isLoading } = useGetTransactions(
        user?.id || ""
    );
    const [isDepositOpen, setIsDepositOpen] = useState(false);
    const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

    if (isLoading) {
        return <div className="p-8">Carregando transações...</div>;
    }

    const transactionsByDate: Record<string, typeof transactions> | undefined =
        transactions?.reduce((acc, t) => {
            const date = t.createdAt.split("T")[0];

            if (!acc[date]) {
                acc[date] = [];
            }

            acc[date].push(t);
            return acc;
        }, {} as Record<string, typeof transactions>);

    return (
        <section className="p-8">
            <header className="flex justify-between items-center mb-15 ">
                <div className="">
                    <h1 className="text-4xl font-medium">Transações</h1>
                    <p className="text-muted-foreground">
                        Histórico completo de transações
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        onClick={() => setIsWithdrawOpen(true)}
                    >
                        Saque
                    </Button>
                    <Button onClick={() => setIsDepositOpen(true)}>
                        Depósito
                    </Button>
                </div>
            </header>

            <TransactionDialog
                isOpen={isDepositOpen}
                onClose={() => setIsDepositOpen(false)}
                type={TransactionType.DEPOSIT}
            />

            <TransactionDialog
                isOpen={isWithdrawOpen}
                onClose={() => setIsWithdrawOpen(false)}
                type={TransactionType.WITHDRAW}
            />

            <main className="grid grid-cols-[2fr_1.2fr] gap-6">
                <div className="w-full max-w-6xl space-y-5">
                    <TransactionsGroup
                        transactionsGroup={
                            transactionsByDate as Record<string, Transaction[]>
                        }
                    />
                </div>
                <div className="grid lg:grid-cols-2 gap-4">
                    <Card className="h-fit">
                        <CardHeader><CardTitle>Depósitos</CardTitle> <CardDescription>Observer seu percentual de depósitos</CardDescription></CardHeader>
                    </Card>
  
                </div>
            </main>
        </section>
    );
};
