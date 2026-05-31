import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const usuariosMock = [
    {
        id: 1,
        nombre: "Administrador",
        email: "admin@test.com",
        password: bcrypt.hashSync("123456", 10),
        rol: "master",
    },
    {
        id: 2,
        nombre: "Cajero",
        email: "cajero@test.com",
        password: bcrypt.hashSync("123456", 10),
        rol: "cajero",
    },
];

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                mensaje: "Email y contraseña son obligatorios",
            });
        }

        const usuario = usuariosMock.find((user) => user.email === email);

        if (!usuario) {
            return res.status(401).json({
                mensaje: "Credenciales incorrectas",
            });
        }

        const passwordValida = await bcrypt.compare(password, usuario.password);

        if (!passwordValida) {
            return res.status(401).json({
                mensaje: "Credenciales incorrectas",
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                rol: usuario.rol,
            },
            process.env.JWT_SECRET || "clave_secreta_desarrollo",
            {
                expiresIn: "2h",
            }
        );

        res.json({
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
            },
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al iniciar sesión",
            error: error.message,
        });
    }
};