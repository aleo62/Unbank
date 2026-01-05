import axios, { AxiosInstance } from "axios";

export enum ErrorCodeType {
    USER_NOT_FOUND = "USER_NOT_FOUND",
    INSUFFICIENT_BALANCE = "INSUFFICIENT_BALANCE",
    CANNOT_ACCESS_ANOTHER_USER_INFO = "CANNOT_ACCESS_ANOTHER_USER_INFO",
    INVALID_BODY = "INVALID_BODY",
    INVALID_TOKEN = "INVALID_TOKEN",
    INVALID_PASSOWRD = "INVALID_PASSOWRD",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export interface ErrorResponse {
    error: string;
    errorCode: ErrorCodeType;
    message: string;
    path: string;
    timestamp: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    balance: number;
}

export enum TransactionType {
    DEPOSIT = "DEPOSIT",
    WITHDRAW = "WITHDRAW",
    TRANSFER = "TRANSFER",
}

export interface CreateTransactionDTO {
    toUserId?: string;
    type: TransactionType;
    amount: number;
    password?: string;
    boxId?: string;
}

export interface Transaction {
    id: string;
    amount: number;
    type: TransactionType;
    createdAt: string;
    fromUser?: User;
    toUser?: User;
}

export interface CreateBoxDTO {
    name: string;
    description: string;
}

export interface Box {
    id: string;
    name: string;
    description: string;
    balance: number;
    userId: string;
}

export interface CreateResponseDTO<T> {
    message: string;
    object: T;
}

export interface LoginRequestDTO {
    email: string;
    password?: string;
}

export interface RegisterRequestDTO {
    email: string;
    password?: string;
    name: string;
}

export interface AuthResponseDTO {
    name: string;
    token: string;
}

export const loginPath = "/auth/login";

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const data = error.response.data as ErrorResponse;
            if (
                error.response.status === 403 &&
                data.errorCode === ErrorCodeType.INVALID_TOKEN
            ) {
                window.location.href = loginPath;
            }
        }
        return Promise.reject(error);
    }
);

export class TransactionApi {
    static async getAllTransactions(userId: string) {
        return api.get<Transaction[]>("/transactions", {
            params: { userId },
        });
    }

    static async createTransaction(body: CreateTransactionDTO) {
        return api.post<CreateResponseDTO<Transaction>>("/transactions", body);
    }
}

export class BoxApi {
    static async getAllBoxes(userId: string) {
        return api.get<Box[]>("/boxes", {
            params: { userId },
        });
    }

    static async createBox(body: CreateBoxDTO) {
        return api.post<CreateResponseDTO<Box>>("/boxes", body);
    }
}

export class UserApi {
    static async getUser(userId: string) {
        return api.get<User>("/users", {
            params: { userId },
        });
    }

    static async getSelfUser() {
        return api.get<User>("/users/me");
    }
}

export class AuthApi {
    static async login(body: LoginRequestDTO) {
        return api.post<AuthResponseDTO>("/auth/login", body);
    }

    static async register(body: RegisterRequestDTO) {
        return api.post<AuthResponseDTO>("/auth/register", body);
    }

    static async logout() {
        return api.post("/auth/logout");
    }
}

export default api;
