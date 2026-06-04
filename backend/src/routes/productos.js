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

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Gestión de productos del inventario
 */

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Listar productos
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
 *       401:
 *         description: Token requerido o inválido
 *       403:
 *         description: No tenés permisos para acceder a este recurso
 */
router.get("/", verificarToken, autorizarRoles("master", "cajero"), listarProductos);

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtener producto por ID
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto obtenido correctamente
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id", verificarToken, autorizarRoles("master", "cajero"), obtenerProductoPorId);

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - precio
 *               - stock
 *               - id_categoria
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Fanta 2L
 *               descripcion:
 *                 type: string
 *                 example: Gaseosa sabor naranja
 *               precio:
 *                 type: number
 *                 example: 2300
 *               stock:
 *                 type: integer
 *                 example: 10
 *               id_categoria:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Categoría no encontrada
 *       403:
 *         description: No tenés permisos para acceder a este recurso
 */
router.post("/", verificarToken, autorizarRoles("master"), crearProducto);

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Fanta 2L actualizada
 *               descripcion:
 *                 type: string
 *                 example: Gaseosa sabor naranja actualizada
 *               precio:
 *                 type: number
 *                 example: 2500
 *               stock:
 *                 type: integer
 *                 example: 15
 *               id_categoria:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Producto o categoría no encontrada
 *       403:
 *         description: No tenés permisos para acceder a este recurso
 */
router.put("/:id", verificarToken, autorizarRoles("master"), actualizarProducto);

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 *       403:
 *         description: No tenés permisos para acceder a este recurso
 */
router.delete("/:id", verificarToken, autorizarRoles("master"), eliminarProducto);

export default router;