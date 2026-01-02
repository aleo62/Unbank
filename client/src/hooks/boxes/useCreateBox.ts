import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BoxApi, CreateBoxDTO } from "../../api/Server";

export const useCreateBox = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateBoxDTO) => BoxApi.createBox(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["boxes"] });
        },
    });
};
