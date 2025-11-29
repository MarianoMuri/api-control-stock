const { Router } = require('express');
const usuarioController = require('../controllers/usuarioController');

const router = Router();

router.get('/', usuarioController.listarUsuarios);
router.get('/:id', usuarioController.obtenerUsuario);
router.post('/', usuarioController.crearUsuario);
router.put('/:id', usuarioController.actualizarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;
