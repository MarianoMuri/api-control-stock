const { Router } = require('express');
const {
    listarCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
} = require('../controllers/categoriaController');

const router = Router();

// GET todas las categorías
router.get('/', listarCategorias);

// GET 1 categoría por ID
router.get('/:id', obtenerCategoria);

// POST crear categoría
router.post('/', crearCategoria);

// PUT actualizar categoría
router.put('/:id', actualizarCategoria);

// DELETE eliminar categoría
router.delete('/:id', eliminarCategoria);

module.exports = router;
