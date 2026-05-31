import express from "express";

import categoriaRoutes from "./categorias.js";
import productoRoutes from "./productos.js";
import movimientoRoutes from "./movimientos.js";
import usuarioRoutes from "./usuarios.js";
import authRoutes from "./auth.js";

const router = express.Router();

router.use("/categorias", categoriaRoutes);
router.use("/productos", productoRoutes);
router.use("/movimientos", movimientoRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/auth", authRoutes);

export default router;