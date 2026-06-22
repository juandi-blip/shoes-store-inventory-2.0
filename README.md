# Sistema de Gestión de Zapatería

Proyecto de evidencia de aprendizaje **GA7-220501096-AA3-EV01** del programa de Análisis y Desarrollo de Software (ADSO) del SENA.

## Descripción

Sistema de gestión para una zapatería con módulos de:
- **Productos** (CRUD completo)
- **Categorías** (CRUD completo)
- **Proveedores** (CRUD completo)

## Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Backend | Spring Boot 3.2.5 + Java |
| Frontend | React + Vite |
| Base de datos | MySQL 8 |
| ORM | JPA/Hibernate |
| HTTP Client | Axios |
| Estilos | CSS Dark Monochromatic |

## Diseño

El sistema utiliza un diseño **Dark Monochromatic** inspirado eninterfaces premium de tiendas de calzado:

### Paleta de Colores

| Elemento | Color | Código |
|----------|-------|--------|
| Fondo principal | Negro profundo | `#0a0a0a` |
| Fondo tarjetas | Gris oscuro | `#141414` |
| Fondo elevado | Gris medio | `#1e1e1e` |
| Fondo inputs | Gris oscuro | `#1a1a1a` |
| Texto principal | Blanco | `#ffffff` |
| Texto secundario | Gris claro | `#cccccc` |
| Texto muted | Gris medio | `#888888` |
| Bordes | Gris oscuro | `#2a2a2a` |
| Acento | Índigo | `#6366f1` |
| Peligro | Rojo | `#ef4444` |
| Éxito | Verde | `#4ade80` |
| Advertencia | Amarillo | `#fbbf24` |

### Características Visuales

- Tema oscuro completo (dark mode)
- Bordes sutiles y sombras minimalistas
- Botones con bordes redondeados (pill)
- Tablas con hover sutil
- Modales con efecto blur (backdrop-filter)
- Transiciones suaves (150ms)
- Tipografía Inter con pesos variados
- Texto en mayúsculas con letter-spacing para labels

## Requisitos

- Java JDK 17 o superior
- MySQL Server 8
- Node.js 18+ y pnpm
- Maven (incluido en el proyecto via wrapper)

## Instalación

### 1. Base de Datos

Ejecuta el script `schema.sql` en MySQL Workbench:

```sql
-- O ejecuta desde terminal:
mysql -u root -p < schema.sql
```

### 2. Backend

```bash
cd zapateria-backend

# Editar application.properties y colocar tu contraseña de MySQL:
# spring.datasource.password=TU_CONTRASEÑA

# Ejecutar el servidor
mvn spring-boot:run
```

El backend estará disponible en: `http://localhost:8080`

### 3. Frontend

```bash
cd zapateria-frontend

# Instalar dependencias
pnpm install

# Ejecutar en modo desarrollo
pnpm dev
```

El frontend estará disponible en: `http://localhost:5173`

## Endpoints API

### Productos
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/productos | Listar todos |
| GET | /api/productos/{id} | Obtener uno |
| POST | /api/productos | Crear |
| PUT | /api/productos/{id} | Actualizar |
| DELETE | /api/productos/{id} | Eliminar |

### Categorías
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/categorias | Listar todas |
| GET | /api/categorias/{id} | Obtener una |
| POST | /api/categorias | Crear |
| PUT | /api/categorias/{id} | Actualizar |
| DELETE | /api/categorias/{id} | Eliminar |

### Proveedores
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/proveedores | Listar todos |
| GET | /api/proveedores/{id} | Obtener uno |
| POST | /api/proveedores | Crear |
| PUT | /api/proveedores/{id} | Actualizar |
| DELETE | /api/proveedores/{id} | Eliminar |

## Estructura del Proyecto

```
GA7-220501096-AA3-EV01/
├── schema.sql                    # Script de base de datos
├── zapateria-backend/
│   └── src/main/java/com/zapateria/
│       ├── model/                # Entidades JPA
│       ├── repository/           # Repositorios JPA
│       ├── service/              # Lógica de negocio
│       ├── controller/           # Controladores REST
│       └── config/               # Configuración CORS
└── zapateria-frontend/
    └── src/
        ├── pages/                # Páginas de CRUD
        ├── components/           # Componentes reutilizables
        └── services/             # Conexión API
```

## Notas

- El backend debe estar ejecutándose para que el frontend funcione
- La contraseña de MySQL debe configurarse en `application.properties`
- El esquema de base de datos está sincronizado con el proyecto original Miproyecto

## Autor

Juan Diego - Programa ADSO SENA

## Repositorio

https://github.com/juandi-blip/shoes-store-inventory-2.0
