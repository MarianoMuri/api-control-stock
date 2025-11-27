const Categoria = require('./categoria');
const Producto = require('./producto');
// más adelante agregaremos Movimiento y Usuario
// const Movimiento = require('./movimiento');
// const Usuario = require('./usuario');

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

    // acá después vamos a agregar las asociaciones de Movimiento
}

module.exports = {
    Categoria,
    Producto,
    setupAssociations
};
