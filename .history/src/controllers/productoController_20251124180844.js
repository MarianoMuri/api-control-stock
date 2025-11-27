const { Producto, Categoria } = require('../models');

// GET /api/productos
async function listarProductos(req, res) {
    try {
        const productos = await Producto.findAll({
            include: {
                model: Categoria,
                as: 'categoria',
                attributes: ['id', 'nombre']
            }
        });
        res.json(productos);
    } catch (error) {
        console.error('Error al listar productos:', error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
}

// GET /api/productos/:id
async function obtenerProducto(req, res) {
    const { id } = req.params;

    try {
        const producto = await Producto.findByPk(id, {
            include: {
                model: Categoria,
                as: 'categoria',
                attributes: ['id', 'nombre']
            }
        });

        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(producto);
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
}

// POST /api/productos
async function crearProducto(req, res) {
    const { nombre, descripcion, precio, stock, id_categoria } = req.body;

    if (!nombre || !precio || !id_categoria) {
        return res.status(400).json({
            error: 'Los campos nombre, precio e id_categoria son obligatorios'
        });
    }

    try {
        // Verificamos que exista la categoría
        const categoria = await Categoria.findByPk(id_categoria);
        if (!categoria) {
            return res.status(400).json({ error: 'La categoría no existe' });
        }

        const nuevo = await Producto.create({
            nombre,
            descripcion,
            precio,
            stock: stock ?? 0,
            id_categoria
        });

        res.status(201).json(nuevo);
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
}

// PUT /api/productos/:id
async function actualizarProducto(req, res) {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, id_categoria } = req.body;

    try {
        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        if (id_categoria) {
            const categoria = await Categoria.findByPk(id_categoria);
            if (!categoria) {
                return res.status(400).json({ error: 'La categoría no existe' });
            }
            producto.id_categoria = id_categoria;
        }

        if (nombre !== undefined) producto.nombre = nombre;
        if (descripcion !== undefined) producto.descripcion = descripcion;
        if (precio !== undefined) producto.precio = precio;
        if (stock !== undefined) producto.stock = stock;

        await producto.save();

        res.json(producto);
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
}

// DELETE /api/productos/:id
async function eliminarProducto(req, res) {
    const { id } = req.params;

    try {
        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        await producto.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
}

module.exports = {
    listarProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
