# Sistema de Inventario y Control de Stock

Proyecto Final Integrador de la Tecnicatura Universitaria en Programación.

El sistema permite gestionar inventario mediante una aplicación web full stack compuesta por un backend desarrollado con Node.js, Express y PostgreSQL, y un frontend construido con React.

La aplicación administra productos, categorías, movimientos de stock y usuarios, incorporando autenticación mediante JWT, control de acceso, documentación técnica y pruebas de funcionamiento.

---

# 1. Tecnologías utilizadas

## Backend

* Node.js
* Express
* PostgreSQL
* Sequelize ORM
* JWT (JSON Web Token)
* Bcrypt
* Joi
* Dotenv
* Cors
* Swagger
* Docker
* Docker Compose

## Frontend

* React
* React Router DOM
* Vite
* Fetch API
* LocalStorage
* CSS
* Vitest
* React Testing Library

## Herramientas de apoyo

* Git
* GitHub
* GitHub Projects
* Thunder Client
* Postman

---

# 2. Instalación y ejecución

## Backend

### Instalar dependencias

```bash
cd backend
npm install
```

### Configurar variables de entorno

Crear un archivo `.env`:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=control_stock
DB_PORT=5432

JWT_SECRET=tu_clave_secreta
```

### Ejecutar migraciones

```bash
npx sequelize-cli db:migrate
```

### Iniciar servidor

```bash
npm run dev
```

Servidor disponible en:

```text
http://localhost:3000
```

### Usuario administrador inicial

```text
Email: admin@test.com
Contraseña: admin123
Rol: master
```

---

## Frontend

### Instalar dependencias

```bash
cd frontend
npm install
```

### Configurar variables de entorno

Crear archivo `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

### Ejecutar aplicación

```bash
npm run dev
```

Frontend disponible en:

```text
http://localhost:5173
```

---

# 3. Estructura del proyecto

```text
backend/
├── config/
├── controllers/
├── middleware/
├── migrations/
├── models/
├── routes/
├── services/
├── swagger/
└── app.js

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── tests/
│   ├── App.jsx
│   └── main.jsx
└── public/

docs/
├── sprint1.md
├── sprint2.md
└── tests-integracion-frontend.md
```

---

# 4. Funcionalidades implementadas

## Autenticación

✔ Login mediante JWT

✔ Protección de rutas privadas

✔ Persistencia de sesión

✔ Logout

✔ Gestión de usuarios autenticados

---

## Gestión de Productos

✔ Alta de productos

✔ Modificación de productos

✔ Eliminación de productos

✔ Consulta de detalle

✔ Asociación a categorías

✔ Gestión de stock

---

## Gestión de Categorías

✔ Alta de categorías

✔ Modificación de categorías

✔ Eliminación de categorías

✔ Consulta de detalle

✔ Gestión de descripción

---

## Gestión de Usuarios

✔ Alta de usuarios

✔ Modificación de usuarios

✔ Eliminación de usuarios

✔ Consulta de detalle

✔ Gestión de roles

✔ Gestión de credenciales

---

## Gestión de Movimientos

✔ Registro de ingresos

✔ Registro de egresos

✔ Consulta de movimientos

✔ Actualización automática del stock

✔ Asociación de movimientos a productos

✔ Asociación de movimientos a usuarios

---

## Dashboard

✔ Totales de productos

✔ Totales de categorías

✔ Totales de movimientos

✔ Totales de usuarios

✔ Navegación a módulos principales

---

# 5. Endpoints principales

## Autenticación

```http
POST /api/auth/login
```

## Categorías

```http
GET    /api/categorias
POST   /api/categorias
PUT    /api/categorias/:id
DELETE /api/categorias/:id
```

## Productos

```http
GET    /api/productos
POST   /api/productos
PUT    /api/productos/:id
DELETE /api/productos/:id
```

## Usuarios

```http
GET    /api/usuarios
POST   /api/usuarios
PUT    /api/usuarios/:id
DELETE /api/usuarios/:id
```

## Movimientos

```http
GET    /api/movimientos
POST   /api/movimientos
DELETE /api/movimientos/:id
```

---

# 6. Testing

Se implementaron pruebas automatizadas en el frontend utilizando Vitest y React Testing Library.

Pruebas realizadas:

✔ Login

✔ Dashboard

✔ PrivateRoute

Además se verificó correctamente:

✔ Build de producción

✔ Navegación protegida

✔ Integración con API REST

---

# 7. Documentación

La documentación del proyecto se encuentra en la carpeta:

```text
docs/
```

Incluye:

* Sprint 1
* Sprint 2
* Casos de prueba e integración frontend

---

# 8. Gestión del proyecto

El desarrollo se organizó utilizando metodología ágil Scrum y seguimiento visual mediante GitHub Projects (Kanban).

Columnas utilizadas:

* Backlog
* To Do
* In Progress
* Review
* Done

---

# 9. Integrantes

👩 Jennifer Castro

👨 Mariano Murinigo

---

# 10. Objetivo del proyecto

Diseñar e implementar un sistema web full stack para la gestión de inventario y control de stock, permitiendo administrar productos, categorías, movimientos y usuarios mediante una interfaz React conectada a una API REST desarrollada con Node.js, Express y PostgreSQL, aplicando autenticación JWT, persistencia de datos, testing, documentación técnica y metodologías ágiles de trabajo.
