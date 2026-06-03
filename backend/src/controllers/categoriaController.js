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

    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ mensaje: "El nombre es obligatorio" });
    }

    const categoriaExistente = await Categoria.findOne({
      where: { nombre: nombre.trim() }
    });

    if (categoriaExistente) {
      return res.status(400).json({ mensaje: "Ya existe una categoría con ese nombre" });
    }

    const nuevaCategoria = await Categoria.create({
      nombre: nombre.trim(),
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

    if (nombre !== undefined && !nombre.trim()) {
      return res.status(400).json({ mensaje: "El nombre no puede estar vacío" });
    }

    if (nombre !== undefined) {
      const categoriaExistente = await Categoria.findOne({
        where: { nombre: nombre.trim() }
      });

      if (categoriaExistente && categoriaExistente.id !== categoria.id) {
        return res.status(400).json({ mensaje: "Ya existe una categoría con ese nombre" });
      }
    }

    await categoria.update({
      nombre: nombre !== undefined ? nombre.trim() : categoria.nombre,
      descripcion: descripcion !== undefined ? descripcion : categoria.descripcion,
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