const Categoria = require('./categoria');
const Producto = require('./producto');
const Movimiento = require('./movimiento');
const Usuario = require('./usuario');   // ✅ NUEVO

function setupAssociations() {

    // ============================
    //  Categoria 1 --- N Producto
    // ============================
    Categoria.hasMany(Producto, {
        foreignKey: 'id_categoria',
        as: 'productos'
    });

    Producto.belongsTo(Categoria, {
        foreignKey: 'id_categoria',
        as: 'categoria'
    });

    // ============================
    //  Producto 1 --- N Movimiento
    // ============================
    Producto.hasMany(Movimiento, {
        foreignKey: 'id_producto',
        as: 'movimientos'
    });

    Movimiento.belongsTo(Producto, {
        foreignKey: 'id_producto',
        as: 'producto'
    });

    // ============================
    //  Usuario 1 --- N Movimiento
    // ============================
    Usuario.hasMany(Movimiento, {
        foreignKey: 'id_usuario',
        as: 'movimientos'
    });

    Movimiento.belongsTo(Usuario, {
        foreignKey: 'id_usuario',
        as: 'usuario'
    });
}

module.exports = {
    Categoria,
    Producto,
    Movimiento,
    Usuario,          // ✅ NUEVO
    setupAssociations
};
