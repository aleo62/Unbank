import { useQuery } from "@tanstack/react-query";
import { UserApi } from "../../api/Server";

export const useGetMe = () => {
    return useQuery({
        queryKey: ["user", "me"],
        queryFn: async () => {
            const response = await UserApi.getSelfUser();
            return response.data;
        },
        staleTime: Infinity,
        retry: false,
    });
};
