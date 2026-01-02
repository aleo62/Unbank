import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { AuthApi, RegisterRequestDTO } from "../../api/Server";

export const useRegister = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: RegisterRequestDTO) => AuthApi.register(data),
        onSuccess: () => {
            navigate("/");
        },
    });
};
