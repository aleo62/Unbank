import { Transaction, TransactionType } from "@/api/Server";
import { useGetMe } from "@/hooks/user/useGetMe";
import { format } from "date-fns";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";

export const TransactionItem = ({
    transaction,
}: {
    transaction: Transaction;
}) => {
    const { data: user } = useGetMe();

    const iconClassname = `p-3 w-fit rounded-lg ${
        transaction.type === TransactionType.DEPOSIT
            ? "text-green-500 bg-green-500/20"
            : "text-red-500 bg-red-500/20"
    }`;
    return (
        <div className="flex items-center gap-5 py-6">
            <div className={iconClassname}>
                {transaction.type === TransactionType.DEPOSIT ? (
                    <BanknoteArrowUp />
                ) : transaction.type === TransactionType.WITHDRAW ? (
                    <BanknoteArrowDown />
                ) : null}
            </div>

            <div>
                <h2 className="text-lg">
                    {transaction.toUser!.id === user?.id
                        ? (transaction.type === TransactionType.DEPOSIT
                              ? "Depósito"
                              : transaction.type === TransactionType.WITHDRAW
                              ? "Saque"
                              : "Transferência") + " Efetuado"
                        : transaction.toUser?.name}
                </h2>
                <p className="text-muted-foreground space-x-2 text-sm">
                    <span>
                        {transaction.type === TransactionType.DEPOSIT
                            ? "Depósito"
                            : transaction.type === TransactionType.WITHDRAW
                            ? "Saque"
                            : "Transferência"}
                    </span>
                    <span>&bull;</span>
                    <span>
                        {format(new Date(transaction.createdAt), "HH:mm")}
                    </span>
                </p>
            </div>

            <div className="ml-auto">
                {transaction.toUser!.id === user?.id &&
                transaction.type !== TransactionType.WITHDRAW ? (
                    <span className="text-green-500">
                        +
                        {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                        }).format(transaction.amount)}
                    </span>
                ) : (
                    <span className="text-red-500">
                        -
                        {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                        }).format(transaction.amount)}
                    </span>
                )}
            </div>
        </div>
    );
};
