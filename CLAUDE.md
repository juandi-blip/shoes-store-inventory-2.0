# CLAUDE.md — Proyecto Zapatería (SENA GA7-220501096-AA3-EV01)

## Contexto general

Este proyecto es una evidencia de aprendizaje del programa **Análisis y Desarrollo de Software (ADSO)** del SENA, ficha 228118, instructor Andrés Felipe Ramírez Muñoz.

Evidencia: **GA7-220501096-AA3-EV01** — "Codificación de módulos del software stand-alone, web y móvil".

El aprendiz (Juan) ya completó evidencias previas (AA2-EV01, AA2-EV02) de este mismo sistema usando JDBC y Servlets/JSP. Esta evidencia exige dar un salto tecnológico: ahora se debe usar un **framework** de desarrollo ágil.

## Qué se está construyendo

Sistema de gestión para una **zapatería** (shoe store), con módulos de:
- **Producto** (CRUD completo)
- **Categoría** (CRUD completo)
- **Proveedor** (CRUD completo)

Funcionalidades mínimas exigidas por la guía: inserción, consulta, actualización y eliminación para cada entidad.

## Stack tecnológico (decidido, no cambiar sin pedir confirmación)

| Capa | Tecnología | IDE/Herramienta |
|---|---|---|
| Backend | Spring Boot (Java) | **NetBeans** (NO IntelliJ) |
| Frontend | React + Vite | VS Code |
| Base de datos | MySQL | MySQL Workbench |
| Versionamiento | Git / GitHub | repo: `juandi-blip/Programa-Git` (o repo nuevo para este proyecto) |
| Testing de API | Postman | — |

**Importante:** el backend se desarrolla y se abre en **NetBeans**, no en IntelliJ IDEA. Si generas instrucciones de "abrir el proyecto", deben ser para NetBeans (File → Open Project, proyecto Maven).

## Estructura del backend (Spring Boot)

```
zapateria-backend/
├── src/main/java/com/zapateria/
│   ├── controller/    → ProductoController, CategoriaController, ProveedorController
│   ├── service/       → ProductoService, CategoriaService, ProveedorService
│   ├── repository/    → ProductoRepository, CategoriaRepository, ProveedorRepository (extienden JpaRepository)
│   ├── model/         → Producto, Categoria, Proveedor (entidades JPA)
│   └── ZapateriaApplication.java
├── src/main/resources/
│   └── application.properties  → config de conexión MySQL
└── pom.xml
```

Endpoints REST esperados por entidad (ejemplo con producto):
- `GET /api/productos` — listar todos
- `GET /api/productos/{id}` — consultar uno
- `POST /api/productos` — crear
- `PUT /api/productos/{id}` — actualizar
- `DELETE /api/productos/{id}` — eliminar

## Estructura del frontend (React + Vite)

```
zapateria-frontend/
├── src/
│   ├── components/   → ProductoForm, ProductoTable, CategoriaForm, etc.
│   ├── pages/        → ProductosPage, CategoriasPage, ProveedoresPage
│   ├── services/     → api.js (Axios, base URL del backend)
│   └── App.jsx       → rutas con React Router
```

## Modelo de datos (MySQL)

Tablas mínimas: `producto`, `categoria`, `proveedor`.
- `producto` debe tener relación con `categoria` y `proveedor` (claves foráneas).
- Definir las columnas según las características reales del negocio (nombre, precio, stock, talla, etc. para producto; nombre/descripción para categoría; nombre/contacto para proveedor).

## Estándares de codificación exigidos por la guía SENA

- Nombramiento de variables: camelCase
- Nombramiento de clases: PascalCase
- Nombramiento de métodos: camelCase, verbos descriptivos (ej. `obtenerProductoPorId`)
- Nombramiento de paquetes: minúsculas, sin guiones
- El código debe contener **comentarios** explicativos
- Cada commit debe usar Git con mensajes claros

## Entregable final

Carpeta comprimida (ZIP o RAR) con nombre `NOMBRE_APELLIDO_AA3_EV01` que contenga:
- Archivos del proyecto (backend + frontend)
- Archivo de texto con el enlace al repositorio de GitHub

## Instrucciones para Claude Code

- Siempre que generes pasos de configuración del backend, asume **NetBeans** como IDE (no IntelliJ).
- Mantén el código comentado en español, ya que es para una evidencia académica en Colombia.
- Sigue los estándares de codificación listados arriba en todo el código que generes.
- Antes de avanzar a la siguiente fase (ej. pasar de backend a frontend), confirma con el usuario que la fase actual quedó funcional.
- Si el usuario pide ampliar el alcance (nuevos módulos, autenticación, etc.), recuerda que el objetivo es cumplir con la evidencia AA3-EV01 sin sobre-complicar — pero está bien si el usuario lo pide explícitamente para su portafolio.
- Este proyecto continúa hacia evidencias futuras (AA4 front-end con React, AA5 servicios web/API con Postman), así que la arquitectura debe quedar limpia y reutilizable.
