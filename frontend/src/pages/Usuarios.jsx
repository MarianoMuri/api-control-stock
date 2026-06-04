import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackToHome from "../components/BackToHome.jsx";
import { apiFetch } from "../services/api.js";

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("cajero");
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            const data = await apiFetch("/usuarios");
            setUsuarios(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const limpiarFormulario = () => {
        setNombre("");
        setEmail("");
        setPassword("");
        setRol("cajero");
        setUsuarioEditando(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMensaje("");

        try {
            const datos = {
                nombre,
                email,
                rol,
            };

            if (password) {
                datos.password = password;
            }

            if (usuarioEditando) {
                await apiFetch(`/usuarios/${usuarioEditando.id}`, {
                    method: "PUT",
                    body: JSON.stringify(datos),
                });

                setMensaje("Usuario actualizado correctamente");
            } else {
                await apiFetch("/usuarios", {
                    method: "POST",
                    body: JSON.stringify({
                        ...datos,
                        password,
                    }),
                });

                setMensaje("Usuario creado correctamente");
            }

            limpiarFormulario();
            cargarUsuarios();
        } catch (error) {
            setError(error.message);
        }
    };

    const editarUsuario = (usuario) => {
        setUsuarioEditando(usuario);
        setNombre(usuario.nombre);
        setEmail(usuario.email);
        setPassword("");
        setRol(usuario.rol);
        setError("");
        setMensaje("");
    };

    const eliminarUsuario = async (id) => {
        const confirmar = window.confirm("¿Seguro que querés eliminar este usuario?");

        if (!confirmar) {
            return;
        }

        try {
            await apiFetch(`/usuarios/${id}`, {
                method: "DELETE",
            });

            setMensaje("Usuario eliminado correctamente");
            cargarUsuarios();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="page">
            <BackToHome />
            <h2>Usuarios</h2>

            {error && <p className="error">{error}</p>}
            {mensaje && <p>{mensaje}</p>}

            <form onSubmit={handleSubmit} className="form">
                <h3>{usuarioEditando ? "Editar usuario" : "Nuevo usuario"}</h3>

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
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={!usuarioEditando}
                    />
                </div>

                <div>
                    <label>Rol</label>
                    <select
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                    >
                        <option value="master">Master</option>
                        <option value="cajero">Cajero</option>
                    </select>
                </div>

                <button type="submit">
                    {usuarioEditando ? "Actualizar" : "Crear"}
                </button>

                {usuarioEditando && (
                    <button type="button" onClick={limpiarFormulario}>
                        Cancelar
                    </button>
                )}
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((u) => (
                        <tr key={u.id}>
                            <td>
                                <Link to={`/usuarios/${u.id}`} className="table-link">
                                    {u.nombre}
                                </Link>
                            </td>
                            <td>{u.email}</td>
                            <td>{u.rol}</td>
                            <td>
                                <button type="button" onClick={() => editarUsuario(u)}>
                                    Editar
                                </button>

                                <button type="button" onClick={() => eliminarUsuario(u.id)}>
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

export default Usuarios;