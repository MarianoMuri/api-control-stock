let categorias = [
  {
    id: 1,
    nombre: "Bebidas",
    descripcion: "Productos líquidos para consumo",
  },
  {
    id: 2,
    nombre: "Almacén",
    descripcion: "Productos secos y de almacén",
  },
];

export const listarCategorias = (req, res) => {
  res.json(categorias);
};

export const obtenerCategoriaPorId = (req, res) => {
  const id = Number(req.params.id);
  const categoria = categorias.find((item) => item.id === id);

  if (!categoria) {
    return res.status(404).json({ mensaje: "Categoría no encontrada" });
  }

  res.json(categoria);
};

export const crearCategoria = (req, res) => {
  const { nombre, descripcion } = req.body;

  if (!nombre) {
    return res.status(400).json({ mensaje: "El nombre es obligatorio" });
  }

  const nuevaCategoria = {
    id: categorias.length + 1,
    nombre,
    descripcion: descripcion || "",
  };

  categorias.push(nuevaCategoria);

  res.status(201).json(nuevaCategoria);
};

export const actualizarCategoria = (req, res) => {
  const id = Number(req.params.id);
  const { nombre, descripcion } = req.body;

  const categoria = categorias.find((item) => item.id === id);

  if (!categoria) {
    return res.status(404).json({ mensaje: "Categoría no encontrada" });
  }

  categoria.nombre = nombre || categoria.nombre;
  categoria.descripcion = descripcion || categoria.descripcion;

  res.json(categoria);
};

export const eliminarCategoria = (req, res) => {
  const id = Number(req.params.id);
  const existeCategoria = categorias.some((item) => item.id === id);

  if (!existeCategoria) {
    return res.status(404).json({ mensaje: "Categoría no encontrada" });
  }

  categorias = categorias.filter((item) => item.id !== id);

  res.json({ mensaje: "Categoría eliminada correctamente" });
};