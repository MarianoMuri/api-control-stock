import { useParams } from "react-router-dom";
import BackToHome from "../components/BackToHome.jsx";

function MovimientoDetalle() {
    const { id } = useParams();

    return (
        <div className="page">
            <BackToHome />
            <h2>Detalle de movimiento #{id}</h2>
            <div className="card">
                <p>Detalle mock del movimiento con id {id}.</p>
            </div>
        </div>
    );
}

export default MovimientoDetalle;
