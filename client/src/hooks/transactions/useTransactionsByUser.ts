import { transactionsAPI } from "@/api/Server";
import { useQuery } from "@tanstack/react-query";

export const useTransactionsByUser = (userId: string) => {
    return useQuery({
        queryKey: ["transactions", userId],
        queryFn: () => transactionsAPI.getByUser(userId),
        enabled: !!userId
    });
};
