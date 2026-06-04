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
 *       401:
 *         description: Token requerido o inválido
 *       403:
 *         description: No tenés permisos para acceder a este recurso
 */
router.get(
    "/",
    verificarToken,
    autorizarRoles("master", "cajero"),
    listarMovimientos
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
 *         description: ID del movimiento
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
 *               fecha:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Movimiento registrado correctamente
 *       400:
 *         description: Datos inválidos o stock insuficiente
 *       404:
 *         description: Producto o usuario no encontrado
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
 *         description: ID del movimiento
 *     responses:
 *       200:
 *         description: Movimiento eliminado correctamente
 *       404:
 *         description: Movimiento no encontrado
 *       403:
 *         description: No tenés permisos para acceder a este recurso
 */
router.delete(
    "/:id",
    verificarToken,
    autorizarRoles("master"),
    eliminarMovimiento
);

export default router;