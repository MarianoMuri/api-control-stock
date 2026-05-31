const { Router } = require('express');
const productoController = require('../controllers/productoController');

const router = Router();

router.get('/', productoController.listarProductos);
router.get('/:id', productoController.obtenerProducto);
router.post('/', productoController.crearProducto);
router.put('/:id', productoController.actualizarProducto);
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;
