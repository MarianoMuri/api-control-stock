import dotenv from "dotenv";
import app from "./app.js";
import { sequelize, testConnection } from "./config/database.js";
import { setupAssociations } from "./models/index.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
    await testConnection();

    setupAssociations();

    await sequelize.sync({ alter: true });

    console.log("Tablas sincronizadas correctamente");

    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
}

startServer();