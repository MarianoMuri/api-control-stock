import { Categoria } from '../models/index.js';

export const listarCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();

    res.json(categorias);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar categorías" });
  }
};

export const obtenerCategoriaPorId = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }

    res.json(categoria);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener categoría" });
  }
};

export const crearCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
      return res.status(400).json({ mensaje: "El nombre es obligatorio" });
    }

    const nuevaCategoria = await Categoria.create({
      nombre,
      descripcion: descripcion || "",
    });

    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear categoría" });
  }
};

export const actualizarCategoria = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nombre, descripcion } = req.body;

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }

    await categoria.update({
      nombre: nombre || categoria.nombre,
      descripcion: descripcion || categoria.descripcion,
    });

    res.json(categoria);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar categoría" });
  }
};

export const eliminarCategoria = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }

    await categoria.destroy();

    res.json({ mensaje: "Categoría eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar categoría" });
  }
};