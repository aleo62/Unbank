import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/auth/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import type z from "zod";
import { loginFormScheme } from "./auth.schema";

export const LoginForm = () => {
    const { mutate: login, isPending, error } = useLogin();

    const form = useForm<z.infer<typeof loginFormScheme>>({
        resolver: zodResolver(loginFormScheme),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof loginFormScheme>) {
        login(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-12 pt-8"
            >
                {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                        Login failed. Please check your credentials.
                    </div>
                )}

                <div className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="password"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label
                                htmlFor="remember-me"
                                className="text-sm text-muted-foreground"
                            >
                                Remember me
                            </label>
                        </div>
                        <a href="#" className="text-sm font-medium">
                            Forgot password?
                        </a>
                    </div>
                </div>

                <div className="flex items-center justify-between w-full">
                    <Link
                        to={"/auth/register"}
                        className="text-sm font-medium text-foreground"
                    >
                        Sign up
                    </Link>
                    <Button
                        className="w-full max-w-1/3 "
                        size={"lg"}
                        type="submit"
                        disabled={isPending}
                    >
                        {isPending ? "Loading..." : "Submit"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
