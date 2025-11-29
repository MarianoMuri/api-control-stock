import { useParams } from "react-router-dom";
import BackToHome from "../components/BackToHome.jsx";

function ProductoDetalle() {
    const { id } = useParams();

    return (
        <div className="page">
            <BackToHome />
            <h2>Detalle de producto #{id}</h2>
            <div className="card">
                <p>Detalle mock del producto con id {id}.</p>
            </div>
        </div>
    );
}

export default ProductoDetalle;
