import { Link } from "react-router-dom";
import BackToHome from "../components/BackToHome.jsx";

function Categorias() {
    const categorias = ["Periféricos", "Monitores", "Notebooks", "Impresoras"];

    return (
        <div className="page">
            <BackToHome />
            <h2>Categorías</h2>
            <ul className="list">
                {categorias.map((cat) => (
                    <li key={cat}>
                        <Link to={`/categorias/${cat.toLowerCase()}`} className="categoria-link">
                            {cat}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categorias;
