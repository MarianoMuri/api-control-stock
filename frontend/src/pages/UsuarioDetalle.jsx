import { useParams } from "react-router-dom";
import BackToHome from "../components/BackToHome.jsx";

function UsuarioDetalle() {
    const { id } = useParams();

    return (
        <div className="page">
            <BackToHome />
            <h2>Detalle de usuario #{id}</h2>
            <div className="card">
                <p>Detalle mock del usuario con id {id}.</p>
            </div>
        </div>
    );
}

export default UsuarioDetalle;
