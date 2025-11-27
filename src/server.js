const app = require('./app');
const { testConnection, sequelize } = require('./config/database');
const { setupAssociations } = require('./models');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

async function startServer() {
    // 1. Probar conexión a la base
    await testConnection();

    // 2. Configurar asociaciones entre modelos
    setupAssociations();

    // 3. Sincronizar los modelos con la base de datos
    sequelize.sync({ alter: true })
        .then(() => console.log("📦 Modelos sincronizados con la base"))
        .catch(err => console.error("❌ Error al sincronizar modelos:", err));

    // 4. Levantar el servidor
    app.listen(PORT, () => {
        console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
}

startServer();
