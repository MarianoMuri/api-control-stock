import express from "express";

import {
    listarMovimientos,
    obtenerMovimientoPorId,
    crearMovimiento,
    eliminarMovimiento,
} from "../controllers/movimientoController.js";

const router = express.Router();

router.get("/", listarMovimientos);
router.get("/:id", obtenerMovimientoPorId);
router.post("/", crearMovimiento);
router.delete("/:id", eliminarMovimiento);

export default router;