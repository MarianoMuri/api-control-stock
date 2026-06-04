import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackToHome from "../components/BackToHome.jsx";
import { apiFetch } from "../services/api.js";

function Productos() {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [idCategoria, setIdCategoria] = useState("");
    const [productoEditando, setProductoEditando] = useState(null);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        cargarProductos();
        cargarCategorias();
    }, []);

    const cargarProductos = async () => {
        try {
            const data = await apiFetch("/productos");
            setProductos(data);
        } catch (error) {
            setError(error.message);
        }
    };

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
        setPrecio("");
        setStock("");
        setIdCategoria("");
        setProductoEditando(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMensaje("");

        try {
            const datos = {
                nombre,
                descripcion,
                precio: Number(precio),
                stock: Number(stock),
                id_categoria: Number(idCategoria),
            };

            if (productoEditando) {
                await apiFetch(`/productos/${productoEditando.id}`, {
                    method: "PUT",
                    body: JSON.stringify(datos),
                });

                setMensaje("Producto actualizado correctamente");
            } else {
                await apiFetch("/productos", {
                    method: "POST",
                    body: JSON.stringify(datos),
                });

                setMensaje("Producto creado correctamente");
            }

            limpiarFormulario();
            cargarProductos();
        } catch (error) {
            setError(error.message);
        }
    };

    const editarProducto = (producto) => {
        setProductoEditando(producto);
        setNombre(producto.nombre);
        setDescripcion(producto.descripcion || "");
        setPrecio(producto.precio);
        setStock(producto.stock);
        setIdCategoria(producto.id_categoria);
        setError("");
        setMensaje("");
    };

    const eliminarProducto = async (id) => {
        const confirmar = window.confirm("¿Seguro que querés eliminar este producto?");

        if (!confirmar) {
            return;
        }

        setError("");
        setMensaje("");

        try {
            await apiFetch(`/productos/${id}`, {
                method: "DELETE",
            });

            setMensaje("Producto eliminado correctamente");
            cargarProductos();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="page">
            <BackToHome />
            <h2>Productos</h2>
            <p>Listado de productos del inventario.</p>

            {error && <p className="error">{error}</p>}
            {mensaje && <p>{mensaje}</p>}

            <form onSubmit={handleSubmit} className="form">
                <h3>{productoEditando ? "Editar producto" : "Nuevo producto"}</h3>

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

                <div>
                    <label>Precio</label>
                    <input
                        type="number"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Stock</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Categoría</label>
                    <select
                        value={idCategoria}
                        onChange={(e) => setIdCategoria(e.target.value)}
                        required
                    >
                        <option value="">Seleccionar categoría</option>
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">
                    {productoEditando ? "Actualizar" : "Crear"}
                </button>

                {productoEditando && (
                    <button type="button" onClick={limpiarFormulario}>
                        Cancelar
                    </button>
                )}
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((p) => (
                        <tr key={p.id}>
                            <td>
                                <Link to={`/productos/${p.id}`} className="table-link">
                                    {p.nombre}
                                </Link>
                            </td>
                            <td>{p.categoria?.nombre || "Sin categoría"}</td>
                            <td>{p.precio}</td>
                            <td>{p.stock}</td>
                            <td>
                                <button type="button" onClick={() => editarProducto(p)}>
                                    Editar
                                </button>

                                <button type="button" onClick={() => eliminarProducto(p.id)}>
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

export default Productos;