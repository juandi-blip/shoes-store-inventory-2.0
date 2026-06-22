package com.zapateria.model;

import jakarta.persistence.*;

/**
 * Entidad que representa un producto (zapato) dentro del sistema de gestión
 * de la zapatería. Contiene la información básica de un producto incluyendo
 * su relación con categoría y proveedor.
 */
@Entity
@Table(name = "producto")
public class Producto {

    /** Identificador único del producto */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_PRODUCTO")
    private Integer idProducto;

    /** Nombre del producto (zapato) */
    @Column(name = "NOMBRE", nullable = false, length = 100)
    private String nombre;

    /** Descripción detallada del producto */
    @Column(name = "DESCRIPCION", columnDefinition = "TEXT")
    private String descripcion;

    /** Precio de venta del producto */
    @Column(name = "PRECIO", nullable = false, precision = 10, scale = 2)
    private Double precio;

    /** Cantidad disponible en inventario */
    @Column(name = "STOCK", nullable = false)
    private Integer stock;

    /** Categoría a la que pertenece el producto (relación ManyToOne) */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_CATEGORIA", nullable = false)
    private Categoria categoria;

    /** Proveedor que suministra el producto (relación ManyToOne) */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_PROVEEDOR", nullable = false)
    private Proveedor proveedor;

    /** Constructor por defecto */
    public Producto() {}

    /** Constructor con todos los campos */
    public Producto(Integer idProducto, String nombre, String descripcion, Double precio,
                    Integer stock, Categoria categoria, Proveedor proveedor) {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
        this.proveedor = proveedor;
    }

    // ========== Getters y Setters ==========

    public Integer getIdProducto() { return idProducto; }
    public void setIdProducto(Integer idProducto) { this.idProducto = idProducto; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }

    public Categoria getCategoria() { return categoria; }
    public void setCategoria(Categoria categoria) { this.categoria = categoria; }

    public Proveedor getProveedor() { return proveedor; }
    public void setProveedor(Proveedor proveedor) { this.proveedor = proveedor; }

    @Override
    public String toString() {
        return "Producto{id=" + idProducto + ", nombre='" + nombre + "', precio=" + precio + ", stock=" + stock + "}";
    }
}
