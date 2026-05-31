Sistema de Inventario y Control de Stock – Frontend (React)
Integrantes

👩 Jennifer Castro
👨 Mariano Murinigo

Descripción del Proyecto

Este frontend forma parte del Proyecto Final de la materia Metodología de Sistemas.
Implementa la interfaz de usuario del Sistema de Inventario y Control de Stock, consumiendo la API desarrollada en Node.js.

Permite gestionar:

Productos

Categorías

Movimientos de stock

Usuarios

El objetivo es ofrecer una interfaz simple, ágil y accesible para negocios pequeños o minimercados.

Tecnologías utilizadas

React

Vite

React Hooks

Fetch API / Axios (según uses)

CSS Modules / Tailwind / estilos propios (adaptar según tu proyecto)

Thunder Client / Postman para pruebas

Estructura del proyecto

src/
├── components/
│   ├── Navbar.jsx
│   ├── ProductoForm.jsx
│   ├── CategoriaForm.jsx
│   ├── MovimientoForm.jsx
│   └── ...
├── pages/
│   ├── Productos.jsx
│   ├── Categorias.jsx
│   ├── Movimientos.jsx
│   ├── Usuarios.jsx
│   └── Home.jsx
├── services/
│   ├── api.js
│   └── productosService.js
├── App.jsx
├── main.jsx
└── index.css


Configuración del entorno

Crear un archivo .env en la carpeta del frontend:
VITE_API_URL=http://localhost:3000/api

Y crear también .env.example:
VITE_API_URL=
Esto permite cambiar la URL de la API fácilmente, incluso en producción.

Instalación y ejecución
1)  Clonar el repositorio

git clone https://github.com/MarianoMuri/api-control-stock
cd frontend

2) Instalar dependencias
npm install

3) Ejecutar el servidor de desarrollo
npm run dev

El frontend estará disponible en:

  http://localhost:5173

(La URL puede variar según Vite).

Conexión con el backend

El frontend se comunica con la API en:

  http://localhost:3000/api

La base se configura en:
VITE_API_URL=http://localhost:3000/api


Pantallas incluidas (o previstas)

✔ Dashboard / Home
✔ Listado de Productos
✔ Alta / Edición / Eliminación de Productos
✔ Gestión de Categorías
✔ Registro de Movimientos de Stock
✔ Registro y Gestión de Usuarios


----------------------------------------------------------
Próximas mejoras

Autenticación y login de usuarios

Roles (master / cajero)

Integración completa con la base de datos real

Dashboard con gráficas

Notificaciones de stock crítico

Mejoras de usabilidad (modales, loaders, errores globales)

Testing en frontend

Deploy en Vercel / Netlify

----------------------------------------------------------