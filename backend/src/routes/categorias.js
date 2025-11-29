const { Router } = require('express');
const categoriaController = require('../controllers/categoriaController');

const router = Router();

router.get('/', categoriaController.listarCategorias);
router.get('/:id', categoriaController.obtenerCategoria);
router.post('/', categoriaController.crearCategoria);
router.put('/:id', categoriaController.actualizarCategoria);
router.delete('/:id', categoriaController.eliminarCategoria);

module.exports = router;
