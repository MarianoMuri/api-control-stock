# Sistema de Inventario y Control de Stock

## 👥 Integrantes
👩 **Jennifer Castro**  
👨 **Mariano Murinigo**

---

## 📌 Descripción del Proyecto
API backend desarrollada como parte del Proyecto Final.  
Implementa un sistema de gestión de inventario y control de stock con CRUD de:

- Productos  
- Categorías  
- Movimientos de stock  
- Usuarios  

Actualmente el proyecto funciona con **datos mock** (arrays en memoria) para facilitar el prototipo inicial.  
La estructura está preparada para integrarse con **PostgreSQL**, **MySQL** o **MongoDB** en la siguiente etapa.

---

## 🚀 Tecnologías utilizadas
- Node.js  
- Express  
- Sequelize (configurado pero desactivado para el prototipo)  
- CORS  
- Dotenv  
- Thunder Client para pruebas locales  

---

## 📂 Estructura principal
src/
├── app.js
├── server.js
├── config/
│ └── database.js
├── controllers/
│ ├── categoriaController.js
│ ├── productoController.js
│ ├── movimientoController.js
│ └── usuarioController.js
├── routes/
│ ├── categorias.js
│ ├── productos.js
│ ├── movimientos.js
│ ├── usuarios.js
│ └── index.js
└── models/ (preparado para uso con BD real)

---

## 🛠️ Instalación y ejecución

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/MarianoMuri/api-control-stock
cd api-control-stock
2️⃣ Instalar dependencias
npm install
3️⃣ Levantar el servidor
npm run dev

El servidor inicia en:
http://localhost:3000

📡 Endpoints disponibles (mock)
▶️ Categorías — /api/categorias
| Método | Endpoint            | Descripción          |
| ------ | ------------------- | -------------------- |
| GET    | /api/categorias     | Listar categorías    |
| GET    | /api/categorias/:id | Obtener categoría    |
| POST   | /api/categorias     | Crear categoría      |
| PUT    | /api/categorias/:id | Actualizar categoría |
| DELETE | /api/categorias/:id | Eliminar categoría   |

▶️ Productos — /api/productos
| Método | Endpoint           | Descripción         |
| ------ | ------------------ | ------------------- |
| GET    | /api/productos     | Listar productos    |
| GET    | /api/productos/:id | Obtener producto    |
| POST   | /api/productos     | Crear producto      |
| PUT    | /api/productos/:id | Actualizar producto |
| DELETE | /api/productos/:id | Eliminar producto   |

▶️ Movimientos — /api/movimientos
| Método | Endpoint             | Descripción          |
| ------ | -------------------- | -------------------- |
| GET    | /api/movimientos     | Listar movimientos   |
| GET    | /api/movimientos/:id | Obtener movimiento   |
| POST   | /api/movimientos     | Registrar movimiento |
| DELETE | /api/movimientos/:id | Eliminar movimiento  |

▶️ Usuarios — /api/usuarios
| Método | Endpoint          | Descripción        |
| ------ | ----------------- | ------------------ |
| GET    | /api/usuarios     | Listar usuarios    |
| GET    | /api/usuarios/:id | Obtener usuario    |
| POST   | /api/usuarios     | Crear usuario      |
| PUT    | /api/usuarios/:id | Actualizar usuario |
| DELETE | /api/usuarios/:id | Eliminar usuario   |

----------------------------------------------------------
Próximas funcionalidades

Autenticación con JWT

Roles (master / cajero)

Base de datos real con PostgreSQL

Hashing de contraseñas (bcrypt)

Validaciones con middleware

Manejo de errores centralizado

Tests unitarios y de integración

Docker para despliegue

Documentación completa con Swagger
----------------------------------------------------------