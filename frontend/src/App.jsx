import { NavLink, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Productos from "./pages/Productos.jsx";
import Categorias from "./pages/Categorias.jsx";
import Movimientos from "./pages/Movimientos.jsx";
import Usuarios from "./pages/Usuarios.jsx";
import CategoriaDetalle from "./pages/CategoriaDetalle.jsx";
import ProductoDetalle from "./pages/ProductoDetalle.jsx";
import MovimientoDetalle from "./pages/MovimientoDetalle.jsx";
import UsuarioDetalle from "./pages/UsuarioDetalle.jsx";

function App() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Control de Stock</h2>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/" end className="nav-item">
            Inicio
          </NavLink>
          <NavLink to="/productos" className="nav-item">
            Productos
          </NavLink>
          <NavLink to="/categorias" className="nav-item">
            Categorías
          </NavLink>
          <NavLink to="/movimientos" className="nav-item">
            Movimientos
          </NavLink>
          <NavLink to="/usuarios" className="nav-item">
            Usuarios
          </NavLink>
        </nav>
      </aside>
      <main className="main-content">
        <header className="main-header">
          <h1>Sistema de Inventario y Control de Stock</h1>
        </header>
        <section className="main-section">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/:id" element={<ProductoDetalle />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/categorias/:nombre" element={<CategoriaDetalle />} />
            <Route path="/movimientos" element={<Movimientos />} />
            <Route path="/movimientos/:id" element={<MovimientoDetalle />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/usuarios/:id" element={<UsuarioDetalle />} />
          </Routes>
        </section>
      </main>
    </div>
  );
}

export default App;
