import { Link } from "react-router-dom";
import BackToHome from "../components/BackToHome.jsx";

function Movimientos() {
    const movimientos = [
        { id: 1, fecha: "01/11/2024", producto: 'Monitor 24"', tipo: "ENTRADA", cantidad: 5, usuario: "admin" },
        { id: 2, fecha: "02/11/2024", producto: "Teclado mecánico", tipo: "SALIDA", cantidad: 2, usuario: "admin" }
    ];

    return (
        <div className="page">
            <BackToHome />
            <h2>Movimientos de stock</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Producto</th>
                        <th>Tipo</th>
                        <th>Cantidad</th>
                        <th>Usuario</th>
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
                            <td>{m.producto}</td>
                            <td>{m.tipo}</td>
                            <td>{m.cantidad}</td>
                            <td>{m.usuario}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Movimientos;
