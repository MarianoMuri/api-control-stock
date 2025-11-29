/* const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false
    }
);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a PostgreSQL correcta');
    } catch (error) {
        console.error('❌ Error al conectar con PostgreSQL:', error.message);
    }
}

module.exports = { sequelize, testConnection };
/* Desactivado temporalmente para migración a postgres */

export default null; 