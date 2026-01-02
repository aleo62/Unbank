import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { AuthApi, LoginRequestDTO } from "../../api/Server";

export const useLogin = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: LoginRequestDTO) => AuthApi.login(data),
        onSuccess: () => {
            navigate("/");
        },
    });
};
