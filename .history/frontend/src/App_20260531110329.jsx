import { NavLink, Routes, Route, useNavigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import Productos from "./pages/Productos.jsx";
import Categorias from "./pages/Categorias.jsx";
import Movimientos from "./pages/Movimientos.jsx";
import Usuarios from "./pages/Usuarios.jsx";
import CategoriaDetalle from "./pages/CategoriaDetalle.jsx";
import ProductoDetalle from "./pages/ProductoDetalle.jsx";
import MovimientoDetalle from "./pages/MovimientoDetalle.jsx";
import UsuarioDetalle from "./pages/UsuarioDetalle.jsx";
import Login from "./pages/Login.jsx";

import PrivateRoute from "./components/PrivateRoute.jsx";
import { logout, estaAutenticado } from "./services/authService.js";

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav>
        <h2>Control de Stock</h2>

        {estaAutenticado() && (
          <>
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/productos">Productos</NavLink>
            <NavLink to="/categorias">Categorías</NavLink>
            <NavLink to="/movimientos">Movimientos</NavLink>
            <NavLink to="/usuarios">Usuarios</NavLink>

            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        )}
      </nav>

      <main>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/productos"
            element={
              <PrivateRoute>
                <Productos />
              </PrivateRoute>
            }
          />

          <Route
            path="/productos/:id"
            element={
              <PrivateRoute>
                <ProductoDetalle />
              </PrivateRoute>
            }
          />

          <Route
            path="/categorias"
            element={
              <PrivateRoute>
                <Categorias />
              </PrivateRoute>
            }
          />

          <Route
            path="/categorias/:id"
            element={
              <PrivateRoute>
                <CategoriaDetalle />
              </PrivateRoute>
            }
          />

          <Route
            path="/movimientos"
            element={
              <PrivateRoute>
                <Movimientos />
              </PrivateRoute>
            }
          />

          <Route
            path="/movimientos/:id"
            element={
              <PrivateRoute>
                <MovimientoDetalle />
              </PrivateRoute>
            }
          />

          <Route
            path="/usuarios"
            element={
              <PrivateRoute>
                <Usuarios />
              </PrivateRoute>
            }
          />

          <Route
            path="/usuarios/:id"
            element={
              <PrivateRoute>
                <UsuarioDetalle />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;