# CLAUDE.md — Proyecto Shoes Store (SENA GA7-220501096-AA3-EV01)

## Contexto general

Este proyecto es una evidencia de aprendizaje del programa **Análisis y Desarrollo de Software (ADSO)** del SENA, ficha 228118, instructor Andrés Felipe Ramírez Muñoz.

Evidencia: **GA7-220501096-AA3-EV01** — "Codificación de módulos del software stand-alone, web y móvil".

El aprendiz (Juan) ya completó evidencias previas (AA2-EV01, AA2-EV02) de este mismo sistema usando JDBC y Servlets/JSP. Esta evidencia exige dar un salto tecnológico: ahora se debe usar un **framework** de desarrollo ágil.

## Qué se está construyendo

Sistema de gestión de inventario para **Shoes Store** (tienda de sneakers, tenis y calzado a la moda), con módulos de:
- **Producto** (CRUD completo)
- **Categoría** (CRUD completo)
- **Proveedor** (CRUD completo)

Funcionalidades mínimas exigidas por la guía: inserción, consulta, actualización y eliminación para cada entidad.

El diseño visual del panel replica el del sitio público Shoes.Store (dark monocromo, fuente Poppins, logo `SHOES.STORE`). El proyecto continúa escalando hacia evidencias futuras.

**Nota de nombres:** la marca visible es **Shoes Store**, pero por decisión las carpetas (`zapateria-backend`, `zapateria-frontend`), el paquete Java (`com.zapateria`) y la clase `ZapateriaApplication` conservan el nombre interno `zapateria` (es interno, no se ve, y renombrarlo rompería rutas/git). No confundir: nombre interno = `zapateria`, marca y base de datos = `shoesstore`.

## Stack tecnológico (decidido, no cambiar sin pedir confirmación)

| Capa | Tecnología | IDE/Herramienta |
|---|---|---|
| Backend | Spring Boot (Java) | **NetBeans** (NO IntelliJ) |
| Frontend | React + Vite | VS Code |
| Base de datos | MySQL | MySQL Workbench |
| Versionamiento | Git / GitHub | repo: `juandi-blip/shoes-store-inventory-2.0` |
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

## Modelo de datos (MySQL) — ESTADO REAL ACTUAL

Base de datos: **`shoesstore`** (antes `zapateria`; migrada conservando los datos). Esquema en `schema.sql` y en las entidades JPA del backend:

```sql
categoria (ID_CATEGORIA, NOMBRE)
proveedor (ID_PROVEEDOR, NOMBRE, TELEFONO, DIRECCION)
producto (ID_PRODUCTO, NOMBRE, DESCRIPCION, PRECIO, STOCK, ID_CATEGORIA, ID_PROVEEDOR)
```

`Producto.java` tiene estos campos: `idProducto` (`Long`), `nombre`, `descripcion`, `precio` (`BigDecimal`, por precisión monetaria), `stock`, `categoria` (objeto), `proveedor` (objeto). Los IDs de las 3 entidades son `Long` (alineados con `JpaRepository<…, Long>`). Las relaciones `@ManyToOne` usan `FetchType.EAGER` para que Jackson serialice el objeto anidado completo.

**El producto NO tiene** `talla`, `color` ni `imagenUrl` — si se necesitan, hay que decidir explícitamente agregarlos (columna nueva + getter/setter + actualizar DTO/JSON), no asumir que ya existen.

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

## ✅ ESTADO ACTUAL — integración verificada

El backend (Spring Boot :8080) y el frontend (React :5173) ya **conversan correctamente**. CRUD de las 3 entidades probado en ejecución real (GET/POST/DELETE → 200/201/204, sin errores de consola ni CORS). Diagnóstico previo resuelto:

| Problema original | Solución aplicada |
|---|---|
| Frontend usaba `producto.id` | Frontend usa `idProducto`; lee `categoria.nombre`/`proveedor.nombre` directo |
| Payload de categoría/proveedor | Frontend envía `categoria:{idCategoria}` / `proveedor:{idProveedor}` |
| `talla`/`color`/`imagenUrl` inexistentes | Removidos del frontend (no aplican al esquema) |
| CORS duplicado | Quitado `@CrossOrigin` de controladores; sola fuente = `WebConfig` |
| IDs `Integer` vs `JpaRepository<…, Long>` | Entidades a `Long` |
| `precio Double` + `scale` → crash Hibernate | `precio` a `BigDecimal` |
| Relaciones `LAZY` rompían JSON | `EAGER` |
| Base `zapateria` | Migrada a `shoesstore` (datos conservados) |

## ⚙️ Setup de entorno (importante — esta máquina)

El proyecto requiere **JDK 17** (Spring Boot 3.2.5 no soporta JDK 26). Configurado:
- JDK 17 (Eclipse Temurin) en `C:\Program Files\Eclipse Adoptium\jdk-17.0.19.10-hotspot`, con `JAVA_HOME` a nivel usuario.
- El `mvnw` del proyecto está roto en esta máquina (muere en `Using existing wrapper jar`). Se usa **Maven 3.9.6 standalone** en `D:\juandiplay\tools\apache-maven-3.9.6\bin\mvn.cmd`.
- La contraseña de MySQL **no se escribe en `application.properties`**: se lee de la variable de entorno `DB_PASSWORD` (`spring.datasource.password=${DB_PASSWORD}`). Definida a nivel usuario.
- En NetBeans: asegúrate de que use JDK 17 y que tenga `DB_PASSWORD` en el entorno antes de Run.

Levantar el sistema:
1. Backend: con `JAVA_HOME`=JDK17 y `DB_PASSWORD` set → `mvn spring-boot:run` (puerto 8080).
2. Frontend: `pnpm dev` (puerto 5173).

## Limpieza antes de empaquetar la entrega

El ZIP de entrega NO debe incluir: `.git/`, `.claude/`, `.agents/`, `.playwright-mcp/`, `skills-lock.json`, `node_modules/`, `target/`, `nbproject/`. Ya están en `.gitignore`. Son artefactos de herramientas, no parte del entregable académico.

## Instrucciones para Claude Code

- Siempre que generes pasos de configuración del backend, asume **NetBeans** como IDE (no IntelliJ).
- Mantén el código comentado en español, ya que es para una evidencia académica en Colombia.
- Sigue los estándares de codificación listados arriba en todo el código que generes.
- Antes de avanzar a la siguiente fase (ej. pasar de backend a frontend), confirma con el usuario que la fase actual quedó funcional.
- Si el usuario pide ampliar el alcance (nuevos módulos, autenticación, etc.), recuerda que el objetivo es cumplir con la evidencia AA3-EV01 sin sobre-complicar — pero está bien si el usuario lo pide explícitamente para su portafolio.
- Este proyecto continúa hacia evidencias futuras (AA4 front-end con React, AA5 servicios web/API con Postman), así que la arquitectura debe quedar limpia y reutilizable.
- La integración ya está verificada (ver "ESTADO ACTUAL"). Para AA3-EV02 (pruebas y video) ya se puede documentar/grabar el CRUD funcionando.
- Recuerda la distinción de nombres: marca y base de datos = **Shoes Store** / `shoesstore`; nombres internos (carpetas, paquete `com.zapateria`, `ZapateriaApplication`) siguen siendo `zapateria`.
