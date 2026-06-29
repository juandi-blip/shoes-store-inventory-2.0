-- ============================================
-- Script de creación de base de datos
-- Proyecto: Shoes Store - Sistema de Gestión de Inventario
-- ============================================

CREATE DATABASE IF NOT EXISTS shoesstore;
USE shoesstore;

-- Tabla de categorías
CREATE TABLE categoria (
    ID_CATEGORIA INT AUTO_INCREMENT PRIMARY KEY,
    NOMBRE VARCHAR(100)
);

-- Tabla de proveedores
CREATE TABLE proveedor (
    ID_PROVEEDOR INT AUTO_INCREMENT PRIMARY KEY,
    NOMBRE VARCHAR(100),
    TELEFONO VARCHAR(20),
    DIRECCION VARCHAR(200)
);

-- Tabla de productos
CREATE TABLE producto (
    ID_PRODUCTO INT AUTO_INCREMENT PRIMARY KEY,
    NOMBRE VARCHAR(100),
    DESCRIPCION TEXT,
    PRECIO DECIMAL(10,2),
    STOCK INT,
    TALLA VARCHAR(20),
    COLOR VARCHAR(50),
    IMAGEN_URL VARCHAR(500),
    ID_CATEGORIA INT,
    ID_PROVEEDOR INT,
    FOREIGN KEY (ID_CATEGORIA) REFERENCES categoria(ID_CATEGORIA),
    FOREIGN KEY (ID_PROVEEDOR) REFERENCES proveedor(ID_PROVEEDOR)
);

-- Datos de ejemplo - Categorías
INSERT INTO categoria (NOMBRE) VALUES 
('Zapatos'),
('Botas'),
('Sandalias'),
('Tenís'),
('Pantuflas');

-- Datos de ejemplo - Proveedores
INSERT INTO proveedor (NOMBRE, TELEFONO, DIRECCION) VALUES 
('Nike', '3001234567', 'Bogotá'),
('Adidas', '3009876543', 'Medellín'),
('Puma', '3005551234', 'Cali');
