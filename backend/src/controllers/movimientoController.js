let movimientos = [
  {
    id: 1,
    tipo: "ingreso",
    cantidad: 10,
    idProducto: 1,
    descripcion: "Ingreso inicial de stock",
    fecha: new Date(),
  },
];

export const listarMovimientos = (req, res) => {
  res.json(movimientos);
};

export const obtenerMovimientoPorId = (req, res) => {
  const id = Number(req.params.id);
  const movimiento = movimientos.find((item) => item.id === id);

  if (!movimiento) {
    return res.status(404).json({ mensaje: "Movimiento no encontrado" });
  }

  res.json(movimiento);
};

export const crearMovimiento = (req, res) => {
  const { tipo, cantidad, idProducto, descripcion } = req.body;

  if (!tipo || !cantidad || !idProducto) {
    return res.status(400).json({
      mensaje: "Tipo, cantidad e idProducto son obligatorios",
    });
  }

  if (tipo !== "ingreso" && tipo !== "egreso") {
    return res.status(400).json({
      mensaje: "El tipo debe ser ingreso o egreso",
    });
  }

  const nuevoMovimiento = {
    id: movimientos.length + 1,
    tipo,
    cantidad: Number(cantidad),
    idProducto: Number(idProducto),
    descripcion: descripcion || "",
    fecha: new Date(),
  };

  movimientos.push(nuevoMovimiento);

  res.status(201).json(nuevoMovimiento);
};

export const eliminarMovimiento = (req, res) => {
  const id = Number(req.params.id);
  const existeMovimiento = movimientos.some((item) => item.id === id);

  if (!existeMovimiento) {
    return res.status(404).json({ mensaje: "Movimiento no encontrado" });
  }

  movimientos = movimientos.filter((item) => item.id !== id);

  res.json({ mensaje: "Movimiento eliminado correctamente" });
};