import express from "express";

import {
    listarMovimientos,
    historicoMovimientos,
    obtenerMovimientoPorId,
    crearMovimiento,
    eliminarMovimiento,
} from "../controllers/movimientoController.js";

import {
    verificarToken,
    autorizarRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movimientos
 *   description: Gestión de ingresos y egresos de stock
 */

/**
 * @swagger
 * /movimientos:
 *   get:
 *     summary: Listar movimientos
 *     tags: [Movimientos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de movimientos obtenida correctamente
 */
router.get(
    "/",
    verificarToken,
    autorizarRoles("master", "cajero"),
    listarMovimientos
);

/**
 * @swagger
 * /movimientos/historico:
 *   get:
 *     summary: Consultar histórico de movimientos
 *     tags: [Movimientos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *         description: ingreso o egreso
 *       - in: query
 *         name: id_producto
 *         schema:
 *           type: integer
 *         description: ID del producto
 *       - in: query
 *         name: fechaDesde
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: fechaHasta
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Histórico obtenido correctamente
 */
router.get(
    "/historico",
    verificarToken,
    autorizarRoles("master", "cajero"),
    historicoMovimientos
);

/**
 * @swagger
 * /movimientos/{id}:
 *   get:
 *     summary: Obtener movimiento por ID
 *     tags: [Movimientos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movimiento obtenido correctamente
 *       404:
 *         description: Movimiento no encontrado
 */
router.get(
    "/:id",
    verificarToken,
    autorizarRoles("master", "cajero"),
    obtenerMovimientoPorId
);

/**
 * @swagger
 * /movimientos:
 *   post:
 *     summary: Registrar un movimiento de stock
 *     tags: [Movimientos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo
 *               - cantidad
 *               - id_producto
 *             properties:
 *               tipo:
 *                 type: string
 *                 example: ingreso
 *               cantidad:
 *                 type: integer
 *                 example: 10
 *               id_producto:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Movimiento registrado correctamente
 */
router.post(
    "/",
    verificarToken,
    autorizarRoles("master", "cajero"),
    crearMovimiento
);

/**
 * @swagger
 * /movimientos/{id}:
 *   delete:
 *     summary: Eliminar un movimiento
 *     tags: [Movimientos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movimiento eliminado correctamente
 *       404:
 *         description: Movimiento no encontrado
 */
router.delete(
    "/:id",
    verificarToken,
    autorizarRoles("master"),
    eliminarMovimiento
);

export default router;