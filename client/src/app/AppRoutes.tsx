import { Route, BrowserRouter as Router, Routes } from "react-router";
import { Home } from "../features/home/Home";
import { Register } from "@/features/auth/Register";
import { Login } from "@/features/auth/Login";

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};
