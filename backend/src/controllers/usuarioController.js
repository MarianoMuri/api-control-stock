import bcrypt from 'bcryptjs';
import { Usuario } from '../models/index.js';

const rolesPermitidos = ["master", "cajero"];

const emailValido = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ["password"] }
    });

    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar usuarios" });
  }
};

export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const usuario = await Usuario.findByPk(id, {
      attributes: { exclude: ["password"] }
    });

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuario" });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !nombre.trim() || !email || !password) {
      return res.status(400).json({
        mensaje: "Nombre, email y contraseña son obligatorios",
      });
    }

    if (!emailValido(email)) {
      return res.status(400).json({
        mensaje: "El email no tiene un formato válido",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        mensaje: "La contraseña debe tener al menos 6 caracteres",
      });
    }

    if (rol && !rolesPermitidos.includes(rol)) {
      return res.status(400).json({
        mensaje: "El rol debe ser master o cajero",
      });
    }

    const existeEmail = await Usuario.findOne({
      where: { email }
    });

    if (existeEmail) {
      return res.status(400).json({
        mensaje: "Ya existe un usuario con ese email",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const nuevoUsuario = await Usuario.create({
      nombre: nombre.trim(),
      email,
      password: passwordHash,
      rol: rol || "cajero",
    });

    const usuarioSinPassword = {
      id: nuevoUsuario.id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      rol: nuevoUsuario.rol,
      createdAt: nuevoUsuario.createdAt,
      updatedAt: nuevoUsuario.updatedAt,
    };

    res.status(201).json(usuarioSinPassword);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear usuario" });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nombre, email, password, rol } = req.body;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (nombre !== undefined && !nombre.trim()) {
      return res.status(400).json({
        mensaje: "El nombre no puede estar vacío",
      });
    }

    if (email !== undefined) {
      if (!emailValido(email)) {
        return res.status(400).json({
          mensaje: "El email no tiene un formato válido",
        });
      }

      const existeEmail = await Usuario.findOne({
        where: { email }
      });

      if (existeEmail && existeEmail.id !== usuario.id) {
        return res.status(400).json({
          mensaje: "Ya existe un usuario con ese email",
        });
      }
    }

    if (password !== undefined && password.length < 6) {
      return res.status(400).json({
        mensaje: "La contraseña debe tener al menos 6 caracteres",
      });
    }

    if (rol !== undefined && !rolesPermitidos.includes(rol)) {
      return res.status(400).json({
        mensaje: "El rol debe ser master o cajero",
      });
    }

    const datosActualizados = {
      nombre: nombre !== undefined ? nombre.trim() : usuario.nombre,
      email: email !== undefined ? email : usuario.email,
      rol: rol !== undefined ? rol : usuario.rol,
    };

    if (password) {
      datosActualizados.password = await bcrypt.hash(password, 10);
    }

    await usuario.update(datosActualizados);

    const usuarioSinPassword = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      createdAt: usuario.createdAt,
      updatedAt: usuario.updatedAt,
    };

    res.json(usuarioSinPassword);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar usuario" });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    await usuario.destroy();

    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar usuario" });
  }
};