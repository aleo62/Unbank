import { authAPI, userAPI } from "@/api/Server";
import { useUserStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
    const setUser = useUserStore((state) => state.setUser);

    return useMutation({
        mutationFn: async ({
            name,
            email,
            password
        }: {
            name: string;
            email: string;
            password: string;
        }) => {
            await authAPI.register(name, email, password);
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
