import { useGetMe } from "@/hooks/user/useGetMe";
import { Navigate, Outlet } from "react-router";

export const ProtectedLayout = () => {
    const { data: user, isLoading, isError } = useGetMe();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen w-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (isError || !user) {
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <main className="w-full h-full">
            <Outlet />
        </main>
    );
};
