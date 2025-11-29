Sprint 1 – Inventario y Control de Stock
Objetivo general del Sprint 1

Construir la base del sistema: backend inicial con Sequelize, migraciones, modelos, CRUDs principales y las primeras pantallas del frontend conectadas a la API.

Alcance del Sprint

Incluye:

Configuración completa del backend.

Implementación de modelos, migraciones y asociaciones.

CRUD básico de categorías y productos.

Movimientos con actualización automática de stock.

Primeras pantallas funcionales del frontend.

Documentación inicial del proyecto.

Historias de Usuario del Sprint 1
| ID    | Historia de Usuario                                                                         |
| ----- | ------------------------------------------------------------------------------------------- |
| HU-01 | Como administrador, quiero gestionar categorías para organizar los productos.               |
| HU-02 | Como administrador, quiero gestionar productos con datos completos (nombre, precio, stock). |
| HU-03 | Como usuario del sistema, quiero registrar movimientos de stock (ingresos y egresos).       |


Tareas del Sprint 1
Backend
| Código                   | Tarea                                             | Descripción                                                                                                |
| ------------------------ | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| BACKEND-01               | Migrar CRUD de categorías                         | Implementar findAll, findByPk, create, update, delete usando Sequelize. Validar nombre obligatorio.        |
| BACKEND-02               | Migrar CRUD de productos                          | Reemplazar datos mock por BD. Implementar findAll, findByPk, create, update, delete. Manejar id_categoria. |
| BACKEND-03               | Movimientos con actualización automática de stock | Crear POST `/api/movimientos`. Al registrar ingreso/egreso, actualizar stock del producto. Validaciones.   |
| BACKEND-LOGIN (opcional) | Primer endpoint /api/hello                        | Endpoint simple para pruebas de conexión.                                                                  |


Frontend
| Código    | Tarea                                               | Descripción                                                |
| --------- | --------------------------------------------------- | ---------------------------------------------------------- |
| FRONT-01  | Pantalla de listado de productos conectada a la API | Mostrar productos, consumir GET `/api/productos`.          |
| FRONT-02  | Formulario de creación y edición de productos       | POST y PUT hacia el backend. Validaciones básicas.         |
| FRONT-03  | Pantalla de categorías (CRUD básico)                | Listado de categorías y creación desde el frontend.        |
| FRONT-MOV | Registrar movimiento desde el frontend              | Enviar POST `/api/movimientos`. Controlar tipo y cantidad. |


Documentación
| Código | Tarea                            | Descripción                               |
| ------ | -------------------------------- | ----------------------------------------- |
| DOC-01 | Documentar endpoints del backend | Formato, rutas, body esperado y ejemplos. |
| DOC-02 | Actualizar README del frontend   | Cómo iniciar, dependencias y estructura.  |


Criterios de Aceptación

CRUD de productos y categorías funcional en BD.

Movimientos actualizan el stock automáticamente.

Frontend conectado a los endpoints principales.

Base del proyecto documentada.

Thunder Client con pruebas básicas funcionando.
