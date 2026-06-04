# Sistema de Inventario y Control de Stock - Backend

## 👥 Integrantes

👩 Jennifer Castro

👨 Mariano Murinigo

---

## 📌 Descripción del Proyecto

API REST desarrollada como Proyecto Final Integrador.

El sistema permite gestionar el inventario y control de stock de un comercio mediante la administración de:

* Categorías
* Productos
* Movimientos de stock
* Usuarios

La aplicación fue desarrollada utilizando Node.js, Express, Sequelize y PostgreSQL, implementando autenticación mediante JWT y autorización basada en roles.

Actualmente cuenta con persistencia real de datos en PostgreSQL y relaciones entre entidades utilizando Sequelize ORM.

---

## 🚀 Tecnologías utilizadas

### Backend

* Node.js
* Express
* Sequelize
* PostgreSQL
* JWT (jsonwebtoken)
* bcryptjs
* dotenv
* cors

### Base de Datos

* PostgreSQL

### Testing

* Postman

### Seguridad

* JSON Web Tokens (JWT)
* Middleware de autenticación
* Middleware de autorización por roles

---

## 📂 Estructura principal

```text
src/
├── app.js
├── server.js
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   ├── categoriaController.js
│   ├── productoController.js
│   ├── movimientoController.js
│   └── usuarioController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── categoria.js
│   ├── producto.js
│   ├── movimiento.js
│   ├── usuario.js
│   └── index.js
├── routes/
│   ├── auth.js
│   ├── categorias.js
│   ├── productos.js
│   ├── movimientos.js
│   ├── usuarios.js
│   └── index.js
└── config/
    └── database.js
```

---

## 🛠️ Instalación y ejecución

### 1. Clonar repositorio

```bash
git clone https://github.com/MarianoMuri/api-control-stock
cd api-control-stock/backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear base de datos

```sql
CREATE DATABASE control_stock;
```

### 4. Configurar variables de entorno

Crear archivo `.env`

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=control_stock
DB_USER=tu_usuario_postgres
DB_PASSWORD=tu_password

JWT_SECRET=clave_super_secreta_control_stock
```

### 5. Ejecutar servidor

```bash
npm run dev
```

Servidor disponible en:

```text
http://localhost:3000
```

Al iniciar:

* Sequelize se conecta a PostgreSQL.
* Se sincronizan automáticamente las tablas.
* Se crean las relaciones entre modelos.
* Se habilitan las rutas protegidas mediante JWT.

---

## 🗄️ Modelo de Datos

### Categorías

```json
{
  "id": 1,
  "nombre": "Bebidas",
  "descripcion": "Productos líquidos para consumo"
}
```

### Productos

```json
{
  "id": 1,
  "nombre": "Coca Cola 2L",
  "descripcion": "Gaseosa sabor cola",
  "precio": 2500,
  "stock": 20,
  "id_categoria": 1
}
```

### Usuarios

```json
{
  "id": 1,
  "nombre": "Administrador",
  "email": "admin@test.com",
  "rol": "master"
}
```

### Movimientos

```json
{
  "id": 1,
  "tipo": "ingreso",
  "cantidad": 5,
  "id_producto": 1,
  "id_usuario": 1,
  "fecha": "2026-06-03"
}
```
---

## 🔗 Relaciones implementadas

### Categorías ↔ Productos

Una categoría puede tener muchos productos.

```text
Categoria 1 ------ N Producto
```

Un producto pertenece a una única categoría.

---

### Productos ↔ Movimientos

Un producto puede registrar múltiples movimientos de stock.

```text
Producto 1 ------ N Movimiento
```

Cada movimiento pertenece a un único producto.

---

### Usuarios ↔ Movimientos

Un usuario puede registrar múltiples movimientos.

```text
Usuario 1 ------ N Movimiento
```

Cada movimiento queda asociado al usuario que lo realizó.

---

## 📦 Control automático de stock

El sistema actualiza automáticamente el stock de un producto al registrar movimientos.

### Ingreso de stock

Solicitud:

```json
{
  "tipo": "ingreso",
  "cantidad": 5,
  "id_producto": 1,
  "id_usuario": 1
}
```

Resultado:

```text
Stock actual: 20
Ingreso: +5
Nuevo stock: 25
```

---

### Egreso de stock

Solicitud:

```json
{
  "tipo": "egreso",
  "cantidad": 3,
  "id_producto": 1,
  "id_usuario": 1
}
```

Resultado:

```text
Stock actual: 25
Egreso: -3
Nuevo stock: 22
```

---

### Validación de stock insuficiente

Si se intenta retirar más stock del disponible:

```json
{
  "tipo": "egreso",
  "cantidad": 100,
  "id_producto": 1,
  "id_usuario": 1
}
```

Respuesta:

```json
{
  "mensaje": "Stock insuficiente"
}
```

Código HTTP:

```text
400 Bad Request
```

---

## 🔐 Autenticación JWT

La API utiliza JSON Web Tokens para proteger rutas sensibles.

### Login

