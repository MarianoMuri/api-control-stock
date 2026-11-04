import bcrypt from "bcryptjs";
import { Usuario } from "../models/index.js";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@test.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export const crearAdminInicial = async () => {
    try {
        const adminExistente = await Usuario.findOne({
            where: { email: ADMIN_EMAIL },
        });

        if (adminExistente) {
            console.log("ℹ️ Usuario admin inicial ya existe");
            return;
        }

        const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

        await Usuario.create({
            nombre: "Administrador",
            email: ADMIN_EMAIL,
            password: passwordHash,
            rol: "master",
        });

        console.log("✅ Usuario admin inicial creado correctamente");
    } catch (error) {
        console.error("❌ Error al crear usuario admin inicial:", error.message);
    }
};