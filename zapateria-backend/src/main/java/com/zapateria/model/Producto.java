package com.zapateria.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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
    private Long id;

    /** Nombre del producto (zapato) */
    @Column(nullable = false, length = 150)
    private String nombre;

    /** Descripción detallada del producto */
    @Column(length = 255)
    private String descripcion;

    /** Precio de venta del producto */
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    /** Cantidad disponible en inventario */
    @Column(nullable = false)
    private Integer stock;

    /** Talla del zapato */
    @Column(length = 10)
    private String talla;

    /** Color del zapato */
    @Column(length = 50)
    private String color;

    /** URL de la imagen del producto */
    @Column(name = "imagen_url", length = 255)
    private String imagenUrl;

    /** Categoría a la que pertenece el producto (relación ManyToOne) */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

    /** Proveedor que suministra el producto (relación ManyToOne) */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proveedor_id", nullable = false)
    private Proveedor proveedor;

    /** Fecha y hora de creación del registro */
    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    /** Fecha y hora de la última actualización del registro */
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    /** Constructor por defecto */
    public Producto() {}

    /** Constructor con todos los campos */
    public Producto(Long id, String nombre, String descripcion, BigDecimal precio, Integer stock,
                    String talla, String color, String imagenUrl, Categoria categoria,
                    Proveedor proveedor, LocalDateTime fechaCreacion, LocalDateTime fechaActualizacion) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.talla = talla;
        this.color = color;
        this.imagenUrl = imagenUrl;
        this.categoria = categoria;
        this.proveedor = proveedor;
        this.fechaCreacion = fechaCreacion;
        this.fechaActualizacion = fechaActualizacion;
    }

    // ========== Getters y Setters ==========

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public BigDecimal getPrecio() { return precio; }
    public void setPrecio(BigDecimal precio) { this.precio = precio; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }

    public String getTalla() { return talla; }
    public void setTalla(String talla) { this.talla = talla; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public String getImagenUrl() { return imagenUrl; }
    public void setImagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; }

    public Categoria getCategoria() { return categoria; }
    public void setCategoria(Categoria categoria) { this.categoria = categoria; }

    public Proveedor getProveedor() { return proveedor; }
    public void setProveedor(Proveedor proveedor) { this.proveedor = proveedor; }

    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }

    public LocalDateTime getFechaActualizacion() { return fechaActualizacion; }
    public void setFechaActualizacion(LocalDateTime fechaActualizacion) { this.fechaActualizacion = fechaActualizacion; }

    /** Se ejecuta antes de persistir un nuevo registro para asignar fechas */
    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
        fechaActualizacion = LocalDateTime.now();
    }

    /** Se ejecuta antes de actualizar un registro para actualizar la fecha */
    @PreUpdate
    protected void onUpdate() {
        fechaActualizacion = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "Producto{id=" + id + ", nombre='" + nombre + "', precio=" + precio + ", stock=" + stock + "}";
    }
}
