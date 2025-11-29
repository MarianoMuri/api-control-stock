import { useParams } from "react-router-dom";
import BackToHome from "../components/BackToHome.jsx";

function CategoriaDetalle() {
    const { nombre } = useParams();

    return (
        <div className="page">
            <BackToHome />
            <h2>Categoría: {nombre.charAt(0).toUpperCase() + nombre.slice(1)}</h2>
            <div className="card">
                <p>Detalle mock de la categoría {nombre}.</p>
            </div>
        </div>
    );
}

export default CategoriaDetalle;
