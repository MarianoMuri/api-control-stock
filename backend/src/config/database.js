const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(
  process.env.DB_NAME,   
  process.env.DB_USER,   
  process.env.DB_PASS,   
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado correctamente a PostgreSQL');
  } catch (error) {
    console.error('❌ Error al conectar a PostgreSQL:', error);
  }
}

module.exports = { sequelize, testConnection };
