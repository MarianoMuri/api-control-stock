import Categoria from './categoria.js';
import Producto from './producto.js';
import Movimiento from './movimiento.js';
import Usuario from './usuario.js';

function setupAssociations() {
    Categoria.hasMany(Producto, {
        foreignKey: 'id_categoria',
        as: 'productos'
    });

    Producto.belongsTo(Categoria, {
        foreignKey: 'id_categoria',
        as: 'categoria'
    });

    Producto.hasMany(Movimiento, {
        foreignKey: 'id_producto',
        as: 'movimientos'
    });

    Movimiento.belongsTo(Producto, {
        foreignKey: 'id_producto',
        as: 'producto'
    });

    Usuario.hasMany(Movimiento, {
        foreignKey: 'id_usuario',
        as: 'movimientos'
    });

    Movimiento.belongsTo(Usuario, {
        foreignKey: 'id_usuario',
        as: 'usuario'
    });
}

export {
    Categoria,
    Producto,
    Movimiento,
    Usuario,
    setupAssociations
};