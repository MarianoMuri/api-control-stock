const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

class Producto extends Model { }

Producto.init(
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
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        id_categoria: {
            type: DataTypes.INTEGER,
            allowNull: false
            // opcionalmente podríamos agregar referencias a la FK
            // referencias: {
            //   model: 'categorias',
            //   key: 'id'
            // }
        }
    },
    {
        sequelize,
        modelName: 'Producto',
        tableName: 'productos',
        timestamps: true
    }
);

module.exports = Producto;
