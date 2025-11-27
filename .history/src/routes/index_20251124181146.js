const { Router } = require('express');
const router = Router();

// Importar rutas
const categoriasRoutes = require('./categorias');
const productosRoutes = require('./productos');

// Rutas principales
router.use('/categorias', categoriasRoutes);
router.use('/productos', productosRoutes);

// Ruta de prueba
router.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'API funcionando' });
});

module.exports = router;
