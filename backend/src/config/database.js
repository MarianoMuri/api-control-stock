import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// En producción (por ejemplo Neon o Render) la conexión llega como DATABASE_URL
// y requiere SSL. En local se usan las variables DB_* sin SSL.
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: false,
      dialectOptions:
        process.env.DB_SSL === 'false'
          ? {}
          : { ssl: { require: true, rejectUnauthorized: true } },
    })
  : new Sequelize(
      process.env.DB_NAME || 'control_stock',
      process.env.DB_USER || 'postgres',
      process.env.DB_PASSWORD || null,
      {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
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

export { sequelize, testConnection };
