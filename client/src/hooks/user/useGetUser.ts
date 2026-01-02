import { useQuery } from "@tanstack/react-query";
import { UserApi } from "../../api/Server";

export const useGetUser = (userId: string) => {
    return useQuery({
        queryKey: ["user", userId],
        queryFn: async () => {
            const response = await UserApi.getUser(userId);
            return response.data;
        },
        enabled: !!userId,
    });
};
