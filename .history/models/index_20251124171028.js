const Categoria = require('./categoria');

// Acá más adelante vamos a importar Producto, Movimiento y Usuario
// ej:
// const Producto = require('./producto');
// const Movimiento = require('./movimiento');

function setupAssociations() {
    // Cuando agreguemos Producto:
    // Categoria.hasMany(Producto, {
    //   foreignKey: 'id_categoria',
    //   as: 'productos'
    // });

    // Producto.belongsTo(Categoria, {
    //   foreignKey: 'id_categoria',
    //   as: 'categoria'
    // });
}

module.exports = {
    Categoria,
    setupAssociations
};
