import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";

describe("PrivateRoute", () => {
    test("redirige al login cuando no hay token", () => {
        localStorage.removeItem("token");

        render(
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <h1>Dashboard</h1>
                            </PrivateRoute>
                        }
                    />
                    <Route path="/login" element={<h1>Login</h1>} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText("Login")).toBeInTheDocument();
    });
});