const app = require('./app');
const { testConnection } = require('./config/database');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

async function startServer() {
    await testConnection();

    app.listen(PORT, () => {
        console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
}

startServer();
