import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

class Movimiento extends Model { }

Movimiento.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_producto: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tipo: {
            type: DataTypes.ENUM('ingreso', 'egreso'),
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Movimiento',
        tableName: 'movimientos',
        timestamps: true
    }
);

export default Movimiento;