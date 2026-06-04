# Sistema de Inventario y Control de Stock – Frontend (React)

## Integrantes

👩 Jennifer Castro
👨 Mariano Murinigo

---

## Descripción del Proyecto

Este frontend forma parte del Proyecto Final Integrador de la Tecnicatura Universitaria en Programación.

Implementa la interfaz de usuario del Sistema de Inventario y Control de Stock, consumiendo una API REST desarrollada en Node.js, Express y PostgreSQL.

El sistema permite administrar:

* Productos
* Categorías
* Movimientos de stock
* Usuarios

Además incorpora autenticación mediante JWT y control de acceso a las distintas secciones de la aplicación.

---

## Tecnologías utilizadas

* React
* Vite
* React Router DOM
* React Hooks
* Fetch API
* LocalStorage
* JavaScript ES6+
* CSS
* JWT

---

## Estructura del proyecto

```text
src/
├── components/
│   ├── BackToHome.jsx
│   └── PrivateRoute.jsx
│
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
│
├── services/
│   ├── api.js
│   └── authService.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## Configuración del entorno

Crear un archivo `.env` en la carpeta raíz del frontend:

```env
VITE_API_URL=http://localhost:3000/api
```

También se recomienda incluir:

```env
VITE_API_URL=
```

como archivo `.env.example`.

---

## Instalación y ejecución

### Instalar dependencias

```bash
npm install
```

### Ejecutar entorno de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

---

## Conexión con la API

El frontend consume la API mediante:

```env
VITE_API_URL=http://localhost:3000/api
```

Todas las solicitudes autenticadas utilizan JWT almacenado en LocalStorage.

La configuración de autorización se centraliza en:

```text
src/services/api.js
```

que agrega automáticamente el token a cada request.

---

## Autenticación y Seguridad

### Login

El sistema implementa autenticación mediante JWT.

Pantalla:

```text
/login
```

Servicios:

```text
src/services/authService.js
src/services/api.js
```

Funcionalidades:

✔ Inicio de sesión

✔ Persistencia de sesión mediante LocalStorage

✔ Almacenamiento de token JWT

✔ Almacenamiento de usuario autenticado

✔ Logout

✔ Redirección automática al Login cuando el token es inválido

✔ Protección de rutas privadas mediante PrivateRoute

---

## Dashboard

La pantalla principal muestra información obtenida en tiempo real desde la API.

Indicadores:

✔ Total de Productos

✔ Total de Categorías

✔ Total de Movimientos

✔ Total de Usuarios

Además permite navegar directamente hacia cada módulo.

---

## Módulo de Productos

Funcionalidades:

✔ Listado de productos

✔ Consulta de detalle

✔ Alta de productos

✔ Modificación de productos

✔ Eliminación de productos

✔ Selección de categoría asociada

✔ Visualización de stock

✔ Visualización de precio

---

## Módulo de Categorías

Funcionalidades:

✔ Listado de categorías

✔ Consulta de detalle

✔ Alta de categorías

✔ Modificación de categorías## Módulo de Usuarios

Funcionalidades:

✔ Listado de usuarios

✔ Consulta de detalle

✔ Alta de usuarios

✔ Modificación de usuarios

✔ Eliminación de usuarios

✔ Gestión de roles (master / cajero)

✔ Gestión de credenciales

---

## Módulo de Movimientos

Funcionalidades:

✔ Listado de movimientos

✔ Consulta de detalle

✔ Registro de ingresos de stock

✔ Registro de egresos de stock

✔ Selección de producto asociado

✔ Visualización del usuario que realizó la operación

✔ Eliminación de movimientos

✔ Actualización automática del stock reflejada en el sistema

---

## Pantallas implementadas

✔ Login

✔ Dashboard

✔ Productos

✔ Categorías

✔ Movimientos

✔ Usuarios

✔ Detalle de Producto

✔ Detalle de Categoría

✔ Detalle de Movimiento

✔ Detalle de Usuario

---

## Funcionalidades implementadas

### Navegación

✔ React Router DOM

✔ Navegación protegida

✔ Navegación entre módulos

✔ Enlaces a vistas de detalle

✔ Botón de regreso al inicio

### Consumo de API

✔ Integración completa con API REST

✔ Solicitudes GET

✔ Solicitudes POST

✔ Solicitudes PUT

✔ Solicitudes DELETE

✔ Manejo de token JWT

✔ Manejo de errores de autenticación

### Persistencia

✔ Persistencia de sesión mediante LocalStorage

✔ Persistencia del token JWT

✔ Persistencia de usuario autenticado

---

## Estado actual del proyecto

### Frontend

✔ React configurado

✔ Vite configurado

✔ React Router configurado

✔ Autenticación JWT implementada

✔ Protección de rutas privadas

✔ Dashboard conectado a datos reales

✔ CRUD completo de Categorías

✔ CRUD completo de Productos

✔ CRUD completo de Usuarios

✔ Gestión completa de Movimientos

✔ Vistas de detalle conectadas a la API

✔ Integración completa con backend

✔ Consumo de datos reales desde PostgreSQL

✔ Manejo de errores de API

✔ Navegación entre módulos

✔ Persistencia de sesión

---

## Próximas mejoras

### Interfaz de usuario

* Mejoras visuales y estilos CSS
* Diseño responsive para dispositivos móviles
* Componentes reutilizables
* Modales de confirmación personalizados

### Dashboard

* Gráficas e indicadores visuales
* Productos con stock crítico
* Resumen de movimientos recientes

### Calidad de software

* Testing Frontend
* Testing E2E
* Manejo centralizado de errores
* Optimización de componentes

### Despliegue

* Deploy del frontend
* Configuración para entorno de producción

---

## Proyecto Académico

Proyecto Final Integrador de la Tecnicatura Universitaria en Programación.

Objetivo:

Diseñar e implementar un sistema web de gestión de inventario utilizando una arquitectura cliente-servidor basada en React, Node.js, Express y PostgreSQL, aplicando buenas prácticas de desarrollo, autenticación mediante JWT, persistencia de datos y metodologías ágiles de trabajo.

✔ Eliminación de categorías

✔ Gestión de descripción

