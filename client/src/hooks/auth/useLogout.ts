import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthApi, loginPath } from "../../api/Server";

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => AuthApi.logout(),
        onSuccess: () => {
            queryClient.clear();
            window.location.href = loginPath;
        },
    });
};
