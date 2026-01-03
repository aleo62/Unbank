import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useGetTransactions } from "@/hooks/transactions/useGetTransactions";
import { useGetMe } from "@/hooks/user/useGetMe";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { format } from "date-fns";

export const TransactionsPage = () => {
    const { data: user } = useGetMe();
    const { data: transactions, isLoading } = useGetTransactions(
        user?.id || ""
    );

    if (isLoading) {
        return <div className="p-8">Carregando transações...</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Transações</h1>
            <div className="bg-card rounded-lg shadow-sm border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Detalhes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!transactions || transactions.length === 0 ? ( 
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center h-24 text-muted-foreground"
                                >
                                    Nenhuma transação encontrada.
                                </TableCell>
                            </TableRow>
                        )
                        : (
                            transactions.map((transaction) => {
                                const isDeposit =
                                    transaction.type === "DEPOSIT" ||
                                    (transaction.type === "TRANSFER" &&
                                        transaction.toUser?.id === user?.id);

                                return (
                                    <TableRow key={transaction.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {isDeposit ? (
                                                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <ArrowDownLeft className="w-4 h-4 text-red-500" />
                                                )}
                                                <span className="font-medium">
                                                    {transaction.type === "TRANSFER"
                                                        ? "Transferência"
                                                        : transaction.type === "DEPOSIT"
                                                        ? "Depósito"
                                                        : "Saque"}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {format(
                                                new Date(transaction.createdAt),
                                                "dd/MM/yyyy HH:mm"
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`font-semibold ${
                                                    isDeposit
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {isDeposit ? "+" : "-"}{" "}
                                                {new Intl.NumberFormat("pt-BR", {
                                                    style: "currency",
                                                    currency: "BRL",
                                                }).format(transaction.amount)}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {transaction.type === "TRANSFER" && (
                                                <span>
                                                    {isDeposit
                                                        ? `De: ${transaction.fromUser?.name}`
                                                        : `Para: ${transaction.toUser?.name}`}
                                                </span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
