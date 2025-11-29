let movimientos = [
  {
    id: 1,
    productoId: 1,
    tipo: "ENTRADA",
    cantidad: 5,
    fecha: "2024-11-01T10:00:00Z",
    usuario: "admin"
  },
  {
    id: 2,
    productoId: 2,
    tipo: "SALIDA",
    cantidad: 2,
    fecha: "2024-11-02T15:30:00Z",
    usuario: "admin"
  }
];

const listarMovimientos = (req, res) => {
  res.json(movimientos);
};

const obtenerMovimiento = (req, res) => {
  const id = parseInt(req.params.id);
  const movimiento = movimientos.find(m => m.id === id);

  if (!movimiento) return res.status(404).json({ error: "Movimiento no encontrado" });

  res.json(movimiento);
};

const crearMovimiento = (req, res) => {
  const { productoId, tipo, cantidad, fecha, usuario } = req.body;

  if (!productoId || !tipo || !cantidad) {
    return res.status(400).json({ error: "productoId, tipo y cantidad son obligatorios" });
  }

  const nuevoId = movimientos.length ? movimientos[movimientos.length - 1].id + 1 : 1;

  const nuevoMovimiento = {
    id: nuevoId,
    productoId,
    tipo,
    cantidad,
    fecha: fecha || new Date().toISOString(),
    usuario: usuario || "sistema"
  };

  movimientos.push(nuevoMovimiento);

  res.status(201).json(nuevoMovimiento);
};

const eliminarMovimiento = (req, res) => {
  const id = parseInt(req.params.id);
  const index = movimientos.findIndex(m => m.id === id);

  if (index === -1) return res.status(404).json({ error: "Movimiento no encontrado" });

  movimientos.splice(index, 1);

  res.json({ mensaje: "Movimiento eliminado correctamente" });
};

module.exports = {
  listarMovimientos,
  obtenerMovimiento,
  crearMovimiento,
  eliminarMovimiento
};
