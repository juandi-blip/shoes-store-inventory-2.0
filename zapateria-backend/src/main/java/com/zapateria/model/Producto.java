package com.zapateria.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Entidad que representa un producto (zapato) dentro del sistema de gestión
 * de la zapatería. Contiene la información básica de un producto incluyendo
 * su relación con categoría y proveedor.
 */
@Entity
@Table(name = "producto")
@Data
@NoArgsConstructor
@AllArgsConstructor
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
}
