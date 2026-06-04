import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackToHome from "../components/BackToHome.jsx";
import { apiFetch } from "../services/api.js";

function CategoriaDetalle() {
    const { id } = useParams();

    const [categoria, setCategoria] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        cargarCategoria();
    }, [id]);

    const cargarCategoria = async () => {
        try {
            const data = await apiFetch(`/categorias/${id}`);
            setCategoria(data);
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

    if (!categoria) {
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
            <h2>Detalle de categoría</h2>

            <div className="card">
                <p><strong>ID:</strong> {categoria.id}</p>
                <p><strong>Nombre:</strong> {categoria.nombre}</p>
                <p><strong>Descripción:</strong> {categoria.descripcion}</p>
            </div>
        </div>
    );
}

export default CategoriaDetalle;