const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

class Categoria extends Model { }

Categoria.init(
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
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'Categoria',
        tableName: 'categorias',
        timestamps: true
    }
);

module.exports = Categoria;
