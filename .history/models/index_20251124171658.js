const Categoria = require('./categoria');
const Producto = require('./producto');
const Movimiento = require('./movimiento');

function setupAssociations() {
    // Categoria 1 --- N Producto
    Categoria.hasMany(Producto, {
        foreignKey: 'id_categoria',
        as: 'productos'
    });

    Producto.belongsTo(Categoria, {
        foreignKey: 'id_categoria',
        as: 'categoria'
    });

    // Producto 1 --- N Movimiento
    Producto.hasMany(Movimiento, {
        foreignKey: 'id_producto',
        as: 'movimientos'
    });

    Movimiento.belongsTo(Producto, {
        foreignKey: 'id_producto',
        as: 'producto'
    });
}

module.exports = {
    Categoria,
    Producto,
    Movimiento,
    setupAssociations
};
