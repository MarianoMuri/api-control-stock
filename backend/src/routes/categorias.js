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

/**
 * @swagger
 * tags:
 *   name: Categorías
 *   description: Gestión de categorías de productos
 */

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Listar categorías
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida correctamente
 *       401:
 *         description: Token requerido o inválido
 *       403:
 *         description: No tenés permisos para acceder a este recurso
 */
router.get("/", verificarToken, autorizarRoles("master", "cajero"), listarCategorias);

/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Obtener categoría por ID
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría obtenida correctamente
 *       404:
 *         description: Categoría no encontrada
 */
router.get("/:id", verificarToken, autorizarRoles("master", "cajero"), obtenerCategoriaPorId);

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categorías]
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
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Bebidas
 *               descripcion:
 *                 type: string
 *                 example: Productos líquidos y gaseosas
 *     responses:
 *       201:
 *         description: Categoría creada correctamente
 *       400:
 *         description: Datos inválidos
 *       403:
 *         description: No tenés permisos para acceder a este recurso
 */
router.post("/", verificarToken, autorizarRoles("master"), crearCategoria);

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Actualizar una categoría
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Bebidas Actualizadas
 *               descripcion:
 *                 type: string
 *                 example: Categoría modificada
 *     responses:
 *       200:
 *         description: Categoría actualizada correctamente
 *       404:
 *         description: Categoría no encontrada
 *       403:
 *         description: No tenés permisos para acceder a este recurso
 */
router.put("/:id", verificarToken, autorizarRoles("master"), actualizarCategoria);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada correctamente
 *       404:
 *         description: Categoría no encontrada
 *       403:
 *         description: No tenés permisos para acceder a este recurso
 */
router.delete("/:id", verificarToken, autorizarRoles("master"), eliminarCategoria);

export default router;