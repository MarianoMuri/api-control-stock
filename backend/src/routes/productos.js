import express from "express";

import {
    listarProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
} from "../controllers/productoController.js";

const router = express.Router();

router.get("/", listarProductos);
router.get("/:id", obtenerProductoPorId);
router.post("/", crearProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

export default router;