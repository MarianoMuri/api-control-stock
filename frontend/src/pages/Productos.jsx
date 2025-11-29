import { Link } from "react-router-dom";
import BackToHome from "../components/BackToHome.jsx";

function Productos() {
    const productos = [
        { id: 1, nombre: 'Monitor 24"', categoria: "Monitores", stockActual: 10, stockMinimo: 2 },
        { id: 2, nombre: "Teclado mecánico", categoria: "Periféricos", stockActual: 5, stockMinimo: 1 }
    ];

    return (
        <div className="page">
            <BackToHome />
            <h2>Productos</h2>
            <p>Listado de productos del inventario.</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Stock actual</th>
                        <th>Stock mínimo</th>
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
                            <td>{p.categoria}</td>
                            <td>{p.stockActual}</td>
                            <td>{p.stockMinimo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Productos;
