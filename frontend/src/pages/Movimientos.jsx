import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackToHome from "../components/BackToHome.jsx";
import { apiFetch } from "../services/api.js";

function Movimientos() {
    const [movimientos, setMovimientos] = useState([]);
    const [productos, setProductos] = useState([]);
    const [tipo, setTipo] = useState("ingreso");
    const [cantidad, setCantidad] = useState("");
    const [idProducto, setIdProducto] = useState("");
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        cargarMovimientos();
        cargarProductos();
    }, []);

    const cargarMovimientos = async () => {
        try {
            const data = await apiFetch("/movimientos");
            setMovimientos(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const cargarProductos = async () => {
        try {
            const data = await apiFetch("/productos");
            setProductos(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const limpiarFormulario = () => {
        setTipo("ingreso");
        setCantidad("");
        setIdProducto("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMensaje("");

        try {
            await apiFetch("/movimientos", {
                method: "POST",
                body: JSON.stringify({
                    tipo,
                    cantidad: Number(cantidad),
                    id_producto: Number(idProducto),
                }),
            });

            setMensaje("Movimiento registrado correctamente");
            limpiarFormulario();
            cargarMovimientos();
            cargarProductos();
        } catch (error) {
            setError(error.message);
        }
    };

    const eliminarMovimiento = async (id) => {
        const confirmar = window.confirm("¿Seguro que querés eliminar este movimiento?");

        if (!confirmar) {
            return;
        }

        setError("");
        setMensaje("");

        try {
            await apiFetch(`/movimientos/${id}`, {
                method: "DELETE",
            });

            setMensaje("Movimiento eliminado correctamente");
            cargarMovimientos();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="page">
            <BackToHome />
            <h2>Movimientos de stock</h2>

            {error && <p className="error">{error}</p>}
            {mensaje && <p>{mensaje}</p>}

            <form onSubmit={handleSubmit} className="form">
                <h3>Nuevo movimiento</h3>

                <div>
                    <label>Tipo</label>
                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    >
                        <option value="ingreso">Ingreso</option>
                        <option value="egreso">Egreso</option>
                    </select>
                </div>

                <div>
                    <label>Cantidad</label>
                    <input
                        type="number"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Producto</label>
                    <select
                        value={idProducto}
                        onChange={(e) => setIdProducto(e.target.value)}
                        required
                    >
                        <option value="">Seleccionar producto</option>
                        {productos.map((producto) => (
                            <option key={producto.id} value={producto.id}>
                                {producto.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Registrar movimiento</button>
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Producto</th>
                        <th>Tipo</th>
                        <th>Cantidad</th>
                        <th>Usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {movimientos.map((m) => (
                        <tr key={m.id}>
                            <td>
                                <Link to={`/movimientos/${m.id}`} className="table-link">
                                    {m.fecha}
                                </Link>
                            </td>
                            <td>{m.producto?.nombre || "-"}</td>
                            <td>{m.tipo}</td>
                            <td>{m.cantidad}</td>
                            <td>{m.usuario?.nombre || "-"}</td>
                            <td>
                                <button type="button" onClick={() => eliminarMovimiento(m.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Movimientos;