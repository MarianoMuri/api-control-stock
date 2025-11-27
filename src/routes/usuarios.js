const { Router } = require('express');
const { listarUsuarios, crearUsuario } = require('../controllers/usuarioController');

const router = Router();

router.get('/', listarUsuarios);
router.post('/', crearUsuario);

module.exports = router;
