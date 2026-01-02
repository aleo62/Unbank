import { useQuery } from "@tanstack/react-query";
import { BoxApi } from "../../api/Server";

export const useGetBoxes = (userId: string) => {
    return useQuery({
        queryKey: ["boxes", userId],
        queryFn: async () => {
            const response = await BoxApi.getAllBoxes(userId);
            return response.data;
        },
        enabled: !!userId,
    });
};
