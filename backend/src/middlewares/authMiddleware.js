import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            mensaje: "Token requerido",
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            mensaje: "Token inválido",
        });
    }

    try {
        const usuario = jwt.verify(
            token,
            process.env.JWT_SECRET || "clave_secreta_desarrollo"
        );

        req.usuario = usuario;
        next();
    } catch (error) {
        return res.status(401).json({
            mensaje: "Token inválido o expirado",
        });
    }
};

export const autorizarRoles = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(401).json({
                mensaje: "Usuario no autenticado",
            });
        }

        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({
                mensaje: "No tenés permisos para acceder a este recurso",
            });
        }

        next();
    };
};