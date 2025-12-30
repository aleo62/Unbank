import { boxesAPI } from "@/api/Server";
import { useQuery } from "@tanstack/react-query";

export const useBoxesByUser = (userId: string) => {
    return useQuery({
        queryKey: ["boxes", userId],
        queryFn: () => boxesAPI.getByUser(userId),
        enabled: !!userId
    });
};
