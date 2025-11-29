let productos = [
  {
    id: 1,
    nombre: 'Monitor 24"',
    descripcion: "Monitor LED 24 pulgadas",
    categoriaId: 1,
    stockActual: 10,
    stockMinimo: 2,
    precio: 120000,
  },
  {
    id: 2,
    nombre: "Teclado mecánico",
    descripcion: "Teclado mecánico RGB",
    categoriaId: 2,
    stockActual: 5,
    stockMinimo: 1,
    precio: 80000,
  },
];

const listarProductos = (req, res) => {
  res.json(productos);
};

const obtenerProducto = (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(producto);
};

const crearProducto = (req, res) => {
  const { nombre, descripcion, categoriaId, stockActual, stockMinimo, precio } =
    req.body;

  if (!nombre) {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }

  const nuevoId = productos.length ? productos[productos.length - 1].id + 1 : 1;

  const nuevoProducto = {
    id: nuevoId,
    nombre,
    descripcion: descripcion || "",
    categoriaId: categoriaId || null,
    stockActual: stockActual ?? 0,
    stockMinimo: stockMinimo ?? 0,
    precio: precio ?? 0,
  };

  productos.push(nuevoProducto);

  res.status(201).json(nuevoProducto);
};

const actualizarProducto = (req, res) => {
  const id = parseInt(req.params.id);
  const index = productos.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  const { nombre, descripcion, categoriaId, stockActual, stockMinimo, precio } =
    req.body;

  productos[index] = {
    ...productos[index],
    nombre: nombre ?? productos[index].nombre,
    descripcion: descripcion ?? productos[index].descripcion,
    categoriaId: categoriaId ?? productos[index].categoriaId,
    stockActual: stockActual ?? productos[index].stockActual,
    stockMinimo: stockMinimo ?? productos[index].stockMinimo,
    precio: precio ?? productos[index].precio,
  };

  res.json(productos[index]);
};

const eliminarProducto = (req, res) => {
  const id = parseInt(req.params.id);
  const index = productos.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  productos.splice(index, 1);

  res.json({ mensaje: "Producto eliminado correctamente" });
};

module.exports = {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
