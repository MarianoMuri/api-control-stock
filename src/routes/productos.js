const { Router } = require('express');
const router = Router();
const productoController = require('../controllers/productoController');

router.post('/', productoController.crear);
router.get('/', productoController.listar);

module.exports = router;
