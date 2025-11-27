const { Usuario } = require('../models');

// GET /api/usuarios
async function listarUsuarios(req, res) {
    try {
        const usuarios = await Usuario.findAll({
            attributes: ['id', 'nombre', 'email', 'rol', 'createdAt']
        });
        res.json(usuarios);
    } catch (error) {
        console.error('Error al listar usuarios:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
}

// POST /api/usuarios
async function crearUsuario(req, res) {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ error: 'Nombre, email y password son obligatorios' });
    }

    if (rol && !['master', 'cajero'].includes(rol)) {
        return res.status(400).json({ error: 'Rol inválido (master o cajero)' });
    }

    try {
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'Ya existe un usuario con ese email' });
        }

        const usuario = await Usuario.create({
            nombre,
            email,
            password,
            rol: rol || 'cajero'
        });

        res.status(201).json({
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
}

module.exports = {
    listarUsuarios,
    crearUsuario
};
