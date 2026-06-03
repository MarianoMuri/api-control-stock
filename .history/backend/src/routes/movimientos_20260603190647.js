import express from "express";

import {
    listarMovimientos,
    obtenerMovimientoPorId,
    crearMovimiento,
    eliminarMovimiento,
} from "../controllers/movimientoController.js";

import {
    verificarToken,
    autorizarRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
    "/",
    verificarToken,
    autorizarRoles("master", "cajero"),
    listarMovimientos
);

router.get(
    "/:id",
    verificarToken,
    autorizarRoles("master", "cajero"),
    obtenerMovimientoPorId
);

router.post(
    "/",
    verificarToken,
    autorizarRoles("master", "cajero"),
    crearMovimiento
);

router.delete(
    "/:id",
    verificarToken,
    autorizarRoles("master"),
    eliminarMovimiento
);

export default router;