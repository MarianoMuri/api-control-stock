let usuarios = [
  {
    id: 1,
    nombre: "Administrador",
    email: "admin@controlstock.com",
    rol: "admin"
  },
  {
    id: 2,
    nombre: "Operador Depósito",
    email: "operador@controlstock.com",
    rol: "operador"
  }
];

const listarUsuarios = (req, res) => {
  res.json(usuarios);
};

const obtenerUsuario = (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

  res.json(usuario);
};

const crearUsuario = (req, res) => {
  const { nombre, email, rol } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: "nombre y email son obligatorios" });
  }

  const nuevoId = usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1;

  const nuevoUsuario = {
    id: nuevoId,
    nombre,
    email,
    rol: rol || "operador"
  };

  usuarios.push(nuevoUsuario);

  res.status(201).json(nuevoUsuario);
};

const actualizarUsuario = (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) return res.status(404).json({ error: "Usuario no encontrado" });

  const { nombre, email, rol } = req.body;

  usuarios[index] = {
    ...usuarios[index],
    nombre: nombre ?? usuarios[index].nombre,
    email: email ?? usuarios[index].email,
    rol: rol ?? usuarios[index].rol
  };

  res.json(usuarios[index]);
};

const eliminarUsuario = (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) return res.status(404).json({ error: "Usuario no encontrado" });

  usuarios.splice(index, 1);

  res.json({ mensaje: "Usuario eliminado correctamente" });
};

module.exports = {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
};
