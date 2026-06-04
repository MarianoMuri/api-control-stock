# Tests de Integración Frontend + Backend

## Objetivo

Verificar que el frontend desarrollado en React se integre correctamente con la API REST, validando autenticación, navegación, consumo de datos reales y operaciones CRUD sobre las entidades principales del sistema.

---

## Entorno de prueba

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:3000/api
```

Usuario administrador:

```text
Email: admin@test.com
Contraseña: 123456
Rol: master
```

---

## Casos de prueba

### 1. Login correcto

**Acción:** ingresar con credenciales válidas.

**Resultado esperado:** el sistema redirige al Dashboard.

**Resultado obtenido:** correcto.

---

### 2. Logout

**Acción:** presionar "Cerrar sesión".

**Resultado esperado:** el sistema elimina la sesión y redirige al Login.

**Resultado obtenido:** correcto.

---

### 3. Protección de rutas privadas

**Acción:** intentar acceder a una ruta interna sin sesión activa.

**Resultado esperado:** el sistema redirige al Login.

**Resultado obtenido:** correcto.

---

### 4. Dashboard

**Acción:** acceder al Dashboard luego del login.

**Resultado esperado:** se muestran los totales reales de productos, categorías, movimientos y usuarios.

**Resultado obtenido:** correcto.

---

### 5. Listado de productos

**Acción:** ingresar al módulo Productos.

**Resultado esperado:** se muestran productos obtenidos desde la API.

**Resultado obtenido:** correcto.

---

### 6. CRUD de productos

**Acciones realizadas:**

- Crear producto
- Editar producto
- Consultar detalle
- Eliminar producto

**Resultado esperado:** las operaciones impactan correctamente en la base de datos.

**Resultado obtenido:** correcto.

---

### 7. Listado de categorías

**Acción:** ingresar al módulo Categorías.

**Resultado esperado:** se muestran categorías obtenidas desde la API.

**Resultado obtenido:** correcto.

---

### 8. CRUD de categorías

**Acciones realizadas:**

- Crear categoría
- Editar categoría
- Consultar detalle
- Eliminar categoría sin productos asociados

**Resultado esperado:** las operaciones se realizan correctamente.

**Resultado obtenido:** correcto.

---

### 9. Eliminación de categoría con productos asociados

**Acción:** intentar eliminar una categoría que posee productos asociados.

**Resultado esperado:** el sistema no permite eliminarla y muestra un mensaje de error.

**Resultado obtenido:** correcto.

---

### 10. Listado de usuarios

**Acción:** ingresar al módulo Usuarios.

**Resultado esperado:** se muestran usuarios obtenidos desde la API.

**Resultado obtenido:** correcto.

---

### 11. CRUD de usuarios

**Acciones realizadas:**

- Crear usuario
- Editar usuario
- Consultar detalle
- Eliminar usuario

**Resultado esperado:** las operaciones se realizan correctamente.

**Resultado obtenido:** correcto.

---

### 12. Listado de movimientos

**Acción:** ingresar al módulo Movimientos.

**Resultado esperado:** se muestran movimientos obtenidos desde la API.

**Resultado obtenido:** correcto.

---

### 13. Registro de ingreso de stock

**Acción:** registrar un movimiento de tipo ingreso.

**Resultado esperado:** el movimiento se registra y el stock del producto aumenta.

**Resultado obtenido:** correcto.

---

### 14. Registro de egreso de stock

**Acción:** registrar un movimiento de tipo egreso.

**Resultado esperado:** el movimiento se registra y el stock del producto disminuye.

**Resultado obtenido:** correcto.

---

### 15. Egreso con stock insuficiente

**Acción:** intentar registrar un egreso mayor al stock disponible.

**Resultado esperado:** el sistema rechaza la operación y muestra error.

**Resultado obtenido:** correcto.

---

## Conclusión

Los tests de integración realizados verifican que el frontend se comunica correctamente con la API REST, utilizando autenticación JWT y consumiendo datos reales desde la base de datos.

Se validó el funcionamiento de login, logout, rutas protegidas, Dashboard, CRUD de productos, categorías, usuarios y gestión de movimientos de stock.