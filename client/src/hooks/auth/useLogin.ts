import { authAPI, userAPI } from "@/api/Server";
import { useUserStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogin = () => {
    const setUser = useUserStore((state) => state.setUser);
    const router = useRouter();

    return useMutation({
        mutationFn: async ({
            email,
            password
        }: {
            email: string;
            password: string;
        }) => {
            await authAPI.login(email, password);
            const userProfile = await userAPI.getProfile();
            return userProfile;
        },
        onSuccess: (userProfile) => {
            setUser({
                id: userProfile.id,
                name: userProfile.name,
                email: userProfile.email,
                isAuthenticated: true
            });
        }
    });
};
