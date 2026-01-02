import { useQuery } from "@tanstack/react-query";
import { TransactionApi } from "../../api/Server";

export const useGetTransactions = (userId: string) => {
    return useQuery({
        queryKey: ["transactions", userId],
        queryFn: async () => {
            const response = await TransactionApi.getAllTransactions(userId);
            return response.data;
        },
        enabled: !!userId,
    });
};
