const { Router } = require('express');
const movimientoController = require('../controllers/movimientoController');

const router = Router();

router.get('/', movimientoController.listarMovimientos);
router.get('/:id', movimientoController.obtenerMovimiento);
router.post('/', movimientoController.crearMovimiento);
router.delete('/:id', movimientoController.eliminarMovimiento);

module.exports = router;
