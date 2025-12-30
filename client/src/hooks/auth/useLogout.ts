import { authAPI } from "@/api/Server";
import { useUserStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
    const clearUser = useUserStore((state) => state.clearUser);

    return useMutation({
        mutationFn: authAPI.logout,
        onSuccess: () => {
            clearUser();
        }
    });
};
