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

    const precioNumerico = Number(precio);
    const stockNumerico = Number(stock);
    const idCategoriaNumerico = Number(id_categoria);

    if (isNaN(precioNumerico) || precioNumerico < 0) {
      return res.status(400).json({
        mensaje: "El precio debe ser un número mayor o igual a 0",
      });
    }

    if (isNaN(stockNumerico) || stockNumerico < 0) {
      return res.status(400).json({
        mensaje: "El stock debe ser un número mayor o igual a 0",
      });
    }

    if (isNaN(idCategoriaNumerico)) {
      return res.status(400).json({
        mensaje: "id_categoria debe ser numérico",
      });
    }

    const categoria = await Categoria.findByPk(idCategoriaNumerico);

    if (!categoria) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }

    const nuevoProducto = await Producto.create({
      nombre,
      descripcion: descripcion || "",
      precio: precioNumerico,
      stock: stockNumerico,
      id_categoria: idCategoriaNumerico,
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

    let precioActualizado = producto.precio;
    let stockActualizado = producto.stock;
    let idCategoriaActualizada = producto.id_categoria;

    if (precio !== undefined) {
      const precioNumerico = Number(precio);

      if (isNaN(precioNumerico) || precioNumerico < 0) {
        return res.status(400).json({
          mensaje: "El precio debe ser un número mayor o igual a 0",
        });
      }

      precioActualizado = precioNumerico;
    }

    if (stock !== undefined) {
      const stockNumerico = Number(stock);

      if (isNaN(stockNumerico) || stockNumerico < 0) {
        return res.status(400).json({
          mensaje: "El stock debe ser un número mayor o igual a 0",
        });
      }

      stockActualizado = stockNumerico;
    }

    if (id_categoria !== undefined) {
      const idCategoriaNumerico = Number(id_categoria);

      if (isNaN(idCategoriaNumerico)) {
        return res.status(400).json({
          mensaje: "id_categoria debe ser numérico",
        });
      }

      const categoria = await Categoria.findByPk(idCategoriaNumerico);

      if (!categoria) {
        return res.status(404).json({ mensaje: "Categoría no encontrada" });
      }

      idCategoriaActualizada = idCategoriaNumerico;
    }

    await producto.update({
      nombre: nombre || producto.nombre,
      descripcion: descripcion || producto.descripcion,
      precio: precioActualizado,
      stock: stockActualizado,
      id_categoria: idCategoriaActualizada,
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