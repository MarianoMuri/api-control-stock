import dotenv from "dotenv";

dotenv.config();

/**
 * Devuelve la clave para firmar y verificar los JWT.
 * No hay valor por defecto: si falta JWT_SECRET, el servidor no arranca.
 */
export const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error(
            "Falta la variable de entorno JWT_SECRET. Copiá .env.example a .env y definila."
        );
    }

    return secret;
};
