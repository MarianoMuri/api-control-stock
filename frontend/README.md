# Sistema de Inventario y Control de Stock – Frontend (React)

## Integrantes

👩 Jennifer Castro
👨 Mariano Murinigo

---

## Descripción del Proyecto

Este frontend forma parte del Proyecto Final de la materia Metodología de Sistemas.

Implementa la interfaz de usuario del Sistema de Inventario y Control de Stock, consumiendo la API desarrollada en Node.js.

Permite gestionar:

* Productos
* Categorías
* Movimientos de stock
* Usuarios

El objetivo es ofrecer una interfaz simple, ágil y accesible para negocios pequeños o minimercados.

---

## Tecnologías utilizadas

* React
* Vite
* React Router DOM
* React Hooks
* Fetch API
* LocalStorage
* CSS propio
* Thunder Client / Postman para pruebas

---

## Estructura del proyecto

```text
src/
├── components/
│   ├── BackToHome.jsx
│   ├── PrivateRoute.jsx
│   ├── ProductoForm.jsx
│   ├── CategoriaForm.jsx
│   ├── MovimientoForm.jsx
│   └── ...
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Productos.jsx
│   ├── Categorias.jsx
│   ├── Movimientos.jsx
│   ├── Usuarios.jsx
│   ├── ProductoDetalle.jsx
│   ├── CategoriaDetalle.jsx
│   ├── MovimientoDetalle.jsx
│   └── UsuarioDetalle.jsx
├── services/
│   ├── api.js
│   ├── productosService.js
│   └── authService.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## Configuración del entorno

Crear un archivo `.env` en la carpeta del frontend:

```env
VITE_API_URL=http://localhost:3000/api
```

Crear también un archivo `.env.example`:

```env
VITE_API_URL=
```

Esto permite cambiar fácilmente la URL de la API entre desarrollo y producción.

---

## Instalación y ejecución

### 1) Clonar el repositorio

```bash
git clone https://github.com/MarianoMuri/api-control-stock
cd frontend
```

### 2) Instalar dependencias

```bash
npm install
```

### 3) Ejecutar el servidor de desarrollo

```bash
npm run dev
```

El frontend estará disponible en:

```text
http://localhost:5173
```

(La URL puede variar según Vite).

---

## Conexión con el backend

El frontend se comunica con la API en:

```text
http://localhost:3000/api
```

La URL base se configura mediante:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## Pantallas incluidas

✔ Login de usuarios

✔ Dashboard / Home

✔ Listado de Productos

✔ Alta de Productos

✔ Edición de Productos

✔ Eliminación de Productos

✔ Gestión de Categorías

✔ Registro de Movimientos de Stock

✔ Gestión de Usuarios

✔ Vista de detalle de Productos

✔ Vista de detalle de Categorías

✔ Vista de detalle de Movimientos

✔ Vista de detalle de Usuarios

---

## Funcionalidades implementadas

### Gestión de Productos

* Alta de productos
* Modificación de productos
* Eliminación de productos
* Consulta de detalle

### Gestión de Categorías

* Alta de categorías
* Modificación de categorías
* Eliminación de categorías
* Consulta de detalle

### Gestión de Movimientos

* Registro de ingresos
* Registro de egresos
* Consulta de movimientos

### Gestión de Usuarios

* Alta de usuarios
* Modificación de usuarios
* Eliminación de usuarios
* Consulta de detalle

### Autenticación (Frontend)

* Pantalla de Login
* Servicio de autenticación (`authService.js`)
* Persistencia de sesión mediante LocalStorage
* Protección de rutas privadas mediante `PrivateRoute`
* Cierre de sesión (Logout)
* Preparado para integración con JWT

---

## Mejoras implementadas en esta versión

### Sprint: Autenticación de Usuarios

Se incorporó la estructura inicial de autenticación del frontend:

* Creación de Login.jsx
* Creación de authService.js
* Implementación de PrivateRoute.jsx
* Protección de pantallas privadas
* Persistencia de sesión
* Redirección automática al Login
* Preparación para autenticación JWT desde backend

---

## Próximas mejoras

### En desarrollo

* Endpoint de Login en Backend
* Integración completa JWT
* Roles (master / cajero)

### Pendientes

* Integración completa con base de datos real
* Dashboard con gráficas
* Indicadores de stock crítico
* Notificaciones automáticas
* Modales reutilizables
* Loaders globales
* Manejo centralizado de errores
* Testing Frontend
* Testing E2E
* Deploy en Vercel
* Deploy en Netlify
* Recuperación de contraseña
* Auditoría de acciones de usuarios

---

## Estado actual del proyecto

### Backend

✔ API REST operativa

✔ CRUD de Productos

✔ CRUD de Categorías

✔ CRUD de Movimientos

✔ CRUD de Usuarios

✔ Conexión con PostgreSQL

### Frontend

✔ CRUD visual completo

✔ Navegación entre pantallas

✔ Formularios de gestión

✔ Vistas de detalle

✔ Autenticación inicial implementada

✔ Protección de rutas privadas

---

## Proyecto Académico

Trabajo Final Integrador de la materia Metodología de Sistemas.

Objetivo: diseñar e implementar una solución de gestión de inventario para pequeños comercios utilizando una arquitectura cliente-servidor basada en React, Node.js, Express y PostgreSQL.



----------------------------------------------------------
Próximas mejoras

Roles (master / cajero)

Integración completa con la base de datos real

Dashboard con gráficas

Notificaciones de stock crítico

Mejoras de usabilidad (modales, loaders, errores globales)

Testing en frontend

Deploy en Vercel / Netlify

----------------------------------------------------------