import { Link } from "react-router-dom";

function BackToHome() {
    return (
        <div className="back-home">
            <Link to="/" className="back-home-link">
                ← Volver al inicio
            </Link>
        </div>
    );
}

export default BackToHome;
