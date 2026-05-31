let usuarios = [
  {
    id: 1,
    nombre: "Administrador",
    email: "admin@test.com",
    password: "123456",
    rol: "master",
  },
  {
    id: 2,
    nombre: "Cajero",
    email: "cajero@test.com",
    password: "123456",
    rol: "cajero",
  },
];

export const listarUsuarios = (req, res) => {
  const usuariosSinPassword = usuarios.map(({ password, ...usuario }) => usuario);
  res.json(usuariosSinPassword);
};

export const obtenerUsuarioPorId = (req, res) => {
  const id = Number(req.params.id);
  const usuario = usuarios.find((item) => item.id === id);

  if (!usuario) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  const { password, ...usuarioSinPassword } = usuario;

  res.json(usuarioSinPassword);
};

export const crearUsuario = (req, res) => {
  const { nombre, email, password, rol } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({
      mensaje: "Nombre, email y contraseña son obligatorios",
    });
  }

  const existeEmail = usuarios.some((item) => item.email === email);

  if (existeEmail) {
    return res.status(400).json({
      mensaje: "Ya existe un usuario con ese email",
    });
  }

  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    email,
    password,
    rol: rol || "cajero",
  };

  usuarios.push(nuevoUsuario);

  const { password: _, ...usuarioSinPassword } = nuevoUsuario;

  res.status(201).json(usuarioSinPassword);
};

export const actualizarUsuario = (req, res) => {
  const id = Number(req.params.id);
  const { nombre, email, password, rol } = req.body;

  const usuario = usuarios.find((item) => item.id === id);

  if (!usuario) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  usuario.nombre = nombre || usuario.nombre;
  usuario.email = email || usuario.email;
  usuario.password = password || usuario.password;
  usuario.rol = rol || usuario.rol;

  const { password: _, ...usuarioSinPassword } = usuario;

  res.json(usuarioSinPassword);
};

export const eliminarUsuario = (req, res) => {
  const id = Number(req.params.id);
  const existeUsuario = usuarios.some((item) => item.id === id);

  if (!existeUsuario) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  usuarios = usuarios.filter((item) => item.id !== id);

  res.json({ mensaje: "Usuario eliminado correctamente" });
};