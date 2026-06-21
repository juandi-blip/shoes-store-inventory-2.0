package com.zapateria.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Entidad que representa una categoría de productos en la zapatería.
 * Permite agrupar los zapatos por tipo (deportivos, formales, casuales, etc.).
 */
@Entity
@Table(name = "categoria")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Categoria {

    /** Identificador único de la categoría (clave primaria autoincremental). */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Nombre de la categoría (obligatorio, máximo 100 caracteres). */
    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    /** Descripción detallada de la categoría (opcional, máximo 255 caracteres). */
    @Column(name = "descripcion", length = 255)
    private String descripcion;

    /** Fecha y hora de creación del registro. Se asigna automáticamente al insertar. */
    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    /** Fecha y hora de la última actualización del registro. Se actualiza automáticamente. */
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    /** Se asigna la fecha de creación antes de persistir si es null. */
    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
        this.fechaActualizacion = LocalDateTime.now();
    }

    /** Se actualiza la fecha de actualización antes de cada modificación. */
    @PreUpdate
    protected void onUpdate() {
        this.fechaActualizacion = LocalDateTime.now();
    }
}
