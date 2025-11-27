const { Categoria } = require('../models');

// GET /api/categorias
async function listarCategorias(req, res) {
    try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    } catch (error) {
        console.error('Error al listar categorías:', error);
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
}

// GET /api/categorias/:id
async function obtenerCategoria(req, res) {
    const { id } = req.params;

    try {
        const categoria = await Categoria.findByPk(id);

        if (!categoria) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        res.json(categoria);
    } catch (error) {
        console.error('Error al obtener categoría:', error);
        res.status(500).json({ error: 'Error al obtener la categoría' });
    }
}

// POST /api/categorias
async function crearCategoria(req, res) {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: 'El nombre es obligatorio' });
    }

    try {
        const nueva = await Categoria.create({ nombre, descripcion });
        res.status(201).json(nueva);
    } catch (error) {
        console.error('Error al crear categoría:', error);
        res.status(500).json({ error: 'Error al crear la categoría' });
    }
}

// PUT /api/categorias/:id
async function actualizarCategoria(req, res) {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    try {
        const categoria = await Categoria.findByPk(id);

        if (!categoria) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        categoria.nombre = nombre ?? categoria.nombre;
        categoria.descripcion = descripcion ?? categoria.descripcion;

        await categoria.save();

        res.json(categoria);
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        res.status(500).json({ error: 'Error al actualizar la categoría' });
    }
}

// DELETE /api/categorias/:id
async function eliminarCategoria(req, res) {
    const { id } = req.params;

    try {
        const categoria = await Categoria.findByPk(id);

        if (!categoria) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        await categoria.destroy();
        res.status(204).send(); // sin contenido
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
}

module.exports = {
    listarCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};
