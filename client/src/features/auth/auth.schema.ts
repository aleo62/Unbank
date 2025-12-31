import z from "zod";

export const loginFormScheme = z.object({
    email: z.string().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
});
export const registerFormScheme = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().check(z.email()),
    password: z.string().min(1, "Password is required"),
});
