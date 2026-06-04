import bcrypt from "bcryptjs";
import { Usuario } from "../models/index.js";

export const crearAdminInicial = async () => {
    try {
        const adminExistente = await Usuario.findOne({
            where: { email: "admin@test.com" },
        });

        if (adminExistente) {
            console.log("ℹ️ Usuario admin inicial ya existe");
            return;
        }

        const passwordHash = await bcrypt.hash("123456", 10);

        await Usuario.create({
            nombre: "Administrador",
            email: "admin@test.com",
            password: passwordHash,
            rol: "master",
        });

        console.log("✅ Usuario admin inicial creado correctamente");
    } catch (error) {
        console.error("❌ Error al crear usuario admin inicial:", error.message);
    }
};