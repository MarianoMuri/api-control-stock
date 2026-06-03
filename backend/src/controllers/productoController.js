import { Producto, Categoria } from '../models/index.js';

export const listarProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: [
        {
          model: Categoria,
          as: "categoria"
        }
      ]
    });

    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar productos" });
  }
};

export const obtenerProductoPorId = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const producto = await Producto.findByPk(id, {
      include: [
        {
          model: Categoria,
          as: "categoria"
        }
      ]
    });

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener producto" });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, id_categoria } = req.body;

    if (!nombre || precio === undefined || stock === undefined || !id_categoria) {
      return res.status(400).json({
        mensaje: "Nombre, precio, stock e id_categoria son obligatorios",
      });
    }

    const categoria = await Categoria.findByPk(Number(id_categoria));

    if (!categoria) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }

    const nuevoProducto = await Producto.create({
      nombre,
      descripcion: descripcion || "",
      precio: Number(precio),
      stock: Number(stock),
      id_categoria: Number(id_categoria),
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear producto" });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nombre, descripcion, precio, stock, id_categoria } = req.body;

    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    if (id_categoria) {
      const categoria = await Categoria.findByPk(Number(id_categoria));

      if (!categoria) {
        return res.status(404).json({ mensaje: "Categoría no encontrada" });
      }
    }

    await producto.update({
      nombre: nombre || producto.nombre,
      descripcion: descripcion || producto.descripcion,
      precio: precio !== undefined ? Number(precio) : producto.precio,
      stock: stock !== undefined ? Number(stock) : producto.stock,
      id_categoria: id_categoria ? Number(id_categoria) : producto.id_categoria,
    });

    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar producto" });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    await producto.destroy();

    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar producto" });
  }
};