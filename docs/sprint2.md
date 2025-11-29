Sprint 2 – Inventario y Control de Stock
Objetivo general del Sprint 2

Completar funcionalidades avanzadas del backend y frontend, agregar reportes, mejorar la experiencia de usuario y fortalecer la documentación y la seguridad del sistema.

Alcance del Sprint

Incluye:

Endpoints avanzados (históricos, reportes, filtros).

Mejoras visuales y pantallas nuevas del frontend.

Generación de PDF.

Validaciones y filtrado de datos.

Optimización y mejoras de usabilidad.

Documentación técnica completa del sistema.

Historias de Usuario del Sprint 2
| ID    | Historia de Usuario                                                                                                               |
| ----- | --------------------------------------------------------------------------------------------------------------------------------- |
| HU-04 | Como administrador, quiero obtener un historial de movimientos para analizar el stock por fechas, productos y tipo de movimiento. |
| HU-05 | Como administrador, quiero descargar un reporte PDF de movimientos para documentación y auditoría.                                |
| HU-06 | Como usuario del sistema, quiero visualizar una tabla con los movimientos históricos de forma clara y filtrable.                  |
| HU-07 | Como usuario, quiero autenticación segura (login protegido) para acceder al sistema.                                              |
| HU-08 | Como administrador, quiero ver alertas de stock crítico para tomar decisiones rápidas.                                            |
| HU-09 | Como integrante del equipo, quiero tener la documentación del sprint ordenada y clara.                                            |

Tareas del Sprint 2
Backend
| Código     | Tarea                              | Descripción                                                                                                                 |
| ---------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| BACKEND-04 | Endpoint de movimientos históricos | Crear GET `/api/movimientos/historico`, con filtros por fecha, tipo y producto. Resultados ordenados por fecha descendente. |
| BACKEND-05 | Reporte PDF de movimientos         | Generar PDF con lista de movimientos filtrados; utilizar librería como `pdfkit` o `jspdf`.                                  |
| BACKEND-06 | Alerta de stock crítico            | Endpoint que devuelva productos con stock menor a un umbral definido (ej: `< 5`).                                           |
| BACKEND-07 | Login + JWT completo               | Implementar login con hash de contraseña, JWT, middleware de autenticación y roles.                                         |
| BACKEND-08 | Validaciones y sanitización        | Agregar validadores (nombre, stock, precios, emails) y sanitizar entradas.                                                  |


Frontend
| Código   | Tarea                                 | Descripción                                                                  |
| -------- | ------------------------------------- | ---------------------------------------------------------------------------- |
| FRONT-04 | Pantalla de movimientos históricos    | Tabla con filtros (fecha, tipo, producto), paginación y diseño responsive.   |
| FRONT-05 | Reporte PDF desde UI                  | Botón “Descargar PDF” consumiendo BACKEND-05.                                |
| FRONT-06 | Login + protección de rutas           | Formulario de login, guardado de token, rutas protegidas y cierre de sesión. |
| FRONT-07 | Indicadores visuales de stock crítico | Mostrar alertas en rojo y estado del producto.                               |
| FRONT-08 | Mejoras de usabilidad general         | Ajustes de estilos, feedback visual, loaders, validaciones del formulario.   |

Documentación y Organización
| Código | Tarea                  | Descripción                                                                       |
| ------ | ---------------------- | --------------------------------------------------------------------------------- |
| DOC-03 | Documentar Sprint 2    | Registrar entregables, decisiones técnicas, endpoints nuevos y estado del sprint. |
| DOC-04 | Actualizar README      | Agregar instrucciones de instalación, endpoints nuevos y capturas del sistema.    |
| DOC-05 | Diagramas actualizados | Crear o actualizar diagramas UML, modelo entidad-relación y arquitectura.         |


Criterios de Aceptación

Todos los endpoints deben devolver respuestas válidas, seguras y documentadas.

El frontend debe consumir correctamente los nuevos endpoints.

El PDF debe generarse correctamente con filtros aplicados.

Login funcionando con JWT, expiración y middleware.

Validaciones en backend y frontend funcionando.

Documentación del sprint publicada en GitHub.

Dependencias del Sprint

El backend del Sprint 1 debe estar completado.

Base de datos funcionando con Sequelize.

Frontend inicial ya conectado a la API.

Resultado esperado

Al finalizar el Sprint 2, el sistema deberá permitir consultar el historial completo de movimientos, generar reportes en PDF, manejar autenticación segura, mostrar estados críticos de stock y contar con documentación profesional.
