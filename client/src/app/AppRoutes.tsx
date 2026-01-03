import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { ProtectedLayout } from "@/components/layouts/ProtectedLayout";
import { Login } from "@/features/auth/Login";
import { Register } from "@/features/auth/Register";
import { BoxesPage } from "@/features/dashboard/BoxesPage";
import { DashboardHome } from "@/features/dashboard/DashboardHome";
import { TransactionsPage } from "@/features/dashboard/TransactionsPage";
import { NotFound } from "@/features/not-found/NotFound";
import { Route, BrowserRouter as Router, Routes } from "react-router";

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFound />} />

                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/login" element={<Login />} />

                <Route element={<ProtectedLayout />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/" element={<DashboardHome />} />
                        <Route
                            path="/transactions"
                            element={<TransactionsPage />}
                        />
                        <Route path="/boxes" element={<BoxesPage />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};
