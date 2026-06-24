# Shoes Store — Sistema de Gestión de Inventario

Evidencia de aprendizaje **GA7-220501096-AA3-EV01** — Codificación de módulos del software.  
Programa Análisis y Desarrollo de Software (ADSO), ficha 3186657, SENA.  
Aprendiz: **Juan David Florez**

## Descripción

Sistema interno de gestión de inventario para **Shoes Store** (tienda de sneakers, tenis y calzado a la moda), con CRUD completo para:

- **Productos** — nombre, descripción, precio, stock, categoría y proveedor
- **Categorías** — clasificación del catálogo (sneakers, running, basketball, casual…)
- **Proveedores** — razón social, teléfono y dirección

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Backend | Spring Boot 3.2.5 / Java 17 |
| Frontend | React 18 + Vite / pnpm |
| Base de datos | MySQL 8 (`shoesstore`) |
| ORM | JPA / Hibernate 6.4 |
| HTTP Client | Axios |
| Fuente | Poppins (Google Fonts) |
| Estilos | CSS dark monochromatic (`#0d0d0d`) |

## Diseño visual

Réplica del diseño de Shoes.Store: dark monocromo, sin color acento, tipografía Poppins.

| Token | Valor |
|-------|-------|
| Fondo principal | `#0d0d0d` |
| Fondo tarjetas | `#161616` |
| Fondo elevado | `#1e1e1e` |
| Fondo hover | `#252525` |
| Texto principal | `#ffffff` |
| Texto secundario | `#b0b0b0` |
| Texto muted | `#737373` |
| Bordes | `rgba(255,255,255,0.08)` |
| Bordes hover | `rgba(255,255,255,0.16)` |
| Peligro | `#ef4444` |
| Éxito | `#4ade80` |

## Requisitos

- Java JDK 17 (Spring Boot 3.2.5 no soporta JDK 21+)
- MySQL Server 8
- Node.js 18+ y pnpm
- Maven 3.9+ (el `mvnw` incluido puede no funcionar en todas las máquinas; usar Maven standalone si es necesario)

## Instalación

### 1. Base de datos

```sql
-- En MySQL Workbench o terminal:
mysql -u root -p < schema.sql
```

Crea la base `shoesstore` con las tablas `categoria`, `proveedor` y `producto`.

### 2. Backend

```bash
cd zapateria-backend

# Configurar variable de entorno con la contraseña de MySQL
# Windows (PowerShell):
$env:DB_PASSWORD = "tu_contraseña_mysql"

# Linux/Mac:
export DB_PASSWORD=tu_contraseña_mysql

# Levantar servidor (puerto 8080)
mvn spring-boot:run
```

> La contraseña **nunca** va en `application.properties`. Se lee de la variable de entorno `DB_PASSWORD`.

### 3. Frontend

```bash
cd zapateria-frontend
pnpm install
pnpm dev
```

Frontend disponible en `http://localhost:5173`

## Endpoints API

### Productos `/api/productos`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/productos` | Listar todos |
| GET | `/api/productos/{id}` | Obtener uno |
| POST | `/api/productos` | Crear |
| PUT | `/api/productos/{id}` | Actualizar |
| DELETE | `/api/productos/{id}` | Eliminar |

### Categorías `/api/categorias`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/categorias` | Listar todas |
| GET | `/api/categorias/{id}` | Obtener una |
| POST | `/api/categorias` | Crear |
| PUT | `/api/categorias/{id}` | Actualizar |
| DELETE | `/api/categorias/{id}` | Eliminar |

### Proveedores `/api/proveedores`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/proveedores` | Listar todos |
| GET | `/api/proveedores/{id}` | Obtener uno |
| POST | `/api/proveedores` | Crear |
| PUT | `/api/proveedores/{id}` | Actualizar |
| DELETE | `/api/proveedores/{id}` | Eliminar |

## Estructura del proyecto

```
GA7-220501096-AA3-EV01/
├── schema.sql
├── zapateria-backend/
│   └── src/main/java/com/zapateria/
│       ├── model/        # Entidades JPA (Producto, Categoria, Proveedor)
│       ├── repository/   # JpaRepository<Entidad, Long>
│       ├── service/      # Lógica de negocio
│       ├── controller/   # Controladores REST
│       └── config/       # CORS (WebConfig)
└── zapateria-frontend/
    └── src/
        ├── pages/        # ProductosPage, CategoriasPage, ProveedoresPage
        ├── components/   # Navbar, formularios, tablas
        └── services/     # api.js (Axios → localhost:8080)
```

> Los nombres internos de carpetas y paquete Java conservan `zapateria`; la marca visible y la base de datos usan **Shoes Store** / `shoesstore`.

## Repositorio

https://github.com/juandi-blip/shoes-store-inventory-2.0
