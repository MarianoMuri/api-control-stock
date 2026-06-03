import express from "express";

import {
    listarCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
} from "../controllers/categoriaController.js";

import {
    verificarToken,
    autorizarRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verificarToken, autorizarRoles("master", "cajero"), listarCategorias);
router.get("/:id", verificarToken, autorizarRoles("master", "cajero"), obtenerCategoriaPorId);
router.post("/", verificarToken, autorizarRoles("master"), crearCategoria);
router.put("/:id", verificarToken, autorizarRoles("master"), actualizarCategoria);
router.delete("/:id", verificarToken, autorizarRoles("master"), eliminarCategoria);

export default router;