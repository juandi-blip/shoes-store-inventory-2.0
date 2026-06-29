package com.zapateria.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

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
    private Long idProducto;

    /** Nombre del producto (zapato) */
    @Column(name = "NOMBRE", nullable = false, length = 100)
    private String nombre;

    /** Descripción detallada del producto */
    @Column(name = "DESCRIPCION", columnDefinition = "TEXT")
    private String descripcion;

    /** Precio de venta del producto (BigDecimal para precisión monetaria) */
    @Column(name = "PRECIO", nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    /** Cantidad disponible en inventario */
    @Column(name = "STOCK", nullable = false)
    private Integer stock;

    /** Talla del calzado (ej: 38, 40, 42) */
    @Column(name = "TALLA", length = 20)
    private String talla;

    /** Color del producto (ej: Negro, Blanco) */
    @Column(name = "COLOR", length = 50)
    private String color;

    /** URL de la imagen del producto */
    @Column(name = "IMAGEN_URL", length = 500)
    private String imagenUrl;

    /** Categoría a la que pertenece el producto (relación ManyToOne) */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ID_CATEGORIA", nullable = false)
    private Categoria categoria;

    /** Proveedor que suministra el producto (relación ManyToOne) */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ID_PROVEEDOR", nullable = false)
    private Proveedor proveedor;

    /** Constructor por defecto */
    public Producto() {}

    /** Constructor con todos los campos */
    public Producto(Long idProducto, String nombre, String descripcion, BigDecimal precio,
                    Integer stock, String talla, String color, String imagenUrl,
                    Categoria categoria, Proveedor proveedor) {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.talla = talla;
        this.color = color;
        this.imagenUrl = imagenUrl;
        this.categoria = categoria;
        this.proveedor = proveedor;
    }

    // ========== Getters y Setters ==========

    public Long getIdProducto() { return idProducto; }
    public void setIdProducto(Long idProducto) { this.idProducto = idProducto; }

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

    @Override
    public String toString() {
        return "Producto{id=" + idProducto + ", nombre='" + nombre + "', precio=" + precio + ", stock=" + stock + "}";
    }
}
