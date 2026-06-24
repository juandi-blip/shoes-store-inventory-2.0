package com.zapateria.model;

import jakarta.persistence.*;

/**
 * Entidad que representa una categoría de productos en la zapatería.
 * Permite agrupar los zapatos por tipo (deportivos, formales, casuales, etc.).
 */
@Entity
@Table(name = "categoria")
public class Categoria {

    /** Identificador único de la categoría (clave primaria autoincremental). */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_CATEGORIA")
    private Long idCategoria;

    /** Nombre de la categoría (obligatorio, máximo 100 caracteres). */
    @Column(name = "NOMBRE", nullable = false, length = 100)
    private String nombre;

    /** Constructor por defecto */
    public Categoria() {}

    /** Constructor con todos los campos */
    public Categoria(Long idCategoria, String nombre) {
        this.idCategoria = idCategoria;
        this.nombre = nombre;
    }

    // ========== Getters y Setters ==========

    public Long getIdCategoria() { return idCategoria; }
    public void setIdCategoria(Long idCategoria) { this.idCategoria = idCategoria; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    @Override
    public String toString() {
        return "Categoria{id=" + idCategoria + ", nombre='" + nombre + "'}";
    }
}
