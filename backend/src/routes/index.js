const { Router } = require('express');

const categoriaRoutes = require('./categorias');
const productoRoutes = require('./productos');
const movimientoRoutes = require('./movimientos');
const usuarioRoutes = require('./usuarios'); // 👈 IMPORTANTE

const router = Router();

router.use('/categorias', categoriaRoutes);
router.use('/productos', productoRoutes);
router.use('/movimientos', movimientoRoutes);
router.use('/usuarios', usuarioRoutes); // 👈 QUEDA /api/usuarios

module.exports = router;
