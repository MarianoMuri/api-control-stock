import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";

describe("Login", () => {
    test("renderiza el formulario de login", () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        expect(screen.getByText(/Iniciar sesión/i)).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: /Ingresar/i })
        ).toBeInTheDocument();

        expect(
            screen.getAllByRole("textbox").length
        ).toBeGreaterThan(0);
    });
});