Endpoint:

```http
POST /api/auth/login
```

Body:

```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

Respuesta:

```json
{
  "token": "jwt_token",
  "usuario": {
    "id": 1,
    "nombre": "Administrador",
    "email": "admin@test.com",
    "rol": "master"
  }
}
```

---

## 👤 Roles implementados

### Master

Permisos:

* Gestión de usuarios
* Gestión de categorías
* Gestión de productos
* Gestión de movimientos
* Acceso a rutas protegidas

### Cajero

Permisos:

* Acceso a funcionalidades autorizadas por la aplicación
* Operaciones definidas por el sistema

Las rutas protegidas utilizan:

* Middleware de autenticación JWT
* Middleware de autorización por roles

---

## 📡 Endpoints disponibles

### Autenticación

| Método | Endpoint        |
| ------ | --------------- |
| POST   | /api/auth/login |

---

### Categorías

| Método | Endpoint            |
| ------ | ------------------- |
| GET    | /api/categorias     |
| GET    | /api/categorias/:id |
| POST   | /api/categorias     |
| PUT    | /api/categorias/:id |
| DELETE | /api/categorias/:id |

---

### Productos

| Método | Endpoint           |
| ------ | ------------------ |
| GET    | /api/productos     |
| GET    | /api/productos/:id |
| POST   | /api/productos     |
| PUT    | /api/productos/:id |
| DELETE | /api/productos/:id |

---

### Movimientos

| Método | Endpoint             |
| ------ | -------------------- |
| GET    | /api/movimientos     |
| GET    | /api/movimientos/:id |
| POST   | /api/movimientos     |
| DELETE | /api/movimientos/:id |

---

### Usuarios

| Método | Endpoint          |
| ------ | ----------------- |
| GET    | /api/usuarios     |
| GET    | /api/usuarios/:id |
| POST   | /api/usuarios     |
| PUT    | /api/usuarios/:id |
| DELETE | /api/usuarios/:id |

---

## 📊 Estado actual del proyecto

### Backend

✅ API REST completamente operativa

✅ PostgreSQL integrado

✅ Sequelize configurado

✅ Modelos implementados

✅ Relaciones entre entidades configuradas

✅ CRUD Categorías

✅ CRUD Productos

✅ CRUD Movimientos

✅ CRUD Usuarios

✅ Persistencia real de datos

✅ Login con JWT

✅ Middleware de autenticación

✅ Middleware de autorización por roles

✅ Roles master y cajero

✅ Hashing de contraseñas con bcrypt

✅ Actualización automática de stock

✅ Validación de stock insuficiente

✅ Validación de cantidades positivas en movimientos

✅ Validación de precios no negativos

✅ Validación de stock no negativo

✅ Validación de categorías existentes

✅ Validación de categorías duplicadas

✅ Validación de nombre obligatorio en categorías

✅ Validación de email válido en usuarios

✅ Validación de email duplicado en creación y edición

✅ Validación de contraseña mínima

✅ Validación de roles permitidos

✅ Protección de endpoints mediante JWT

✅ Asociación automática del usuario autenticado al registrar movimientos

✅ Control de permisos por rol

✅ Pruebas funcionales realizadas con Postman

### Seguridad implementada

✅ JSON Web Tokens (JWT)

✅ Middleware verificarToken

✅ Middleware autorizarRoles

✅ Restricción de acceso según rol

✅ Contraseñas almacenadas mediante bcrypt

### Base de Datos

✅ Relaciones Sequelize funcionando correctamente

✅ Categoría → Productos

✅ Producto → Movimientos

✅ Usuario → Movimientos

### Control de Inventario

✅ Registro de ingresos de stock

✅ Registro de egresos de stock

✅ Actualización automática del stock

✅ Prevención de stock negativo

✅ Historial completo de movimientos


## 🚧 Próximas mejoras

### Seguridad

* Refresh Tokens
* Gestión de sesiones
* Recuperación y restablecimiento de contraseñas

### Calidad del software

* Validaciones avanzadas de datos
* Manejo centralizado de errores
* Tests unitarios
* Tests de integración
* Cobertura de código

### Documentación

* Swagger
* Documentación técnica de la API
* Manual de instalación y despliegue

### Infraestructura

* Contenerización con Docker
* Docker Compose para entorno completo
* Configuración para entornos de producción

---

## 🎓 Proyecto Final Integrador

Este repositorio contiene el backend del **Sistema de Inventario y Control de Stock**, desarrollado como **Proyecto Final Integrador de la Tecnicatura Universitaria en Programación (UTN)**.

La aplicación fue diseñada para permitir la administración de productos, categorías, usuarios y movimientos de stock mediante una API REST segura, utilizando autenticación basada en JWT y control de acceso por roles.

El proyecto aplica conceptos de desarrollo backend, bases de datos relacionales, seguridad, arquitectura cliente-servidor y buenas prácticas de ingeniería de software, integrando tecnologías modernas del ecosistema JavaScript para construir una solución escalable, mantenible y orientada a entornos reales.
