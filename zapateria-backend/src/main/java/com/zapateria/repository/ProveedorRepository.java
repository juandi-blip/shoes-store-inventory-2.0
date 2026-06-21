package com.zapateria.repository;

import com.zapateria.model.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio para la entidad Proveedor.
 * Proporciona operaciones CRUD y consultas personalizadas
 * contra la tabla proveedor de la base de datos MySQL.
 */
@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {

    /**
     * Busca proveedores cuyo nombre contenga el texto indicado.
     *
     * @param nombre texto parcial o total a buscar en el nombre
     * @return lista de proveedores que coinciden con la búsqueda
     */
    List<Proveedor> findByNombreContaining(String nombre);
}
