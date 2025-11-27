const { Router } = require('express');
const router = Router();

// Importar rutas
const categoriasRoutes = require('./categorias');
const productosRoutes = require('./productos');
const movimientosRoutes = require('./movimientos');
const usuariosRoutes = require('./usuarios');   // ⭐ NUEVO

// Rutas principales
router.use('/categorias', categoriasRoutes);
router.use('/productos', productosRoutes);
router.use('/movimientos', movimientosRoutes);
router.use('/usuarios', usuariosRoutes);        // ⭐ NUEVO

// Ruta de prueba
router.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'API funcionando' });
});

module.exports = router;
