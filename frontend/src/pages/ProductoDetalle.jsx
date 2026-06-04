import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackToHome from "../components/BackToHome.jsx";
import { apiFetch } from "../services/api.js";

function ProductoDetalle() {
    const { id } = useParams();

    const [producto, setProducto] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        cargarProducto();
    }, [id]);

    const cargarProducto = async () => {
        try {
            const data = await apiFetch(`/productos/${id}`);
            setProducto(data);
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

    if (!producto) {
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
            <h2>Detalle del producto</h2>

            <div className="card">
                <p><strong>ID:</strong> {producto.id}</p>
                <p><strong>Nombre:</strong> {producto.nombre}</p>
                <p><strong>Descripción:</strong> {producto.descripcion}</p>
                <p><strong>Precio:</strong> {producto.precio}</p>
                <p><strong>Stock:</strong> {producto.stock}</p>
                <p><strong>Categoría:</strong> {producto.categoria?.nombre || "Sin categoría"}</p>
            </div>
        </div>
    );
}

export default ProductoDetalle;