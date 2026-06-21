-- ============================================
-- Script de creación de base de datos
-- Proyecto: Zapatería
-- BD: zapateria_db
-- ============================================

CREATE DATABASE IF NOT EXISTS zapateria_db;
USE zapateria_db;

-- ============================================
-- Tabla: categoria
-- Almacena las categorías de calzado
-- ============================================
CREATE TABLE IF NOT EXISTS categoria (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- Tabla: proveedor
-- Almacena los proveedores de calzado
-- ============================================
CREATE TABLE IF NOT EXISTS proveedor (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    contacto VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- Tabla: producto
-- Almacena los productos (calzado)
-- ============================================
CREATE TABLE IF NOT EXISTS producto (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion VARCHAR(255),
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    talla VARCHAR(10),
    color VARCHAR(50),
    imagen_url VARCHAR(255),
    categoria_id BIGINT NOT NULL,
    proveedor_id BIGINT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categoria(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (proveedor_id) REFERENCES proveedor(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- ============================================
-- Datos de prueba (opcionales)
-- ============================================
INSERT INTO categoria (nombre, descripcion) VALUES
('Deportivo', 'Calzado para actividades deportivas'),
('Formal', 'Calzado para uso formal y corporativo'),
('Casual', 'Calzado para uso diario y casual'),
('Botas', 'Calzado tipo bota para diversas ocasiones');

INSERT INTO proveedor (nombre, contacto, telefono, email, direccion) VALUES
('Distribuidora Nike LATAM', 'Carlos Méndez', '300-123-4567', 'contacto@nikelatam.com', 'Bogotá, Colombia'),
('Importadora Adidas Colombia', 'María López', '301-987-6543', 'ventas@adidascol.com', 'Medellín, Colombia'),
('Calzado Nacional S.A.', 'Pedro Gómez', '302-456-7890', 'info@calzadonac.com', 'Cali, Colombia');

INSERT INTO producto (nombre, descripcion, precio, stock, talla, color, categoria_id, proveedor_id) VALUES
('Nike Air Max 270', 'Zapatilla deportiva con tecnología Air', 450000.00, 25, '42', 'Negro/Rojo', 1, 1),
('Adidas Ultraboost 22', 'Zapatilla running de alto rendimiento', 520000.00, 18, '40', 'Blanco', 1, 2),
('Clásico Oxford', 'Zapato formal de cuero genuino', 380000.00, 12, '41', 'Café', 2, 3),
('Bota Trekker', 'Bota resistente para caminatas', 290000.00, 30, '43', 'Verde', 4, 3);
