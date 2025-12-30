import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, 
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== "undefined") {
                window.location.href = "/auth/login";
            }
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    login: async (email: string, password: string) => {
        const { data } = await api.post("/auth/login", { email, password });
        return data;
    },

    register: async (name: string, email: string, password: string) => {
        const { data } = await api.post("/auth/register", {
            name,
            email,
            password
        });
        return data;
    },

    logout: async () => {
        await api.post("/auth/logout");
    }
};

export const userAPI = {
    getProfile: async () => {
        const { data } = await api.get("/users/me");
        return data;
    },

    updateProfile: async (updates: any) => {
        const { data } = await api.put("/users/me", updates);
        return data;
    }
};

export const transactionsAPI = {
    getByUser: async (userId: string) => {
        const { data } = await api.get(`/transactions`, {
            params: {
                userId
            }
        });
        return data;
    },

    create: async (transaction: {
        type: string;
        amount: number;
        password: string;
        boxId?: string;
    }) => {
        const { data } = await api.post("/transactions", transaction);
        return data;
    },

    getById: async (id: string) => {
        const { data } = await api.get(`/transactions/${id}`);
        return data;
    }
};

export const boxesAPI = {
    getByUser: async (userId: string) => {
        const { data } = await api.get(`/boxes`, {
            params: {
                userId
            }
        });
        return data;
    },

    create: async (box: { name: string; goal?: number }) => {
        const { data } = await api.post("/boxes", box);
        return data;
    }
};
