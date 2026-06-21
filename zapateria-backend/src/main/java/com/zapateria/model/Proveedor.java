package com.zapateria.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

/**
 * Entidad que representa un proveedor en el sistema de gestión de zapatería.
 * Almacena la información de contacto y datos generales de cada proveedor.
 */
@Entity
@Table(name = "proveedor")
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
    private LocalDateTime fechaCreacion;

    /** Fecha y hora de la última actualización del registro */
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    /** Constructor por defecto */
    public Proveedor() {}

    /** Constructor con todos los campos */
    public Proveedor(Long id, String nombre, String contacto, String telefono,
                     String email, String direccion, LocalDateTime fechaCreacion,
                     LocalDateTime fechaActualizacion) {
        this.id = id;
        this.nombre = nombre;
        this.contacto = contacto;
        this.telefono = telefono;
        this.email = email;
        this.direccion = direccion;
        this.fechaCreacion = fechaCreacion;
        this.fechaActualizacion = fechaActualizacion;
    }

    // ========== Getters y Setters ==========

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getContacto() { return contacto; }
    public void setContacto(String contacto) { this.contacto = contacto; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }

    public LocalDateTime getFechaActualizacion() { return fechaActualizacion; }
    public void setFechaActualizacion(LocalDateTime fechaActualizacion) { this.fechaActualizacion = fechaActualizacion; }

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

    @Override
    public String toString() {
        return "Proveedor{id=" + id + ", nombre='" + nombre + "', contacto='" + contacto + "'}";
    }
}
