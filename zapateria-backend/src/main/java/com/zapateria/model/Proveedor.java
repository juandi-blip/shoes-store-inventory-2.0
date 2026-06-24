package com.zapateria.model;

import jakarta.persistence.*;

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
    @Column(name = "ID_PROVEEDOR")
    private Long idProveedor;

    /** Nombre comercial del proveedor */
    @Column(name = "NOMBRE", nullable = false, length = 100)
    private String nombre;

    /** Número telefónico del proveedor */
    @Column(name = "TELEFONO", length = 20)
    private String telefono;

    /** Dirección física del proveedor */
    @Column(name = "DIRECCION", length = 200)
    private String direccion;

    /** Constructor por defecto */
    public Proveedor() {}

    /** Constructor con todos los campos */
    public Proveedor(Long idProveedor, String nombre, String telefono, String direccion) {
        this.idProveedor = idProveedor;
        this.nombre = nombre;
        this.telefono = telefono;
        this.direccion = direccion;
    }

    // ========== Getters y Setters ==========

    public Long getIdProveedor() { return idProveedor; }
    public void setIdProveedor(Long idProveedor) { this.idProveedor = idProveedor; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    @Override
    public String toString() {
        return "Proveedor{id=" + idProveedor + ", nombre='" + nombre + "'}";
    }
}
