import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackToHome from "../components/BackToHome.jsx";
import { apiFetch } from "../services/api.js";

function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoriaEditando, setCategoriaEditando] = useState(null);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        cargarCategorias();
    }, []);

    const cargarCategorias = async () => {
        try {
            const data = await apiFetch("/categorias");
            setCategorias(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const limpiarFormulario = () => {
        setNombre("");
        setDescripcion("");
        setCategoriaEditando(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMensaje("");

        try {
            const datos = {
                nombre,
                descripcion,
            };

            if (categoriaEditando) {
                await apiFetch(`/categorias/${categoriaEditando.id}`, {
                    method: "PUT",
                    body: JSON.stringify(datos),
                });

                setMensaje("Categoría actualizada correctamente");
            } else {
                await apiFetch("/categorias", {
                    method: "POST",
                    body: JSON.stringify(datos),
                });

                setMensaje("Categoría creada correctamente");
            }

            limpiarFormulario();
            cargarCategorias();
        } catch (error) {
            setError(error.message);
        }
    };

    const editarCategoria = (categoria) => {
        setCategoriaEditando(categoria);
        setNombre(categoria.nombre);
        setDescripcion(categoria.descripcion || "");
        setError("");
        setMensaje("");
    };

    const eliminarCategoria = async (id) => {
        const confirmar = window.confirm("¿Seguro que querés eliminar esta categoría?");

        if (!confirmar) {
            return;
        }

        setError("");
        setMensaje("");

        try {
            await apiFetch(`/categorias/${id}`, {
                method: "DELETE",
            });

            setMensaje("Categoría eliminada correctamente");
            cargarCategorias();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="page">
            <BackToHome />
            <h2>Categorías</h2>

            {error && <p className="error">{error}</p>}
            {mensaje && <p>{mensaje}</p>}

            <form onSubmit={handleSubmit} className="form">
                <h3>{categoriaEditando ? "Editar categoría" : "Nueva categoría"}</h3>

                <div>
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Descripción</label>
                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>

                <button type="submit">
                    {categoriaEditando ? "Actualizar" : "Crear"}
                </button>

                {categoriaEditando && (
                    <button type="button" onClick={limpiarFormulario}>
                        Cancelar
                    </button>
                )}
            </form>

            <ul className="list">
                {categorias.map((cat) => (
                    <li key={cat.id}>
                        <Link to={`/categorias/${cat.id}`} className="categoria-link">
                            {cat.nombre}
                        </Link>

                        <button type="button" onClick={() => editarCategoria(cat)}>
                            Editar
                        </button>

                        <button type="button" onClick={() => eliminarCategoria(cat.id)}>
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categorias;