import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackToHome from "../components/BackToHome.jsx";
import { apiFetch } from "../services/api.js";

function UsuarioDetalle() {
    const { id } = useParams();

    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        cargarUsuario();
    }, [id]);

    const cargarUsuario = async () => {
        try {
            const data = await apiFetch(`/usuarios/${id}`);
            setUsuario(data);
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

    if (!usuario) {
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
            <h2>Detalle de usuario</h2>

            <div className="card">
                <p><strong>ID:</strong> {usuario.id}</p>
                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Rol:</strong> {usuario.rol}</p>
            </div>
        </div>
    );
}

export default UsuarioDetalle;