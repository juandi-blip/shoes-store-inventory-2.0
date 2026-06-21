package com.zapateria.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * Entidad que representa un proveedor en el sistema de gestión de zapatería.
 * Almacena la información de contacto y datos generales de cada proveedor.
 */
@Entity
@Table(name = "proveedor")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Proveedor {

    /** Identificador único del proveedor */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Nombre comercial del proveedor */
    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    /** Nombre de la persona de contacto */
    @Column(name = "contacto", length = 100)
    private String contacto;

    /** Número telefónico del proveedor */
    @Column(name = "telefono", length = 20)
    private String telefono;

    /** Correo electrónico del proveedor */
    @Column(name = "email", length = 100)
    private String email;

    /** Dirección física del proveedor */
    @Column(name = "direccion", length = 255)
    private String direccion;

    /** Fecha y hora de creación del registro */
    @Column(name = "fecha_creacion", updatable = false)
    @CreationTimestamp
    private LocalDateTime fechaCreacion;

    /** Fecha y hora de la última actualización del registro */
    @Column(name = "fecha_actualizacion")
    @UpdateTimestamp
    private LocalDateTime fechaActualizacion;
}
