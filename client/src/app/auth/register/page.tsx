"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/hooks/auth/useRegister";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerMutation = useRegister();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        registerMutation.mutate(
            { name, email, password },
            {
                onSuccess: () => {
                    router.push("/dashboard");
                }
            }
        );
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-linear-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-black">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Unbank
                    </h1>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                        Create your account and start your journey
                    </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {registerMutation.isError && (
                            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
                                Erro ao criar conta. Email já cadastrado?
                            </div>
                        )}

                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                            >
                                Full Name
                            </label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                            >
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                            >
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="h-4 w-4 rounded border-zinc-300 text-black focus:ring-black dark:border-zinc-700 dark:bg-zinc-800"
                                required
                            />
                            <label
                                htmlFor="terms"
                                className="ml-2 block text-sm text-zinc-700 dark:text-zinc-300"
                            >
                                I agree to the{" "}
                                <a
                                    href="#"
                                    className="font-medium text-black hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300 transition-colors"
                                >
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a
                                    href="#"
                                    className="font-medium text-black hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300 transition-colors"
                                >
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            disabled={registerMutation.isPending}
                        >
                            {registerMutation.isPending
                                ? "Creating..."
                                : "Create Account"}
                        </Button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500">
                                    Or
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 text-center text-sm">
                            <span className="text-zinc-500 dark:text-zinc-400">
                                Already have an account?{" "}
                            </span>
                            <Link
                                href="/auth/login"
                                className="font-medium text-black hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300 transition-colors"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
