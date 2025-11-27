const Producto = require('../models/producto');

module.exports = {
    async crear(req, res) {
        try {
            const producto = await Producto.create(req.body);
            res.json(producto);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear producto' });
        }
    },

    async listar(req, res) {
        try {
            const productos = await Producto.findAll();
            res.json(productos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener productos' });
        }
    }
};
