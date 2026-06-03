import express from "express";

import {
    listarUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
} from "../controllers/usuarioController.js";

import {
    verificarToken,
    autorizarRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verificarToken, autorizarRoles("master"), listarUsuarios);
router.get("/:id", verificarToken, autorizarRoles("master"), obtenerUsuarioPorId);
router.post("/", verificarToken, autorizarRoles("master"), crearUsuario);
router.put("/:id", verificarToken, autorizarRoles("master"), actualizarUsuario);
router.delete("/:id", verificarToken, autorizarRoles("master"), eliminarUsuario);

export default router;