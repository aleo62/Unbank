import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTransactionDTO, TransactionApi } from "../../api/Server";

export const useCreateTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTransactionDTO) =>
            TransactionApi.createTransaction(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });
};
