# Sistema de Inventario y Control de Stock

Proyecto académico que implementa un sistema completo de inventario utilizando un backend desarrollado con Node.js, Express y Sequelize, y un frontend construido con React. El objetivo es gestionar productos, categorías y movimientos de stock, incluyendo funcionalidades avanzadas como reportes y documentación por Sprint.

---

## 1. Tecnologías utilizadas

### Backend
- Node.js
- Express
- Sequelize ORM
- PostgreSQL
- Dotenv
- Cors
- Herramientas de prueba: Thunder Client / Postman

### Frontend
- React
- React Router
- Fetch API
- Vite o Create React App (según etapa del proyecto)

---

## 2. Instalación y ejecución

### Backend

1. Instalar dependencias:
   ```bash
   cd backend
   npm install

2. Configurar variables de entorno:
Crear archivo .env con:
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=control_stock
DB_PORT=5432

3. Ejecutar migraciones:
npx sequelize-cli db:migrate

4. Iniciar el servidor:
npm run dev


Frontend

Instalar dependencias:
cd frontend
npm install

Crear archivo .env:
VITE_API_URL=http://localhost:3000

Ejecutar:
npm run dev


## 3. Estructura del proyecto
backend/
  config/
  controllers/
  models/
  routes/
  migrations/

frontend/
  src/
  public/

documentos/
  sprint1.md
  sprint2.md

## 4. Endpoints principales (resumen)
Categorías

GET /api/categorias

POST /api/categorias

PUT /api/categorias/:id

DELETE /api/categorias/:id

Productos

GET /api/productos

POST /api/productos

PUT /api/productos/:id

DELETE /api/productos/:id

Movimientos

GET /api/movimientos

POST /api/movimientos

Reportes (Sprint 2)

GET /api/movimientos/historico

PDF de movimientos (pendiente)

## 5. Documentación por Sprint

Los avances, historias de usuario y tareas se encuentran documentados en:

documentos/sprint1.md

documentos/sprint2.md

## 6. Gestión del proyecto

El seguimiento del proyecto se realiza mediante un tablero Kanban en GitHub Projects, que incluye:

Backlog

Reserva / To Do

En curso

En revisión

Finalizado

Tablero:
https://github.com/users/MarianoMuri/projects/2

## 7. Integrantes

Mariano Murinigo

Jennifer Castro

## 8. Objetivo general del proyecto

Desarrollar un sistema web funcional para la gestión de inventario y movimientos de stock, aplicando metodologías ágiles, control de versiones, documentación por Sprint y buenas prácticas de desarrollo full stack.
