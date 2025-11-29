import { Link } from "react-router-dom";
import BackToHome from "../components/BackToHome.jsx";

function Usuarios() {
    const usuarios = [
        { id: 1, nombre: "Administrador", email: "admin@controlstock.com", rol: "admin" },
        { id: 2, nombre: "Operador Depósito", email: "operador@controlstock.com", rol: "operador" }
    ];

    return (
        <div className="page">
            <BackToHome />
            <h2>Usuarios</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Usuarios;
