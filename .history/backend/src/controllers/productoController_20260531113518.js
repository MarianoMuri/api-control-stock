let productos = [
  {
    id: 1,
    nombre: "Coca Cola 2L",
    descripcion: "Gaseosa sabor cola",
    precio: 2500,
    stock: 20,
    idCategoria: 1,
  },
  {
    id: 2,
    nombre: "Yerba Mate 1kg",
    descripcion: "Yerba mate tradicional",
    precio: 3200,
    stock: 15,
    idCategoria: 2,
  },
];

export const listarProductos = (req, res) => {
  res.json(productos);
};

export const obtenerProductoPorId = (req, res) => {
  const id = Number(req.params.id);
  const producto = productos.find((item) => item.id === id);

  if (!producto) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }

  res.json(producto);
};

export const crearProducto = (req, res) => {
  const { nombre, descripcion, precio, stock, idCategoria } = req.body;

  if (!nombre || precio === undefined || stock === undefined) {
    return res.status(400).json({
      mensaje: "Nombre, precio y stock son obligatorios",
    });
  }

  const nuevoProducto = {
    id: productos.length + 1,
    nombre,
    descripcion: descripcion || "",
    precio: Number(precio),
    stock: Number(stock),
    idCategoria: idCategoria || null,
  };

  productos.push(nuevoProducto);

  res.status(201).json(nuevoProducto);
};

export const actualizarProducto = (req, res) => {
  const id = Number(req.params.id);
  const { nombre, descripcion, precio, stock, idCategoria } = req.body;

  const producto = productos.find((item) => item.id === id);

  if (!producto) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }

  producto.nombre = nombre || producto.nombre;
  producto.descripcion = descripcion || producto.descripcion;
  producto.precio = precio !== undefined ? Number(precio) : producto.precio;
  producto.stock = stock !== undefined ? Number(stock) : producto.stock;
  producto.idCategoria = idCategoria || producto.idCategoria;

  res.json(producto);
};

export const eliminarProducto = (req, res) => {
  const id = Number(req.params.id);
  const existeProducto = productos.some((item) => item.id === id);

  if (!existeProducto) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }

  productos = productos.filter((item) => item.id !== id);

  res.json({ mensaje: "Producto eliminado correctamente" });
};