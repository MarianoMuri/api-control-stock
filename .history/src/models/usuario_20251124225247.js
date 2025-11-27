const { Model, DataTypes } = require('sequelize');
// 👇 IMPORTAR IGUAL QUE EN CATEGORIA / PRODUCTO / MOVIMIENTO
const sequelize = require('../config/database');

class Usuario extends Model { }

Usuario.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
            // Más adelante acá podríamos guardar el hash (bcrypt)
        },
        rol: {
            type: DataTypes.ENUM('master', 'cajero'),
            allowNull: false,
            defaultValue: 'cajero'
        }
    },
    {
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuarios',
        timestamps: true
    }
);

module.exports = Usuario;
