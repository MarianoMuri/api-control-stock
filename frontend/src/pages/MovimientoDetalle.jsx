import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackToHome from "../components/BackToHome.jsx";
import { apiFetch } from "../services/api.js";

function MovimientoDetalle() {
    const { id } = useParams();

    const [movimiento, setMovimiento] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        cargarMovimiento();
    }, [id]);

    const cargarMovimiento = async () => {
        try {
            const data = await apiFetch(`/movimientos/${id}`);
            setMovimiento(data);
        } catch (error) {
            setError(error.message);
        }
    };

    if (error) {
        return (
            <div className="page">
                <BackToHome />
                <p>{error}</p>
            </div>
        );
    }

    if (!movimiento) {
        return (
            <div className="page">
                <BackToHome />
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <div className="page">
            <BackToHome />
            <h2>Detalle de movimiento</h2>

            <div className="card">
                <p><strong>ID:</strong> {movimiento.id}</p>
                <p><strong>Fecha:</strong> {movimiento.fecha}</p>
                <p><strong>Tipo:</strong> {movimiento.tipo}</p>
                <p><strong>Cantidad:</strong> {movimiento.cantidad}</p>
                <p><strong>Producto:</strong> {movimiento.producto?.nombre || "-"}</p>
                <p><strong>Usuario:</strong> {movimiento.usuario?.nombre || "-"}</p>
            </div>
        </div>
    );
}

export default MovimientoDetalle;