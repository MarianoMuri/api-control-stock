import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../services/api.js";

function Dashboard() {
    const [totales, setTotales] = useState({
        productos: 0,
        categorias: 0,
        movimientos: 0,
        usuarios: 0,
    });

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const [productos, categorias, movimientos, usuarios] = await Promise.all([
                apiFetch("/productos"),
                apiFetch("/categorias"),
                apiFetch("/movimientos"),
                apiFetch("/usuarios"),
            ]);

            setTotales({
                productos: productos.length,
                categorias: categorias.length,
                movimientos: movimientos.length,
                usuarios: usuarios.length,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="page">
            <h2>Resumen general</h2>

            <div className="cards-grid">
                <Link to="/productos" className="card card-link">
                    <div className="card-icon">📦</div>
                    <h3>Productos</h3>
                    <p>Ver y administrar los productos del inventario.</p>
                    <strong>Total registrados: {totales.productos}</strong>
                </Link>

                <Link to="/categorias" className="card card-link">
                    <div className="card-icon">📂</div>
                    <h3>Categorías</h3>
                    <p>Organizar los productos por tipo o familia.</p>
                    <strong>Total registradas: {totales.categorias}</strong>
                </Link>

                <Link to="/movimientos" className="card card-link">
                    <div className="card-icon">🔄</div>
                    <h3>Movimientos</h3>
                    <p>Entradas y salidas de stock recientes.</p>
                    <strong>Total registrados: {totales.movimientos}</strong>
                </Link>

                <Link to="/usuarios" className="card card-link">
                    <div className="card-icon">👤</div>
                    <h3>Usuarios</h3>
                    <p>Personas que operan el sistema.</p>
                    <strong>Total registrados: {totales.usuarios}</strong>
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;