const { Router } = require('express');
const router = Router();

// Importar rutas
const categoriasRoutes = require('./categorias');
const productosRoutes = require('./productos');
const movimientosRoutes = require('./movimientos');

// Rutas principales
router.use('/categorias', categoriasRoutes);
router.use('/productos', productosRoutes);
router.use('/movimientos', movimientosRoutes);

// Ruta de prueba
router.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'API funcionando' });
});

module.exports = router;
