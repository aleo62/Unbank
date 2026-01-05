import { Transaction } from "@/api/Server";
import { format } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { TransactionItem } from "./TransactionItem";

export const TransactionsGroup = ({
    transactionsGroup,
}: {
    transactionsGroup: Record<string, Transaction[]>;
}) => {
    const { i18n } = useTranslation();

    return Object.entries(transactionsGroup).map(([date, txs]) => (
        <div key={date}>
            <h2 className="text-muted-foreground text-xl ">
                {format(new Date(date + "T12:00:00Z"), "PPPP", {
                    locale: i18n.language == "en" ? enUS : ptBR,
                })}
            </h2>

            <div className="divide-y divide-y-border/10">
                {txs?.map((tx) => (
                    <TransactionItem key={tx.id} transaction={tx} />
                ))}
            </div>
        </div>
    ));
};
