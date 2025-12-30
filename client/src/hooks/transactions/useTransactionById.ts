import { transactionsAPI } from "@/api/Server";
import { useQuery } from "@tanstack/react-query";

export const useTransactionById = (id: string) => {
    return useQuery({
        queryKey: ["transaction", id],
        queryFn: () => transactionsAPI.getById(id),
        enabled: !!id
    });
};
