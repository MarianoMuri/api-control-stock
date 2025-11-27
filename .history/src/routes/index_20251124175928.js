const { Router } = require('express');
const router = Router();

// Importar rutas
const categoriasRoutes = require('./categorias');

// Rutas principales
router.use('/categorias', categoriasRoutes);

// Ruta de prueba
router.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'API funcionando' });
});

module.exports = router;
