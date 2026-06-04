import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import Dashboard from "../pages/Dashboard";
import * as api from "../services/api";

vi.spyOn(api, "apiFetch").mockImplementation((endpoint) => {
    const respuestas = {
        "/productos": [{ id: 1 }],
        "/categorias": [{ id: 1 }],
        "/movimientos": [{ id: 1 }, { id: 2 }],
        "/usuarios": [{ id: 1 }],
    };

    return Promise.resolve(respuestas[endpoint]);
});

describe("Dashboard", () => {
    test("muestra los totales obtenidos desde la API", async () => {
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getAllByText(/Total registrados: 1/i).length).toBe(2);
            expect(screen.getByText(/Total registradas: 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Total registrados: 2/i)).toBeInTheDocument();
        });
    });
});