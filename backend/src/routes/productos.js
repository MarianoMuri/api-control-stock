import express from "express";

import {
    listarProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
} from "../controllers/productoController.js";

import {
    verificarToken,
    autorizarRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verificarToken, autorizarRoles("master", "cajero"), listarProductos);
router.get("/:id", verificarToken, autorizarRoles("master", "cajero"), obtenerProductoPorId);
router.post("/", verificarToken, autorizarRoles("master"), crearProducto);
router.put("/:id", verificarToken, autorizarRoles("master"), actualizarProducto);
router.delete("/:id", verificarToken, autorizarRoles("master"), eliminarProducto);

export default router;