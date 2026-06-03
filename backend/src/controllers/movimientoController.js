import { Movimiento, Producto, Usuario } from '../models/index.js';

export const listarMovimientos = async (req, res) => {
  try {
    const movimientos = await Movimiento.findAll({
      include: [
        {
          model: Producto,
          as: "producto"
        },
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "nombre", "email", "rol"]
        }
      ]
    });

    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar movimientos" });
  }
};

export const obtenerMovimientoPorId = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const movimiento = await Movimiento.findByPk(id, {
      include: [
        {
          model: Producto,
          as: "producto"
        },
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "nombre", "email", "rol"]
        }
      ]
    });

    if (!movimiento) {
      return res.status(404).json({ mensaje: "Movimiento no encontrado" });
    }

    res.json(movimiento);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener movimiento" });
  }
};

export const crearMovimiento = async (req, res) => {
  try {
    const { tipo, cantidad, id_producto, fecha } = req.body;
    const id_usuario = req.usuario.id;

    if (!tipo || !cantidad || !id_producto) {
      return res.status(400).json({
        mensaje: "Tipo, cantidad e id_producto son obligatorios",
      });
    }

    if (tipo !== "ingreso" && tipo !== "egreso") {
      return res.status(400).json({
        mensaje: "El tipo debe ser ingreso o egreso",
      });
    }

    const producto = await Producto.findByPk(Number(id_producto));

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    const usuario = await Usuario.findByPk(Number(id_usuario));

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    const cantidadNumerica = Number(cantidad);

    if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
      return res.status(400).json({
        mensaje: "La cantidad debe ser un número mayor a 0",
      });
    }

    if (tipo === "egreso" && producto.stock < cantidadNumerica) {
      return res.status(400).json({ mensaje: "Stock insuficiente" });
    }

    const nuevoStock = tipo === "ingreso"
      ? producto.stock + cantidadNumerica
      : producto.stock - cantidadNumerica;

    await producto.update({
      stock: nuevoStock,
    });

    const nuevoMovimiento = await Movimiento.create({
      tipo,
      cantidad: cantidadNumerica,
      id_producto: Number(id_producto),
      id_usuario,
      fecha: fecha || new Date(),
    });

    res.status(201).json(nuevoMovimiento);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear movimiento" });
  }
};

export const eliminarMovimiento = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const movimiento = await Movimiento.findByPk(id);

    if (!movimiento) {
      return res.status(404).json({ mensaje: "Movimiento no encontrado" });
    }

    await movimiento.destroy();

    res.json({ mensaje: "Movimiento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar movimiento" });
  }
};