import { transactionsAPI } from "@/api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: transactionsAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["user"] });
        }
    });
};
