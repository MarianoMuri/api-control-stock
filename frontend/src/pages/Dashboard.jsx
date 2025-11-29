import { Link } from "react-router-dom";


function Dashboard() {
    return (
        <div className="page">
            <h2>Resumen general</h2>
            <div className="cards-grid">
                <Link to="/productos" className="card card-link">
                    <div className="card-icon">📦</div>
                    <h3>Productos</h3>
                    <p>Ver y administrar los productos del inventario.</p>
                </Link>
                <Link to="/categorias" className="card card-link">
                    <div className="card-icon">📂</div>
                    <h3>Categorías</h3>
                    <p>Organizar los productos por tipo o familia.</p>
                </Link>
                <Link to="/movimientos" className="card card-link">
                    <div className="card-icon">🔄</div>
                    <h3>Movimientos</h3>
                    <p>Entradas y salidas de stock recientes.</p>
                </Link>
                <Link to="/usuarios" className="card card-link">
                    <div className="card-icon">👤</div>
                    <h3>Usuarios</h3>
                    <p>Personas que operan el sistema.</p>
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;
