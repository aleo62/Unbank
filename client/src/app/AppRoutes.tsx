import { Route, BrowserRouter as Router, Routes } from "react-router";
import { Home } from "../pages/Home";
import { Register } from "@/pages/Register";
import { Login } from "@/pages/Login";

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
