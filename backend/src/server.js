import dotenv from "dotenv";
import app from "./app.js";
import { sequelize, testConnection } from "./config/database.js";
import { setupAssociations } from "./models/index.js";
import { crearAdminInicial } from "./seeders/adminSeeder.js";
import { getJwtSecret } from "./config/jwt.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
    // Falla rápido si falta la clave de los JWT
    getJwtSecret();

    await testConnection();

    setupAssociations();

    await sequelize.sync();
    console.log("Tablas sincronizadas correctamente");

    await crearAdminInicial();

    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
}

startServer().catch((error) => {
    console.error("❌ No se pudo iniciar el servidor:", error.message);
    process.exit(1);
});