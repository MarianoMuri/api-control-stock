const { Router } = require('express');
const {
    listarMovimientos,
    listarMovimientosPorProducto,
    crearMovimiento
} = require('../controllers/movimientoController');

const router = Router();

// Listar todos los movimientos
router.get('/', listarMovimientos);

// Listar movimientos de un producto específico
router.get('/producto/:id_producto', listarMovimientosPorProducto);

// Crear un movimiento (ingreso o egreso)
router.post('/', crearMovimiento);

module.exports = router;
