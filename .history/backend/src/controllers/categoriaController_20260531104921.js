let categorias = [
  { id: 1, nombre: "Periféricos" },
  { id: 2, nombre: "Monitores" },
  { id: 3, nombre: "Notebooks" }
];

const listarCategorias = (req, res) => {
  res.json(categorias);
};

const obtenerCategoria = (req, res) => {
  const id = parseInt(req.params.id);
  const categoria = categorias.find(c => c.id === id);

  if (!categoria) return res.status(404).json({ error: "Categoría no encontrada" });

  res.json(categoria);
};

const crearCategoria = (req, res) => {
  const { nombre } = req.body;

  if (!nombre) return res.status(400).json({ error: "El nombre es obligatorio" });

  const nuevoId = categorias.length ? categorias[categorias.length - 1].id + 1 : 1;

  const nuevaCategoria = { id: nuevoId, nombre };
  categorias.push(nuevaCategoria);

  res.status(201).json(nuevaCategoria);
};

const actualizarCategoria = (req, res) => {
  const id = parseInt(req.params.id);
  const index = categorias.findIndex(c => c.id === id);

  if (index === -1) return res.status(404).json({ error: "Categoría no encontrada" });

  const { nombre } = req.body;

  categorias[index] = {
    ...categorias[index],
    nombre: nombre ?? categorias[index].nombre
  };

  res.json(categorias[index]);
};

const eliminarCategoria = (req, res) => {
  const id = parseInt(req.params.id);
  const index = categorias.findIndex(c => c.id === id);

  if (index === -1) return res.status(404).json({ error: "Categoría no encontrada" });

  categorias.splice(index, 1);

  res.json({ mensaje: "Categoría eliminada correctamente" });
};

module.exports = {
  listarCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
};
